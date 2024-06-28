import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGIN_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

} from '../constants/usersConstants';
import axios from 'axios';

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers : { 
                'Content-type' : 'application/json'
            }
        }

        const { data } = await axios.post(
            'http://127.0.0.1:8000/users/login/', 
            {'username': username, 'password' : password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        // Puedes guardar el token en el localStorage si es necesario
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGIN_LOGOUT });
};


export const register = (first_name, last_name, email, username, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'http://127.0.0.1:8000/users/register/',
            { first_name, last_name, email, username, password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
        
        // Dispatch login action after successful registration
        dispatch(login(username, password));

        localStorage.setItem('userInfo', JSON.stringify(data));

        dispatch(login(username, password));

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};