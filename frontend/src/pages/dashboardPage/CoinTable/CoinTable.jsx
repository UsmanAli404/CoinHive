import React, { useState, useEffect } from 'react';
import styles from './CoinTable.module.css';
import { getCoins } from '../../../api/functions.js';

function CoinTable() {
    const [sortField, setSortField] = useState('price');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [coins, setCoins] = useState([]);
    const [fetchedBlockPage, setFetchedBlockPage] = useState(null);
    const [inputPage, setInputPage] = useState(currentPage);

    const itemsPerPage = 10;
    const coinsPerFetch = 100;
    const pagesPerBlock = coinsPerFetch / itemsPerPage;

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortOrder('asc');
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

            if (response.status === 200) {
                setCoins(response.data);
                setFetchedBlockPage(apiPage);
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
        setInputPage(currentPage);
    }, [currentPage]);

    const startIndex = ((currentPage - 1) % pagesPerBlock) * itemsPerPage;
    const visibleCoins = [...coins]
        .sort((a, b) => {
            const num_a = Number(a[sortField].replace(/[$,]/g, ''));
            const num_b = Number(b[sortField].replace(/[$,]/g, ''));
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
                    <th>Change</th>
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
                        <td className={styles.nameCell}>{coin.name}</td>
                        <td>{coin.price}</td>
                        <td>{coin.change}</td>
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
                        if (currentPage > 1) setCurrentPage(prev => prev - 1);
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
                            setInputPage('');
                        } else {
                            const num = parseInt(val);
                            if (!isNaN(num) && num > 0) {
                                setInputPage(num);
                            }
                        }
                    }}
                                     
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            const num = parseInt(inputPage);
                            if (!isNaN(num) && num > 0 && num !== currentPage) {
                                setCurrentPage(num);
                            }
                        }
                    }}
                    
                    className={styles.pageInput}
                />

                <div
                    className={styles.arrowWrapper}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                >
                    <div className={styles.arrowRight} />
                </div>
            </div>
        </div>
    );
}

export default CoinTable;