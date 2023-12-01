import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const useToken = () => {
    const token = localStorage.getItem("token");
    const [userDetails, setUserDetails] = useState({ token: null, userId: null, city_id: null });

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserDetails({ token, userId: decodedToken.userId, city_id:decodedToken.city_id });
            } catch (error) {
                console.error('Invalid token', error);
                setUserDetails({ token: null, userId: null, city_id: null });
            }
        }
    }, [token]);

    return userDetails;
};

export default useToken;
