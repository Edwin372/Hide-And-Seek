import hide from './hide'
import effectEachMove from '../helper/effectEachMove'
import getDecision from '../helper/getDecision'
const findTarget = (
    grid,
    currentNode,
    finderTour,
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
        alert("Can not find all hiders with this map @@");
        window.location.reload()
        return [];
      }
      // console.log('gothere')
      stepCount += 1;
      if (remainingHiders.length === 0) {
        return finderTour;
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
      // let movedPosition = changeObstaclePosition(
      //   curNode,
      //   decision[0],
      //   decision[1],
      //   grid,
      //   maxRow,
      //   maxCol
      // );
      // console.log(movedPosition)
      finderTour.push(curNode);
      // curNode.isFinder = false
      if (decision) {
        curNode = grid[curNode.row + decision[0]][curNode.col + decision[1]];
      }
      else {
        alert("Your seeker is imprisoned :v , please draw the map again!")
        window.location.reload()
  
        return []
        
  
      }
      // curNode.isFinder = true
    }
    return finderTour;
  };

  export default findTarget