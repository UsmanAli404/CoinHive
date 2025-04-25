import styles from './login.module.css'
import logo from '../../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function LoginPage()
{
    const navigate = useNavigate()

    useEffect(() =>
    {
        window.scrollTo(0, 0)
    }, [])

    const handleLogin = (e) =>
    {
        e.preventDefault()
        navigate('/dashboard')
    }

    return (
        <div className={styles.loginContainer}>
            <img src={logo} height={200} alt="" />
            <div className={styles.loginBox}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
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
