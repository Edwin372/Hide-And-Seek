let stepX = [1,1,0,-1,-1,-1,0,1]
let stepY = [0,1,1,1,0,-1,-1,-1]
export function backTrack(grid, startNode, finishNode) {
  
    var backTrackTour = []
    if (findTarget(grid, startNode, backTrackTour, 0, 2)) {
      console.log(backTrackTour)
      return backTrackTour
    } else {
      return backTrackTour
    }
}

export const isSafe = (row, col) => {
   if (row < 10 && col < 30 && row >= 0 && col >= 0) return true
   return false
}

const getSeenNode = (currentNode, grid, signArr) => {
    let output =[]
    for (let i = 0; i < signArr.length; i++) {
        if (isSafe(currentNode.row + signArr[i][0], currentNode.col + signArr[i][1])) {
            let currentSeenNode = grid[currentNode.row + signArr[i][0]][currentNode.col + signArr[i][1]]
            if (currentSeenNode) {
                output.push(currentSeenNode)
            }
        }
    }
    return output
}

const effectEachMove = (currentNode,grid)  => {
    
    currentNode.isVisited = true
    currentNode.point -=1
    for (let i = 0; i < 8; i++) {
        if (isSafe(currentNode.row + stepY[i], currentNode.col + stepX[i])) {
          const nextNode = grid[currentNode.row + stepY[i]][currentNode.col + stepX[i]];
          nextNode.point -=1
        }
    }
}
const getHeuristicPoint = (nextNode, signArr, currentNode, grid) => {
    if ((nextNode && nextNode.isWall === true) || !nextNode ) {
        return null
    }
    else {
        if (currentNode) {
            let seenNodes = getSeenNode(currentNode, grid, signArr)
            // if (seenNodes.find(node => node.point > 0)) {
            //     seenNodes = seenNodes.filter(node => node.point > 0)
            // }
            let heuristicPoint = seenNodes.reduce((sum, seenNode) => sum + seenNode.point, 0)
            return heuristicPoint
        }
    }
}

const getVision = (currentNode, grid) => {
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
                if (isSafe(currentNode.row, currentNode.col + 1)) {
                    let eastHeuristicPoint = getHeuristicPoint(grid[currentNode.row][currentNode.col + 1], eastSignArr, currentNode, grid)
                    if (eastHeuristicPoint !== null) {
                        decisionQueue.push([0 , 1, eastHeuristicPoint])
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
                if (isSafe(currentNode.row - 1, currentNode.col + 1)) {
                    let eastNorthHeuristicPoint = getHeuristicPoint(grid[currentNode.row - 1][currentNode.col + 1], eastNorthSignArr, currentNode, grid)
                    if (eastNorthHeuristicPoint !== null) {
                        decisionQueue.push([-1, 1, eastNorthHeuristicPoint])
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
                if (isSafe(currentNode.row - 1, currentNode.col )) {
                    let northHeuristicPoint = getHeuristicPoint( grid[currentNode.row - 1][currentNode.col], northSignArr, currentNode, grid)
                    if (northHeuristicPoint !== null) {
                        decisionQueue.push([-1, 0, northHeuristicPoint])
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
                if (isSafe(currentNode.row - 1, currentNode.col - 1)) {
                    let westNorthHeuristicPoint = getHeuristicPoint(grid[currentNode.row - 1][currentNode.col - 1], westNorthSignArr, currentNode, grid)
                    if (westNorthHeuristicPoint !== null) {
                        decisionQueue.push([-1 , -1, westNorthHeuristicPoint])
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
                if (isSafe(currentNode.row, currentNode.col - 1)) {
                    let westHeuristicPoint = getHeuristicPoint(grid[currentNode.row][currentNode.col - 1], westSignArr, currentNode, grid)
                    if (westHeuristicPoint !== null) {
                        decisionQueue.push([0 , -1, westHeuristicPoint])
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
                if (isSafe(currentNode.row + 1, currentNode.col - 1)) {
                    let westSouthHeuristicPoint = getHeuristicPoint(grid[currentNode.row + 1 ][currentNode.col - 1], westSouthSignArr, currentNode, grid)
                    if (westSouthHeuristicPoint !== null) {
                        decisionQueue.push([ 1, -1, westSouthHeuristicPoint])
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
                if (isSafe(currentNode.row + 1, currentNode.col)) {
                    let southHeuristicPoint = getHeuristicPoint(grid[currentNode.row + 1][currentNode.col], southSignArr, currentNode, grid)
                    if (southHeuristicPoint !== null) {
                        decisionQueue.push([1, 0, southHeuristicPoint])
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
                if (isSafe(currentNode.row + 1, currentNode.col + 1)) {
                    let eastSouthHeuristicPoint = getHeuristicPoint(grid[currentNode.row + 1][currentNode.col + 1], eastSouthSignArr, currentNode, grid)
                    if (eastSouthHeuristicPoint !== null) {
                        decisionQueue.push([ 1, 1, eastSouthHeuristicPoint])
                        break
                    }
                }
                break
            default: break
        }
    }
    decisionQueue.filter(item => item[2] >= 0)
    return decisionQueue.sort((item1, item2) => (item1[2] > item2[2]) ? -1 :  ((item1[2] < item2[2])? 1 : 0))
}

const findTarget = (grid, currentNode, backTrackTour, stepCount, remainingHider) => {
    if (remainingHider === 0 ) {
         console.log(remainingHider)
        return backTrackTour
    }
    if (currentNode.isFinish || stepCount  === 30 * 10) {
        remainingHider -= 1
        console.log(remainingHider)
        backTrackTour.push(currentNode)
        currentNode.isVisited = true
        // return backTrackTour
    }
    let decisionQueue = getVision(currentNode, grid).filter(item => item[2] > -10)
    backTrackTour.push(currentNode)
    effectEachMove(currentNode, grid)
    for (let i = 0; i < decisionQueue.length; i++) {
        let nextNodeCol = currentNode.col + decisionQueue[i][1]
        let nextNodeRow = currentNode.row + decisionQueue[i][0]
        if (
            nextNodeRow >= 0 && 
            nextNodeCol >= 0  && 
            nextNodeRow < 10 && 
            nextNodeCol < 30 &&
            grid[nextNodeRow][nextNodeCol].isVisited !== true && 
            grid[nextNodeRow][nextNodeCol].isWall !== true
        ) {
            
            let nextNode = grid[nextNodeRow][nextNodeCol]
            if(findTarget(grid, nextNode, backTrackTour, stepCount + 1, remainingHider)) return backTrackTour
            backTrackTour.push(currentNode)
        }
    }
    // return backTrackTour
}