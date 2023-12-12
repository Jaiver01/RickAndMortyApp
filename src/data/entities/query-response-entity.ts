export interface QueryResponseEntity<T> {
  [key: string]: T;
}

export interface PaginatedDataEntity<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}
