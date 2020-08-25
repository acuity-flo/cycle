import React, {useEffect,useRef} from 'react';
import * as d3 from "d3"
import moment from 'moment'

export default function BubbleChart(props) {
    const d3Contatiner = useRef(null)

    //utility function for changing date format and adding weight to period level
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
        element.date = moment(element.date).format("MM DD YYYY")
        return element
    }

    //useEffect depends on period date to be called
    useEffect(()=> {
        if(props.user && d3Contatiner.current){
            //period data from user
            const periodData = props.user.period

            //map over array with flow util fxn
            const flowArr = periodData.map(el => flow(el))

            //periodMin is lowest date, periodMax is largest
            const periodMin = moment(d3.min(flowArr.map(el=> el.date)))
            const periodMax = moment(d3.max(flowArr.map(el=> el.date)))

            //find the range of the min and max
            const periodRange = periodMax.diff(periodMin, 'days') + 1

            //set height and width of the canvas
            const canvasHeight = 400
            const canvasWidth = 1000
            // set the width between ticks in xAxis
            //minus 100 to account for x axis shift 50 width value to the left, then have it end 50 from right
            const tickWidth = ((canvasWidth - 100) / (periodRange-1))

            //X AXIS && SCALE
            let xScale = d3.scaleTime()
                        .domain([periodMin, periodMax])
                        .range([0,(canvasWidth - 100)])

            let xAxis = d3.axisBottom()
                        .scale(xScale)
                        .ticks(periodRange)

            const svg = d3.select(d3Contatiner.current)
                .attr("width", canvasWidth)
                .attr("height", canvasHeight)
                .style("border", "2px solid pink")

            //moves axis 50 to left of canvas start and 40 from bottom and adds the axis
            svg.append("g")
                .attr("transform",`translate(50,${canvasHeight-40})`)
                .call(xAxis)

            //CIRCLES
            //cx uses the 50 width value from above x axis shift then multiplies value.date-periodMin (0,1,2,etc) by the tickWidth above
            svg.append("g")
                .selectAll('circle')
                .data(flowArr)
                .enter()
                .append('circle')
                    .attr("class", "circles")
                    .attr("cx", value => {
                        return 50 + tickWidth* moment(value.date).diff(periodMin, 'days')})
                    .attr("cy", 250)
                    .attr("r", value => value.typeOfFlow*10)
                    .attr("fill", "red")

        }
        //below is dependency for useEffect, depends on user data
    },[props.user])


    return (
        <svg
            className = "d3Component"
            width = {400}
            height = {200}
            ref = {d3Contatiner}
        />
    )
}
