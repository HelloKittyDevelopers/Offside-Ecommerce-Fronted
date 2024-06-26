import { 
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_LOGOUT 
} from '../constants/usersConstants';

const initialState = {
  userInfo: [],
  loading: false,
  error: null,
};

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
      case USER_LOGIN_REQUEST:
          return { ...state, loading: true, error: null };
      case USER_LOGIN_SUCCESS:
          return { ...state, loading: false, userInfo: action.payload };
      case USER_LOGIN_FAIL:
          return { ...state, loading: false, error: action.payload, userInfo: null };
      case USER_LOGIN_LOGOUT:
          return { ...state, userInfo: null, loading: false, error: null };
      default:
          return state;
  }
};
