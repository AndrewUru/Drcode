// types/lead-analysis.ts
export interface FormData {
    description: string;
    category: string;
  }
  
  export interface AnalysisResults {
    score: number;
    sentiment: string;
    categoryMatch: number;
    analysis: string;
  }