import {isSafe} from "../algorithms/backTracking"

export const visionLogic = (grid, maxRow, maxCol) => {
    // console.log(grid[0],'tester')
    console.log(maxRow,' ',maxCol)
    grid.forEach((row) => {
        row.forEach(currentNode => {
            // console.log(!currentNode.isWall,currentNode)
            if(!currentNode.isWall){
                currentNode = {
                    ...currentNode,
                    vision : []
                }
                checkVision(grid,currentNode,maxRow,maxCol)
            }
        })
    }
    )
}
const checkVision = (grid,node,maxRow,maxCol) => {
    let arrayTemp = []
    checkHorizontal(grid,node,maxRow,maxCol)
    checkVerticle(grid,node,maxRow,maxCol)
    checkDiagonalLeft(grid,node,maxRow,maxCol)
    checkDiagonalRight(grid,node,maxRow,maxCol)
    checkHorse(grid,node,maxRow,maxCol)
    node.vision = Array.from(new Set(node.vision));
    for(let i = -3; i<=3; i++)
        for(let j = -3; j<=3; j++)
            if(isSafe(node.row + i,node.col + j,maxRow,maxCol) && !node.vision.includes(grid[node.row + i][node.col + j]))
                arrayTemp.push([node.row + i,node.col + j])
    grid[node.row][node.col].vision = arrayTemp
    // console.log('got here')
    
    // console.log(node)
}

const checkVerticle = (grid,node,maxRow,maxCol) => {
    for (let i = -3; i<=3; i++){
        
        if(isSafe(node.row + i,node.col,maxRow,maxCol) && grid[node.row + i][node.col].isWall){
            node.vision.push(grid[node.row + i][node.col]);
            if(i < 0){  //Check North
                for (let j = -3; j<i; j++){
                    if(isSafe(node.row + j,node.col,maxRow,maxCol))
                        node.vision.push(grid[node.row + j][node.col]);//North
                    if(isSafe(node.row+j,node.col+j-i,maxRow,maxCol) && i>-3)
                        node.vision.push(grid[node.row+j][node.col+j-i]);//NorthWest
                    if(isSafe(node.row+j,node.col-j+i,maxRow,maxCol))
                        node.vision.push(grid[node.row+j][node.col-j+i]);//NorthEast
                }
            }
            if(i > 0){  //Check South
                for (let j = 3; j>i; j--){
                    if(isSafe(node.row+j,node.col,maxRow,maxCol))
                        node.vision.push(grid[node.row + j][node.col]);//South
                    if(isSafe(node.row+j,node.col+j-i,maxRow,maxCol))
                        node.vision.push(grid[node.row+j][node.col+j-i]);//SouthEast
                    if(isSafe(node.row+j,node.col+j-i,maxRow,maxCol))
                        node.vision.push(grid[node.row+j][node.col-j+i]);//SouthWest
                }
            }
            if(i === -1){
                if(isSafe(node.row-3,node.col-1,maxRow,maxCol))
                    node.vision.push(grid[node.row-3][node.col-1]);
                if(isSafe(node.row-3,node.col+1,maxRow,maxCol))
                    node.vision.push(grid[node.row-3][node.col+1]);
            }
            if(i === 1){
                if(isSafe(node.row+3,node.col-1,maxRow,maxCol))
                    node.vision.push(grid[node.row+3][node.col-1]);
                if(isSafe(node.row+3,node.col+1,maxRow,maxCol))
                    node.vision.push(grid[node.row+3][node.col+1]);
            }
            else continue
        }
    }
}

