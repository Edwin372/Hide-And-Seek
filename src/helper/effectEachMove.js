const effectEachMove = (currentNode, grid, maxRow, maxCol) => {
    currentNode.isVisited = true;
    currentNode.point -= 1;
    currentNode.visitTime += 1;
};

export default effectEachMove