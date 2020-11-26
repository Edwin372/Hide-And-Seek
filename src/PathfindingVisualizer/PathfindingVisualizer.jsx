import React, { Component } from "react";
import Node from "./Node/Node";
import { backTrack, isSafe } from "../algorithms/backTracking";
import "./PathfindingVisualizer.css";
import dropHandler from "../helper/inputFromText.js";

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      gameStarted: false,
      grid: [],
      mouseIsPressed: false,
    };
  }
  inputFromTextFile = (e) => {
    let inputData = dropHandler(e);
    console.log("abc ", inputData);
    const grid = this.getInitialGrid(inputData);
    this.setState({ grid });
  };

  handleMouseDown(row, col) {
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    console.log(newGrid);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    // console.log('handle mouse entered', row, col)
    if (!this.state.mouseIsPressed) return;
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }
  animateBackTrackTour(backTrackTour) {
    for (let i = 1; i <= backTrackTour.length; i++) {
      if (i === backTrackTour.length) {
      } else {
        const node = backTrackTour[i];
        const prevNode = backTrackTour[i - 1];

        setTimeout(() => {
          let currentNodeElement = document.getElementById(
            `node-${node.row}-${node.col}`
          );
          let prevNodeElement = document.getElementById(
            `node-${prevNode.row}-${prevNode.col}`
          );
          currentNodeElement.className = "node node-start";
          currentNodeElement.childNodes[0].className = "seen";
          prevNodeElement.className = "node node-visited";
          prevNodeElement.childNodes[0].className = "unseen";
        }, 200 * i);
      }
    }
  }

  visualizeBackTracking() {
    const {
      grid,
      startNodeRow,
      startNodeCol,
      finishNodeRow,
      finishNodeCol,
    } = this.state;
    this.setState({ gameStarted: true });
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const backTrackTour = backTrack(grid, startNode, finishNode);
    this.animateBackTrackTour(backTrackTour);
  }

  getInitialGrid = (inputData) => {
    let grid = inputData;
    console.log("123 ", inputData.length);
    // for (let row = 0; row < inputData.length; row++) {
    // let currentRow = [];
    // for (let col = 0; col < inputData[row].length; col++) {
    // currentRow.push(this.createNode(col, row, inputData[row][col]));
    // }
    // grid.push(currentRow);
    // }
    console.log("tester ", grid[0]);
    return grid;
  };

  createNode = (col, row, nodeType) => {
    let node = {
      col,
      row,
      isStart: false,
      isFinish: false,
      isVisited: false,
      isWall: false,
      previousNode: null,
      point: 0,
    };
    switch (nodeType) {
      case 0:
        return node;
      case 1:
        return {
          ...node,
          isWall: true,
        };
      case 2:
        return {
          ...node,
          isStart: true,
        };
      case 3:
        return {
          ...node,
          isFinish: true,
          point: 100000,
        };
      default:
        break;
    }
  };

  getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    let stepX = [1, 1, 0, -1, -1, -1, 0, 1];
    let stepY = [0, 1, 1, 1, 0, -1, -1, -1];
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
      // point: 0
    };
    for (let i = 0; i < 8; i++) {
      if (isSafe(row + stepY[i], col + stepX[i])) {
        const nextNode = newGrid[row + stepY[i]][col + stepX[i]];
        const affectedNode = {
          ...nextNode,
          point: nextNode.point + 1,
        };
        newGrid[row + stepY[i]][col + stepX[i]] = affectedNode;
      }
    }
    newGrid[row][col] = newNode;
    return newGrid;
  };

  render() {
    const { grid, mouseIsPressed, gameStarted } = this.state;

    return (
      <>
        <button onClick={() => this.visualizeBackTracking()}>Visualize!</button>
        <input type="file" onChange={(e) => this.inputFromTextFile(e)}></input>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="row">
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
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
                      row={row}
                    ></Node>
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
