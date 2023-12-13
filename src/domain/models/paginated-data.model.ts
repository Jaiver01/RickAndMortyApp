export interface PaginatedDataModel<T> {
  info?: {
    count: number;
    pages: number;
    next: number | null;
    prev: number | null;
  };
  data?: T[];
}
