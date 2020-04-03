export interface historicalEntity {
    country: string;
    timeline: {
      cases: Object;
      deaths: Object;
      recovered: Object;
    };
  }
  
export const createEmptyHistoricalEntity = () : historicalEntity => ({
    country: "",
    timeline: {
      cases: {},
      deaths: {},
      recovered: {},
    } 
});
