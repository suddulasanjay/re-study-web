export interface AddConceptDto {
    name: string;
    description: string;
    categoryId: number;
    scheduledDate: string;
    repetitionGap: number;
    duration: number;
  }
  
  export interface EditConceptDto {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    scheduledDate: string;
    repetitionGap: number;
    duration: number;
  }