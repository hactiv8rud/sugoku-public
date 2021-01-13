const initialState = {
  name: '',
  difficulty: ''
}

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case 'home/setName':
      return { ...state, name: action.name }
    case 'home/setDifficulty':
      return { ...state, difficulty: action.difficulty }
    default:
      return state;
  }
}

export default homeReducer;
