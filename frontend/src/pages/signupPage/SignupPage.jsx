import { Link, useNavigate } from 'react-router-dom';
import styles from './signup.module.css';
import logo from '../../assets/logo.svg';
import { registerUser, sendVerifyOtp } from '../../api/functions';
import { useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {showDiv, hideDiv, setMessage, clearMessage} from '../../slices/signupSlice';

function SignupPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {showMessage, message} = useSelector(state => state.signup);

    const nameRef = useRef("");
    const emailRef = useRef("");
    const passRef = useRef("");
    const confirmPassRef = useRef("");

    const handleRegister = async (e)=>{
        // alert("An otp has been sent to your email.");
        e.preventDefault();

        let name = nameRef.current.value;
        let email = emailRef.current.value;
        let password = passRef.current.value;
        let confirmPassword = confirmPassRef.current.value;

        if(!name || !email || !password || !confirmPassword){
            return;
        }

        if(password !== confirmPassword){
            dispatch(setMessage("Passwords don't match!"));
            dispatch(showDiv());
            return;
        }

        console.log("abc");

        dispatch(setMessage("Please wait while we register you..."));
        dispatch(showDiv());

        try {
            let userData = {name: name, email:email, password:password};
            const data = await registerUser(userData);
            // console.log('Registration successful:', data);
            data = await sendVerifyOtp();
            navigate('/otpPage');
        } catch (err) {
            console.error('Registration failed:', err.response?.data || err.message);
            dispatch(setMessage("An Error Occured: Please try again later"));
            dispatch(showDiv());
        }
    }

    return (
        <div className={styles.signupContainer}>
            <img id={styles.logo} src={logo} height={200} alt="" />
            <div className={styles.signupBox}>
                <h2>Sign Up</h2>
                <form onSubmit={handleRegister}>
                    <input ref={nameRef} type="text" placeholder="Name" required />
                    <input ref={emailRef} type="email" placeholder="Email" required />
                    <input ref={passRef} type="password" placeholder="Password" required />
                    <input ref={confirmPassRef} type="password" placeholder="Confirm Password" required />
                    {showMessage && <div className={styles.messageDiv}>{message}</div>}
                    <button type="submit">Register</button>
                </form>
                <p className={styles.loginText}>
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;
