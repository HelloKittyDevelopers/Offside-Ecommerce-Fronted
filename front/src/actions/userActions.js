import { USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_LOGOUT } from '../constants/usersConstants'

import axios from 'axios';


    export const login = (username, password) => async(dispatch) => {
        try{
            dispatch({
                type: USER_LOGIN_REQUEST

            })

            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }

            const {data} = await axios.post('/users/login'
                {'username':username,'password': password
                }
            )

            dispatch({
                type:USER_LOGIN_SUCCESS,
                payload: data
            })

            localStorage.setItem('userInfo', JSON.stringify(data))

        } catch (error) {
            dispatch({
              type: USER_LOGIN_FAIL,
              payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
          }
    }