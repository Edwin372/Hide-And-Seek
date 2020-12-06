import React, { Component } from "react";
import Node from "./Node";
import { algorithms } from "../algorithms";
import "./hideAndSeekVisualizer.css";
// import dropHandler from "../helper/inputfromText";
const DELAY_TIME = 125;
export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      gameStarted: false,
      mapChosen: false,
      grid: [],
      mouseIsPressed: false,
      inputData: [],
      startNodeRow: 0,
      startNodeCol: 0,
      finishNodes: [],
      maxRow: 0,
      maxCol: 0,
    };
  }
  componentDidMount() {
    let inputData = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
      [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.setState({ inputData }, () => {
      this.setState({ maxRow: 20, maxCol: 20 }, () => {
        const grid = this.getInitialGrid(inputData);
        this.setState({ grid, mapChosen: true });
      });
    });
  }
  readFromTxtFile = (evt) => {
    try {
      var inputData = [];
      var inputMN = [];
      evt.stopPropagation();
      evt.preventDefault();
      this.setState({ finishNodes: [], grid: [] });
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
          if (str[i + 1] && str[0]) {
            // console.log(str[i + 1][0]);
            let inputLine = str[i + 1].split(" ").map((x) => parseInt(x));
            inputData.push(inputLine);
          } else {
            alert("Your map is not legit!");
            return;
          }
        }
        this.setState({ inputData }, () => {
          this.setState({ maxRow: inputMN[0], maxCol: inputMN[1] }, () => {
            const grid = this.getInitialGrid(inputData);
            this.setState({ grid, mapChosen: true });
          });
        });
      };
      fileReader.readAsText(file, "UTF-8"); // fileReader.result -> String.
    } catch (err) {
      alert("your map is not legit!");
    }
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

  animateAlgorithms(finderTour) {
    for (let i = 1; i <= finderTour.length; i++) {
      if (i === finderTour.length) {
      } else {
        const node = finderTour[i];
        const prevNode = finderTour[i - 1];
        setTimeout(() => {
          let currentNodeElement = document.getElementById(
            `node-${node.row}-${node.col}`
          );
          let prevNodeElement = document.getElementById(
            `node-${prevNode.row}-${prevNode.col}`
          );
          this.setState((state) => {
            return {
              score: state.score - 1,
            };
          });
          this.animateVision(node.vision, prevNode.vision);
          if (prevNodeElement.className !== "node node-dead-body") {
            prevNodeElement.className = "node";
          }
          if (currentNodeElement.className !== "node node-dead-body") {
            currentNodeElement.className = "node node-start";
            this.animateVision(node.vision, prevNode.vision);
          }
          if (i === finderTour.length - 1) {
            alert("All hider have been found !!!");
            window.location.reload();
          }
        }, DELAY_TIME * i);
      }
    }
  }

  animateNoiseTour(noiseTour) {
    for (let i = 1; i <= noiseTour.length; i++) {
      if (i === noiseTour.length) {
      } else {
        const node = noiseTour[i];
        const prevNode = noiseTour[i - 1];

        setTimeout(() => {
          let currentNodeElement = document.getElementById(
            `node-${node.row}-${node.col}`
          );
          let prevNodeElement = document.getElementById(
            `node-${prevNode.row}-${prevNode.col}`
          );

          prevNodeElement.className = "node";
          currentNodeElement.className = "node node-visited";
        }, DELAY_TIME * 5 * i);
      }
    }
  }

  animateHidingTour(hidingTour) {
    for (let i = 1; i <= hidingTour.length; i++) {
      if (i === hidingTour.length) {
      } else {
        const node = hidingTour[i];
        const prevNode = hidingTour[i - 1];
        // console.log(node.row, node.col)

        setTimeout(() => {
          let currentNodeElement = document.getElementById(
            `node-${node.row}-${node.col}`
          );
          let prevNodeElement = document.getElementById(
            `node-${prevNode.row}-${prevNode.col}`
          );

          if (prevNodeElement.className !== "node node-dead-body") {
            prevNodeElement.className = "node";
          }
          if (i === hidingTour.length - 1) {
            currentNodeElement.className = "node node-dead-body";
            this.setState((state) => {
              return {
                score: state.score + 20,
              };
            });
          } else {
            if (currentNodeElement.className !== "node node-dead-body") {
              currentNodeElement.className = "node node-finish";
              this.animateVisionHider(node.visionHider, prevNode.visionHider);
            }
          }
        }, DELAY_TIME * i);
      }
    }
  }

  animateVision(curVision, prevVision) {
    // console.log(curVision, prevVision);
    prevVision.forEach((item) => {
      document.getElementById(
        `node-${item[0]}-${item[1]}`
      ).childNodes[0].className = "unseen";
    });
    curVision.forEach((item) => {
      document.getElementById(
        `node-${item[0]}-${item[1]}`
      ).childNodes[0].className = "seen";
    });
  }

  animateVisionHider(curVision, prevVision) {
    prevVision.forEach((item) => {
      if (
        document.getElementById(`node-${item[0]}-${item[1]}`).childNodes[0]
          .className !== "seen"
        // document.getElementById(`node-${item[0]}-${item[1]}`).childNodes[0].className !== 'seenHider'
      ) {
        document.getElementById(
          `node-${item[0]}-${item[1]}`
        ).childNodes[0].className = "unseen";
      }
    });

    curVision.forEach((item) => {
      if (
        document.getElementById(`node-${item[0]}-${item[1]}`).childNodes[0]
          .className === "unseen"
        // document.getElementById(`node-${item[0]}-${item[1]}`).childNodes[0].className !== 'seenHider'
      ) {
        document.getElementById(
          `node-${item[0]}-${item[1]}`
        ).childNodes[0].className = "seenHider";
      }
    });
  }

  visualizeAlgorithms() {
    const {
      grid,
      startNodeRow,
      startNodeCol,
      maxRow,
      maxCol,
      finishNodes,
    } = this.state;
    // console.log(finishNodes)
    this.setState({ gameStarted: true });
    const startNode = grid[startNodeRow][startNodeCol];
    const { finderTour, hidingTours, noiseTours } = algorithms(
      grid,
      startNode,
      maxRow,
      maxCol,
      finishNodes
    );
    this.animateAlgorithms(finderTour);
    hidingTours.forEach((hidingTour) => {
      this.animateHidingTour(hidingTour);
    });
    noiseTours.forEach((noiseTour) => {
      this.animateNoiseTour(noiseTour);
    });
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
      isFinder: false,
      stuckDirection: [],
      previousNode: null,
      point: 0,
      visitTime: 0,
      hiderVisitTime: 0,
      hiderPoint: 0,
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
      case 3:
        this.setState({ startNodeRow: row, startNodeCol: col });
        return {
          ...node,
          isStart: true,
          isFinder: true,
        };
      case 2:
        const newNode = {
          ...node,
          isFinish: true,
          point: 1000000,
        };
        this.setState((state) => {
          return {
            finishNodes: [
              ...state.finishNodes,
              {
                row: newNode.row,
                col: newNode.col,
                index: state.finishNodes.length,
              },
            ],
          };
        });
        return newNode;
      case 4:
        return {
          ...node,
          isObstacle: true,
          point: 1,
        };
      default:
        return node;
    }
  };

  getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (!node.isFinish && !node.isStart) {
      const newNode = {
        ...node,
        isWall: !node.isWall,
        point: 0,
      };
      newGrid[row][col] = newNode;
      return newGrid;
    }
    return newGrid;
  };

  render() {
    const { grid, mouseIsPressed, gameStarted } = this.state;
    return (
      <>
        <button
          onClick={() => {
            this.visualizeAlgorithms();
          }}
          disabled={
            this.state.mapChosen || this.state.gameStarted ? false : true
          }
          style={{
            color: "yellow",
            fontFamily: "Nerko One",
            fontSize: "20px",
          }}
        >
          GAME ON!
        </button>
        <input
          type="file"
          onChange={(e) => this.readFromTxtFile(e)}
          style={{
            color: "black",
            fontFamily: "Nerko One",
            fontSize: "15px",
          }}
        ></input>
        <div
          style={{
            margin: "auto",
            color: "red",
            width: "700px",
            textAlign: "left",
            fontFamily: "Nerko One",
          }}
        >
          YOU CAN TOUCH ANY NODE IN THE MAP TO CREATE WALL! <br />
          In case you choose a map, please choose a txt file with correct
          format:
          <br />
          - The first line contains two integers N x M, which is the size of
          map.
          <br />
          - N next lines represent the N x M map matrix. Each line contains M
          integers.
          <br />
          The number at [i, j] (row i, column j) determines whether wall, hiders
          or seeker is set. If there is wall at this position, we will have
          value 1. If there is hider, we will have value 2. If there is seeker,
          we will have 3. Otherwise (empty path), we will have 0.
          <br />
        </div>
        <div
          style={{
            margin: "auto",
            color: "blue",
            textAlign: "center",
            fontFamily: "Nerko One",
            fontSize: "25px",
          }}
        >
          Score {this.state.score}
        </div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="row">
                {row.map((node, nodeIdx) => {
                  const {
                    row,
                    col,
                    isFinish,
                    isStart,
                    isWall,
                    isObstacle,
                  } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isObstacle={isObstacle}
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
