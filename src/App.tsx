
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "@/components/Layout";

// Page components
import Welcome from "@/pages/Welcome";

import Awards from "@/pages/Awards";
import Projects from "@/pages/Projects";
import Research from "@/pages/Research";
import Teaching from "@/pages/Teaching";
import Service from "@/pages/Service";
import ProfessionalAffiliations from "@/pages/ProfessionalAffiliations";
import CurriculumVitae from "@/pages/CurriculumVitae";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import Gallery from "@/pages/Gallery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Welcome />} />
              
              <Route path="/awards" element={<Awards />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/research" element={<Research />} />
              <Route path="/teaching" element={<Teaching />} />
              <Route path="/service" element={<Service />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/affiliations" element={<ProfessionalAffiliations />} />
              <Route path="/cv" element={<CurriculumVitae />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
