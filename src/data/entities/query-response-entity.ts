export interface QueryResponseEntity<T> {
  [key: string]: T;
}

export interface PaginatedDataEntity<T> {
  info: {
    count: number;
    pages: number;
    next: number | null;
    prev: number | null;
  };
  results: T[];
}
