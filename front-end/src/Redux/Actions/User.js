import axios from 'axios';
import { BASE_URL } from '../Constants/BASE_URL';
import {
    USER_LOGIN_REQ,
    USER_LOGIN_REQ_SUCCESS,
    USER_LOGIN_REQ_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQ,
    USER_REGISTER_REQ_SUCCESS,
    USER_REGISTER_REQ_FAIL,

    USER_FORGOT_PASSWORD_REQ,
    USER_FORGOT_PASSWORD_REQ_SUCCESS,
    USER_FORGOT_PASSWORD_REQ_FAIL,

    USER_RESET_PASSWORD_REQ,
    USER_RESET_PASSWORD_REQ_SUCCESS,
    USER_RESET_PASSWORD_REQ_FAIL,

    USER_RESET_MESSAGES
} from '../Constants/User';


// Action pour réinitialiser les messages
export const resetMessages = () => (dispatch) => {
    dispatch({
        type: USER_RESET_MESSAGES,
        payload: { error: "", successMessage: "" }
    });
};

// Action pour réinitialiser le mot de passe
export const userForgotPasswordAction = (email) => async (dispatch) => {
    try {


        dispatch({ type: USER_FORGOT_PASSWORD_REQ });

        const config = {
            headers: { 'Content-Type': 'application/json' }
        };

        const {data} = await axios.post(`${BASE_URL}/api/users/password-reset-email`, { email }, config);

        dispatch({
            type: USER_FORGOT_PASSWORD_REQ_SUCCESS,
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: USER_FORGOT_PASSWORD_REQ_FAIL,
            payload: data.message
        });
    }
}

// Action pour réinitialiser le mot de passe
export const userResetPasswordAction = (email, resetString, newPassword) => async (dispatch) => {
    try {
        

        dispatch({ type: USER_RESET_PASSWORD_REQ });

        const config = {
            headers: { 'Content-Type': 'application/json' }
        };

        const {data} = await axios.post(`${BASE_URL}/api/users/reset-password`, { email, resetString, newPassword }, config);

        dispatch({
            type: USER_RESET_PASSWORD_REQ_SUCCESS,
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: USER_RESET_PASSWORD_REQ_FAIL,
            payload: data.message
        });
    }
}


// user login action
export const userLoginAction = (email, password) => async (dispatch) => {
    try {

       

        dispatch({ type: USER_LOGIN_REQ });

        const config = {
            headers: { 'Content-Type': 'application/json' }
        };

        const { data } = await axios.post(`${BASE_URL}/api/users/login`, { email, password }, config);

        if (data.status === "SUCCESS") {
            dispatch({
                type: USER_LOGIN_REQ_SUCCESS,
                payload: data
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
        } else {
            dispatch({
                type: USER_LOGIN_REQ_FAIL,
                payload: data.message
            });
        }
    } catch (error) {
        dispatch({
            type: USER_LOGIN_REQ_FAIL,
            payload: data.message
        });
    }
};

// user logout action
export const userLogoutAction = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
    document.location.href = '/';
}

// register action
export const userRegisterAction = (name, email, password) => async (dispatch) => {
    try {

        

        dispatch({ type: USER_REGISTER_REQ });

        const config = {
            headers: { 'Content-Type': 'application/json' }
        };

        // Envoi des données de l'utilisateur pour l'inscription
        const {data} = await axios.post(`${BASE_URL}/api/users/register`, { name, email, password }, config);

        // Pas de stockage d'informations utilisateur dans le localStorage
        // Envoyer un message de succès pour informer l'utilisateur
        dispatch({
            type: USER_REGISTER_REQ_SUCCESS,
            payload: data.message
        });

    } catch (error) {
        dispatch({
            type: USER_REGISTER_REQ_FAIL,
            payload: data.message
        });
    }
}
