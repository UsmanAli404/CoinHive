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
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab, setCollapsed } from '../../slices/dashboardSlice.js'

function Dashboard()
{
    const dispatch = useDispatch();
    const {activeTab, collapsed} = useSelector(state => state.dashboard);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.dashboardContainer}>
            <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
                
                <div className={styles.toggleButton} onClick={() => dispatch(setCollapsed(!collapsed))}>
                    <FaBars />
                </div>

                <div onClick={() => dispatch(setActiveTab('home'))} className={styles.logo}>
                    <img src={logo} width="30px" alt="CoinHive Logo" />
                    {!collapsed && <span>CoinHive</span>}
                </div>

                <nav className={styles.sidebarNav}>
                    <ul>
                        <li className={activeTab === 'home' ? styles.active : ''} onClick={() => dispatch(setActiveTab('home'))}>
                            <FaHome /> 
                            {!collapsed && <span className={styles.tabButtonDisplayTxt}>Home</span>}
                            {collapsed && <div className={styles.tooltip}>Home</div>}
                        </li>
                        <li className={activeTab === 'assets' ? styles.active : ''} onClick={() => dispatch(setActiveTab('assets'))}>
                            <FaWallet />
                            {!collapsed && <span className={styles.tabButtonDisplayTxt}>Assets</span>}
                            {collapsed && <div className={styles.tooltip}>Assets</div>}
                        </li>
                        <li className={activeTab === 'trade' ? styles.active : ''} onClick={() => dispatch(setActiveTab('trade'))}>
                            <FaExchangeAlt /> 
                            {!collapsed && <span className={styles.tabButtonDisplayTxt}>Live Trade</span>}
                            {collapsed && <div className={styles.tooltip}>Live Trade</div>}
                        </li>
                        <li className={activeTab === 'forum' ? styles.active : ''} onClick={() => dispatch(setActiveTab('forum'))}>
                            <FaComments /> 
                            {!collapsed && <span className={styles.tabButtonDisplayTxt}>Forum</span>}
                            {collapsed && <div className={styles.tooltip}>Forum</div>}
                        </li>
                        <li className={activeTab === 'reports' ? styles.active : ''} onClick={() => dispatch(setActiveTab('reports'))}>
                            <FaChartBar /> 
                            {!collapsed && <span className={styles.tabButtonDisplayTxt}>Reports</span>}
                            {collapsed && <div className={styles.tooltip}>Reports</div>}
                        </li>
                        <li className={activeTab === 'settings' ? styles.active : ''} onClick={() => dispatch(setActiveTab('settings'))}>
                            <FaCog /> 
                            {!collapsed && <span className={styles.tabButtonDisplayTxt}>Settings</span>}
                            {collapsed && <div className={styles.tooltip}>Settings</div>}
                        </li>
                        <Link to="/guide" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <li className={`${styles.guideButton} ${activeTab === 'guide' ? styles.active : ''}`} onClick={() => dispatch(setActiveTab('guide'))}>
                                <FaQuestion />
                                {!collapsed && <span className={styles.tabButtonDisplayTxt}>Guide</span>}
                                {collapsed && <div className={styles.tooltip}>Guide</div>}
                            </li>
                        </Link>
                    </ul>
                </nav>
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
                        <CoinTable/>
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
