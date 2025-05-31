export interface AddCategoryDto {
    subjectId: number | null;
    name: string;
    description: string;
}

export interface EditCategoryDto {
  id : number;
  subjectId: number | null;
  name: string;
  description: string;
}