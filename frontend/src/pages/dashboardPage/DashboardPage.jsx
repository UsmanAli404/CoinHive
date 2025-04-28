import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './dashboard.module.css'
import logo from '../../assets/coinhive_favicon.svg'
import {
    FaHome,
    FaWallet,
    FaExchangeAlt,
    FaComments,
    FaChartBar,
    FaCog,
    FaQuestion,
    FaBars,
    FaPlus
} from 'react-icons/fa'

import CoinTable from './CoinTable/CoinTable.jsx'
import UserProfile from './UserProfile/UserProfile.jsx'

function Dashboard()
{
    const [activeTab, setActiveTab] = useState('home')
    const [collapsed, setCollapsed] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className={styles.dashboardContainer}>
            <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
                
                <div className={styles.toggleButton} onClick={() => setCollapsed(!collapsed)}>
                    <FaBars />
                </div>

                <div onClick={() => setActiveTab('home')} className={styles.logo}>
                    <img src={logo} width="30px" alt="CoinHive Logo" />
                    {!collapsed && <span>CoinHive</span>}
                </div>

                <nav className={styles.sidebarNav}>
                    <ul>
                        <li className={activeTab === 'home' ? styles.active : ''} onClick={() => setActiveTab('home')}>
                            <FaHome /> 
                            {!collapsed && <span className={styles.tabButtonDisplayTxt}>Home</span>}
                            {collapsed && <div className={styles.tooltip}>Home</div>}
                        </li>
                        <li className={activeTab === 'assets' ? styles.active : ''} onClick={() => setActiveTab('assets')}>
                            <FaWallet />
                            {!collapsed && <span className={styles.tabButtonDisplayTxt}>Assets</span>}
                            {collapsed && <div className={styles.tooltip}>Assets</div>}
                        </li>
                        <li className={activeTab === 'trade' ? styles.active : ''} onClick={() => setActiveTab('trade')}>
                            <FaExchangeAlt /> 
                            {!collapsed && <span className={styles.tabButtonDisplayTxt}>Live Trade</span>}
                            {collapsed && <div className={styles.tooltip}>Live Trade</div>}
                        </li>
                        <li className={activeTab === 'forum' ? styles.active : ''} onClick={() => setActiveTab('forum')}>
                            <FaComments /> 
                            {!collapsed && <span className={styles.tabButtonDisplayTxt}>Forum</span>}
                            {collapsed && <div className={styles.tooltip}>Forum</div>}
                        </li>
                        <li className={activeTab === 'reports' ? styles.active : ''} onClick={() => setActiveTab('reports')}>
                            <FaChartBar /> 
                            {!collapsed && <span className={styles.tabButtonDisplayTxt}>Reports</span>}
                            {collapsed && <div className={styles.tooltip}>Reports</div>}
                        </li>
                        <li className={activeTab === 'settings' ? styles.active : ''} onClick={() => setActiveTab('settings')}>
                            <FaCog /> 
                            {!collapsed && <span className={styles.tabButtonDisplayTxt}>Settings</span>}
                            {collapsed && <div className={styles.tooltip}>Settings</div>}
                        </li>
                    </ul>
                </nav>

                <div className={styles.guideButton}>
                    <FaQuestion /> {!collapsed && <span className={styles.tabButtonDisplayTxt}>Guide</span>}
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
                                    <div className={styles.addIcon}>
                                        <FaPlus size={12}/>
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
                        <CoinTable coins={[
                        {
                            name: "Bitcoin",
                            price: 67234,
                            marketCap: 1267843984,
                        },
                        {
                            name: "Ethereum",
                            price: 3245,
                            marketCap: 389472384,
                        },
                        {
                            name: "Ripple",
                            price: 0.56,
                            marketCap: 29837423,
                        },
                        {
                            name: "Litecoin",
                            price: 145,
                            marketCap: 19384723,
                        },
                        {
                            name: "Cardano",
                            price: 0.39,
                            marketCap: 18472384,
                        },
                        {
                            name: "Dogecoin",
                            price: 0.13,
                            marketCap: 15372849,
                        },
                        {
                            name: "Solana",
                            price: 95,
                            marketCap: 84723847,
                        },
                        {
                            name: "Polkadot",
                            price: 6.5,
                            marketCap: 5839284,
                        },
                        {
                            name: "Avalanche",
                            price: 32,
                            marketCap: 9283742,
                        },
                        {
                            name: "Shiba Inu",
                            price: 0.000023,
                            marketCap: 1847293,
                        }
                    ]} />

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
