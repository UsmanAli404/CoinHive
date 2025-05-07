import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './guide.module.css'
import logo from '../../assets/coinhive_favicon.svg'
import fullLogo from '../../assets/logo.svg'
import {
    FaHome,
    FaWallet,
    FaExchangeAlt,
    FaComments,
    FaChartBar,
    FaCog,
    FaQuestion,
    FaBars,
    FaArrowRight,
    FaLightbulb,
    FaMapMarkerAlt,
    FaInfoCircle,
    FaShieldAlt,
    FaChartLine
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab, setCollapsed } from '../../slices/dashboardSlice.js'

function Guide() {
    const dispatch = useDispatch();
    const { activeTab, collapsed } = useSelector(state => state.dashboard);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.guideContainer}>
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
                        <li className={`${styles.guideButton} ${activeTab === 'guide' ? styles.active : ''}`} onClick={() => dispatch(setActiveTab('guide'))}>
                            <FaQuestion />
                            {!collapsed && <span className={styles.tabButtonDisplayTxt}>Guide</span>}
                            {collapsed && <div className={styles.tooltip}>Guide</div>}
                        </li>
                    </ul>
                </nav>
            </div>

            <div className={styles.mainContent}>
                <header className={styles.header}>
                    <div className={styles.breadcrumb}>
                        Dashboard &gt; Guide
                    </div>
                    <div className={styles.headerRight}>
                        <span className={styles.traderProfile}>CoinHive Trading Guide</span>
                    </div>
                </header>

                <div className={styles.guideMain}>
                    <div className={styles.contentLeft}>
                        <section className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h2>COINHIVE TRADING PLATFORM</h2>
                                <Link to="/dashboard" className={styles.moreLink}>Back to Dashboard →</Link>
                            </div>
                            
                            <div className={styles.guideContent}>
                                <p>CoinHive is an advanced cryptocurrency trading platform designed for both beginner and experienced traders. Our platform offers a comprehensive suite of tools to help you manage your crypto assets and make informed trading decisions.</p>
                                
                                <div className={styles.guideTip}>
                                    <div className={styles.guideTipTitle}>
                                        <FaLightbulb /> Important Note
                                    </div>
                                    <p className={styles.guideTipContent}>
                                        Cryptocurrency trading involves significant risk. Only trade with funds you can afford to lose and always do your own research before making investment decisions.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h2>WHAT IS CRYPTOCURRENCY?</h2>
                            </div>
                            
                            <div className={styles.guideContent}>
                                <p>Cryptocurrency is a digital or virtual form of currency that uses cryptography for security, making it difficult to counterfeit. Unlike traditional currencies issued by governments (fiat money), cryptocurrencies operate on decentralized systems based on blockchain technology—a distributed ledger enforced by a network of computers.</p>
                                
                                <div className={styles.featureBoxContainer}>
                                    <div className={styles.featureBox}>
                                        <FaInfoCircle className={styles.featureIcon} />
                                        <h3>Decentralized</h3>
                                        <p>No central authority controls cryptocurrencies, making them resistant to government interference or manipulation.</p>
                                    </div>
                                    
                                    <div className={styles.featureBox}>
                                        <FaShieldAlt className={styles.featureIcon} />
                                        <h3>Secure</h3>
                                        <p>Blockchain technology ensures transactions are secure, transparent, and immutable once recorded.</p>
                                    </div>
                                    
                                    <div className={styles.featureBox}>
                                        <FaChartLine className={styles.featureIcon} />
                                        <h3>Volatile</h3>
                                        <p>Cryptocurrency prices can fluctuate dramatically, creating both opportunities and risks for traders.</p>
                                    </div>
                                </div>

                                <p>Bitcoin, created in 2009, was the first cryptocurrency. Today, there are thousands of alternative cryptocurrencies (altcoins) with various functions and specifications, such as Ethereum, Ripple, and Litecoin.</p>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h2>UNDERSTANDING BLOCKCHAIN</h2>
                            </div>
                            
                            <div className={styles.guideContent}>
                                <p>Blockchain is the underlying technology behind most cryptocurrencies. It's a distributed database or ledger shared among computer network nodes that securely records transactions in a way that prevents modification.</p>

                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>1</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>Transaction Verification</h3>
                                        <p className={styles.stepDescription}>
                                            When a transaction is initiated, it's verified by network nodes through cryptography and added to a block of data.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>2</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>Block Formation</h3>
                                        <p className={styles.stepDescription}>
                                            Multiple verified transactions are bundled together into a block. Each block contains a cryptographic hash of the previous block, creating a chain.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>3</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>Consensus</h3>
                                        <p className={styles.stepDescription}>
                                            Network participants (miners or validators) reach consensus about the block's validity through various mechanisms like Proof of Work or Proof of Stake.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.guideTip}>
                                    <div className={styles.guideTipTitle}>
                                        <FaLightbulb /> Blockchain Benefit
                                    </div>
                                    <p className={styles.guideTipContent}>
                                        The decentralized nature of blockchain eliminates the need for intermediaries like banks, potentially reducing transaction fees and processing times while increasing security.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h2>GETTING STARTED</h2>
                            </div>
                            
                            <div className={styles.guideContent}>
                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>1</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>Creating Your Account</h3>
                                        <p className={styles.stepDescription}>
                                            Sign up for a CoinHive account using your email address. Complete the verification process to ensure your account is secure. We use industry-standard security protocols to protect your information.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>2</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>Setting Up Your Wallet</h3>
                                        <p className={styles.stepDescription}>
                                            Connect your existing crypto wallet or create a new one using our platform. We support multiple wallet options to give you flexibility in managing your assets. Make sure to enable two-factor authentication for additional security.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>3</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>Funding Your Account</h3>
                                        <p className={styles.stepDescription}>
                                            Deposit funds into your account using bank transfers, credit cards, or cryptocurrency transfers. Start with an amount you're comfortable with, and remember to only invest what you can afford to lose.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h2>CRYPTOCURRENCY TYPES</h2>
                            </div>
                            
                            <div className={styles.guideContent}>
                                <p>The cryptocurrency market features various types of digital assets, each with unique purposes and technologies:</p>
                                
                                <div className={styles.cryptoTypesTable}>
                                    <div className={styles.cryptoTypeRow}>
                                        <div className={styles.cryptoTypeCell}><strong>Bitcoin (BTC)</strong></div>
                                        <div className={styles.cryptoTypeCell}>The first cryptocurrency, often referred to as "digital gold" and primarily used as a store of value.</div>
                                    </div>
                                    <div className={styles.cryptoTypeRow}>
                                        <div className={styles.cryptoTypeCell}><strong>Ethereum (ETH)</strong></div>
                                        <div className={styles.cryptoTypeCell}>A platform for decentralized applications (dApps) and smart contracts, enabling developers to build various applications.</div>
                                    </div>
                                    <div className={styles.cryptoTypeRow}>
                                        <div className={styles.cryptoTypeCell}><strong>Stablecoins</strong></div>
                                        <div className={styles.cryptoTypeCell}>Cryptocurrencies designed to maintain a stable value, often pegged to fiat currencies like USD (e.g., USDT, USDC).</div>
                                    </div>
                                    <div className={styles.cryptoTypeRow}>
                                        <div className={styles.cryptoTypeCell}><strong>DeFi Tokens</strong></div>
                                        <div className={styles.cryptoTypeCell}>Tokens used in decentralized finance applications for lending, borrowing, and yield farming.</div>
                                    </div>
                                    <div className={styles.cryptoTypeRow}>
                                        <div className={styles.cryptoTypeCell}><strong>NFTs</strong></div>
                                        <div className={styles.cryptoTypeCell}>Non-fungible tokens representing ownership of unique digital or physical items.</div>
                                    </div>
                                </div>

                                <div className={styles.guideTip}>
                                    <div className={styles.guideTipTitle}>
                                        <FaLightbulb /> Portfolio Diversification
                                    </div>
                                    <p className={styles.guideTipContent}>
                                        Consider diversifying your cryptocurrency portfolio across different types to balance potential risks and rewards.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h2>TRADING BASICS</h2>
                            </div>
                            
                            <div className={styles.guideContent}>
                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>1</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>Understanding Market Orders</h3>
                                        <p className={styles.stepDescription}>
                                            Market orders are executed immediately at the current market price. They're ideal when you want to buy or sell quickly without worrying about price fluctuations.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>2</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>Using Limit Orders</h3>
                                        <p className={styles.stepDescription}>
                                            Limit orders allow you to set a specific price at which you want to buy or sell. These orders are executed only when the market reaches your designated price point, giving you more control over your entry and exit positions.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>3</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>Setting Stop Losses</h3>
                                        <p className={styles.stepDescription}>
                                            Stop losses automatically sell your assets when they reach a certain price, helping to minimize losses in volatile markets. This is an essential risk management tool for all traders.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.guideTip}>
                                    <div className={styles.guideTipTitle}>
                                        <FaLightbulb /> Pro Tip
                                    </div>
                                    <p className={styles.guideTipContent}>
                                        Always diversify your crypto portfolio to spread risk across different assets. Don't put all your investment into a single cryptocurrency.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h2>ADVANCED TRADING STRATEGIES</h2>
                            </div>
                            
                            <div className={styles.guideContent}>
                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>1</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>Technical Analysis</h3>
                                        <p className={styles.stepDescription}>
                                            Learn to read charts and use technical indicators such as Moving Averages, RSI, and MACD to identify potential trading opportunities. CoinHive provides comprehensive charting tools with customizable indicators.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>2</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>Fundamental Analysis</h3>
                                        <p className={styles.stepDescription}>
                                            Research the underlying technology, team, and adoption rates of cryptocurrencies before investing. Our platform provides news feeds and project updates to help you stay informed.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>3</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>Automated Trading</h3>
                                        <p className={styles.stepDescription}>
                                            Set up trading bots and automated strategies to execute trades based on predefined parameters. This allows your portfolio to react to market changes 24/7, even when you're not actively monitoring the markets.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h2>MARKET SENTIMENT & ANALYSIS</h2>
                            </div>
                            
                            <div className={styles.guideContent}>
                                <p>Understanding market sentiment is crucial for making informed trading decisions. Market sentiment represents the overall attitude of investors toward a particular asset or market.</p>

                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>1</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>Social Media Monitoring</h3>
                                        <p className={styles.stepDescription}>
                                            Track discussions and trends on platforms like Twitter, Reddit, and specialized crypto forums. Sudden increases in mentions or sentiment shifts can precede price movements.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>2</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>Fear & Greed Index</h3>
                                        <p className={styles.stepDescription}>
                                            Monitor crypto market sentiment indicators like the Fear & Greed Index, which measures emotions and sentiments from different sources. Extreme fear often represents buying opportunities, while extreme greed may signal potential market tops.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>3</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>On-Chain Analysis</h3>
                                        <p className={styles.stepDescription}>
                                            Examine blockchain data such as transaction volumes, active addresses, and whale movements to gauge market activity and potential price directions.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.guideTip}>
                                    <div className={styles.guideTipTitle}>
                                        <FaLightbulb /> Contrarian Approach
                                    </div>
                                    <p className={styles.guideTipContent}>
                                        Sometimes, the most profitable strategy is to act against the crowd. When everyone is excessively optimistic, consider being cautious; when panic selling occurs, look for potential buying opportunities.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h2>SECURITY BEST PRACTICES</h2>
                            </div>
                            
                            <div className={styles.guideContent}>
                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>1</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>Enable Two-Factor Authentication</h3>
                                        <p className={styles.stepDescription}>
                                            Always enable 2FA on your account to add an extra layer of security. CoinHive supports app-based authentication via Google Authenticator or Authy.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>2</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>Use Strong, Unique Passwords</h3>
                                        <p className={styles.stepDescription}>
                                            Create a strong password that is unique to your CoinHive account. Consider using a password manager to generate and store complex passwords securely.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.guideStep}>
                                    <div className={styles.stepNumber}>3</div>
                                    <div className={styles.stepContent}>
                                        <h3 className={styles.stepTitle}>Regularly Review Account Activity</h3>
                                        <p className={styles.stepDescription}>
                                            Monitor your account activity and enable notifications for all transactions. Immediately report any suspicious activity to our support team.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.guideTip}>
                                    <div className={styles.guideTipTitle}>
                                        <FaLightbulb /> Security Reminder
                                    </div>
                                    <p className={styles.guideTipContent}>
                                        Never share your password or 2FA codes with anyone, including CoinHive support staff. Our team will never ask for this information.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <h2>VISIT US</h2>
                            </div>
                            
                            <div className={styles.guideContent}>
                                <div className={styles.locationContainer}>
                                    <div className={styles.locationInfo}>
                                        <div className={styles.locationHeader}>
                                            <FaMapMarkerAlt className={styles.locationIcon} />
                                            <h3 className={styles.locationTitle}>FAST-NUCES Lahore</h3>
                                        </div>
                                        <p className={styles.locationAddress}>
                                            Block-B, Faisal Town, Lahore, Pakistan
                                        </p>
                                        <div className={styles.locationFooter}>
                                            <img src={fullLogo} alt="CoinHive Logo" className={styles.locationLogo} />
                                        </div>
                                    </div>
                                    <div className={styles.mapContainer}>
                                        <iframe 
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.551513026603!2d74.3004391752745!3d31.481521174231787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903f08ebc7e8b%3A0x47e934f4cd34790!2sFAST%20NUCES%20Lahore!5e0!3m2!1sen!2s!4v1746636708199!5m2!1sen!2s" 
                                            width="100%" 
                                            height="300" 
                                            style={{border: 0}} 
                                            allowFullScreen="" 
                                            loading="lazy" 
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="FAST-NUCES Lahore Location"
                                            className={styles.mapIframe}
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Guide 