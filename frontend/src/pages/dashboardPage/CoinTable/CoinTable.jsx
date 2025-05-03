import React, { useEffect } from 'react';
import styles from './CoinTable.module.css';
import { getCoins } from '../../../api/functions.js';
import { useDispatch, useSelector } from 'react-redux';
import { 
    setSortField, 
    setSortOrder, 
    setCurrentPage, 
    setCoins, 
    setFetchedBlockPage, 
    setInputPage 
} from '../../../slices/coinTableSlice.js';
import { Link } from 'react-router-dom';

function CoinTable() {
    const dispatch = useDispatch();
    const {
        sortField,
        sortOrder, 
        currentPage, 
        coins, 
        fetchedBlockPage, 
        inputPage
    } = useSelector(state => state.coinTable);

    const itemsPerPage = 10;
    const coinsPerFetch = 100;
    const pagesPerBlock = coinsPerFetch / itemsPerPage;

    const handleSort = (field) => {
        if (sortField === field) {
            dispatch(setSortOrder((sortOrder === 'asc' ? 'desc' : 'asc')));
        } else {
            dispatch(setSortField(field));
            dispatch(setSortOrder('asc'));
        }
    };

    const fetchCoins = async (apiPage) => {
        try {
            const response = await getCoins({
                vs_currency: "usd",
                order: "market_cap_desc",
                per_page: coinsPerFetch,
                page: apiPage,
                sparkline: false
            });

            console.log(response);

            if (response.status === 200) {
                dispatch(setCoins(response.data));
                dispatch(setFetchedBlockPage(apiPage));
            } else {
                console.error("An error occurred while fetching coins");
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const blockPage = Math.floor((currentPage - 1) / pagesPerBlock) + 1;
        const apiPage = (blockPage - 1) * pagesPerBlock + 1;

        if (fetchedBlockPage !== apiPage) {
            fetchCoins(apiPage);
        }
    }, [currentPage]);

    useEffect(() => {
        dispatch(setInputPage(currentPage));
    }, [currentPage]);

    const startIndex = ((currentPage - 1) % pagesPerBlock) * itemsPerPage;
    const visibleCoins = [...coins]
        .sort((a, b) => {
            const num_a = Number(a[sortField].replace(/[$,%]/g, ''));
            const num_b = Number(b[sortField].replace(/[$,%]/g, ''));
            return sortOrder === 'asc' ? num_a - num_b : num_b - num_a;
        })
        .slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
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
                        <td><button className={styles.button}>Trade</button></td>
                    </tr>
                ))}
                </tbody>
            </table>

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
                            if (!isNaN(num) && num > 0) {
                                dispatch(setInputPage(num));
                            }
                        }
                    }}

                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            const num = parseInt(inputPage);
                            if (!isNaN(num) && num > 0 && num !== currentPage) {
                                dispatch(setCurrentPage(num));
                            }
                        }
                    }}
                    
                    className={styles.pageInput}
                />

                <div
                    className={styles.arrowWrapper}
                    onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                >
                    <div className={styles.arrowRight} />
                </div>
            </div>
        </div>
    );
}

export default CoinTable;