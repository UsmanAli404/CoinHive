import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '../../assets/logo.svg';
import Loading from '../../components/loading/Loading';
import './splash.css';
import { checkAuth } from '../../api/functions';
import { setUserId } from '../../slices/userSlice.js';

function SplashScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await checkAuth();
                console.log("Auth Response:", response);

                let timer;
                if (response.data?.success) {
                    dispatch(setUserId(response.data.userId));
                    timer = setTimeout(() => navigate('/dashboard'), 2000);
                } else {
                    timer = setTimeout(() => navigate('/login'), 2000);
                }

                return () => clearTimeout(timer);
            } catch (err) {
                console.error("Error during authentication:", err);
                navigate('/login');
            }
        };

        checkAuthentication();
    }, [navigate]);

    return (
        <div id='bigDiv'>
            <img id='logo' src={logo} width={180} alt="Logo" />
            <div id='loadingDiv'><Loading /></div>
        </div>
    );
}

export default SplashScreen;