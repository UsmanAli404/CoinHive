import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import Loading from '../../components/loading/Loading';
import './splash.css';
import { checkAuth } from '../../api/functions';

function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await checkAuth();
                console.log("Auth Response:", response);

                let timer;
                if (response.data?.success) {
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