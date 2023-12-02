import { useState, useEffect } from 'react';
import { fetchUserDetails } from '../modules/fetch';
import useToken from './useToken';

const useUserDetails = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { userId } = useToken();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const details = await fetchUserDetails(userId);
                setUserDetails(details);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user details:', err);
                setError(err);
                setLoading(false);
            }
        };

        if (userId) {
            fetchDetails();
        }
    }, [userId]);

    return { userDetails, loading, error };
};

export default useUserDetails;
