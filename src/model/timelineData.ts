export interface timelineData {
    country: string;
    date: string;
    cases: number;
    deaths: number;
    recovered: number;
  }
  
  export const createTimelineData = (country: string, date: string, cases: any, deaths: any, recovered: any) : timelineData => ({
    country: country,
    date: date,
    cases: cases,
    deaths: deaths,
    recovered: recovered
  });