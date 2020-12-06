import { visionLogicFinder } from "../helper/visionLogicFinder"
import { visionLogicHider } from "../helper/visionLogicHider"
import getDecision from '../helper/getDecision'
import isSafe from '../helper/isSafe'
import generateHeuristicMap from '../helper/generateHeuristicMap'
// import moveObstacle from '../helper/moveObstacle'


export const stepX = [1,0,-1,0,1,1,-1,-1]
export const stepY = [0,1,0,-1,1,-1,1, 1]
export function backTrack(grid, startNode, maxRow, maxCol, remainingHiders) {
    var backTrackTour = []
    var hidingTours = initTour(remainingHiders)
    var noiseTours = initTour(remainingHiders)
    generateHeuristicMap(grid, maxRow, maxCol)
    visionLogicFinder(grid,maxRow,maxCol)
    visionLogicHider(grid,maxRow,maxCol)
    console.log(grid)
    if (findTarget(grid, startNode, backTrackTour, hidingTours, noiseTours, 0, remainingHiders, maxRow, maxCol)) {
      console.log(backTrackTour)
      console.log(hidingTours)
      console.log(noiseTours)
      return {backTrackTour, hidingTours, noiseTours}
    } else {
      console.log(grid)

      return {backTrackTour, hidingTours}
    }
   
}

const effectEachMove = (currentNode,grid, maxRow, maxCol)  => {
    currentNode.isVisited = true
    currentNode.point -= 1          
    currentNode.visitTime += 1
}





const initTour = (hiders) => {
    let hidingTours = []
    hiders.forEach(() => {
        hidingTours.push([])
    })
    return hidingTours
}

const hide = (hiders, grid, maxRow, maxCol, hidingTours, stepCount, announcedPosTour, announcedPos) => {
    if (stepCount % 5 === 0) {
        announcedPos.splice(0,announcedPos.length)
        hiders.forEach(hider => {
            anouncePos(grid, announcedPosTour, announcedPos, hider, maxRow, maxCol)
        })
    }
    
    hiders.forEach((hider) => {
        let stepIndex = Math.floor(Math.random() * 8) 
        if (
            isSafe(hider.row + stepY[stepIndex], hider.col + stepX[stepIndex], maxRow, maxCol) &&
            !grid[hider.row + stepY[stepIndex]][hider.col + stepX[stepIndex]].isWall &&
            !grid[hider.row + stepY[stepIndex]][hider.col + stepX[stepIndex]].isFinish
        ) {
            grid[hider.row][hider.col].isFinish = false
            grid[hider.row][hider.col].point = 0
            grid[hider.row + stepY[stepIndex]][hider.col + stepX[stepIndex]].point = 1000000
            grid[hider.row + stepY[stepIndex]][hider.col + stepX[stepIndex]].isFinish = true
            hidingTours[hider.index].push(grid[hider.row + stepY[stepIndex]][hider.col + stepX[stepIndex]])
            hider.row  = hider.row + stepY[stepIndex]
            hider.col  = hider.col + stepX[stepIndex]
        }
        else {
            hidingTours[hider.index].push(grid[hider.row][hider.col])
        }
    })
}

const anouncePos = (grid, announcePositions, announcedPos, hider, maxRow, maxCol) => {
    let announcePosX = Math.floor(Math.random() * 6) - 3 
    let announcePosY = Math.floor(Math.random() * 6) - 3 
    while (!isSafe(hider.row + announcePosY, hider.col + announcePosX, maxRow, maxCol) || grid[hider.row + announcePosY][hider.col + announcePosX].isWall) {
        announcePosX = Math.floor(Math.random() * 6) - 3 
        announcePosY = Math.floor(Math.random() * 6) - 3 
    }
    announcePositions[hider.index].push({row: hider.row + announcePosY, col: hider.col + announcePosX})
    announcedPos.push({row: hider.row + announcePosY, col: hider.col + announcePosX})
}

const checkStuck = (obstacleRow, obstacleCol, grid, maxRow, maxCol) => {
    for (let i = 0; i < 8; i++) {
        if (
          !isSafe(obstacleRow + stepY[i], obstacleCol + stepX[i], maxRow, maxCol) || 
          grid[obstacleRow + stepY[i], obstacleCol + stepX[i]].isWall || 
          grid[obstacleRow + stepY[i], obstacleCol + stepX[i]].isObstacle
        ) {
            console.log('stuck')
        }
    }
}

const changeObstaclePosition = (curNode, nextMoveRow, nextMoveCol, grid, maxRow, maxCol) => {
    if (grid[curNode.row + nextMoveRow][curNode.col + nextMoveCol].isObstacle) {
        if (
            isSafe(curNode.row + nextMoveRow * 2, curNode.col + nextMoveCol * 2, maxRow, maxCol)
        ) {
            grid[curNode.row + nextMoveRow ][curNode.col + nextMoveCol].isObstacle = false
            grid[curNode.row + nextMoveRow * 2][curNode.col + nextMoveCol * 2].isObstacle = true
            checkStuck(curNode.row + nextMoveRow * 2, curNode.col + nextMoveCol * 2, grid)
            return grid[curNode.row + nextMoveRow * 2][curNode.col + nextMoveCol * 2]
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
    return null
}

const findTarget = (grid, currentNode, backTrackTour, hidingTours, announcedPosTour,stepCount, remainingHiders, maxRow, maxCol) => {
    let curNode = currentNode
    let announcedPos = []
    while (remainingHiders.length > 0) {
       
        if (stepCount  > 9000) {
            alert('your target can not be found')
            return []
        }
        // console.log('gothere')
        stepCount +=1
         if (remainingHiders.length === 0 ) {
            return backTrackTour
        }
        
        if (curNode.isFinish) {
            const index = remainingHiders.findIndex(item => item.row === curNode.row && item.col === curNode.col);
            curNode.isVisited = true
            curNode.point = 0
            curNode.isFinish = false
            if (index > -1) {
                remainingHiders.splice(index, 1);
            }
        }
        effectEachMove(curNode, grid, maxRow, maxCol)
        let decision = getDecision(curNode, grid, maxRow, maxCol, announcedPos)
        let movedPosition = changeObstaclePosition(curNode, decision[0], decision[1], grid, maxRow, maxCol)
        console.log(movedPosition)
        backTrackTour.push(curNode)
        curNode = grid[curNode.row + decision[0]][curNode.col + decision[1]]
        hide(remainingHiders, grid, maxRow, maxCol, hidingTours, stepCount, announcedPosTour, announcedPos)
    }
    return backTrackTour
}