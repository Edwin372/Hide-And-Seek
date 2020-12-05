import getSeenNode from './getSeenNode'
const getHeuristicPoint = (nextNode, signArr, currentNode, grid, maxRow, maxCol) => {
    // console.log(nextNode, currentNode)
    if ((nextNode && (nextNode.isWall || nextNode.isStuck)) || !nextNode ) {
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

export default  getHeuristicPoint