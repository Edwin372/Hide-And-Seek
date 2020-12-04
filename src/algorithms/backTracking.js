import { visionLogicFinder } from "../helper/visionLogicFinder"
import { visionLogicHider } from "../helper/visionLogicHider"
import calculateMinEuclidDistance from '../helper/calculateEuclidDistance'

let stepX = [1,0,-1,0,1,1,-1,-1]
let stepY = [0,1,0,-1,1,-1,1, 1]
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

const generateHeuristicMap = (grid, maxRow, maxCol) => {
    grid.forEach((row) => {
        row.forEach(currentNode => {
            if (currentNode.isWall) {
                for (let i = 0; i < 4; i++) {
                    if (isSafe(currentNode.row + stepY[i], currentNode.col + stepX[i], maxRow, maxCol) ) {
                        if (!grid[currentNode.row + stepY[i]][currentNode.col + stepX[i]].isWall) {
                            grid[currentNode.row + stepY[i]][currentNode.col + stepX[i]].point += 1
                        }
                    }
                }
            }
        })
    })
}

export const isSafe = (row, col, maxRow, maxCol) => {
   if (row < maxRow && col < maxCol && row >= 0 && col >= 0) return true
   return false
}

const getSeenNode = (currentNode, grid, signArr, maxRow, maxCol) => {
    let output =[]
    for (let i = 0; i < signArr.length; i++) {
        if (isSafe(currentNode.row + signArr[i][0], currentNode.col + signArr[i][1], maxRow, maxCol)) {
            let currentSeenNode = grid[currentNode.row + signArr[i][0]][currentNode.col + signArr[i][1]]
            if (currentSeenNode) {
                output.push(currentSeenNode)
            }
        }
    }
    return output
}

const effectEachMove = (currentNode,grid, maxRow, maxCol)  => {
    currentNode.isVisited = true
    currentNode.point -= 1
    currentNode.visitTime += 2
}

const getHeuristicPoint = (nextNode, signArr, currentNode, grid, maxRow, maxCol) => {
    // console.log(nextNode, currentNode)
    if ((nextNode && nextNode.isWall === true) || !nextNode ) {
        return null
    }
    else {
        if (currentNode) {
            let seenNodes = getSeenNode(currentNode, grid, signArr, maxRow, maxCol)
            let heuristicPoint = seenNodes.reduce((sum, seenNode) => sum + seenNode.point, 0)
            return heuristicPoint
        }
    }
}

