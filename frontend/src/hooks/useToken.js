import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const useToken = () => {
    const token = localStorage.getItem("token");
    const [userDetails, setUserDetails] = useState({ token: null, userId: null });

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserDetails({ token, userId: decodedToken.userId });
            } catch (error) {
                console.error('Invalid token', error);
                setUserDetails({ token: null, userId: null });
            }
        }
    }, [token]);

    return userDetails;
};

export default useToken;
