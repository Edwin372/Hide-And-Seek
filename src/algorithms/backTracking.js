import { visionLogicFinder } from "../helper/visionLogicFinder";
import { visionLogicHider } from "../helper/visionLogicHider";
import getDecision from "../helper/getDecision";
import isSafe from "../helper/isSafe";
import generateHeuristicMap from "../helper/generateHeuristicMap";
import { getDecisionHider } from "../helper/getDecisionHider";
// import moveObstacle from '../helper/moveObstacle'

export const stepX = [1, 0, -1, 0, 1, 1, -1, -1];
export const stepY = [0, 1, 0, -1, 1, -1, 1, 1];
export function backTrack(grid, startNode, maxRow, maxCol, remainingHiders) {
  var backTrackTour = [];
  var hidingTours = initTour(remainingHiders);
  var noiseTours = initTour(remainingHiders);
  generateHeuristicMap(grid, maxRow, maxCol);
  visionLogicFinder(grid, maxRow, maxCol);
  visionLogicHider(grid, maxRow, maxCol);
  // console.log(grid)
  if (
    findTarget(
      grid,
      startNode,
      backTrackTour,
      hidingTours,
      noiseTours,
      0,
      remainingHiders,
      maxRow,
      maxCol
    )
  ) {
    console.log(backTrackTour);
    console.log(hidingTours);
    console.log(noiseTours);
    return { backTrackTour, hidingTours, noiseTours };
  } else {
    console.log(grid);

    return { backTrackTour, hidingTours };
  }
}

const effectEachMove = (currentNode, grid, maxRow, maxCol) => {
  currentNode.isVisited = true;
  currentNode.point -= 1;
  currentNode.visitTime += 1;
};

const initTour = (hiders) => {
  let hidingTours = [];
  hiders.forEach(() => {
    hidingTours.push([]);
  });
  return hidingTours;
};

const hide = (
  finder,
  hiders,
  grid,
  maxRow,
  maxCol,
  hidingTours,
  stepCount,
  announcedPosTour,
  announcedPos
) => {
  if (stepCount % 5 === 0) {
    announcedPos.splice(0, announcedPos.length);
    hiders.forEach((hider) => {
      anouncePos(grid, announcedPosTour, announcedPos, hider, maxRow, maxCol);
    });
  }

  hiders.forEach((hider) => {
    let finalDecision = getDecisionHider(
      finder,
      grid[hider.row][hider.col],
      grid,
      maxRow,
      maxCol
    );
    if (
      isSafe(
        hider.row + finalDecision[0],
        hider.col + finalDecision[1],
        maxRow,
        maxCol
      ) &&
      !grid[hider.row + finalDecision[0]][hider.col + finalDecision[1]]
        .isWall &&
      !grid[hider.row + finalDecision[0]][hider.col + finalDecision[1]].isFinish
    ) {
      // set old pos to path
      grid[hider.row][hider.col].isFinish = false;
      grid[hider.row][hider.col].point = 0;
      //set new pos to finish
      hider.row = hider.row + finalDecision[0]; // set new row pos
      hider.col = hider.col + finalDecision[1]; // set new col pos
      grid[hider.row][hider.col].point = 1000000; // set new point to 100000 for finder
      grid[hider.row][hider.col].isFinish = true; // set new pos to hider pos
      grid[hider.row][hider.col].hiderVisitTime += 1; // for visit time
      // Push to hiding tour
      hidingTours[hider.index].push(grid[hider.row][hider.col]);
    } else {
      hidingTours[hider.index].push(grid[hider.row][hider.col]);
    }
  });
};

const anouncePos = (
  grid,
  announcePositions,
  announcedPos,
  hider,
  maxRow,
  maxCol
) => {
  let announcePosX = Math.floor(Math.random() * 6) - 3;
  let announcePosY = Math.floor(Math.random() * 6) - 3;
  while (
    !isSafe(
      hider.row + announcePosY,
      hider.col + announcePosX,
      maxRow,
      maxCol
    ) ||
    grid[hider.row + announcePosY][hider.col + announcePosX].isWall
  ) {
    announcePosX = Math.floor(Math.random() * 6) - 3;
    announcePosY = Math.floor(Math.random() * 6) - 3;
  }
  announcePositions[hider.index].push({
    row: hider.row + announcePosY,
    col: hider.col + announcePosX,
  });
  announcedPos.push({
    row: hider.row + announcePosY,
    col: hider.col + announcePosX,
  });
};

