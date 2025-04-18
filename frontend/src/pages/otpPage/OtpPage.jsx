import React, { useEffect, useRef, useState } from 'react';
import styles from './OtpPage.module.css';
import shield from '../../assets/shield_dark.svg';

function OtpPage() {
    const [otp, setOtp] = useState('');
    const otpInputRef = useRef();

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const verify = (e) => {
        e.preventDefault();
        console.log("OTP submitted:", otp);
        // Backend OTP verification logic would go here
    };

    useEffect(()=>{
        otpInputRef.current.focus();
    }, []);

    return (
        <div className={styles.container}>
            <img className={styles.img} src={shield} width={100} alt="" />
            <div className={styles.otpBox}>
                <h2 className={styles.title}>Email Verification</h2>
                {/* <p>An OTP has been sent to your provided email address.</p> */}
                <div className={styles.inputDiv}>
                    <input
                        ref={otpInputRef}
                        type="number"
                        placeholder="Enter OTP here ..."
                        value={otp}
                        onChange={handleOtpChange}
                        className={styles.input}
                    />
                    <button onClick={verify} className={styles.button}>Verify</button>
                </div>
            </div>
        </div>
    );
}

export default OtpPage;
