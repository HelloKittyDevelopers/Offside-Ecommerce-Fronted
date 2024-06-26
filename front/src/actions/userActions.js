import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_LOGOUT
} from '../constants/usersConstants';
import UserService from '../service/UserService';

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });

        const data = await UserService.login(username, password);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGIN_LOGOUT });
};
