import calculateMinEuclidDistance from "../helper/calculateEuclidDistance";
import isSafe from "./isSafe";
import getHeuristicPoint from "./getHeuristicPoint";
import getFinalDecision from "./getFinalDecision"
// import getSeenNode from './getSeenNode'

const getDecision = (currentNode, grid, maxRow, maxCol, announcedPos) => {
  let decisionQueue = [];
  let directions = {
    East: [
      [0, 2],
      [0, 3],
      [-1, 2],
      [-1, 3],
      [-2, 3],
      [1, 2],
      [1, 3],
      [2, 3],
      [0, 1],
    ],
    EastNorth: [
      [-2, 2],
      [-3, 3],
      [-2, 1],
      [-3, 1],
      [-3, 2],
      [-1, 2],
      [-1, 3],
      [-2, 3],
      [-1, 1],
    ],
    North: [
      [-2, 0],
      [-3, 0],
      [-2, -1],
      [-3, -1],
      [-3, -2],
      [-2, 1],
      [-3, 1],
      [-3, 2],
      [-1, 0],
    ],
    WestNorth: [
      [-2, -2],
      [-3, -3],
      [-1, -2],
      [-1, -3],
      [-2, -3],
      [-2, -1],
      [-3, -1],
      [-3, -2],
      [-1, -1],
    ],
    West: [
      [0, -2],
      [0, -3],
      [1, -2],
      [1, -3],
      [2, -3],
      [-1, -2],
      [-1, -3],
      [-2, -3],
      [0, -1],
    ],
    WestSouth: [
      [2, -2],
      [3, -3],
      [2, -1],
      [3, -1],
      [3, -2],
      [1, -2],
      [1, -3],
      [2, -3],
      [1, -1],
    ],
    South: [
      [2, 0],
      [3, 0],
      [2, 1],
      [3, 1],
      [3, 2],
      [2, -1],
      [3, -1],
      [3, -2],
      [1, 0],
    ],
    EastSouth: [
      [2, 2],
      [3, 3],
      [1, 2],
      [1, 3],
      [2, 3],
      [2, 1],
      [3, 1],
      [3, 2],
      [1, 1],
    ],
  };
  for (let direction in directions) {
    //east vision
    // find intesect part bettween east vision and current node 's vision array
    let currentDirectionVision = directions[direction].filter((sign) =>
      currentNode.vision.find(
        (item) =>
          item[0] === sign[0] + currentNode.row &&
          item[1] === sign[1] + currentNode.col
      )
    );
    // if east step is reachable
    if (isSafe(currentNode.row + directions[direction][8][0], currentNode.col + directions[direction][8][1], maxRow, maxCol)) {
      // calculate euclid distance and heuristic point
      let heuristicPoint = getHeuristicPoint(
        grid[currentNode.row + directions[direction][8][0]][currentNode.col + directions[direction][8][1]],
        currentDirectionVision,
        currentNode,
        grid,
        maxRow,
        maxCol
      );
      let euclidDistance = calculateMinEuclidDistance(
        { row: currentNode.row + directions[direction][8][0], col: currentNode.col + directions[direction][8][1]},
        announcedPos
      );
      // in case heuristic point of next move is null (this happen when east step meet wall or edge of the map)
      if (heuristicPoint !== null) {
        decisionQueue.push([
          directions[direction][8][0],
          directions[direction][8][1],
          heuristicPoint,
          grid[ currentNode.row + directions[direction][8][0]][currentNode.col + directions[direction][8][1]].visitTime,
          euclidDistance,
        ]);
      }
    }
  }
  // arrange decision queue  in order of priority vision heuristic point, euclid distance, number of visited times respectively
  // const finalDecision = decisionQueue
  //   .sort((item1, item2) =>
  //     item1[3] < item2[3] ? 1 : item1[3] > item2[3] ? -1 : 0
  //   )
  //   .sort((item1, item2) =>
  //     item1[4] < item2[4] ? 1 : item1[4] > item2[4] ? -1 : 0
  //   )
  //   .sort((item1, item2) =>
  //     item1[2] > item2[2] ? 1 : item1[2] < item2[2] ? -1 : 0
  //   )

  //   [decisionQueue.length - 1];
    
    
  const finalDecision = getFinalDecision(decisionQueue, [2, 4, 3])
  console.log(finalDecision)

  // choose the best option after sorted
  return finalDecision;
};

export default getDecision;
