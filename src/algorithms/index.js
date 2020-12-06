import { visionLogicFinder } from "../helper/visionLogicFinder";
import { visionLogicHider } from "../helper/visionLogicHider";
import generateHeuristicMap from "../helper/generateHeuristicMap";
import initTour from "../helper/initTour";
import findTarget from "./findTargets";
// import moveObstacle from '../helper/moveObstacle'

export const stepX = [1, 0, -1, 0, 1, 1, -1, -1];
export const stepY = [0, 1, 0, -1, 1, -1, 1, 1];
export function algorithms(grid, startNode, maxRow, maxCol, remainingHiders) {
  var finderTour = [];
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
      finderTour,
      hidingTours,
      noiseTours,
      0,
      remainingHiders,
      maxRow,
      maxCol
    )
  ) {
    console.log(finderTour);
    console.log(hidingTours);
    console.log(noiseTours);
    return { finderTour, hidingTours, noiseTours };
  } else {
    console.log(grid);

    return { finderTour, hidingTours };
  }
}




