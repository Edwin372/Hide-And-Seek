const  calculateMinEuclidDistance = (curNode, hidersAnnouncedPos) => {
    let minDistance = 9999
    hidersAnnouncedPos.forEach((position) => {
        let distance = Math.pow(position.row - curNode.row, 2) + Math.pow(position.col - curNode.col, 2)
        if (minDistance > distance) {
            minDistance = distance
        }

    })
    return minDistance
}

export default calculateMinEuclidDistance