const checkStuck = (obstacleRow, obstacleCol, grid, maxRow, maxCol) => {
  for (let i = 0; i < 8; i++) {
    if (
      !isSafe(obstacleRow + stepY[i], obstacleCol + stepX[i], maxRow, maxCol) ||
      grid[(obstacleRow + stepY[i], obstacleCol + stepX[i])].isWall ||
      grid[(obstacleRow + stepY[i], obstacleCol + stepX[i])].isObstacle
    ) {
      console.log("stuck");
    }
  }
};

const changeObstaclePosition = (
  curNode,
  nextMoveRow,
  nextMoveCol,
  grid,
  maxRow,
  maxCol
) => {
  if (grid[curNode.row + nextMoveRow][curNode.col + nextMoveCol].isObstacle) {
    if (
      isSafe(
        curNode.row + nextMoveRow * 2,
        curNode.col + nextMoveCol * 2,
        maxRow,
        maxCol
      )
    ) {
      grid[curNode.row + nextMoveRow][
        curNode.col + nextMoveCol
      ].isObstacle = false;
      grid[curNode.row + nextMoveRow * 2][
        curNode.col + nextMoveCol * 2
      ].isObstacle = true;
      checkStuck(
        curNode.row + nextMoveRow * 2,
        curNode.col + nextMoveCol * 2,
        grid
      );
      return grid[curNode.row + nextMoveRow * 2][curNode.col + nextMoveCol * 2];
    }
    // moveObstacle(grid, nextMoveRow, nextMoveCol)
    // switch(nextMoveRow + '|' + nextMoveCol){
    // case '0|1':
    //     moveObstacle(grid, nextMoveRow, nextMoveCol)
    //     console.log('east')
    //     break;
    // case '0|-1':
    //     moveObstacle(grid)
    //     console.log('west')
    //     break;
    // case '1|0':
    //     moveObstacle(grid)
    //     console.log('south')
    //     break;
    // case '-1|0':
    //     moveObstacle(grid)
    //     console.log('north')
    //     break;
    // case '1|1':
    //     moveObstacle(grid)
    //     console.log('southEast')
    //     break;
    // case '-1|1':
    //     moveObstacle(grid)
    //     console.log('northEast')
    //     break;
    // case '1|-1':
    //     moveObstacle(grid)
    //     console.log('southWest')
    //     break;
    // case '-1|-1':
    //     moveObstacle(grid)
    //     console.log('northWest')
    //     break;
    // default:
    //     break;
    // }
  }
  return null;
};

const findTarget = (
  grid,
  currentNode,
  backTrackTour,
  hidingTours,
  announcedPosTour,
  stepCount,
  remainingHiders,
  maxRow,
  maxCol
) => {
  let curNode = currentNode;
  let announcedPos = [];
  while (remainingHiders.length > 0) {
    if (stepCount > 10000) {
      alert("your target can not be found");
      window.location.reload()
      return [];
    }
    // console.log('gothere')
    stepCount += 1;
    if (remainingHiders.length === 0) {
      return backTrackTour;
    }
    for (let i = 0; i < 8; i++)
      if (curNode.isFinish) {
        const index = remainingHiders.findIndex(
          (item) => item.row === curNode.row && item.col === curNode.col
        );
        curNode.isVisited = true;
        curNode.point = 0;
        curNode.isFinish = false;
        if (index > -1) {
          remainingHiders.splice(index, 1);
        }
      }
    hide(
      curNode,
      remainingHiders,
      grid,
      maxRow,
      maxCol,
      hidingTours,
      stepCount,
      announcedPosTour,
      announcedPos
    );
    effectEachMove(curNode, grid, maxRow, maxCol);
    let decision = getDecision(curNode, grid, maxRow, maxCol, announcedPos);
    let movedPosition = changeObstaclePosition(
      curNode,
      decision[0],
      decision[1],
      grid,
      maxRow,
      maxCol
    );
    // console.log(movedPosition)
    backTrackTour.push(curNode);
    // curNode.isFinder = false
    curNode = grid[curNode.row + decision[0]][curNode.col + decision[1]];
    // curNode.isFinder = true
  }
  return backTrackTour;
};
