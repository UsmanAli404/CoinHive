import { Link, useNavigate } from 'react-router-dom';
import styles from './signup.module.css';
import logo from '../../assets/logo.svg';

function SignupPage() {
    const navigate = useNavigate();

    const handleRegister = (e)=>{
        navigate('/otpPage');
    }

    return (
        <div className={styles.signupContainer}>
            <img id={styles.logo} src={logo} height={200} alt="" />
            <div className={styles.signupBox}>
                <h2>Sign Up</h2>
                <form>
                    <input type="text" placeholder="Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <input type="password" placeholder="Confirm Password" required />
                    <button onClick={handleRegister} type="submit">Register</button>
                </form>
                <p className={styles.loginText}>
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;
