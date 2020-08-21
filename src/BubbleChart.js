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

    
 
    useEffect( ()=> {
        console.log('PROPS IN BUBBLECHART', props.user)
        if(props.user && d3Contatiner.current){

            // const periodMin = new Date(d3.min(props.user.map(el=>el.date)))
            // const periodMax = new Date(d3.max(props.user.map(el=>el.date)))
            // console.log("TEST", Math.round( (periodMax-periodMin)/(1000*60*60*24) ) ) 

            const flowArr = props.user.map(el => flow(el))
            const periodMin = d3.min(flowArr.map(el=>el.date))
            const periodMax = d3.max(flowArr.map(el=>el.date))
            console.log('FLOW ARR',flowArr)

            const canvasHeight = 400
            const canvasWidth = 1000

            // let yScale = d3.scaleLinear()
            //                 .domain([0,10])
            //                 .range([canvasHeight,0])

            // let yAxis = d3.axisLeft()
            //                 .scale(yScale)

            //X AXIS
            let xScale = d3.scaleTime()
                        .domain([periodMin,periodMax]) 
                        .range([0,canvasWidth])
                        
            // xScale.ticks(d3.timeDays(0,3))

                        
            let xAxis = d3.axisBottom()
                        .scale(xScale)
        
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
                    .attr("cx", value => 50+ (canvasWidth/flowArr.length) * Math.round( (value.date-periodMin)/(1000*60*60*24) ) )
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