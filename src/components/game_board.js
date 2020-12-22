import {useEffect, useRef} from 'react'
import * as d3 from 'd3'

const GameBoard = (props) => {
    const nCellsWidth = 50
    const boardSVG = useRef(null)

    useEffect( () => {
        
        if(boardSVG.current && props.data){
            //console.log('board rendered!')
            //console.log(props.data)

            const svg = d3.select(boardSVG.current)
            
            svg
                .selectAll('rect')
                .data(props.data, d=>d)
                .join(
                    enter => enter.append('rect')
                        .style('stroke', 'black')
                        .style('fill', d => {
                            if (d === 0){
                                return 'white'
                            } else {
                                return 'black'
                            }
                        })
                        .attr('width', props.size.width/nCellsWidth)
                        .attr('height', props.size.width/nCellsWidth)
                        .attr('x', (d,i) => (i % nCellsWidth) * props.size.width/nCellsWidth)
                        .attr('y', (d,i) => Math.floor(i/nCellsWidth) * props.size.width/nCellsWidth),
                    update => update
                        .style('stroke', 'black')
                        .style('fill', d => {
                            if (d === 0){
                                return 'white'
                            } else {
                                return 'black'
                            }
                        })
                        .attr('width', props.size.width/nCellsWidth)
                        .attr('height', props.size.width/nCellsWidth)
                        .attr('x', (d,i) => (i % nCellsWidth) * props.size.width/nCellsWidth)
                        .attr('y', (d,i) => Math.floor(i/nCellsWidth) * props.size.width/nCellsWidth),
                    exit => exit.remove()
                )

        }
    }, [props.data])

    return(
        <svg 
            ref={boardSVG}
            width={props.size.width}
            height={props.size.height}
            style={{border: '1px solid black', marginLeft: '100px'}}
        ></svg>
    )
}

export default GameBoard