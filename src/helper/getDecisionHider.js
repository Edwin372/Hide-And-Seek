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
        (sum, seenNode) => sum + seenNode.point,
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

export const getDecisionHider = (finder, currentNode, grid, maxRow, maxCol) => {
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
          if (finderLocation.seen) {
            var eastEuclidDistance = calculateMinEuclidDistanceForHider(
              grid[currentNode.row][currentNode.col + 1],
              grid[finder.row][finder.col]
            );
          }
          // console.log("got")
          else var eastEuclidDistance = 0;
          // in case heuristic point of next move is null (this happen when east step meet wall or edge of the map)
          if (eastHeuristicPoint !== null) {
            decisionQueue.push([0, 1, eastHeuristicPoint, eastEuclidDistance]);
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
          if (finderLocation.seen)
            var eastNorthEuclidDistance = calculateMinEuclidDistanceForHider(
              grid[currentNode.row - 1][currentNode.col + 1],
              grid[finder.row][finder.col]
            );
          else var eastNorthEuclidDistance = 0;
          if (eastNorthHeuristicPoint !== null) {
            decisionQueue.push([
              -1,
              1,
              eastNorthHeuristicPoint,
              eastNorthEuclidDistance,
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
          if (finderLocation.vision)
            var northEuclidDistance = calculateMinEuclidDistanceForHider(
              grid[currentNode.row - 1][currentNode.col],
              grid[finder.row][finder.col]
            );
          else var northEuclidDistance = 0;
          if (northHeuristicPoint !== null) {
            decisionQueue.push([
              -1,
              0,
              northHeuristicPoint,
              northEuclidDistance,
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
          if (finderLocation.vision)
            var westNorthEuclidDistance = calculateMinEuclidDistanceForHider(
              grid[currentNode.row - 1][currentNode.col - 1],
              grid[finder.row][finder.col]
            );
          else var westNorthEuclidDistance = 0;
          if (westNorthHeuristicPoint !== null) {
            decisionQueue.push([
              -1,
              -1,
              westNorthHeuristicPoint,
              westNorthEuclidDistance,
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
          if (finderLocation.vision)
            var westEuclidDistance = calculateMinEuclidDistanceForHider(
              grid[currentNode.row][currentNode.col - 1],
              grid[finder.row][finder.col]
            );
          else var westEuclidDistance = 0;
          if (westHeuristicPoint !== null) {
            decisionQueue.push([0, -1, westHeuristicPoint, westEuclidDistance]);
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
          if (finderLocation.vision)
            var westSouthEuclidDistance = calculateMinEuclidDistanceForHider(
              grid[currentNode.row + 1][currentNode.col - 1],
              grid[finder.row][finder.col]
            );
          else var westSouthEuclidDistance = 0;
          if (westSouthHeuristicPoint !== null) {
            decisionQueue.push([
              1,
              -1,
              westSouthHeuristicPoint,
              westSouthEuclidDistance,
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
          if (finderLocation.vision)
            var southEuclidDistance = calculateMinEuclidDistanceForHider(
              grid[currentNode.row + 1][currentNode.col],
              grid[finder.row][finder.col]
            );
          else var southEuclidDistance = 0;
          if (southHeuristicPoint !== null) {
            decisionQueue.push([
              1,
              0,
              southHeuristicPoint,
              southEuclidDistance,
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
          if (finderLocation.vision)
            var eastSouthEuclidDistance = calculateMinEuclidDistanceForHider(
              grid[currentNode.row + 1][currentNode.col + 1],
              grid[finder.row][finder.col]
            );
          else var eastSouthEuclidDistance = 0;
          if (eastSouthHeuristicPoint !== null) {
            decisionQueue.push([
              1,
              1,
              eastSouthHeuristicPoint,
              eastSouthEuclidDistance,
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
  const sortedDecision = decisionQueue.sort((item1, item2) =>
    item1[3] > item2[3] ? 1 : item1[3] < item2[3] ? -1 : 0
  );
  // .sort((item1, item2) => (item1[2] < item2[2]) ? 1 : ( item1[2] > item2[2]? -1 : 0))
  console.log(sortedDecision);
  const finalDecision = sortedDecision[decisionQueue.length - 1];
  // choose the best option after sorted
  return finalDecision;
};
