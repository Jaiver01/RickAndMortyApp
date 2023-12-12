export interface PaginatedDataModel<T> {
  info?: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  data?: T[];
}
