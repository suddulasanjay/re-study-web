export interface AgendaDto {
    conceptId: number; 
    conceptName: string;
    subjectId?: number | null;
    subjectName?: string | null;
    conceptStatus: number;
    conceptDuration: number;
  }
  