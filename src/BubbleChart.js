import React, {useEffect,useRef} from 'react';
import * as d3 from "d3"
// import axios from "axios"

export default function BubbleChart(props) {
    const d3Contatiner = useRef(null) 


    //util function - flow weight
    const flow = (element) => {
        if(element.typeOfFlow === 'spotting') {
            element.typeOfFlow = 1
        } else if (element.typeOfFlow === 'light'){
            element.typeOfFlow = 2
        } else if (element.typeOfFlow === 'medium'){
            element.typeOfFlow = 3
        } else if (element.typeOfFlow === 'heavy'){
            element.typeOfFlow = 4
        }

        const stringDate = new Date(element.date).toLocaleDateString()
        element.date = new Date(stringDate)
        return element
    }


    // function add_weeks(dt, n){ 
        
    //    let newDate = new Date(dt.setDate(dt.getDate() + (n * 7))) 
    
    //    return newDate
    // }
    
 
    useEffect( ()=> {
        console.log('PROPS IN BUBBLECHART', props.user)
        if(props.user && d3Contatiner.current){

           

            const flowArr = props.user.map(el => flow(el))
            const periodMin = d3.min(flowArr.map(el=>el.date))
            const periodMax = d3.max(flowArr.map(el=>el.date))
            console.log('FLOW ARR',flowArr)
            // console.log("test",add_weeks(periodMin,1))

            const canvasHeight = 400
            const canvasWidth = 1000


            let date1= new Date(2020,5,4)
            let date2= new Date(2020,5,11)
            //X AXIS
            let xScale = d3.scaleTime()
                        .domain([date1,date2]) 
                        .range([0,canvasWidth -60])

                        
            let xAxis = d3.axisBottom()
                        .scale(xScale)
                        .ticks(flowArr.length)
        
            const svg = d3.select(d3Contatiner.current)
                .attr("width", canvasWidth)
                .attr("height", canvasHeight)
                .style("border", "2px solid pink")
            
            svg.append("g")
                .attr("transform",`translate(50,${canvasHeight-40})`)
                .call(xAxis)


            //CIRCLES
            svg.append("g")
                .selectAll('circle')
                .data(flowArr)
                .enter()
                .append('circle')
                    .attr("class", "circles")
                    .attr("cx", value => 60+ (canvasWidth/( (date2-date1) / (1000*60*60*24))) * Math.round( (value.date-date1)/(1000*60*60*24) ) )
                    .attr("cy", 250)
                    .attr("r", value => value.typeOfFlow*10)
                    .attr("fill", "red")


            // svg.append("g")
            //     .attr("transform",'translate(50,10)')
            //     .call(yAxis)    
        }
    },[props.user])

 
    return (
       <div> <h1>hi</h1>
        <svg 
            className = "d3Component" 
            width = {400}
            height = {200}
            ref = {d3Contatiner}
        />

        </div> 
    )
}