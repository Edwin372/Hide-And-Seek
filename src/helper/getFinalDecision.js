function getFinalDecision(decisions, priority) {
    while(decisions.length !== 1) {
        decisions
        .sort((item1, item2) =>
          item1[priority[2]] < item2[priority[2]] ? 1 : item1[priority[2]] > item2[priority[2]] ? -1 : 0
        )
        .sort((item1, item2) =>
          item1[priority[1]] < item2[priority[1]] ? 1 : item1[priority[1]] > item2[priority[2]] ? -1 : 0
        )
        .sort((item1, item2) =>
          item1[priority[0]] > item2[priority[0]] ? 1 : item1[priority[0]] < item2[priority[0]] ? -1 : 0
        ).splice(0,decisions.length/2)
    }
    return decisions[0]
    
}
export default getFinalDecision