
 
const isSafe = (row, col, maxRow, maxCol) => {
    if (row < maxRow && col < maxCol && row >= 0 && col >= 0) return true
    return false
 }

 export default isSafe