const INITIAL_STATE = {
  email: null,
  name: null,
  cpf: null,
  date_birth: null,
  phone: null,
  id: null,
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_USER':
      return {...state, ...action.user};
    default:
      return state;
  }
}

export default user;
