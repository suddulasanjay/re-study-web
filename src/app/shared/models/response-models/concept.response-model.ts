export interface ConceptDto {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    scheduledDate: string;
    repetitionGap: number;
    duration: number;
  }

  export interface StudySessionDto {
    conceptId: number;
    conceptName: string;
    conceptDescription ?: string;
    categoryId: number;
    categoryName: string;
    subjectId?: number;
    subjectName?: string;
    remainingDuration: number;
    conceptStateId: number;
    comment?: string;
  }
  