const checkHorizontal = (grid,node,maxRow,maxCol) => {
    for (let i = -3; i<=3; i++){
        if(isSafe(node.row,node.col+i,maxRow,maxCol) && grid[node.row][node.col + i].isWall){
            node.vision.push(grid[node.row][node.col+i]);
            if(i < 0){
                for (let j = -3; j<i; j++){
                    if(isSafe(node.row,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row][node.col + j]); // West
                    if(isSafe(node.row+j-i,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row+j-i][node.col+j]); // NorthWest
                    if(isSafe(node.row-j+i,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row-j+i][node.col+j]); // SouthWest
                }
            }
            if(i > 0){
                for (let j = 3; j>i; j--){
                    if(isSafe(node.row,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row][node.col + j]); // East
                    if(isSafe(node.row-j+i,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row+i-j][node.col+j]); // NorthEast
                    if(isSafe(node.row+j-i,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row+j-i][node.col+j]); // SouthEast
                }
            }
            if(i === -1){
                if(isSafe(node.row+1,node.col-3,maxRow,maxCol))
                    node.vision.push(grid[node.row+1][node.col-3]);
                if(isSafe(node.row-1,node.col-3,maxRow,maxCol))
                    node.vision.push(grid[node.row-1][node.col-3]);
            }
            if(i === 1){
                if(isSafe(node.row+1,node.col+3,maxRow,maxCol))
                    node.vision.push(grid[node.row+1][node.col+3]);
                if(isSafe(node.row-1,node.col+3,maxRow,maxCol))
                    node.vision.push(grid[node.row-1][node.col+3]);
            }
            else continue
        }
    }
}

const checkDiagonalRight = (grid,node,maxRow,maxCol) => {
    for(let i=-3;i<=3;++i){
        if (isSafe(node.row-i,node.col+i,maxRow,maxCol) && grid[node.row - i][node.col + i].isWall){
            node.vision.push(grid[node.row - i][node.col + i]) // DiagonalRight
            if(i<0){
                for(let j=-3;j<i;j++){
                    if(isSafe(node.row-j,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row-j][node.col+ j]) // Check South West 
                    if(isSafe(node.row-i,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row-i][node.col+j]) // Check West
                    if(isSafe(node.row-j,node.col+i,maxRow,maxCol))
                        node.vision.push(grid[node.row-j][node.col+i]) // Check South
                }
            }
            if(i>0){
                for(let j=3;j>i;j--){
                    if(isSafe(node.row-j,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row-j][node.col+j]) // Check North East
                    if(isSafe(node.row-i,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row-i][node.col+j]) // Check East
                    if(isSafe(node.row-j,node.col+i,maxRow,maxCol))
                        node.vision.push(grid[node.row-j][node.col+i]) // Check North
                }
            }
            if (i === 1){
                if(isSafe(node.row-3,node.col+2,maxRow,maxCol))
                    node.vision.push(grid[node.row-3][node.col+2])
                if(isSafe(node.row-2,node.col+3,maxRow,maxCol))
                    node.vision.push(grid[node.row-2][node.col+3])
            }
            if (i === -1){
                if(isSafe(node.row+3,node.col-2,maxRow,maxCol))
                    node.vision.push(grid[node.row+3][node.col-2])
                if(isSafe(node.row+2,node.col-3,maxRow,maxCol))
                    node.vision.push(grid[node.row+2][node.col-3])
            }
            else continue
        }
    }
}

