import React, { useState } from 'react';
import styles from './OtpPage.module.css';

function OtpPage() {
    const [otp, setOtp] = useState('');

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("OTP submitted:", otp);
        // Backend OTP verification logic would go here
    };

    return (
        <div className={styles.container}>
            <h2>Email Verification</h2>
            <p>An OTP has been sent to your provided email address.</p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Verify</button>
            </form>
        </div>
    );
}

export default OtpPage;
