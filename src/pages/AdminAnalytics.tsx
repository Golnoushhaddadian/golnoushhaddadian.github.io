import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Users, Clock, Globe, Monitor, ArrowRight, Link2, Search, Trash2 } from "lucide-react";
import { useDocumentHead } from "@/hooks/useDocumentHead";

const ADMIN_PASSWORD = "LiaAdmin2026!";

type Session = {
  id: string;
  session_id: string;
  ip_address: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  browser: string | null;
  os: string | null;
  device: string | null;
  referrer: string | null;
  first_page: string | null;
  pages_visited: any;
  duration_seconds: number | null;
  started_at: string | null;
  last_active_at: string | null;
};

function parseSource(referrer: string | null): { label: string; type: "search" | "social" | "direct" | "website"; query?: string } {
  if (!referrer || referrer === "") return { label: "Direct Visit", type: "direct" };
  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();
    const params = url.searchParams;
    // Search engines
    if (host.includes("google.")) {
      const q = params.get("q") || params.get("query");
      return { label: "Google Search", type: "search", query: q || undefined };
    }
    if (host.includes("bing.com")) {
      const q = params.get("q");
      return { label: "Bing Search", type: "search", query: q || undefined };
    }
    if (host.includes("yahoo.com")) {
      const q = params.get("p") || params.get("q");
      return { label: "Yahoo Search", type: "search", query: q || undefined };
    }
    if (host.includes("duckduckgo.com")) {
      const q = params.get("q");
      return { label: "DuckDuckGo Search", type: "search", query: q || undefined };
    }
    if (host.includes("scholar.google")) {
      const q = params.get("q");
      return { label: "Google Scholar", type: "search", query: q || undefined };
    }
    // Social media
    if (host.includes("linkedin.com")) return { label: "LinkedIn", type: "social" };
    if (host.includes("twitter.com") || host.includes("x.com")) return { label: "X / Twitter", type: "social" };
    if (host.includes("facebook.com")) return { label: "Facebook", type: "social" };
    if (host.includes("instagram.com")) return { label: "Instagram", type: "social" };
    if (host.includes("reddit.com")) return { label: "Reddit", type: "social" };
    if (host.includes("researchgate.net")) return { label: "ResearchGate", type: "social" };
    // Other websites
    return { label: host, type: "website" };
  } catch {
    return { label: referrer, type: "website" };
  }
}

