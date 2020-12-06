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

export const  calculateMinEuclidDistanceForHider = (curNode, finderLocation) => {
    let distance = Math.pow(finderLocation.row - curNode.row, 2) + Math.pow(finderLocation.col - curNode.col, 2)
    // console.log(distance)
    console.log(distance)
    return distance
}


export default calculateMinEuclidDistance