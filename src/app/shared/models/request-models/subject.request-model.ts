export interface AddSubjectDto {
    name: string;
    description: string;
    isPreset: boolean;
}
  
export interface EditSubjectDto {
    id: number;
    name: string;
    description: string;
    isPreset: boolean;
}
  