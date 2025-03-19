export interface Category {
  id: number | string;
  name: string;
}

export interface CategoryResponse {
  content: Category[];
}