export interface historicalEntity {
    country: string;
    province: string;
    timeline: {
      cases: Object;
      deaths: Object;
      recovered: Object;
    };
  }
  
export const createEmptyHistoricalEntity = () : historicalEntity => ({
    country: "",
    province: "",
    timeline: {
      cases: {},
      deaths: {},
      recovered: {},
    } 
});
