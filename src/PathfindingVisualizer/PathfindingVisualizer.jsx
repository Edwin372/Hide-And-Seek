import React, {Component} from 'react';
import Node from './Node/Node';
import {backTrack, isSafe} from '../algorithms/backTracking'
import './PathfindingVisualizer.css';



export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      gameStarted: false,
      grid: [],
      startNodeRow: 5,
      startNodeCol: 5,
      finishNodeRow: 9,
      finishNodeCol: 20,
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = this.getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    console.log(newGrid);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    // console.log('handle mouse entered', row, col)
    if (!this.state.mouseIsPressed) return;
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }


  animateVision(node, prevNode) {
    let visionX = [1,1,0,0,-1,-1,1,-1,2,2,0,0,-2,-2,2,-2,1,-1,2,2,-2,-2,1,-1]
    let visionY = [1,-1,1,-1,1,-1,0,0,2,-2,2,-2,2,-2,0,0,2,2,1,-1,1,-1,-2,-2]
    for (let i = 0; i < 24 ; i ++ ) {
      let visionNode = document.getElementById(`node-${node.row + visionX[i]}-${node.col + visionY[i]}`)

      if (visionNode) {
        visionNode.className = 'node node-vision'
      }
    }
  }
  animateBackTrackTour(backTrackTour) {
    for (let i = 1; i <= backTrackTour.length; i++) {
      if (i === backTrackTour.length) {
       
      }
      else {
        const node = backTrackTour[i];
        const prevNode = backTrackTour[i-1];

        setTimeout(() => {
          let currentNodeElement = document.getElementById(`node-${node.row}-${node.col}`)
          let prevNodeElement = document.getElementById(`node-${prevNode.row}-${prevNode.col}`)
          currentNodeElement.className = 'node node-start';
          currentNodeElement.childNodes[0].className = 'seen'
          prevNodeElement.className = 'node node-visited';
          prevNodeElement.childNodes[0].className = 'unseen'
        }, 200 * i);
      }
    }
  }

  visualizeBackTracking() {

    const {grid, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol} = this.state;
    this.setState({gameStarted: true})
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const backTrackTour = backTrack(grid, startNode, finishNode);
    this.animateBackTrackTour(backTrackTour)
  }

 

  getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 10; row++) {
      const currentRow = [];
      for (let col = 0; col < 30; col++) {
        currentRow.push(this.createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };



  createNode = (col, row) => {
    const { startNodeRow, startNodeCol, finishNodeRow, finishNodeCol} = this.state;
    return {
      col,
      row,
      isStart: row === startNodeRow && col === startNodeCol,
      isFinish: row === finishNodeRow && col === finishNodeCol,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
      point: 
      (row === finishNodeRow && col === finishNodeCol) 
      ? 2000 
      : 0
    };
  };

  getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    let stepX = [1,1,0,-1,-1,-1,0,1]
    let stepY = [0,1,1,1,0,-1,-1,-1]
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
      // point: 0
    };
    for (let i = 0; i < 8; i++) {
      if (isSafe(row + stepY[i], col + stepX[i])) {
        const nextNode = newGrid[row + stepY[i]][col + stepX[i]];
        const affectedNode =  {
          ...nextNode,
          point: nextNode.point + 1
        }
        newGrid[row + stepY[i]][col + stepX[i]] = affectedNode;
      }
    }
    newGrid[row][col] = newNode;
    return newGrid;
  };

  render() {
    const {grid, mouseIsPressed, gameStarted} = this.state;

    return (
      <>
        <button onClick={() => this.visualizeBackTracking()}>
          Visualize!
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="row">
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      gameStarted={gameStarted}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

