export interface StreakDay {
    date: string;
    activityCount: number;
}

export interface StreakDetailsDto{
    maximumStreak: number,
    currentStreak: number
}

export interface RecentActivityDto {
    concept: string;
    subject?: string;
    activityDate: string;
    status: number;
  }
  
