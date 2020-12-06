import isSafe from './isSafe'
const anouncePos = (
    grid,
    announcePositions,
    announcedPos,
    hider,
    maxRow,
    maxCol
  ) => {
    let announcePosX = Math.floor(Math.random() * 6) - 3;
    let announcePosY = Math.floor(Math.random() * 6) - 3;
    while (
      !isSafe(
        hider.row + announcePosY,
        hider.col + announcePosX,
        maxRow,
        maxCol
      ) ||
      grid[hider.row + announcePosY][hider.col + announcePosX].isWall
    ) {
      announcePosX = Math.floor(Math.random() * 6) - 3;
      announcePosY = Math.floor(Math.random() * 6) - 3;
    }
    announcePositions[hider.index].push({
      row: hider.row + announcePosY,
      col: hider.col + announcePosX,
    });
    announcedPos.push({
      row: hider.row + announcePosY,
      col: hider.col + announcePosX,
    });
  };

  export default anouncePos