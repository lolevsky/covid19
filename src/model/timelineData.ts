export interface timelineData {
    date: string;
    cases: number;
    deaths: number;
    recovered: number;
  }
  
  export const createTimelineData = (date: string, cases: number, deaths: number, recovered: number) : timelineData => ({
    date: date,
    cases: cases,
    deaths: deaths,
    recovered: recovered
  });