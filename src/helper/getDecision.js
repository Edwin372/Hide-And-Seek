import calculateMinEuclidDistance from "../helper/calculateEuclidDistance";
import isSafe from "./isSafe";
import getHeuristicPoint from "./getHeuristicPoint";
// import getSeenNode from './getSeenNode'

const getDecision = (currentNode, grid, maxRow, maxCol, announcedPos) => {
  let decisionQueue = [];
  let direction = {
    East: 0,
    EastNorth: 0,
    North: 0,
    WestNorth: 0,
    West: 0,
    WestSouth: 0,
    South: 0,
    EastSouth: 0,
  };
  for (let item in direction) {
    switch (item) {
      case "East":
        //east vision
        let eastSignArr = [
          [0, 2],
          [0, 3],
          [-1, 2],
          [-1, 3],
          [-2, 3],
          [1, 2],
          [1, 3],
          [2, 3],
          [0, 1],
        ];
        // find intesect part bettween east vision and current node 's vision array
        let currentEastVision = eastSignArr.filter((sign) =>
          currentNode.vision.find(
            (item) =>
              item[0] === sign[0] + currentNode.row &&
              item[1] === sign[1] + currentNode.col
          )
        );
        // if east step is reachable
        if (isSafe(currentNode.row, currentNode.col + 1, maxRow, maxCol)) {
          // calculate euclid distance and heuristic point
          let eastHeuristicPoint = getHeuristicPoint(
            grid[currentNode.row][currentNode.col + 1],
            currentEastVision,
            currentNode,
            grid,
            maxRow,
            maxCol
          );
          let eastEuclidDistance = calculateMinEuclidDistance(
            { row: currentNode.row, col: currentNode.col + 1 },
            announcedPos
          );
          // in case heuristic point of next move is null (this happen when east step meet wall or edge of the map)
          if (eastHeuristicPoint !== null) {
            decisionQueue.push([
              0,
              1,
              eastHeuristicPoint,
              grid[currentNode.row][currentNode.col + 1].visitTime,
              eastEuclidDistance,
            ]);
            break;
          }
        }

        break;
      case "EastNorth":
        let eastNorthSignArr = [
          [-2, 2],
          [-3, 3],
          [-2, 1],
          [-3, 1],
          [-3, 2],
          [-1, 1],
          [-1, 2],
          [-1, 3],
          [-2, 3],
        ];
        let currentEastNorthVision = eastNorthSignArr.filter((sign) =>
          currentNode.vision.find(
            (item) =>
              item[0] === sign[0] + currentNode.row &&
              item[1] === sign[1] + currentNode.col
          )
        );
        if (isSafe(currentNode.row - 1, currentNode.col + 1, maxRow, maxCol)) {
          let eastNorthHeuristicPoint = getHeuristicPoint(
            grid[currentNode.row - 1][currentNode.col + 1],
            currentEastNorthVision,
            currentNode,
            grid,
            maxRow,
            maxCol
          );
          let eastNorthEuclidDistance = calculateMinEuclidDistance(
            { row: currentNode.row - 1, col: currentNode.col + 1 },
            announcedPos
          );
          if (eastNorthHeuristicPoint !== null) {
            decisionQueue.push([
              -1,
              1,
              eastNorthHeuristicPoint,
              grid[currentNode.row - 1][currentNode.col + 1].visitTime,
              eastNorthEuclidDistance,
            ]);
            break;
          }
        }

        break;
      case "North":
        let northSignArr = [
          [-2, 0],
          [-3, 0],
          [-2, -1],
          [-3, -1],
          [-3, -2],
          [-2, 1],
          [-3, 1],
          [-3, 2],
          [-1, 0],
        ];
        let currentNorthVision = northSignArr.filter((sign) =>
          currentNode.vision.find(
            (item) =>
              item[0] === sign[0] + currentNode.row &&
              item[1] === sign[1] + currentNode.col
          )
        );
        if (isSafe(currentNode.row - 1, currentNode.col, maxRow, maxCol)) {
          let northHeuristicPoint = getHeuristicPoint(
            grid[currentNode.row - 1][currentNode.col],
            currentNorthVision,
            currentNode,
            grid,
            maxRow,
            maxCol
          );
          let northEuclidDistance = calculateMinEuclidDistance(
            { row: currentNode.row - 1, col: currentNode.col },
            announcedPos
          );
          if (northHeuristicPoint !== null) {
            decisionQueue.push([
              -1,
              0,
              northHeuristicPoint,
              grid[currentNode.row - 1][currentNode.col].visitTime,
              northEuclidDistance,
            ]);
            break;
          }
        }

        break;
      case "WestNorth":
        let westNorthSignArr = [
          [-2, -2],
          [-3, -3],
          [-1, -2],
          [-1, -3],
          [-2, -3],
          [-2, -1],
          [-3, -1],
          [-3, -2],
          [-1, -1],
        ];
        let currentWestNorthVision = westNorthSignArr.filter((sign) =>
          currentNode.vision.find(
            (item) =>
              item[0] === sign[0] + currentNode.row &&
              item[1] === sign[1] + currentNode.col
          )
        );
        if (isSafe(currentNode.row - 1, currentNode.col - 1, maxRow, maxCol)) {
          let westNorthHeuristicPoint = getHeuristicPoint(
            grid[currentNode.row - 1][currentNode.col - 1],
            currentWestNorthVision,
            currentNode,
            grid,
            maxRow,
            maxCol
          );
          let westNorthEuclidDistance = calculateMinEuclidDistance(
            { row: currentNode.row - 1, col: currentNode.col - 1 },
            announcedPos
          );
          if (westNorthHeuristicPoint !== null) {
            decisionQueue.push([
              -1,
              -1,
              westNorthHeuristicPoint,
              grid[currentNode.row - 1][currentNode.col - 1].visitTime,
              westNorthEuclidDistance,
            ]);
            break;
          }
        }
        break;
      case "West":
        let westSignArr = [
          [0, -2],
          [0, -3],
          [1, -2],
          [1, -3],
          [2, -3],
          [-1, -2],
          [-1, -3],
          [-2, -3],
          [0, -1],
        ];
        let currentWestVision = westSignArr.filter((sign) =>
          currentNode.vision.find(
            (item) =>
              item[0] === sign[0] + currentNode.row &&
              item[1] === sign[1] + currentNode.col
          )
        );
        if (isSafe(currentNode.row, currentNode.col - 1, maxRow, maxCol)) {
          let westHeuristicPoint = getHeuristicPoint(
            grid[currentNode.row][currentNode.col - 1],
            currentWestVision,
            currentNode,
            grid,
            maxRow,
            maxCol
          );
          let westEuclidDistance = calculateMinEuclidDistance(
            { row: currentNode.row, col: currentNode.col - 1 },
            announcedPos
          );
          if (westHeuristicPoint !== null) {
            decisionQueue.push([
              0,
              -1,
              westHeuristicPoint,
              grid[currentNode.row][currentNode.col - 1].visitTime,
              westEuclidDistance,
            ]);
            break;
          }
        }

        break;
      case "WestSouth":
        let westSouthSignArr = [
          [2, -2],
          [3, -3],
          [2, -1],
          [3, -1],
          [3, -2],
          [1, -2],
          [1, -3],
          [2, -3],
          [1, -1],
        ];
        let currentWestSouthVision = westSouthSignArr.filter((sign) =>
          currentNode.vision.find(
            (item) =>
              item[0] === sign[0] + currentNode.row &&
              item[1] === sign[1] + currentNode.col
          )
        );
        if (isSafe(currentNode.row + 1, currentNode.col - 1, maxRow, maxCol)) {
          let westSouthHeuristicPoint = getHeuristicPoint(
            grid[currentNode.row + 1][currentNode.col - 1],
            currentWestSouthVision,
            currentNode,
            grid,
            maxRow,
            maxCol
          );
          let westSouthEuclidDistance = calculateMinEuclidDistance(
            { row: currentNode.row + 1, col: currentNode.col - 1 },
            announcedPos
          );
          if (westSouthHeuristicPoint !== null) {
            decisionQueue.push([
              1,
              -1,
              westSouthHeuristicPoint,
              grid[currentNode.row + 1][currentNode.col - 1].visitTime,
              westSouthEuclidDistance,
            ]);
            break;
          }
        }

        break;
      case "South":
        let southSignArr = [
          [2, 0],
          [3, 0],
          [2, 1],
          [3, 1],
          [3, 2],
          [2, -1],
          [3, -1],
          [3, -2],
          [1, 0],
        ];
        let currentSouthVision = southSignArr.filter((sign) =>
          currentNode.vision.find(
            (item) =>
              item[0] === sign[0] + currentNode.row &&
              item[1] === sign[1] + currentNode.col
          )
        );
        if (isSafe(currentNode.row + 1, currentNode.col, maxRow, maxCol)) {
          let southHeuristicPoint = getHeuristicPoint(
            grid[currentNode.row + 1][currentNode.col],
            currentSouthVision,
            currentNode,
            grid,
            maxRow,
            maxCol
          );
          let southEuclidDistance = calculateMinEuclidDistance(
            { row: currentNode.row + 1, col: currentNode.col },
            announcedPos
          );
          if (southHeuristicPoint !== null) {
            decisionQueue.push([
              1,
              0,
              southHeuristicPoint,
              grid[currentNode.row + 1][currentNode.col].visitTime,
              southEuclidDistance,
            ]);
            break;
          }
        }

        break;
      case "EastSouth":
        let eastSouthSignArr = [
          [2, 2],
          [3, 3],
          [1, 2],
          [1, 3],
          [2, 3],
          [2, 1],
          [3, 1],
          [3, 2],
          [1, 1],
        ];
        let currentEastSouthVision = eastSouthSignArr.filter((sign) =>
          currentNode.vision.find(
            (item) =>
              item[0] === sign[0] + currentNode.row &&
              item[1] === sign[1] + currentNode.col
          )
        );
        if (isSafe(currentNode.row + 1, currentNode.col + 1, maxRow, maxCol)) {
          let eastSouthHeuristicPoint = getHeuristicPoint(
            grid[currentNode.row + 1][currentNode.col + 1],
            currentEastSouthVision,
            currentNode,
            grid,
            maxRow,
            maxCol
          );
          let eastSouthEuclidDistance = calculateMinEuclidDistance(
            { row: currentNode.row + 1, col: currentNode.col + 1 },
            announcedPos
          );
          if (eastSouthHeuristicPoint !== null) {
            decisionQueue.push([
              1,
              1,
              eastSouthHeuristicPoint,
              grid[currentNode.row + 1][currentNode.col + 1].visitTime,
              eastSouthEuclidDistance,
            ]);
            break;
          }
        }
        break;
      default:
        break;
    }
  }
  // arrange decision queue  in order of priority vision heuristic point, euclid distance, number of visited times respectively
  const finalDecision = decisionQueue
    .sort((item1, item2) =>
      item1[4] < item2[4] ? 1 : item1[4] > item2[4] ? -1 : 0
    )
    .sort((item1, item2) =>
      item1[3] < item2[3] ? 1 : item1[3] > item2[3] ? -1 : 0
    )
    .sort((item1, item2) =>
      item1[2] > item2[2] ? 1 : item1[2] < item2[2] ? -1 : 0
    )[decisionQueue.length - 1];
  // console.log(sortedDecision)
  // choose the best option after sorted
  return finalDecision;
};

export default getDecision;
