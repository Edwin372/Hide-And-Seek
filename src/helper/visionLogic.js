import {isSafe} from "../algorithms/backTracking"

export const visionLogic = (grid) =>
{
    // console.log(grid[0],'tester')
    let maxRow = grid.length
    let maxCol = grid[0].length
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
    // console.log('got here')

    // checkHorizontal(grid,node,maxRow,maxCol)
    checkVerticle(grid,node,maxRow,maxCol)
    // checkDiagonalLeft(grid,node,maxRow,maxCol)
    // checkDiagonalRight(grid,node,maxRow,maxCol)
    // checkHorse(grid,node,maxRow,maxCol)
    // console.log(node.vision)
    return node;
}

const checkVerticle = (grid,node,maxRow,maxCol) => {
    for (let i = -2; i<=2; i++){
        
        if(isSafe(node.row + i,node.col,maxRow,maxCol) && grid[node.row + i][node.col].isWall){
             console.log('got here')

            console.log(grid[node.row][node.col])
            console.log(node.vision)
    //         node.vision.push(grid[node.row + i][node.col]);
    //         if(i < 0){
    //             for (let j = -3; j<i; j++){
    //                 if(isSafe(node.row + j,node.col,maxRow,maxCol))
    //                     node.vision.push(grid[node.row + j][node.col]);
    //                 if(isSafe(node.row+j,node.col+j,maxRow,maxCol))
    //                     node.vision.push(grid[node.row+j][node.col+j]);
    //                 if(isSafe(node.row-j,node.col+j,maxRow,maxCol))
    //                     node.vision.push(grid[node.row-j][node.col+j]);
    //             }
    //         }
    //         if(i > 0){
    //             for (let j = 3; j>i; j--){
    //                 if(isSafe(node.row+j,node.col,maxRow,maxCol))
    //                     node.vision.push(grid[node.row + j][node.col]);
    //                 if(isSafe(node.row+j,node.col+j,maxRow,maxCol))
    //                     node.vision.push(grid[node.row+j][node.col+j]);
    //                 if(isSafe(node.row-j,node.col+j,maxRow,maxCol))
    //                     node.vision.push(grid[node.row-j][node.col+j]);
    //             }
    //         }
    //         if(i === -1){
    //             if(isSafe(node.row-3,node.col-1,maxRow,maxCol))
    //                 node.vision.push(grid[node.row-3][node.col-1]);
    //             if(isSafe(node.row-3,node.col+1,maxRow,maxCol))
    //                 node.vision.push(grid[node.row-3][node.col+1]);
    //         }
    //         if(i === 1){
    //             if(isSafe(node.row+3,node.col-1,maxRow,maxCol))
    //                 node.vision.push(grid[node.row+3][node.col-1]);
    //             if(isSafe(node.row+3,node.col+1,maxRow,maxCol))
    //                 node.vision.push(grid[node.row+3][node.col+1]);
    //         }
        }
    }
}

