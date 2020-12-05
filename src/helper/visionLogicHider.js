import isSafe from "./isSafe"

export const visionLogicHider = (grid, maxRow, maxCol) => {
    // console.log(grid[0],'tester')
    console.log(maxRow,' ',maxCol)
    grid.forEach((row) => {
        row.forEach(currentNode => {
            // console.log(!currentNode.isWall,currentNode)
            if(!currentNode.isWall){
                currentNode = {
                    ...currentNode,
                    visionHider : []
                }
                checkvisionHider(grid,currentNode,maxRow,maxCol)
            }
        })
    }
    )
}
const checkvisionHider = (grid,node,maxRow,maxCol) => {
    let arrayTemp = []
    checkHorizontal(grid,node,maxRow,maxCol)
    checkVerticle(grid,node,maxRow,maxCol)
    checkDiagonalLeft(grid,node,maxRow,maxCol)
    checkDiagonalRight(grid,node,maxRow,maxCol)
    node.visionHider = Array.from(new Set(node.visionHider));
    for(let i = -2; i<=2; i++)
        for(let j = -2; j<=2; j++)
            if(isSafe(node.row + i,node.col + j,maxRow,maxCol) && !node.visionHider.includes(grid[node.row + i][node.col + j]) && !grid[node.row + i][node.col + j].isWall)
                arrayTemp.push([node.row + i,node.col + j])
    grid[node.row][node.col].visionHider = arrayTemp
    // console.log('got here')
    
    // console.log(node)
}

const checkVerticle = (grid,node,maxRow,maxCol) => {
    for (let i = -1; i<=1; i++){
        
        if(isSafe(node.row + i,node.col,maxRow,maxCol) && grid[node.row + i][node.col].isWall){
            node.visionHider.push(grid[node.row + i][node.col]);
            if(i < 0){  //Check North
                for (let j = -2; j<i; j++){
                    if(isSafe(node.row + j,node.col,maxRow,maxCol))
                        node.visionHider.push(grid[node.row + j][node.col]);//North
                    if(isSafe(node.row+j,node.col+j-i,maxRow,maxCol))
                        node.visionHider.push(grid[node.row+j][node.col+j-i]);//NorthWest
                    if(isSafe(node.row+j,node.col-j+i,maxRow,maxCol))
                        node.visionHider.push(grid[node.row+j][node.col-j+i]);//NorthEast
                }
            }
            if(i > 0){  //Check South
                for (let j = 2; j>i; j--){
                    if(isSafe(node.row+j,node.col,maxRow,maxCol))
                        node.visionHider.push(grid[node.row + j][node.col]);//South
                    if(isSafe(node.row+j,node.col+j-i,maxRow,maxCol))
                        node.visionHider.push(grid[node.row+j][node.col+j-i]);//SouthEast
                    if(isSafe(node.row+j,node.col+j-i,maxRow,maxCol))
                        node.visionHider.push(grid[node.row+j][node.col-j+i]);//SouthWest
                }
            }
            else continue
        }
    }
}

const checkHorizontal = (grid,node,maxRow,maxCol) => {
    for (let i = -1; i<=1; i++){
        if(isSafe(node.row,node.col+i,maxRow,maxCol) && grid[node.row][node.col + i].isWall){
            node.visionHider.push(grid[node.row][node.col+i]);
            if(i < 0){
                for (let j = -2; j<i; j++){
                    if(isSafe(node.row,node.col+j,maxRow,maxCol))
                        node.visionHider.push(grid[node.row][node.col + j]); // West
                    if(isSafe(node.row+j-i,node.col+j,maxRow,maxCol))
                        node.visionHider.push(grid[node.row+j-i][node.col+j]); // NorthWest
                    if(isSafe(node.row-j+i,node.col+j,maxRow,maxCol))
                        node.visionHider.push(grid[node.row-j+i][node.col+j]); // SouthWest
                }
            }
            if(i > 0){
                for (let j = 2; j>i; j--){
                    if(isSafe(node.row,node.col+j,maxRow,maxCol))
                        node.visionHider.push(grid[node.row][node.col + j]); // East
                    if(isSafe(node.row-j+i,node.col+j,maxRow,maxCol))
                        node.visionHider.push(grid[node.row+i-j][node.col+j]); // NorthEast
                    if(isSafe(node.row+j-i,node.col+j,maxRow,maxCol))
                        node.visionHider.push(grid[node.row+j-i][node.col+j]); // SouthEast
                }
            }
            else continue
        }
    }
}

const checkDiagonalRight = (grid,node,maxRow,maxCol) => {
    for(let i=-1;i<=1;++i){
        if (isSafe(node.row-i,node.col+i,maxRow,maxCol) && grid[node.row - i][node.col + i].isWall){
            node.visionHider.push(grid[node.row - i][node.col + i]) // DiagonalRight
            if(i<0){
                for(let j=-2;j<i;j++){
                    if(isSafe(node.row-j,node.col+j,maxRow,maxCol))
                        node.visionHider.push(grid[node.row-j][node.col+ j]) // Check South West 
                    if(isSafe(node.row-i,node.col+j,maxRow,maxCol))
                        node.visionHider.push(grid[node.row-i][node.col+j]) // Check West
                    if(isSafe(node.row-j,node.col+i,maxRow,maxCol))
                        node.visionHider.push(grid[node.row-j][node.col+i]) // Check South
                }
            }
            if(i>0){
                for(let j=2;j>i;j--){
                    if(isSafe(node.row-j,node.col+j,maxRow,maxCol))
                        node.visionHider.push(grid[node.row-j][node.col+j]) // Check North East
                    if(isSafe(node.row-i,node.col+j,maxRow,maxCol))
                        node.visionHider.push(grid[node.row-i][node.col+j]) // Check East
                    if(isSafe(node.row-j,node.col+i,maxRow,maxCol))
                        node.visionHider.push(grid[node.row-j][node.col+i]) // Check North
                }
            }
            else continue
        }
    }
}

const checkDiagonalLeft = (grid,node,maxRow,maxCol) => {
    for(let i=-1;i<=1;++i){
        if (isSafe(node.row + i,node.col + i,maxRow,maxCol) && grid[node.row + i][node.col + i].isWall){
            node.visionHider.push(grid[node.row + i][node.col + i])
            if(i<0){
                for(let j=-2;j<i;j++){
                    if(isSafe(node.row + j,node.col + j,maxRow,maxCol))
                        node.visionHider.push(grid[node.row+j][node.col+j]) // Check North West
                    if(isSafe(node.row + i,node.col + j,maxRow,maxCol))
                        node.visionHider.push(grid[node.row+i][node.col+j]) // Check North
                    if(isSafe(node.row + j,node.col + i,maxRow,maxCol))
                        node.visionHider.push(grid[node.row+j][node.col+i]) // Check West
                }
            }
            if(i>0){
                for(let j=2;j>i;j--){
                    if(isSafe(node.row + j,node.col + j,maxRow,maxCol))
                        node.visionHider.push(grid[node.row+j][node.col+j])
                    if(isSafe(node.row + i,node.col + j,maxRow,maxCol))
                        node.visionHider.push(grid[node.row+i][node.col+j])
                    if(isSafe(node.row + j,node.col + i,maxRow,maxCol))
                        node.visionHider.push(grid[node.row+j][node.col+i])
                }
            }
            else continue
        }
    }
}