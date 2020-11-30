import { visionLogic } from "../helper/visionLogic"

let stepX = [1,1,0,-1,-1,-1,0,1]
let stepY = [0,1,1,1,0,-1,-1,-1]
export function backTrack(grid, startNode, maxRow, maxCol) {
    var backTrackTour = []
    generateHeuristicMap(grid, maxRow, maxCol)
    visionLogic(grid,maxRow,maxCol)
    console.log(grid)
    // if (findTarget(grid, startNode, backTrackTour, 0, 1,maxRow, maxCol)) {
    //   console.log(backTrackTour)
    //   return backTrackTour
    // } else {
    //   return backTrackTour
    // }
    return backTrackTour
}

const generateHeuristicMap = (grid, maxRow, maxCol) => {
    grid.forEach((row) => {
        row.forEach(currentNode => {
            if (currentNode.isWall) {
                for (let i = 0; i < 4; i++) {
                    if (isSafe(currentNode.row + stepY[i], currentNode.col + stepX[i], maxRow, maxCol) ) {
                        if (!grid[currentNode.row + stepY[i]][currentNode.col + stepX[i]].isWall) {
                            // console.log(currentNode.row, currentNode.col,i)
                            grid[currentNode.row + stepY[i]][currentNode.col + stepX[i]].point += 2
                          
                        }
                        // else {
                        //     grid[currentNode.row + stepY[i]][currentNode.col + stepX[i]].point += 1
                          
                        // }
                       
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
            // console.log(currentSeenNode)
            if (currentSeenNode) {
                output.push(currentSeenNode)
            }
        }
    }
    return output
}

const effectEachMove = (currentNode,grid, maxRow, maxCol)  => {
    // console.log(currentNode)
    currentNode.isVisited = true
    currentNode.point -= 2
    for (let i = 0; i < 8; i++) {
        if (isSafe(currentNode.row + stepY[i], currentNode.col + stepX[i], maxRow, maxCol)) {
          grid[currentNode.row + stepY[i]][currentNode.col + stepX[i]].point -= 2;
        }
    }
}
const getHeuristicPoint = (nextNode, signArr, currentNode, grid, maxRow, maxCol) => {
    // console.log(nextNode, currentNode)
    if ((nextNode && nextNode.isWall === true) || !nextNode ) {
        return null
    }
    else {
        
        if (currentNode) {
            let seenNodes = getSeenNode(currentNode, grid, signArr, maxRow, maxCol)
            // if (seenNodes.find(node => node.point > -20)) {
            //     seenNodes = seenNodes.filter(node => node.point > -5)
            // }
            let heuristicPoint = seenNodes.reduce((sum, seenNode) => sum + seenNode.point, 0)
            // console.log(heuristicPoint)
            return heuristicPoint
        }
    }
}

const getVision = (currentNode, grid, maxRow, maxCol) => {
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
                if (isSafe(currentNode.row, currentNode.col + 1, maxRow, maxCol)) {
                    let eastHeuristicPoint = getHeuristicPoint(grid[currentNode.row][currentNode.col + 1], eastSignArr, currentNode, grid, maxRow, maxCol)
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
                if (isSafe(currentNode.row - 1, currentNode.col + 1, maxRow, maxCol)) {
                    let eastNorthHeuristicPoint = getHeuristicPoint(grid[currentNode.row - 1][currentNode.col + 1], eastNorthSignArr, currentNode, grid, maxRow, maxCol)
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
                if (isSafe(currentNode.row - 1, currentNode.col , maxRow, maxCol)) {
                    let northHeuristicPoint = getHeuristicPoint( grid[currentNode.row - 1][currentNode.col], northSignArr, currentNode, grid, maxRow, maxCol)
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
                if (isSafe(currentNode.row - 1, currentNode.col - 1, maxRow, maxCol)) {
                    let westNorthHeuristicPoint = getHeuristicPoint(grid[currentNode.row - 1][currentNode.col - 1], westNorthSignArr, currentNode, grid, maxRow, maxCol)
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
                if (isSafe(currentNode.row, currentNode.col - 1, maxRow, maxCol)) {
                    let westHeuristicPoint = getHeuristicPoint(grid[currentNode.row][currentNode.col - 1], westSignArr, currentNode, grid, maxRow, maxCol)
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
                if (isSafe(currentNode.row + 1, currentNode.col - 1, maxRow, maxCol)) {
                    let westSouthHeuristicPoint = getHeuristicPoint(grid[currentNode.row + 1 ][currentNode.col - 1], westSouthSignArr, currentNode, grid, maxRow, maxCol)
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
                if (isSafe(currentNode.row + 1, currentNode.col, maxRow, maxCol)) {
                    let southHeuristicPoint = getHeuristicPoint(grid[currentNode.row + 1][currentNode.col], southSignArr, currentNode, grid, maxRow, maxCol)
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
                if (isSafe(currentNode.row + 1, currentNode.col + 1, maxRow, maxCol)) {
                    let eastSouthHeuristicPoint = getHeuristicPoint(grid[currentNode.row + 1][currentNode.col + 1], eastSouthSignArr, currentNode, grid, maxRow, maxCol)
                    if (eastSouthHeuristicPoint !== null) {
                        decisionQueue.push([ 1, 1, eastSouthHeuristicPoint])
                        break
                    }
                }
                break
            default: break
        }
    }
    // debugger
    let output = decisionQueue.sort((item1, item2) => (item1[2] > item2[2]) ? 1 :  ((item1[2] < item2[2])? -1 : 0))[decisionQueue.length - 1];
    console.log(decisionQueue)
    // console.log(output)
    return output
}

const findTarget = (grid, currentNode, backTrackTour, stepCount, remainingHider, maxRow, maxCol) => {
    let curNode = currentNode
    while (remainingHider > 0 || stepCount > maxRow * maxCol) {
        stepCount +=1
         if (remainingHider === 0 ) {
            return backTrackTour
        }
        if (curNode.isFinish || stepCount  === maxRow * maxCol) {
            remainingHider -= 1
            backTrackTour.push(curNode)
            curNode.isVisited = true
            // return backTrackTour
        }
        effectEachMove(curNode, grid, maxRow, maxCol)
        let decision = getVision(curNode, grid, maxRow, maxCol)
        // console.log(decision)
        backTrackTour.push(curNode)
        curNode = grid[curNode.row + decision[0]][curNode.col + decision[1]]
    }
    console.log(grid, 'grid')
    return backTrackTour
}