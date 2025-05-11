import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './coinTradePage.module.css';
import { trade } from '../../api/functions';
import { setUserBalance, setUserProfileData } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function CoinTradePage() {
    const { symbol } = useParams();
    const [amount, setAmount] = useState('');
    const [action, setAction] = useState('buy');
    const navigate = useNavigate();

    const userBalanceUSD = useSelector((state) => state.user.balance);
    const profileData = useSelector((state) => state.user.profileData);

    const userCoinBalance = profileData?.assets?.find(
        (asset) => asset.asset.toLowerCase() === symbol.toLowerCase()
    )?.quantity || 0;

    const dispatch = useDispatch();
    const userEmail = useSelector((state) => state.user.userEmail);
    const currentProfileData = useSelector((state) => state.user.profileData);

    const handleTrade = async () => {
        const tradeQuantity = parseFloat(amount);

        if (!tradeQuantity || tradeQuantity <= 0) {
            return alert('Enter a valid trade amount.');
        }

        try {
            const response = await trade({
                userEmail,
                type: action,
                asset: symbol.toUpperCase(),
                quantity: tradeQuantity,
            });

            if (response.data?.message === 'Transaction successful') {
                alert('Trade successful!');
                
                dispatch(setUserBalance(parseFloat(response.data.balance)));
                const updatedProfileData = {
                    ...currentProfileData,
                    balance: parseFloat(response.data.balance),
                    assets: response.data.inventory.map(item => ({
                        asset: item.asset,
                        quantity: item.quantity,
                        averagePrice: item.averagePrice
                    }))
                };

                dispatch(setUserProfileData(updatedProfileData));

                setAmount('');
            }
        } catch (err) {
            console.error("Trade error:", err);
            alert(err.response?.data?.message || "Trade failed.");
        }
    };

    return (
        <>
            <button className={styles.backButton} onClick={() => navigate('/dashboard')}>
                ← Back to Dashboard
            </button>
            <div className={styles.container}>
                <h2>Trade {symbol.toUpperCase()}</h2>

                <div className={styles.toggle}>
                    <button
                        onClick={() => setAction('buy')}
                        className={action === 'buy' ? styles.active : ''}
                    >
                        Buy
                    </button>
                    <button
                        onClick={() => setAction('sell')}
                        className={action === 'sell' ? styles.active : ''}
                    >
                        Sell
                    </button>
                </div>

                <div className={styles.inputGroup}>
                    <label>
                        {action === 'buy' ? 'Amount in USD:' : `Amount in ${symbol.toUpperCase()}:`}
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
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
        </>
    );
}

export default CoinTradePage;