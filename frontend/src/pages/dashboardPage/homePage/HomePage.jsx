import styles from './home.module.css';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import CoinTable from '../coinTable/CoinTable';
import UserProfile from '../userProfile/UserProfile';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserDataById, getUserPortfolio } from '../../../api/functions';
import { useDispatch } from 'react-redux';
import { setUserBalance, setUserEmail, setUserName, setUserProfileData } from '../../../slices/userSlice';

function HomePage() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!userId) return;

            try {
                const userResponse = await getUserDataById({ userId });
                const email = userResponse.data.userData.email;
                const name = userResponse.data.userData.name;
                const balance = userResponse.data.userData.balance;
                console.log(userResponse);

                dispatch(setUserEmail(email));
                dispatch(setUserName(name));
                dispatch(setUserBalance(balance));

                const portfolioResponse = await getUserPortfolio({ userEmail: email });

                if (userResponse.data.success && portfolioResponse.data.success) {
                    const userData = userResponse.data.userData;
                    const portfolio = portfolioResponse.data.portfolio;

                    const profileData = {
                        name: userData.name,
                        joinedAt: userData.joinedAt,
                        balance: parseFloat(portfolioResponse.data.balance),
                        assets: portfolio.inventory.map(item => ({
                            asset: item.asset,
                            quantity: item.quantity,
                            averagePrice: item.averagePrice,
                        }))
                    };

                    dispatch(setUserProfileData(profileData));
                    setProfile(profileData);
                } else {
                    console.error("Error in user or portfolio response");
                }
            } catch (error) {
                console.error("Fetch failed:", error);
            }
        };

        fetchProfileData();
    }, [userId]);

    return (
        <div className={styles.dashboardMain}>
            <div className={styles.contentLeft}>
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>ASSETS</h2>
                        <Link to="/assets" className={styles.moreLink}>More Assets →</Link>
                    </div>

                    <div className={styles.assetCards}>
                        <div className={styles.newAssetCard}>
                            <div className={styles.addIcon}>
                                <FaPlus size={12} />
                            </div>
                            <p>New Asset</p>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>ACTIVITY</h2>
                        <Link to="/activity" className={styles.moreLink}>More Activity →</Link>
                    </div>
                </section>

                <section className={styles.section}>
                    <CoinTable />
                </section>
            </div>

            <div className={styles.contentRight}>
                <UserProfile profile={profile} />
            </div>
        </div>
    );
}

export default HomePage;