import {useState, useEffect} from 'react'
import GameBoard from './components/game_board'
import * as d3 from 'd3'

import './App.css';

function App() {

  const speed = 50
  const nCellsWidth = 50
  const nCellsHeight = nCellsWidth
  const nCells = nCellsWidth * nCellsHeight
  const initialCells = () => {
    console.log('cells reset')
    const data = [...Array(nCells)].map((e,i) => {
      return d3.randomInt(0,2)()
    })
    return data
  }
  const [cells, setCells] = useState(initialCells)


  const getNeighbours = (cellNum, nCellsWidth, nCellsHeight) => {
    let nCells = nCellsWidth * nCellsHeight
    let neighbours = [
      cellNum - nCellsWidth - 1,  //0
      cellNum - nCellsWidth,      //1
      cellNum - nCellsWidth + 1,  //2
      cellNum - 1,                //3
      cellNum + 1,                //4
      cellNum + nCellsWidth - 1,  //5
      cellNum + nCellsWidth,      //6
      cellNum + nCellsWidth + 1,  //7
    ]

    if (cellNum % nCellsWidth === 0){ //we're in the left boundary --> remove 5,3,0 (from high to low)
      //console.log('removing cells', neighbours[5], neighbours[3], neighbours[0])
      neighbours.splice(5, 1)
      neighbours.splice(3, 1)
      neighbours.splice(0, 1)
    }

    if ((cellNum + 1) % nCellsWidth === 0) { //we're in the right boundary --> remove 7,4,2 (from high to low)
      //console.log('removing cells', neighbours[7], neighbours[4], neighbours[2])
      neighbours.splice(7, 1)
      neighbours.splice(4, 1)
      neighbours.splice(2, 1)
    }

    //lastly, remove cells that are below 0 or above number of cells
    let i = 0
    while (i < neighbours.length){
      if (neighbours[i] < 0 || neighbours[i] > nCells){
        //console.log('removing cells', neighbours[i])
        neighbours.splice(i, 1)
      } else {
        i++
      }
    }

    return neighbours
  }

  const determineFaith = (cellNum, nCellsWidth, nCellsHeight) => {
    let nLiveNeighbours = 0
    let neighbours = getNeighbours(cellNum, nCellsWidth, nCellsHeight)
    neighbours.forEach(element => {
      nLiveNeighbours += cells[element]
    });
    if(cells[cellNum] === 1) {
      if (nLiveNeighbours < 2 || nLiveNeighbours > 3){
        return 0 //the cell dies
      } else {
        return 1 //the cell lives to see another day
      }
    } else if (cells[cellNum] === 0 && nLiveNeighbours === 3) { //the cell was dead but now sees the day of live
      return 1
    } else {
      return 0 //tumbleweed
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const nextState = cells.map((v, i) => {
        return determineFaith(i, nCellsWidth, nCellsHeight)
      })
      setCells(nextState)
      
    }, speed);
    return () => clearInterval(interval);
  });

  return (
    <div className="App">
      <h1 style={{marginLeft: '100px'}}>Conway's Game of Life</h1>
      <GameBoard data={cells} size={{width: 500, height:500}}/>
    </div>
  );
}

export default App;
