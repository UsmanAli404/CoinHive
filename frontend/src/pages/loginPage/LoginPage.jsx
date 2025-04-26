import styles from './login.module.css';
import logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { loginUser } from '../../api/functions';
import { useDispatch, useSelector } from 'react-redux';
import { setPassword, setEmail } from '../../slices/loginSlice';
import { showMessage, hideMessage, setMessage } from '../../slices/messageSlice.js';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {email, password} = useSelector(state => state.login);
    const {isMessageVisible, message} = useSelector(state => state.message);

    useEffect(()=> {
        window.scrollTo(0, 0);
        dispatch(setMessage(""));
        dispatch(hideMessage());
    }, []);

    const login = async (e) => {
        e.preventDefault();

        // console.log(email, password);

        try{
            const response = await loginUser({email, password});
            // console.log(response);
            if(response.data.success){
                //navigate to dashboard
                dispatch(setMessage("Login Successful"));
                dispatch(showMessage());
                setTimeout(()=>{
                    navigate('/dashboard');
                }, 1000);
            } else {
                dispatch(setMessage(response.data.message));
                dispatch(showMessage());
            }
        } catch(err){
            console.error(err);
            dispatch(setMessage("An Error occured: Please try again later!"));
            dispatch(showMessage());
        }
    }

    return (
        <div className={styles.loginContainer}>
            <img src={logo} height={200} alt="" />
            <div className={styles.loginBox}>
                <h2>Login</h2>
                <form onSubmit={login}>
                    <input onChange={(e)=>dispatch(setEmail(e.target.value))} onFocus={()=>dispatch(hideMessage())} type="text" placeholder="Email" required />
                    <input onChange={(e)=>dispatch(setPassword(e.target.value))} onFocus={()=>dispatch(hideMessage())} type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
                <p className={styles.signupText}>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage
