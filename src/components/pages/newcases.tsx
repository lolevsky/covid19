import React,  { Component } from 'react';
import { firebaseAnalytics } from '../firebase/firebase';
import { covidAPI } from '../../api/covidAPI';
import { historicalEntity } from '../../model/historical';
import { timelineData, createTimelineData } from '../../model/timelineData';
import { Container } from 'react-bootstrap';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip } from 'recharts';

interface Props {
}

interface State {
    isFetchingData: boolean,
    historicalEntities: Array<historicalEntity>,
    timelineData: Array<Array<timelineData>>,
    width: number
}

class NewcCases extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            isFetchingData: true,
            historicalEntities: [],
            timelineData: [],
            width: window.innerWidth,
        };
    };

    public async componentDidMount() {
        firebaseAnalytics.setCurrentScreen('NewcCases')
        firebaseAnalytics.logEvent('NewcCases - loaded')

        await covidAPI.getHistoricalAllCountry().then(async (historicalEntities) => {
            this.setState({
                historicalEntities: historicalEntities, 
                timelineData: await this.prepareDataForGraph(historicalEntities), 
                isFetchingData: false})
          }
          ).catch(err => {
              firebaseAnalytics.logEvent('NewcCases - alert ' + err)
              alert(err + ' Oops, we have some issu, please try to refresh')
          });
    }

    async prepareDataForGraph(historicalEntities: Array<historicalEntity>){
        this.setState({timelineData: []})
        var dataMappingNewCases: Array<Array<timelineData>>  = []

        var pervCase = 0

        // historicalEntities.filter(historical => 
        //     !historical.province || 0 === historical.province.length)
        historicalEntities.map((historical) => {
            pervCase = 0;
        
            return Object.entries(historical.timeline.cases).map(([date, cases]) => {
                var newCase = cases - pervCase
                pervCase = cases
                
                return createTimelineData(
                        historical.country + (!historical.province || 0 === historical.province.length? '' : ' - ' + historical.province),
                        date, 
                        newCase, 
                        0,
                        0
                    )
            })
        }).filter(timeline => 
            timeline[timeline.length-1].cases > 20
        ).map(timelines => 
            dataMappingNewCases.push(timelines)
        )

        dataMappingNewCases.sort((tl1, tl2) => {
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

        return dataMappingNewCases
    }
    
    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    }

    render(){
        if (this.state == null) {
			return <div style={{display: 'flex', justifyContent: 'center'}}>Loading...</div>
        }
        
        const { width } = this.state;
        const isMobile = width <= 700;

        const divStyleGridContainer = {
            display: 'grid',
            gridTemplateColumns: isMobile? '100%' : '33% 33% 33%'
        }

        return (
            <Container>
                <br/>
                {this.state.isFetchingData ?    <div style={{display: 'flex', justifyContent: 'center'}}>
                                                    Fetching data... 
                                                </div> :
                    <div>
                        <h3>New cases by country</h3>
                        <div style={divStyleGridContainer}>
                        {
                        this.state.timelineData.map((timelineDataArray, i) => {
                            if(timelineDataArray.length>0){ 
                                return <div>
                                            <h5>{timelineDataArray[0].country}</h5>
                                            <ResponsiveContainer width='100%' aspect={4.0/3.0}>
                                                <LineChart
                                                    data={timelineDataArray}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="date" tick={{fontSize: 10}}/>
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Line type="monotone" dataKey="cases" stroke="#8884d8" activeDot={{ r: 8 }} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                }
                                return ''
                            }) 
                        }
                        </div>
                    </div>
                }
            </Container>
        )
    }
}

export default NewcCases;