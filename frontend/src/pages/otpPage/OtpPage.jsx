import { useEffect, useRef } from 'react';
import styles from './OtpPage.module.css';
import shield from '../../assets/shield_dark.svg';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOtp, setTimer, setTimerString } from '../../slices/otpSlice';
import { verifyAccount, sendVerificationOtp, getUserDataByEmailWithoutAuth } from '../../api/functions';
import { showMessage, hideMessage, setMessage} from '../../slices/messageSlice.js';
import { useNavigate } from 'react-router-dom';

function OtpPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {otp, timer, timerString} = useSelector(state => state.otp);
    const {isMessageVisible, message} = useSelector(state => state.message);
    const otpInputRef = useRef();
    const location = useLocation();
    const userId = location.state?.userId;
    const email = location.state?.email;
    const name = location.state?.name;

    const handleOtpChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            dispatch(setOtp(value));
        }
    };

    const verify = async (e) => {
        e.preventDefault();

        dispatch(setMessage("Please wait..."));
        dispatch(showMessage());

        // console.log("userId:", userId);
        // console.log("OTP submitted:", otp);

        if(!otp){
            dispatch(setMessage("OTP is missing!"));
            dispatch(showMessage());
            return;
        }

        try{
            const response = await verifyAccount({userId: userId, otp: otp});
            // console.log(response);

            if(response.data.success){
                dispatch(setMessage("Successfully Verified!"));
                dispatch(showMessage());
                setTimeout(()=>{
                    dispatch(setMessage("Redirecting to Login Page..."));

                    setTimeout(()=>{
                        navigate('/login');
                    }, 1000);
                }, 1000);
            } else {
                dispatch(setMessage(response.data.message));
                dispatch(showMessage());
            }
        } catch(err){
            console.error(err);
            dispatch(setMessage("An Error Occured: please try again later!"));
            dispatch(showMessage());
        }
    };

    const resendOtp = async (e) => {
        try{
            console.log(email, name);
            const response = await sendVerificationOtp({email, name});
            await fetchOTPExpiryData();
            console.log(response);
            if(response.data.success){
                dispatch(setMessage("OTP resent successfully"));
                dispatch(showMessage());
            } else {
                dispatch(setMessage(response.data.message));
                dispatch(showMessage());
            }
        } catch(err){
            dispatch(setMessage(err.message));
            dispatch(showMessage());
        }
    }

    const fetchOTPExpiryData = async ()=>{
        try{
            console.log(email);
            const response = await getUserDataByEmailWithoutAuth({email});
            if(response.data.success){
                dispatch(setTimer(response.data.userData.verifyOTPExpiryAt));
                console.log(response.data.userData.verifyOTPExpiryAt);
            } else {
                dispatch(setMessage(response.data.message));
                dispatch(showMessage());
            }
        } catch(err){
            console.error(err);
            dispatch(setMessage(err.message));
            dispatch(showMessage());
        }
    }

    useEffect(()=>{
        if (!userId || !email || !name) {
            dispatch(setMessage(""));
            dispatch(showMessage());
            navigate('/signup');
            return;
        }

        otpInputRef.current.focus();
        dispatch(setMessage("Otp has been sent to the provided email"));
        dispatch(hideMessage());

        const init = async () => {
            await fetchOTPExpiryData();
        };

        init();
    }, []);

    useEffect(()=>{
        if (!timer) return;

        const interval = setInterval(() => {
            const secondsLeft = Math.floor((timer - Date.now()) / 1000);

            if (secondsLeft <= 0) {
                clearInterval(interval);
                dispatch(setTimerString("OTP expired!"));
            } else {
                const minutes = Math.floor(secondsLeft / 60);
                const seconds = secondsLeft % 60;
                dispatch(setTimerString(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    return (
        <div className={styles.container}>
            <img className={styles.img} src={shield} width={100} alt="" />
            <div className={styles.otpBox}>
                <h2 className={styles.title}>Email Verification</h2>
                <div className={styles.inputDiv}>
                    <input
                        ref={otpInputRef}
                        onFocus={()=>dispatch(hideMessage())}
                        type="number"
                        placeholder="Enter OTP here ..."
                        onChange={handleOtpChange}
                        className={styles.input}
                    />
                    <button onClick={verify} className={styles.button1}>Verify</button>
                    <button onClick={resendOtp} className={styles.button2}>Resend Otp</button>
                </div>
                {isMessageVisible && <div className={styles.messageDiv}>{message}</div>}
                <p className={styles.timer}>OTP expiry in: {timerString}</p>
            </div>
        </div>
    );
}

export default OtpPage;