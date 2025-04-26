import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './dashboard.module.css'
import logo from '../../assets/logo.svg'
import {
    FaHome,
    FaWallet,
    FaExchangeAlt,
    FaComments,
    FaChartBar,
    FaCog,
    FaQuestion
} from 'react-icons/fa'

import CoinTable from './CoinTable/CoinTable.jsx'
import UserProfile from './UserProfile/UserProfile.jsx'

function Dashboard()
{
    const [activeTab, setActiveTab] = useState('home')

    useEffect(() =>
    {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.sidebar}>
                <div className={styles.logo}>
                    <img src={logo} alt="CoinHive Logo" />
                    <span>CoinHive</span>
                </div>

                <nav className={styles.sidebarNav}>
                    <ul>
                        <li className={activeTab === 'home' ? styles.active : ''} onClick={() => setActiveTab('home')}>
                            <FaHome /> <span>Home</span>
                        </li>
                        <li className={activeTab === 'assets' ? styles.active : ''} onClick={() => setActiveTab('assets')}>
                            <FaWallet /> <span>Assets</span>
                        </li>
                        <li className={activeTab === 'trade' ? styles.active : ''} onClick={() => setActiveTab('trade')}>
                            <FaExchangeAlt /> <span>Live Trade</span>
                        </li>
                        <li className={activeTab === 'forum' ? styles.active : ''} onClick={() => setActiveTab('forum')}>
                            <FaComments /> <span>Forum</span>
                        </li>
                        <li className={activeTab === 'reports' ? styles.active : ''} onClick={() => setActiveTab('reports')}>
                            <FaChartBar /> <span>Reports</span>
                        </li>
                        <li className={activeTab === 'settings' ? styles.active : ''} onClick={() => setActiveTab('settings')}>
                            <FaCog /> <span>Settings</span>
                        </li>
                    </ul>
                </nav>

                <div className={styles.guideButton}>
                    <FaQuestion /> <span>Guide</span>
                </div>
            </div>

            <div className={styles.mainContent}>
                <header className={styles.header}>
                    <div className={styles.breadcrumb}>
                        Dashboard &gt; Home
                    </div>
                    <div className={styles.headerRight}>
                        <span className={styles.traderProfile}>Trader Profile</span>
                    </div>
                </header>

                <div className={styles.dashboardMain}>
                    <div className={styles.contentLeft}>
                        <section className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h2>ASSETS</h2>
                                <Link to="/assets" className={styles.moreLink}>More Assets →</Link>
                            </div>

                            <div className={styles.assetCards}>
                                <div className={styles.newAssetCard}>
                                    <div className={styles.addIcon}>+</div>
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
                            <CoinTable coins={[]} />
                            <div className={styles.tradeNowContainer}>
                                <button className={styles.tradeNowButton}>
                                    <FaExchangeAlt /> Trade Now
                                </button>
                            </div>
                        </section>
                    </div>

                    <div className={styles.contentRight}>
                        <UserProfile profile={{}} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
