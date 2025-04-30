
export type ResearchProject = {
  title: string;
  position: string;
  period: string;
  funding: string;
  description: string;
};

export type JournalPublication = {
  authors: string[];
  year: string;
  title: string;
  journal: string;
  volume?: string;
  issue?: string;
  pages?: string;
  url?: string;
  keywords?: string[];
};

export type ConferenceProceeding = {
  authors: string[];
  year: string;
  title: string;
  conference: string;
  pages?: string;
  publisher?: string;
  url?: string;
  keywords?: string[];
};

export type NonRefereedPublication = {
  authors: string[];
  year: string;
  title: string;
  journal: string;
  publication?: string;
  url?: string;
  keywords?: string[];
};

export type WorkUnderReview = {
  authors: string[];
  year: string;
  title: string;
  journal: string;
  conference?: string;
  keywords?: string[];
};

export type WorkInProgress = {
  authors: string[];
  type: string;
  title: string;
  year?: string;
  keywords?: string[];
};
