import logo from '../assets/logo.svg'
import Loading from '../components/loading/Loading';
import './splash.css'

function SplashScreen(){
    return(
        <>
        <div id='bigDiv'>
            <img id='logo' src={logo} width={400} alt="" />
            <div id='loadingDiv'><Loading></Loading></div>
        </div>
        </>
    );
}

export default SplashScreen;