const checkHorizontal = (grid,node,maxRow,maxCol) => {
    for (let i = -2; i<=2; i++){
        if(isSafe(node.row,node.col+i,maxRow,maxCol) && grid[node.row][node.col + i].isWall){
            node.vision.push(grid[node.row][node.col+i]);
            if(i < 0){
                for (let j = -3; j<i; j++){
                    if(isSafe(node.row,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row][node.col + j]);
                    if(isSafe(node.row+j,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row+j][node.col+j]);
                    if(isSafe(node.row+j,node.col-j,maxRow,maxCol))
                        node.vision.push(grid[node.row+j][node.col-j]);
                }
            }
            if(i > 0){
                for (let j = 3; j>i; j--){
                    if(isSafe(node.row,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row][node.col + j]);
                    if(isSafe(node.row+j,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row+j][node.col+j]);
                    if(isSafe(node.row+j,node.col-j,maxRow,maxCol))
                        node.vision.push(grid[node.row+j][node.col-j]);
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
    for(let i=-2;i<=2;++i){
        if (isSafe(node.row-i,node.col+i,maxRow,maxCol) && grid[node.row - i][node.col + i].isWall){
            node.vision.push(grid[node.row - i][node.col + i])
            if(i<0){
                for(let j=-3;j<i;j++){
                    if(isSafe(node.row-j,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row-j][node.col+j])
                    if(isSafe(node.row-i,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row-i][node.col+j])
                    if(isSafe(node.row-j,node.col+i,maxRow,maxCol))
                        node.vision.push(grid[node.row-j][node.col+i])
                }
            }
            if(i>0){
                for(let j=3;j>i;j--){
                    if(isSafe(node.row-j,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row-j][node.col+j])
                    if(isSafe(node.row-i,node.col+j,maxRow,maxCol))
                        node.vision.push(grid[node.row-i][node.col+j])
                    if(isSafe(node.row-j,node.col+i,maxRow,maxCol))
                        node.vision.push(grid[node.row-j][node.col+i])
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
        }
    }
}

const checkDiagonalLeft = (grid,node,maxRow,maxCol) => {
    for(let i=-2;i<=2;++i){
        if (grid[node.row + i][node.col + i] && grid[node.row + i][node.col + i].isWall){
            node.vision.push(grid[node.row + i][node.col + i])
            if(i<0){
                for(let j=-3;j<i;j++){
                    node.vision.push(grid[node.row+j][node.col+j])
                    node.vision.push(grid[node.row+i][node.col+j])
                    node.vision.push(grid[node.row+j][node.col+i])
                }
            }
            if(i>0){
                for(let j=3;j>i;j--){
                    node.vision.push(grid[node.row+j][node.col+j])
                    node.vision.push(grid[node.row+i][node.col+j])
                    node.vision.push(grid[node.row+j][node.col+i])
                }
            }
            if (i === 1){
                node.vision.push(grid[node.row+3][node.col+2])
                node.vision.push(grid[node.row+2][node.col+3])
            }
            if (i === -1){
                node.vision.push(grid[node.row-3][node.col-2])
                node.vision.push(grid[node.row-2][node.col-3])
            }
        }
    }
}
const arrX = [-2, -2, +2, +2, -1, -1, +1, +1]
const arrY = [-1, +1, -1, +1, -2, +2, -2, +2]
const checkHorse = (grid,node,maxRow,maxCol) => {
    for(let i=0;i<8; i++){
        if(grid[node.row + arrX[i]][node.col + arrY[i]].isWall){
            node.vision.push(grid[node.row + arrX[i]][node.col + arrY[i]])
            switch(i){
                case 0: {
                    node.vision.push(grid[node.row-3][node.col-1])
                    node.vision.push(grid[node.row-3][node.col-2])
                    break
                }
                case 1:{
                    node.vision.push(grid[node.row-3][node.col+1])
                    node.vision.push(grid[node.row-3][node.col+2])
                    break
                }
                case 2:{
                    node.vision.push(grid[node.row+3][node.col-1])
                    node.vision.push(grid[node.row+3][node.col-2])
                    break
                }
                case 3:{
                    node.vision.push(grid[node.row+3][node.col+1])
                    node.vision.push(grid[node.row+3][node.col+2])
                    break
                }
                case 4:{
                    node.vision.push(grid[node.row-1][node.col-3])
                    node.vision.push(grid[node.row-2][node.col-3])
                    break
                }
                case 5:{
                    node.vision.push(grid[node.row-1][node.col+3])
                    node.vision.push(grid[node.row-2][node.col+3])
                    break
                }
                case 6:{
                    node.vision.push(grid[node.row+1][node.col-3])
                    node.vision.push(grid[node.row+2][node.col-3])
                    break
                }
                case 7:{
                    node.vision.push(grid[node.row+1][node.col+3])
                    node.vision.push(grid[node.row+2][node.col+3])
                    break
                }
                default:
                    break
            }
        }
    }
}