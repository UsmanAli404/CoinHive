import { useParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './coinTradePage.module.css';

function CoinTradePage() {
    const { symbol } = useParams();
    const [amount, setAmount] = useState('');
    const [action, setAction] = useState('buy');

    const userBalanceUSD = 1000;
    const userCoinBalance = 2.5;

    const handleTrade = () => {
        if (action === 'buy') {
            console.log(`Buying ${amount} USD of ${symbol}`);
        } else {
            console.log(`Selling ${amount} ${symbol}`);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Trade {symbol.toUpperCase()}</h2>
            <div className={styles.toggle}>
                <button onClick={() => setAction('buy')} className={action === 'buy' ? styles.active : ''}>Buy</button>
                <button onClick={() => setAction('sell')} className={action === 'sell' ? styles.active : ''}>Sell</button>
            </div>

            <div className={styles.inputGroup}>
                <label>
                    {action === 'buy' ? 'Amount in USD:' : `Amount in ${symbol.toUpperCase()}:`}
                </label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <div className={styles.info}>
                {action === 'buy'
                    ? `Available USD: $${userBalanceUSD}`
                    : `Available ${symbol.toUpperCase()}: ${userCoinBalance}`}
            </div>

            <button className={styles.tradeButton} onClick={handleTrade}>
                {action === 'buy' ? 'Buy' : 'Sell'}
            </button>
        </div>
    );
}

export default CoinTradePage;