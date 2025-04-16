import styles from './login.module.css';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage() {

    useEffect(()=> {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.loginContainer}>
            <img src={logo} height={200} alt="" />
            <div className={styles.loginBox}>
                <h2>Login</h2>
                <form>
                    <input type="text" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
                <p className={styles.signupText}>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
