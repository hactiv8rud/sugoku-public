export const setPlayerName = (name) => {
  return (dispatch) => {
    dispatch({
      type: 'home/setName',
      name
    })
  }
}

export const setGameDifficulty = (difficulty) => {
  return (dispatch) => {
    dispatch({
      type: 'home/setDifficulty',
      difficulty
    })
  }
}
