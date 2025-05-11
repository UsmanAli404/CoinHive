import { useEffect, useState } from 'react';
import styles from './coinTable.module.css';
import { getCoins } from '../../../api/functions.js';
import { useDispatch, useSelector } from 'react-redux';
import { 
    setSortField, 
    setSortOrder, 
    setCurrentPage, 
    setCoins, 
    setInputPage 
} from '../../../slices/coinTableSlice.js';
import { Link } from 'react-router-dom';

function CoinTable() {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');

    const {
        sortField,
        sortOrder, 
        currentPage, 
        coins,
        inputPage
    } = useSelector(state => state.coinTable);

    const itemsPerPage = 10;
    const totalItems = 400;

    const handleSort = (field) => {
        if (sortField === field) {
            dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
        } else {
            dispatch(setSortField(field));
            dispatch(setSortOrder('asc'));
        }
    };

    const fetchCoins = async () => {
        try {
            const response = await getCoins({
                vs_currency: "usd",
                order: "market_cap_desc",
                per_page: totalItems,
                page: 1,
                sparkline: false
            });

            if (response.status === 200) {
                dispatch(setCoins(response.data));
            } else {
                console.error("An error occurred while fetching coins");
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCoins();
    }, []);

    useEffect(() => {
        dispatch(setInputPage(currentPage));
    }, [currentPage]);

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedCoins = [...filteredCoins].sort((a, b) => {
        const num_a = Number(a[sortField]?.replace(/[$,%]/g, '') || 0);
        const num_b = Number(b[sortField]?.replace(/[$,%]/g, '') || 0);
        return sortOrder === 'asc' ? num_a - num_b : num_b - num_a;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const totalPages = Math.ceil(sortedCoins.length / itemsPerPage);
    const visibleCoins = sortedCoins.slice(startIndex, startIndex + itemsPerPage);


    return (
        <>
        
        <div className={styles.searchContainer}>
            <input
                type="text"
                placeholder="Search by symbol..."
                value={searchQuery}
                onChange={(e) => {
                    dispatch(setCurrentPage(1));
                    setSearchQuery(e.target.value);
                }}
                className={styles.searchInput}
            />
        </div>
        <div className={styles.coinDiv}>
            <table className={styles.coinTable}>
                <thead>
                <tr>
                    <th>Asset</th>
                    <th onClick={() => handleSort('price')} className={styles.clickable}>
                        Price {sortField === 'price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    <th onClick={() => handleSort('change_24h')} className={styles.clickable}>
                        Change {sortField === 'change_24h' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    <th onClick={() => handleSort('market_cap')} className={styles.clickable}>
                        Market Cap {sortField === 'market_cap' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    <th onClick={() => handleSort('volume')} className={styles.clickable}>
                        Volume {sortField === 'volume' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {visibleCoins.map((coin, index) => (
                    <tr key={index}>
                        <td className={styles.nameCell}>
                            <Link to={`/coin/${coin.symbol}`} className={styles.assetLink}>
                                {coin.name}
                            </Link>
                        </td>
                        
                        <td>{coin.price}</td>
                        <td className={
                            parseFloat(coin.change_24h) > 0 ? styles.changePositive :
                            parseFloat(coin.change_24h) < 0 ? styles.changeNegative :
                            styles.changeNeutral
                        }>
                            {coin.change_24h}
                        </td>
                        <td>{coin.market_cap}</td>
                        <td>{coin.volume}</td>
                        <td>
                            <Link to={`/trade/${coin.symbol}`}>
                                <button className={styles.button}>Trade</button>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

        <div className={styles.pagination}>
                <div
                    className={styles.arrowWrapper}
                    onClick={() => {
                        if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
                    }}
                >
                    <div className={`${styles.arrowLeft} ${currentPage === 1 ? styles.disabled : ''}`} />
                </div>

                <input
                    type="number"
                    value={inputPage}
                    onChange={(e) => {
                        
                        const val = e.target.value;
                    
                        if (val === '') {
                            dispatch(setInputPage(''));
                        } else {
                            const num = parseInt(val);
                            if (!isNaN(num) && num > 0 && num <= totalPages) {
                                dispatch(setInputPage(num));
                            }
                        }
                    }}

                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            const num = parseInt(inputPage);
                            if (!isNaN(num) && num > 0 && num <= totalPages && num !== currentPage) {
                                dispatch(setCurrentPage(num));
                            }
                        }
                    }}
                    
                    className={styles.pageInput}
                />

                <div
                    className={styles.arrowWrapper}
                    onClick={() => {
                        if (currentPage < totalPages) dispatch(setCurrentPage(currentPage + 1));
                    }}
                >
                    <div className={`${styles.arrowRight} ${currentPage >= totalPages ? styles.disabled : ''}`} />
                </div>

            </div>
        </>
    );
}

export default CoinTable;