const checkDiagonalLeft = (grid,node,maxRow,maxCol) => {
    for(let i=-3;i<=3;++i){
        if (isSafe(node.row + i,node.col + i,maxRow,maxCol) && grid[node.row + i][node.col + i].isWall){
            node.vision.push(grid[node.row + i][node.col + i])
            if(i<0){
                for(let j=-3;j<i;j++){
                    if(isSafe(node.row + j,node.col + j,maxRow,maxCol))
                        node.vision.push(grid[node.row+j][node.col+j]) // Check North West
                    if(isSafe(node.row + i,node.col + j,maxRow,maxCol))
                        node.vision.push(grid[node.row+i][node.col+j]) // Check North
                    if(isSafe(node.row + j,node.col + i,maxRow,maxCol))
                        node.vision.push(grid[node.row+j][node.col+i]) // Check West
                }
            }
            if(i>0){
                for(let j=3;j>i;j--){
                    if(isSafe(node.row + j,node.col + j,maxRow,maxCol))
                        node.vision.push(grid[node.row+j][node.col+j])
                    if(isSafe(node.row + i,node.col + j,maxRow,maxCol))
                        node.vision.push(grid[node.row+i][node.col+j])
                    if(isSafe(node.row + j,node.col + i,maxRow,maxCol))
                        node.vision.push(grid[node.row+j][node.col+i])
                }
            }
            if (i === 1){
                if(isSafe(node.row + 3,node.col + 2,maxRow,maxCol))
                    node.vision.push(grid[node.row+3][node.col+2])
                if(isSafe(node.row + 2,node.col + 3,maxRow,maxCol))
                    node.vision.push(grid[node.row+2][node.col+3])
            }
            if (i === -1){
                if(isSafe(node.row - 3,node.col - 2,maxRow,maxCol))
                    node.vision.push(grid[node.row-3][node.col-2])
                if(isSafe(node.row - 2,node.col - 3,maxRow,maxCol))
                    node.vision.push(grid[node.row-2][node.col-3])
            }
            else continue
        }
    }
}
const arrX = [-2, -2, +2, +2, -1, -1, +1, +1]
const arrY = [-1, +1, -1, +1, -2, +2, -2, +2]
const checkHorse = (grid,node,maxRow,maxCol) => {
    for(let i=0;i<8; i++){
        if(isSafe(node.row + arrX[i],node.col + arrY[i], maxRow,maxCol) && grid[node.row + arrX[i]][node.col + arrY[i]].isWall){
            node.vision.push(grid[node.row + arrX[i]][node.col + arrY[i]])
            switch(i){
                case 0: {
                    if(isSafe(node.row - 3,node.col - 1,maxRow,maxCol))
                        node.vision.push(grid[node.row-3][node.col-1])
                    if(isSafe(node.row - 3,node.col - 2,maxRow,maxCol))
                        node.vision.push(grid[node.row-3][node.col-2])
                    break
                }
                case 1:{
                    if(isSafe(node.row - 3,node.col + 1,maxRow,maxCol))
                        node.vision.push(grid[node.row-3][node.col+1])
                    if(isSafe(node.row - 3,node.col + 2,maxRow,maxCol))
                        node.vision.push(grid[node.row-3][node.col+2])
                    break
                }
                case 2:{
                    if(isSafe(node.row + 3,node.col - 1,maxRow,maxCol))
                        node.vision.push(grid[node.row+3][node.col-1])
                    if(isSafe(node.row + 3,node.col - 2,maxRow,maxCol))
                        node.vision.push(grid[node.row+3][node.col-2])
                    break
                }
                case 3:{
                    if(isSafe(node.row + 3,node.col + 1,maxRow,maxCol))
                        node.vision.push(grid[node.row+3][node.col+1])
                    if(isSafe(node.row + 3,node.col + 2,maxRow,maxCol))    
                        node.vision.push(grid[node.row+3][node.col+2])
                    break
                }
                case 4:{
                    if(isSafe(node.row - 1,node.col - 3,maxRow,maxCol))
                        node.vision.push(grid[node.row-1][node.col-3])
                    if(isSafe(node.row - 2,node.col - 3,maxRow,maxCol))
                        node.vision.push(grid[node.row-2][node.col-3])
                    break
                }
                case 5:{
                    if(isSafe(node.row - 1,node.col + 3,maxRow,maxCol))
                        node.vision.push(grid[node.row-1][node.col+3])
                    if(isSafe(node.row - 2,node.col + 3,maxRow,maxCol))
                        node.vision.push(grid[node.row-2][node.col+3])
                    break
                }
                case 6:{
                    if(isSafe(node.row + 1,node.col - 3,maxRow,maxCol))
                        node.vision.push(grid[node.row+1][node.col-3])
                    if(isSafe(node.row + 2,node.col - 3,maxRow,maxCol))
                        node.vision.push(grid[node.row+2][node.col-3])
                    break
                }
                case 7:{
                    if(isSafe(node.row + 1,node.col + 3,maxRow,maxCol))
                        node.vision.push(grid[node.row+1][node.col+3])
                    if(isSafe(node.row + 2,node.col + 3,maxRow,maxCol))
                        node.vision.push(grid[node.row+2][node.col+3])
                    break
                }
                default:
                    break
            }
        }
    }
}