function formatDuration(secs: number | null) {
  if (!secs) return "0s";
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-US", { timeZone: "America/New_York", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function AdminAnalytics() {
  useDocumentHead({ title: "Admin Analytics", description: "Private visitor analytics dashboard" });
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    setLoading(true);
    supabase
      .from("visitor_sessions")
      .select("*")
      .order("started_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error);
        setSessions((data as Session[]) || []);
        setLoading(false);
      });
  }, [authenticated]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("visitor_sessions").delete().eq("id", id);
    if (error) {
      console.error("Delete failed:", error);
      return;
    }
    setSessions(prev => prev.filter(s => s.id !== id));
    if (selectedSession?.id === id) setSelectedSession(null);
  };

  const summary = useMemo(() => {
    if (!sessions.length) return null;
    const total = sessions.length;
    const totalDuration = sessions.reduce((s, v) => s + (v.duration_seconds || 0), 0);
    const avg = Math.round(totalDuration / total);
    const countries: Record<string, number> = {};
    const devices: Record<string, number> = {};
    const browsers: Record<string, number> = {};
    const pages: Record<string, number> = {};
    const sources: Record<string, number> = {};
    const searchQueries: Record<string, number> = {};
    sessions.forEach((s) => {
      const loc = [s.city, s.country].filter(Boolean).join(", ") || "Unknown";
      countries[loc] = (countries[loc] || 0) + 1;
      devices[s.device || "Unknown"] = (devices[s.device || "Unknown"] || 0) + 1;
      browsers[s.browser || "Unknown"] = (browsers[s.browser || "Unknown"] || 0) + 1;
      (s.pages_visited || []).forEach((p: any) => {
        pages[p.page] = (pages[p.page] || 0) + 1;
      });
      const src = parseSource(s.referrer);
      sources[src.label] = (sources[src.label] || 0) + 1;
      if (src.query) {
        searchQueries[src.query] = (searchQueries[src.query] || 0) + 1;
      }
    });
    return { total, totalDuration, avg, countries, devices, browsers, pages, sources, searchQueries };
  }, [sessions]);

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lock size={20} /> Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full">Unlock</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) return <p className="text-center py-10 text-muted-foreground">Loading analytics...</p>;

  const sortedCountries = summary ? Object.entries(summary.countries).sort((a, b) => b[1] - a[1]) : [];
  const sortedPages = summary ? Object.entries(summary.pages).sort((a, b) => b[1] - a[1]).slice(0, 10) : [];
  const sortedSources = summary ? Object.entries(summary.sources).sort((a, b) => b[1] - a[1]) : [];
  const sortedQueries = summary ? Object.entries(summary.searchQueries).sort((a, b) => b[1] - a[1]) : [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Visitor Analytics</h1>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card><CardContent className="pt-6 text-center"><Users className="mx-auto mb-2 text-primary" size={24} /><p className="text-2xl font-bold">{summary.total}</p><p className="text-xs text-muted-foreground">Total Visitors</p></CardContent></Card>
          <Card><CardContent className="pt-6 text-center"><Clock className="mx-auto mb-2 text-primary" size={24} /><p className="text-2xl font-bold">{formatDuration(summary.avg)}</p><p className="text-xs text-muted-foreground">Avg Duration</p></CardContent></Card>
          <Card><CardContent className="pt-6 text-center"><Globe className="mx-auto mb-2 text-primary" size={24} /><p className="text-2xl font-bold">{Object.keys(summary.countries).length}</p><p className="text-xs text-muted-foreground">Unique Locations</p></CardContent></Card>
          <Card><CardContent className="pt-6 text-center"><Monitor className="mx-auto mb-2 text-primary" size={24} /><p className="text-2xl font-bold">{formatDuration(summary.totalDuration)}</p><p className="text-xs text-muted-foreground">Total Time</p></CardContent></Card>
        </div>
      )}

      {/* Top Locations & Pages side by side */}
      {summary && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Top Locations</CardTitle></CardHeader>
            <CardContent className="space-y-1">
              {sortedCountries.slice(0, 8).map(([loc, count]) => (
                <div key={loc} className="flex justify-between text-sm"><span className="text-muted-foreground">{loc}</span><Badge variant="secondary">{count}</Badge></div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm">Top Pages</CardTitle></CardHeader>
            <CardContent className="space-y-1">
              {sortedPages.map(([page, count]) => (
                <div key={page} className="flex justify-between text-sm"><span className="text-muted-foreground">{page}</span><Badge variant="secondary">{count}</Badge></div>
              ))}
            </CardContent>
          </Card>
        </div>
       )}

      {/* Traffic Sources & Search Queries */}
      {summary && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Link2 size={16} /> Traffic Sources</CardTitle></CardHeader>
            <CardContent className="space-y-1">
              {sortedSources.map(([src, count]) => (
                <div key={src} className="flex justify-between text-sm"><span className="text-muted-foreground">{src}</span><Badge variant="secondary">{count}</Badge></div>
              ))}
              {sortedSources.length === 0 && <p className="text-xs text-muted-foreground">No data yet</p>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm flex items-center gap-2"><Search size={16} /> Search Keywords</CardTitle></CardHeader>
            <CardContent className="space-y-1">
              {sortedQueries.map(([q, count]) => (
                <div key={q} className="flex justify-between text-sm"><span className="text-muted-foreground">"{q}"</span><Badge variant="secondary">{count}</Badge></div>
              ))}
              {sortedQueries.length === 0 && <p className="text-xs text-muted-foreground">Most search engines hide keywords, but they'll appear here when available</p>}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Individual Sessions Table */}
      <Card>
        <CardHeader><CardTitle className="text-sm">All Visitor Sessions ({sessions.length})</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="py-2 pr-3">Time</th>
                <th className="py-2 pr-3">Location</th>
                <th className="py-2 pr-3">Source</th>
                <th className="py-2 pr-3">Device</th>
                <th className="py-2 pr-3">Duration</th>
                <th className="py-2 pr-3">First Page</th>
                <th className="py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => {
                const src = parseSource(s.referrer);
                return (
                <tr key={s.id} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-2 pr-3 whitespace-nowrap">{formatDate(s.started_at)}</td>
                  <td className="py-2 pr-3">{[s.city, s.country].filter(Boolean).join(", ") || "Unknown"}</td>
                  <td className="py-2 pr-3">
                    <span className="whitespace-nowrap">{src.label}</span>
                    {src.query && <span className="block text-xs text-muted-foreground">"{src.query}"</span>}
                  </td>
                  <td className="py-2 pr-3">{s.device} · {s.browser}</td>
                  <td className="py-2 pr-3">{formatDuration(s.duration_seconds)}</td>
                  <td className="py-2 pr-3">{s.first_page || "/"}</td>
                  <td className="py-2 flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedSession(selectedSession?.id === s.id ? null : s)}>
                      {selectedSession?.id === s.id ? "Hide" : "View"}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(s.id)} title="Delete session">
                      <Trash2 size={14} />
                    </Button>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
          {sessions.length === 0 && <p className="text-center text-muted-foreground py-4">No sessions recorded yet.</p>}
        </CardContent>
      </Card>

      {/* Session Detail Panel */}
      {selectedSession && (
        <Card>
          <CardHeader><CardTitle className="text-sm">Session Detail</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div><span className="text-muted-foreground">IP:</span> {selectedSession.ip_address}</div>
              <div><span className="text-muted-foreground">OS:</span> {selectedSession.os}</div>
              <div><span className="text-muted-foreground">Browser:</span> {selectedSession.browser}</div>
              <div><span className="text-muted-foreground">Device:</span> {selectedSession.device}</div>
              <div><span className="text-muted-foreground">Region:</span> {selectedSession.region}</div>
              <div><span className="text-muted-foreground">Referrer:</span> {selectedSession.referrer || "Direct"}</div>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Pages Visited:</p>
              <div className="space-y-1">
                {(selectedSession.pages_visited || []).map((p: any, i: number) => {
                  const pages = selectedSession.pages_visited || [];
                  let pageDuration = "";
                  if (p.timestamp) {
                    const start = new Date(p.timestamp).getTime();
                    if (i < pages.length - 1 && pages[i + 1].timestamp) {
                      const end = new Date(pages[i + 1].timestamp).getTime();
                      pageDuration = formatDuration(Math.round((end - start) / 1000));
                    } else if (selectedSession.last_active_at) {
                      const end = new Date(selectedSession.last_active_at).getTime();
                      pageDuration = formatDuration(Math.round((end - start) / 1000));
                    }
                  }
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <Badge variant="outline">{p.page}</Badge>
                      {pageDuration && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={10} /> {pageDuration}
                        </span>
                      )}
                      {i < (selectedSession.pages_visited || []).length - 1 && <ArrowRight size={12} className="text-muted-foreground" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