const getDecision = (currentNode, grid, maxRow, maxCol, announcedPos) => {
    let decisionQueue = []
    let direction = {
        'East': 0,
        'EastNorth': 0,
        'North': 0,
        'WestNorth': 0,
        'West': 0,
        'WestSouth': 0,
        'South': 0,
        'EastSouth': 0,
    }
    for (let item in direction) {
        switch (item) {
            case 'East': 
                let eastSignArr = [
                    [0,2],
                    [0,3],
                    [-1,2],
                    [-1,3],
                    [-2,3],
                    [1,2],
                    [1,3],
                    [2,3],
                    [0,1]
                ]
                let currentEastVision = eastSignArr.filter(sign => 
                    currentNode.vision.find(item => item[0] === sign[0] + currentNode.row && item[1] === sign[1] + currentNode.col)
                )
                if (isSafe(currentNode.row, currentNode.col + 1, maxRow, maxCol)) {
                    let eastHeuristicPoint = getHeuristicPoint(grid[currentNode.row][currentNode.col + 1], currentEastVision, currentNode, grid, maxRow, maxCol)
                    let eastEuclidDistance = calculateMinEuclidDistance({row: currentNode.row , col: currentNode.col + 1}, announcedPos)

                    if (eastHeuristicPoint !== null) {
                        decisionQueue.push([0 , 1, eastHeuristicPoint, grid[currentNode.row][currentNode.col + 1].visitTime, eastEuclidDistance])
                        break
                    }
                }
                
                break
            case 'EastNorth': 
                let eastNorthSignArr = [
                    [-2,2],
                    [-3,3],
                    [-2,1],
                    [-3,1],
                    [-3,2],
                    [-1,1],
                    [-1,2],
                    [-1,3],
                    [-2,3],
                ]
                let currentEastNorthVision = eastNorthSignArr.filter(sign => 
                    currentNode.vision.find(item => item[0] === sign[0] + currentNode.row && item[1] === sign[1] + currentNode.col)
                )
                if (isSafe(currentNode.row - 1, currentNode.col + 1, maxRow, maxCol)) {
                    let eastNorthHeuristicPoint = getHeuristicPoint(grid[currentNode.row - 1][currentNode.col + 1], currentEastNorthVision, currentNode, grid, maxRow, maxCol)
                    let eastNorthEuclidDistance = calculateMinEuclidDistance({row: currentNode.row - 1, col: currentNode.col + 1}, announcedPos)
                    if (eastNorthHeuristicPoint !== null) {
                        decisionQueue.push([-1, 1, eastNorthHeuristicPoint, grid[currentNode.row - 1][currentNode.col + 1].visitTime,eastNorthEuclidDistance])
                        break
                    }
                }
                
                break
            case 'North': 
                let northSignArr = [
                    [-2,0],
                    [-3,0],
                    [-2,-1],
                    [-3,-1],
                    [-3,-2],
                    [-2,1],
                    [-3,1],
                    [-3,2],
                    [-1,0]
                ]
                let currentNorthVision = northSignArr.filter(sign => 
                    currentNode.vision.find(item => item[0] === sign[0] + currentNode.row && item[1] === sign[1] + currentNode.col)
                )
                if (isSafe(currentNode.row - 1, currentNode.col , maxRow, maxCol)) {
                    let northHeuristicPoint = getHeuristicPoint( grid[currentNode.row - 1][currentNode.col], currentNorthVision, currentNode, grid, maxRow, maxCol)
                    let northEuclidDistance = calculateMinEuclidDistance({row: currentNode.row - 1, col: currentNode.col}, announcedPos)
                    if (northHeuristicPoint !== null) {
                        decisionQueue.push([-1, 0, northHeuristicPoint, grid[currentNode.row - 1][currentNode.col].visitTime, northEuclidDistance])
                        break
                    }
                }

                break
            case 'WestNorth': 
                let westNorthSignArr = [
                    [-2,-2],
                    [-3,-3],
                    [-1,-2],
                    [-1,-3],
                    [-2,-3],
                    [-2,-1],
                    [-3,-1],
                    [-3,-2],
                    [-1,-1]
                ]
                let currentWestNorthVision = westNorthSignArr.filter(sign => 
                    currentNode.vision.find(item => item[0] === sign[0] + currentNode.row && item[1] === sign[1] + currentNode.col)
                )
                if (isSafe(currentNode.row - 1, currentNode.col - 1, maxRow, maxCol)) {
                    let westNorthHeuristicPoint = getHeuristicPoint(grid[currentNode.row - 1][currentNode.col - 1], currentWestNorthVision, currentNode, grid, maxRow, maxCol)
                    let westNorthEuclidDistance = calculateMinEuclidDistance({row: currentNode.row - 1, col: currentNode.col - 1}, announcedPos)
                    if (westNorthHeuristicPoint !== null) {
                        decisionQueue.push([-1 , -1, westNorthHeuristicPoint, grid[currentNode.row - 1][currentNode.col - 1].visitTime, westNorthEuclidDistance])
                        break
                    }
                }
                break
            case 'West': 
                let westSignArr = [
                    [0,-2],
                    [0,-3],
                    [1,-2],
                    [1,-3],
                    [2,-3],
                    [-1,-2],
                    [-1,-3],
                    [-2,-3],
                    [0,-1]
                ]
                let currentWestVision = westSignArr.filter(sign => 
                    currentNode.vision.find(item => item[0] === sign[0] + currentNode.row && item[1] === sign[1] + currentNode.col)
                )
                if (isSafe(currentNode.row, currentNode.col - 1, maxRow, maxCol)) {
                    let westHeuristicPoint = getHeuristicPoint(grid[currentNode.row][currentNode.col - 1], currentWestVision, currentNode, grid, maxRow, maxCol)
                    let westEuclidDistance = calculateMinEuclidDistance({row: currentNode.row, col: currentNode.col - 1}, announcedPos)
                    if (westHeuristicPoint !== null) {
                        decisionQueue.push([0 , -1, westHeuristicPoint, grid[currentNode.row][currentNode.col - 1].visitTime, westEuclidDistance])
                        break
                    }
                }
                
                break
            case 'WestSouth': 
                let westSouthSignArr = [
                    [2,-2],
                    [3,-3],
                    [2,-1],
                    [3,-1],
                    [3,-2],
                    [1,-2],
                    [1,-3],
                    [2,-3],
                    [1,-1]
                ]
                let currentWestSouthVision = westSouthSignArr.filter(sign => 
                    currentNode.vision.find(item => item[0] === sign[0] + currentNode.row && item[1] === sign[1] + currentNode.col)
                )
                if (isSafe(currentNode.row + 1, currentNode.col - 1, maxRow, maxCol)) {
                    let westSouthHeuristicPoint = getHeuristicPoint(grid[currentNode.row + 1 ][currentNode.col - 1], currentWestSouthVision, currentNode, grid, maxRow, maxCol)
                    let westSouthEuclidDistance = calculateMinEuclidDistance({row: currentNode.row + 1, col: currentNode.col - 1}, announcedPos)
                    if (westSouthHeuristicPoint !== null) {
                        decisionQueue.push([ 1, -1, westSouthHeuristicPoint, grid[currentNode.row + 1][currentNode.col - 1].visitTime, westSouthEuclidDistance])
                        break
                    }
                }
                
                break
            case 'South': 
                let southSignArr = [
                    [2,0],
                    [3,0],
                    [2,1],
                    [3,1],
                    [3,2],
                    [2,-1],
                    [3,-1],
                    [3,-2],
                    [1,0]
                ]
                let currentSouthVision = southSignArr.filter(sign => 
                    currentNode.vision.find(item => item[0] === sign[0] + currentNode.row && item[1] === sign[1] + currentNode.col)
                )
                if (isSafe(currentNode.row + 1, currentNode.col, maxRow, maxCol)) {
                    let southHeuristicPoint = getHeuristicPoint(grid[currentNode.row + 1][currentNode.col], currentSouthVision, currentNode, grid, maxRow, maxCol)
                    let southEuclidDistance = calculateMinEuclidDistance({row: currentNode.row + 1, col: currentNode.col}, announcedPos)
                    if (southHeuristicPoint !== null) {
                        decisionQueue.push([1, 0, southHeuristicPoint, grid[currentNode.row + 1][currentNode.col].visitTime, southEuclidDistance])
                        break
                    }
                }
                
                break
            case 'EastSouth': 
                let eastSouthSignArr = [
                    [2,2],
                    [3,3],
                    [1,2],
                    [1,3],
                    [2,3],
                    [2,1],
                    [3,1],
                    [3,2],
                    [1,1]
                ]
                let currentEastSouthVision = eastSouthSignArr.filter(sign => 
                    currentNode.vision.find(item => item[0] === sign[0] + currentNode.row && item[1] === sign[1] + currentNode.col)
                )
                if (isSafe(currentNode.row + 1, currentNode.col + 1, maxRow, maxCol)) {
                    let eastSouthHeuristicPoint = getHeuristicPoint(grid[currentNode.row + 1][currentNode.col + 1], currentEastSouthVision, currentNode, grid, maxRow, maxCol)
                    let eastSouthEuclidDistance = calculateMinEuclidDistance({row: currentNode.row + 1, col: currentNode.col + 1}, announcedPos)
                    if (eastSouthHeuristicPoint !== null) {
                        decisionQueue.push([ 1, 1, eastSouthHeuristicPoint, grid[currentNode.row + 1][currentNode.col + 1].visitTime, eastSouthEuclidDistance])
                        break
                    }
                }
                break
            default: break
        }
    }

    const finalDecision = decisionQueue
    .sort((item1, item2) => (item1[3] < item2[3]) ? 1 : ( item1[3] > item2[3]? -1 : 0))
    .sort((item1, item2) => (item1[4] < item2[4]) ? 1 : ( item1[4] > item2[4]? -1 : 0))
    .sort((item1, item2) => (item1[2] > item2[2]) ? 1 : ( item1[2] < item2[2]? -1 : 0))[decisionQueue.length - 1]
    // console.log(sortedDecision)
    return finalDecision
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

const findTarget = (grid, currentNode, backTrackTour, hidingTours, announcedPosTour,stepCount, remainingHiders, maxRow, maxCol) => {
    let curNode = currentNode
    let announcedPos = []
    while (remainingHiders.length > 0) {
       
        if (stepCount  > 9000) {
            alert('your target can not be found')
            return
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
        backTrackTour.push(curNode)
        curNode = grid[curNode.row + decision[0]][curNode.col + decision[1]]
        hide(remainingHiders, grid, maxRow, maxCol, hidingTours, stepCount, announcedPosTour, announcedPos)
    }
    return backTrackTour
}