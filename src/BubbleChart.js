import React, {useEffect,useRef} from 'react';
import * as d3 from "d3"


export default function BubbleChart(props) {
    const d3Contatiner = useRef(null) 


    //util function - flow weight and mongoDB date string to date object conversion
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


 
    useEffect( ()=> {
        if(props.user && d3Contatiner.current){


            const flowArr = props.user.map(el => flow(el))
            const periodMin = d3.min(flowArr.map(el=> (new Date (el.date))))
            const periodMax = d3.min(flowArr.map(el=> (new Date (el.date))))

            // makes new date that is a copy of the perionMin date (avoids altering the original arr)
           let newDate = new Date(periodMin.getTime())
           //adds week to periodMin copy date (above)
           newDate.setDate(periodMin.getDate()+7)


            const canvasHeight = 400
            const canvasWidth = 1000

   
            //X AXIS
            let xScale = d3.scaleTime()
                        .domain([periodMin,newDate]) 
                        .range([0,canvasWidth +15]) 

                        
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
                    .attr("cx", value => 60 +(canvasWidth/( (newDate-periodMin) / (1000*60*60*24))) * Math.round( (value.date-periodMin)/(1000*60*60*24) ) )
                    .attr("cy", 250)
                    .attr("r", value => value.typeOfFlow*10)
                    .attr("fill", "red")

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