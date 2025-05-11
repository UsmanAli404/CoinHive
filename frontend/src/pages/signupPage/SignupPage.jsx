import { Link, useNavigate } from 'react-router-dom';
import styles from './signup.module.css';
import logo from '../../assets/logo.svg';
import { registerUser } from '../../api/functions';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage, hideMessage, setMessage } from '../../slices/messageSlice.js';

function SignupPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isMessageVisible, message} = useSelector(state => state.message);

    const nameRef = useRef("");
    const emailRef = useRef("");
    const passRef = useRef("");
    const confirmPassRef = useRef("");

    useEffect(() => {
        dispatch(setMessage(""));
        dispatch(hideMessage());
    }, []);

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
            dispatch(showMessage());
            return;
        }

        console.log("abc");

        dispatch(setMessage("Please wait while we register you..."));
        dispatch(showMessage());

        try {
            let userData = {name: name, email:email, password:password};
            let response = await registerUser(userData);
            // console.log(response);
            if(response.data.message==="User already exists"){
                dispatch(setMessage("User already exists!"));
                dispatch(showMessage());
                return;
            }
            //data.userId
            navigate('/otpPage', { state: { userId: response.data.userId, email: email, name: name } });
        } catch (err) {
            console.error('Registration failed:', err.response?.data || err.message);
            dispatch(setMessage("An Error Occured: Please try again later"));
            dispatch(showMessage());
        }
    }

    return (
        <div className={styles.signupContainer}>
            <img id={styles.logo} src={logo} height={200} alt="" />
            <div className={styles.signupBox}>
                <h2>Sign Up</h2>
                <form onSubmit={handleRegister}>
                    <input ref={nameRef} onFocus={()=>dispatch(hideMessage())} type="text" placeholder="Name" required />
                    <input ref={emailRef} onFocus={()=>dispatch(hideMessage())} type="email" placeholder="Email" required />
                    <input ref={passRef} onFocus={()=>dispatch(hideMessage())} type="password" placeholder="Password" required />
                    <input ref={confirmPassRef} onFocus={()=>dispatch(hideMessage())} type="password" placeholder="Confirm Password" required />
                    {isMessageVisible && <div className={styles.messageDiv}>{message}</div>}
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