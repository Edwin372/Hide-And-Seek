import getSeenNode from "./getSeenNode";
import { calculateMinEuclidDistanceForHider } from "./calculateEuclidDistance";
import isSafe from "./isSafe";

const getHeuristicPointHider = (
  nextNode,
  signArr,
  currentNode,
  grid,
  maxRow,
  maxCol
) => {
  // console.log(nextNode, currentNode)
  if ((nextNode && nextNode.isWall === true) || !nextNode) {
    return null;
  } else {
    if (currentNode) {
      let seenNodes = getSeenNode(currentNode, grid, signArr, maxRow, maxCol);
      let heuristicPoint = seenNodes.reduce(
        (sum, seenNode) => sum + seenNode.hiderPoint,
        0
      );
      return heuristicPoint;
    }
  }
};
const getFinderInVision = (finder, _grid, vision) => {
  // console.log(vision,'vision')
  let output = { seen: false };
  vision.forEach((item) => {
    if (finder.row === item[0] && finder.col === item[1]) {
      // console.log('got here')
      // console.log(grid[item[0]][item[1]])
      output = {
        seen: true,
        location: [item[0], item[1]],
      };
    }
  });
  return output;
};

const getDecisionHider = (finder, currentNode, grid, maxRow, maxCol) => {
  let decisionQueue = [];
  let direction = [
    "East",
    "EastNorth",
    "North",
    "WestNorth",
    "West",
    "WestSouth",
    "South",
    "EastSouth",
  ];
  let finderLocation = getFinderInVision(finder, grid, currentNode.visionHider);
  // console.log(finderLocation,'FinderLocation')
  direction.forEach((item) => {
    switch (item) {
      case "East":
        //east vision
        let eastSignArr = [
          [0, 2],
          [-1, 2],
          [1, 2],
          [0, 1],
        ];
        // find intesect part bettween east vision and current node 's vision array
        let currentEastVision = eastSignArr.filter((sign) =>
          currentNode.visionHider.find(
            (item) =>
              item[0] === sign[0] + currentNode.row &&
              item[1] === sign[1] + currentNode.col
          )
        );
        // if east step is reachable
        if (isSafe(currentNode.row, currentNode.col + 1, maxRow, maxCol)) {
          // calculate euclid distance and heuristic point
          let eastHeuristicPoint = getHeuristicPointHider(
            grid[currentNode.row][currentNode.col + 1],
            currentEastVision,
            currentNode,
            grid,
            maxRow,
            maxCol
          );
          var eastEuclidDistance = 0;
          if (
            finderLocation.seen &&
            !grid[currentNode.row][currentNode.col + 1].isWall
          ) {
            eastEuclidDistance = calculateMinEuclidDistanceForHider(
              grid[currentNode.row][currentNode.col + 1],
              grid[finder.row][finder.col]
            );
          }
          // console.log("got")
          // in case heuristic point of next move is null (this happen when east step meet wall or edge of the map)
          if (eastHeuristicPoint !== null) {
            decisionQueue.push([
              0,
              1,
              eastHeuristicPoint,
              eastEuclidDistance,
              grid[currentNode.row][currentNode.col + 1].hiderVisitTime,
            ]);
            break;
          }
        }

        break;
      case "EastNorth":
        let eastNorthSignArr = [
          [-2, 2],
          [-2, 1],
          [-1, 1],
          [-1, 2],
        ];
        let currentEastNorthVision = eastNorthSignArr.filter((sign) =>
          currentNode.vision.find(
            (item) =>
              item[0] === sign[0] + currentNode.row &&
              item[1] === sign[1] + currentNode.col
          )
        );
        if (isSafe(currentNode.row - 1, currentNode.col + 1, maxRow, maxCol)) {
          let eastNorthHeuristicPoint = getHeuristicPointHider(
            grid[currentNode.row - 1][currentNode.col + 1],
            currentEastNorthVision,
            currentNode,
            grid,
            maxRow,
            maxCol
          );
          var eastNorthEuclidDistance = 0;
          if (
            finderLocation.seen &&
            !grid[currentNode.row - 1][currentNode.col + 1].isWall
          )
            eastNorthEuclidDistance = calculateMinEuclidDistanceForHider(
              grid[currentNode.row - 1][currentNode.col + 1],
              grid[finder.row][finder.col]
            );
          if (eastNorthHeuristicPoint !== null) {
            decisionQueue.push([
              -1,
              1,
              eastNorthHeuristicPoint,
              eastNorthEuclidDistance,
              grid[currentNode.row - 1][currentNode.col + 1].hiderVisitTime,
            ]);
            break;
          }
        }

        break;
      case "North":
        let northSignArr = [
          [-2, 0],
          [-2, -1],
          [-2, 1],
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
          let northHeuristicPoint = getHeuristicPointHider(
            grid[currentNode.row - 1][currentNode.col],
            currentNorthVision,
            currentNode,
            grid,
            maxRow,
            maxCol
          );
          var northEuclidDistance = 0;
          if (
            finderLocation.vision &&
            !grid[currentNode.row - 1][currentNode.col].isWall
          )
            northEuclidDistance = calculateMinEuclidDistanceForHider(
              grid[currentNode.row - 1][currentNode.col],
              grid[finder.row][finder.col]
            );
          if (northHeuristicPoint !== null) {
            decisionQueue.push([
              -1,
              0,
              northHeuristicPoint,
              northEuclidDistance,
              grid[currentNode.row - 1][currentNode.col].hiderVisitTime,
            ]);
            break;
          }
        }

        break;
      case "WestNorth":
        let westNorthSignArr = [
          [-2, -2],
          [-1, -2],
          [-2, -1],
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
          let westNorthHeuristicPoint = getHeuristicPointHider(
            grid[currentNode.row - 1][currentNode.col - 1],
            currentWestNorthVision,
            currentNode,
            grid,
            maxRow,
            maxCol
          );
          var westNorthEuclidDistance = 0;
          if (
            finderLocation.vision &&
            !grid[currentNode.row - 1][currentNode.col - 1].isWall
          )
            westNorthEuclidDistance = calculateMinEuclidDistanceForHider(
              grid[currentNode.row - 1][currentNode.col - 1],
              grid[finder.row][finder.col]
            );
          if (westNorthHeuristicPoint !== null) {
            decisionQueue.push([
              -1,
              -1,
              westNorthHeuristicPoint,
              westNorthEuclidDistance,
              grid[currentNode.row - 1][currentNode.col - 1].hiderVisitTime,
            ]);
            break;
          }
        }
        break;
      case "West":
        let westSignArr = [
          [0, -2],
          [1, -2],
          [-1, -2],
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
          let westHeuristicPoint = getHeuristicPointHider(
            grid[currentNode.row][currentNode.col - 1],
            currentWestVision,
            currentNode,
            grid,
            maxRow,
            maxCol
          );
          var westEuclidDistance = 0;
          if (
            finderLocation.vision &&
            !grid[currentNode.row][currentNode.col - 1].isWall
          )
            westEuclidDistance = calculateMinEuclidDistanceForHider(
              grid[currentNode.row][currentNode.col - 1],
              grid[finder.row][finder.col]
            );
          if (westHeuristicPoint !== null) {
            decisionQueue.push([
              0,
              -1,
              westHeuristicPoint,
              westEuclidDistance,
              grid[currentNode.row][currentNode.col - 1].hiderVisitTime,
            ]);
            break;
          }
        }

        break;
      case "WestSouth":
        let westSouthSignArr = [
          [2, -2],
          [2, -1],
          [1, -2],
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
          let westSouthHeuristicPoint = getHeuristicPointHider(
            grid[currentNode.row + 1][currentNode.col - 1],
            currentWestSouthVision,
            currentNode,
            grid,
            maxRow,
            maxCol
          );
          var westSouthEuclidDistance = 0;
          if (
            finderLocation.vision &&
            !grid[currentNode.row + 1][currentNode.col - 1].isWall
          )
            westSouthEuclidDistance = calculateMinEuclidDistanceForHider(
              grid[currentNode.row + 1][currentNode.col - 1],
              grid[finder.row][finder.col]
            );
          if (westSouthHeuristicPoint !== null) {
            decisionQueue.push([
              1,
              -1,
              westSouthHeuristicPoint,
              westSouthEuclidDistance,
              grid[currentNode.row + 1][currentNode.col - 1].hiderVisitTime,
            ]);
            break;
          }
        }

        break;
      case "South":
        let southSignArr = [
          [2, 0],
          [2, 1],
          [2, -1],
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
          let southHeuristicPoint = getHeuristicPointHider(
            grid[currentNode.row + 1][currentNode.col],
            currentSouthVision,
            currentNode,
            grid,
            maxRow,
            maxCol
          );
          var southEuclidDistance = 0;
          if (
            finderLocation.vision &&
            !grid[currentNode.row + 1][currentNode.col].isWall
          )
            southEuclidDistance = calculateMinEuclidDistanceForHider(
              grid[currentNode.row + 1][currentNode.col],
              grid[finder.row][finder.col]
            );
          if (southHeuristicPoint !== null) {
            decisionQueue.push([
              1,
              0,
              southHeuristicPoint,
              southEuclidDistance,
              grid[currentNode.row + 1][currentNode.col].hiderVisitTime,
            ]);
            break;
          }
        }

        break;
      case "EastSouth":
        let eastSouthSignArr = [
          [2, 2],
          [1, 2],
          [2, 1],
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
          let eastSouthHeuristicPoint = getHeuristicPointHider(
            grid[currentNode.row + 1][currentNode.col + 1],
            currentEastSouthVision,
            currentNode,
            grid,
            maxRow,
            maxCol
          );
          var eastSouthEuclidDistance = 0;
          if (
            finderLocation.vision &&
            !grid[currentNode.row + 1][currentNode.col + 1].isWall
          )
            eastSouthEuclidDistance = calculateMinEuclidDistanceForHider(
              grid[currentNode.row + 1][currentNode.col + 1],
              grid[finder.row][finder.col]
            );
          if (eastSouthHeuristicPoint !== null) {
            decisionQueue.push([
              1,
              1,
              eastSouthHeuristicPoint,
              eastSouthEuclidDistance,
              grid[currentNode.row + 1][currentNode.col + 1].hiderVisitTime,
            ]);
            break;
          }
        }
        break;
      default:
        break;
    }
  });
  // arrange decision queue  in order of priority vision heuristic point, euclid distance, number of visited times respectively
  const sortedDecision = decisionQueue
    .sort((item1, item2) =>
      item1[4] < item2[4] ? 1 : item1[4] > item2[4] ? -1 : 0
    )
    .sort((item1, item2) =>
      item1[2] > item2[2] ? 1 : item1[2] < item2[2] ? -1 : 0
    )
    .sort((item1, item2) =>
      item1[3] > item2[3] ? 1 : item1[3] < item2[3] ? -1 : 0
    );
  //
  // console.log(sortedDecision);
  const finalDecision = sortedDecision[decisionQueue.length - 1];
  // choose the best option after sorted
  return finalDecision;
};

export default getDecisionHider
