import isSafe from './isSafe'
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

export default getSeenNode