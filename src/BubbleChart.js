import React, {useEffect,useRef} from 'react';
import * as d3 from "d3"
// import axios from "axios"

export default function BubbleChart(props) {
    const d3Contatiner = useRef(null) 


    // const getUser = async () => {
    //     const {data} =  await axios.get('http://localhost:4000/api/')
    //     return data
    // }

    // const data = getUser()
    useEffect( ()=> {
        console.log(props.user)
        if(props.user && d3Contatiner.current){
            const canvasHeight = 400
            const canvasWidth = 600
            let xScale = d3.scaleLinear()
                        .domain([0,10])
                        .range([0,canvasWidth])
            let xAxis = d3.axisBottom()
                        .scale(xScale)
        
            const svg = d3.select(d3Contatiner.current)
                .attr("width", canvasWidth)
                .attr("height", canvasHeight)
                .style("border", "2px solid pink")
            
            svg.append("g")
                .attr("transform",`translate(50,${canvasHeight-20})`)
                .call(xAxis)
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