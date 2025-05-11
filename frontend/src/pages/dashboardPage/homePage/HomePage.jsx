import styles from './home.module.css';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import CoinTable from '../coinTable/CoinTable';
import UserProfile from '../userProfile/UserProfile';

function HomePage() {
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
                <UserProfile profile={{}} />
            </div>
        </div>
    );
}

export default HomePage;