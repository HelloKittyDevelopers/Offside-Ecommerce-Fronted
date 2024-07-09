import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
    const clientId = 'YOUR_GOOGLE_CLIENT_ID';

    const handleSuccess = async (response) => {
        try {
            const result = await axios.post('/auth/google/', {
                access_token: response.tokenId,
            });
            console.log(result.data); // Maneja el token y los datos del usuario
            onSuccess(result.data);
        } catch (error) {
            console.error(error);
            onFailure(error);
        }
    };

    const handleFailure = (response) => {
        console.error(response);
        onFailure(response);
    };

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Login with Google"
            onSuccess={handleSuccess}
            onFailure={handleFailure}s
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleLoginButton;
