import handleResponse from '../../helpers/handleResponse';
import encodeParams from '../../helpers/encodeParams';

export const fetchBoard = (difficulty) => {
  return (dispatch) => {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
      .then(handleResponse)
      .then((response) => {
        dispatch({
          type: "game/setBoard",
          board: response.board
        })
      })
      .catch((error) => {
        dispatch({
          type: "game/setBoardError",
          boardError: error
        })
      })
      .finally(_ => {
        dispatch({
          type: "game/setBoardIsLoaded",
          boardIsLoaded: true
        })
      })
  }
}

export const validate = (data) => {
  return (dispatch) => {
    fetch("https://sugoku.herokuapp.com/validate", {
      method: "POST",
      body: encodeParams(data),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then(handleResponse)
      .then((response) => {
        dispatch({
          type: "game/setValidatedResult",
          validatedResult: response.status
        })
      })
      .catch((error) => {
        dispatch({
          type: "game/setValidatedError",
          validatedError: error
        })
      })
      .finally(_ => {
        dispatch({
          type: "game/setValidatedIsLoaded",
          validatedIsLoaded: true
        })
      })
  }
}

export const solve = (data) => {
  return (dispatch) => {
    fetch("https://sugoku.herokuapp.com/solve", {
    method: "POST",
    body: encodeParams(data),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
      .then(handleResponse)
      .then((response) => {
        dispatch({
          type: "game/setBoard",
          board: response.solution
        })
      })
      .catch((error) => {
        dispatch({
          type: "game/setBoardError",
          boardError: error
        })
      })
      .finally(_ => {
        dispatch({
          type: "game/setBoardIsLoaded",
          boardIsLoaded: true
        })
      })
  }
}

export const resetGame = () => {
  return (dispatch) => {
    dispatch({
      type: "game/setBoard",
      board: []
    })
    dispatch({
      type: "game/setBoardIsLoaded",
      boardIsLoaded: false
    })
    dispatch({
      type: "game/setBoardError",
      boardError: null
    })
    dispatch({
      type: "game/setValidatedResult",
      validatedResult: ''
    })
    dispatch({
      type: "game/setValidatedIsLoaded",
      validatedIsLoaded: false
    })
    dispatch({
      type: "game/setValidatedError",
      validatedError: null
    })
  }
}


