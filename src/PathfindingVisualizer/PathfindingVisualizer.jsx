import React, { Component } from "react";
import Node from "./Node/Node";
import { backTrack } from "../algorithms/backTracking";
import "./PathfindingVisualizer.css";
// import dropHandler from "../helper/inputfromText";

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      gameStarted: false,
      grid: [],
      mouseIsPressed: false,
      inputData: [],
      startNodeRow: 0,
      startNodeCol: 0,
      finishNodeRow: 0,
      finishNodeCol: 0,
      maxRow: 0,
      maxCol: 0,
    };
  }
  readFromTxtFile = (evt) => {
    var inputData = [];
    var inputMN = [];
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.target.files;

    if (files.length !== 1) {
      return;
    }
    var file = files[0];
    var fileReader = new FileReader();

    fileReader.onload = (progressEvent) => {
      var stringData = fileReader.result;
      let str = stringData.split("\n");
      inputMN = str[0].split(" ").map((x) => parseInt(x));
      for (let i = 0; i < inputMN[0]; i++) {
        let inputLine = str[i + 1].split(" ").map((x) => parseInt(x));
        inputData.push(inputLine);
      }
      this.setState({ inputData }, () => {
        this.setState({ maxRow: inputMN[0], maxCol: inputMN[1] }, () => {
          const grid = this.getInitialGrid(inputData);
          this.setState({ grid });
        });
      });
    };
    fileReader.readAsText(file, "UTF-8"); // fileReader.result -> String.
  };

  handleMouseDown(row, col) {
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
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
    const { grid, startNodeRow, startNodeCol, maxRow, maxCol } = this.state;

    this.setState({ gameStarted: true });
    const startNode = grid[startNodeRow][startNodeCol];
    const backTrackTour = backTrack(grid, startNode, maxRow, maxCol);
    this.animateBackTrackTour(backTrackTour);
  }

  getInitialGrid = () => {
    const { inputData, maxRow, maxCol } = this.state;
    let grid = [];
    for (let row = 0; row < maxRow; row++) {
      let currentRow = [];
      for (let col = 0; col < maxCol; col++) {
        currentRow.push(this.createNode(col, row, inputData[row][col]));
      }
      grid.push(currentRow);
    }
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
      point: 1,
    };
    switch (nodeType) {
      case 0:
        return node;
      case 1:
        return {
          ...node,
          isWall: true,
          point: 0,
        };
      case 2:
        this.setState({ startNodeRow: row, startNodeCol: col });
        return {
          ...node,
          isStart: true,
        };
      case 3:
        this.setState({ finishNodeRow: row, finishNodeCol: col });
        return {
          ...node,
          isFinish: true,
          point: 100000,
        };
      default:
        return node;
    }
  };

  getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
      point: 0,
    };

    newGrid[row][col] = newNode;
    return newGrid;
  };

  render() {
    const { grid, mouseIsPressed, gameStarted } = this.state;

    return (
      <>
        <button onClick={() => this.visualizeBackTracking()}>Visualize!</button>
        <input type="file" onChange={(e) => this.readFromTxtFile(e)}></input>
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
