const INITIAL_STATE = {
  token: null,
  refresh_token: null,
  type: 'bearer',
  roles: [],
  permissions: [],
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_AUTH':
      return {...state, ...action.auth};
    case 'LOGOUT':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default user;
