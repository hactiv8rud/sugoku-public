const initialState = {
  board: [],
  boardIsLoaded: false,
  boardError: null,
  validatedResult: '',
  validatedIsLoaded: false,
  validatedError: null,
}

function gameReducer(state = initialState, action) {
  switch (action.type) {
    case 'game/setBoard':
      return { ...state, board: action.board }
    case 'game/setBoardIsLoaded':
      return { ...state, boardIsLoaded: action.boardIsLoaded }
    case 'game/setBoardError':
      return { ...state, boardError: action.boardError }
    case 'game/setValidatedResult':
      return { ...state, validatedResult: action.validatedResult}
    case 'game/setValidatedIsLoaded':
      return { ...state, validatedIsLoaded: action.validatedIsLoaded }
    case 'game/setValidatedError':
      return { ...state, validatedError: action.validatedError }
    default:
      return state;
  }
}

export default gameReducer;
