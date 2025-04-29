
export type ResearchProject = {
  title: string;
  position: string;
  period: string;
  funding: string;
  description: string;
};

export type JournalPublication = {
  authors: string;
  year: string;
  title: string;
  journal: string;
  volume?: string;
  pages?: string;
};

export type ConferenceProceeding = {
  authors: string;
  year: string;
  title: string;
  conference: string;
  pages?: string;
  publisher?: string;
};

export type NonRefereedPublication = {
  authors: string;
  year: string;
  title: string;
  journal: string;
};

export type WorkUnderReview = {
  authors: string;
  year: string;
  title: string;
  journal: string;
};

export type WorkInProgress = {
  authors: string;
  type: string;
  title: string;
};
