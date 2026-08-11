export interface UserScrapbook {
  id?: number;
  term: string;
  title?: string;
  explanation: string;
  domainUrl: string;
  learnedAt: number;
  archivedAt?: number;
}
