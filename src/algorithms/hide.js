import anouncePos from '../helper/annoucePos'
import isSafe from '../helper/isSafe'
import getDecisionHider from '../helper/getDecisionHider'

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
      if (finalDecision) {
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
      } 
    });
  };

  export default hide