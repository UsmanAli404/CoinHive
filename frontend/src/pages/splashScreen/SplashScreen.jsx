import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import Loading from '../../components/loading/Loading';
import './splash.css'
import { checkAuth } from '../../api/functions';

//need to check if a user is logged in or not?
//if logged in then, take directly to dashboard page

function SplashScreen(){
    const navigate = useNavigate();
    
    useEffect(()=>{
        const authStatus = isUserAuthenticated();
        let timer;
        if(authStatus){
            timer = setTimeout(()=>{navigate('/dashboard')}, 2000);
        } else {
            timer = setTimeout(()=>{navigate('/login')}, 2000);
        }
        return ()=>clearTimeout(timer);
    }, []);

    const isUserAuthenticated = async () => {
        try{
            const response = await checkAuth();
            return response.success;
        } catch (err) {
            console.error(err);
        }
    };

    return(
        <>
        <div id='bigDiv'>
            <img id='logo' src={logo} width={180} alt="" />
            <div id='loadingDiv'><Loading></Loading></div>
        </div>
        </>
    );
}

export default SplashScreen;