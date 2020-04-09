import { historicalEntity } from "../../model/historical";
import { timelineData, createTimelineData } from "../../model/timelineData";


class CasesMaping {

    public async maphistoricalEntitiesTotimelineDataArrayAndSort(historicalEntities: Array<historicalEntity>):Promise<timelineData[][]>{
        var dataMappingNewCases: Array<Array<timelineData>>  = []

        historicalEntities.map((historical) => {        
            return this.maphistoricalEntitiesTotimelineDataSingle(historical)
        }).filter(timeline => 
            timeline[(timeline).length-1].cases > 20
        ).map(timelines => 
            dataMappingNewCases.push(timelines)
        )

        return this.sortTimelineData(dataMappingNewCases)
    }

    public maphistoricalEntitiesTotimelineDataSingle(historicalEntitity: historicalEntity):timelineData[]{
        var pervCase = 0
        
        return Object.entries(historicalEntitity.timeline.cases).map(([date, cases]) => {
            var newCase = cases - pervCase
            pervCase = cases
            
            return createTimelineData(
                historicalEntitity.country + (!historicalEntitity.province || 0 === historicalEntitity.province.length? '' : ' - ' + historicalEntitity.province),
                    date, 
                    newCase, 
                    0,
                    0
                )
        })
    }

    sortTimelineData(dataMappingNewCases: Array<Array<timelineData>>){
        return dataMappingNewCases.sort((tl1, tl2) => {
            var count1 = tl1[tl1.length-1].cases
            var count2 = tl2[tl2.length-1].cases

            if (count1 > count2) {
                return -1;
            }
        
            if (count1 < count2) {
                return 1;
            }
        
            return 0;
        })
    }
}

export const casesMaping = new CasesMaping();