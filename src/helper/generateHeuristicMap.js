import {stepX, stepY} from '../algorithms/backTracking'
import isSafe from './isSafe'
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
export default generateHeuristicMap