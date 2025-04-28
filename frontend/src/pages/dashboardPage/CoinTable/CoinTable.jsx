import React from 'react';
import styles from './CoinTable.module.css';
import { useState } from 'react';

function CoinTable({ coins }) {
    const [sortField, setSortField] = useState('price');
    const [sortOrder, setSortOrder] = useState('desc');

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const sortedCoins = [...coins].sort((a, b) => {
        if (!sortField) return 0;
        if (sortOrder === 'asc') {
            return a[sortField] - b[sortField];
        } else {
            return b[sortField] - a[sortField];
        }
    });

    return (
        <table className={styles.coinTable}>
            <thead>
            <tr>
                <th>Asset</th>
                <th onClick={() => handleSort('price')} className={styles.clickable}>
                    Price {sortField === 'price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th>Change</th>
                <th onClick={() => handleSort('marketCap')} className={styles.clickable}>
                    Market Cap {sortField === 'marketCap' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {sortedCoins.map((coin, index) => (
                <tr key={index}>
                    <td>{coin.name}</td>
                    <td>{coin.price}</td>
                    <td>{coin.change}</td>
                    <td>{coin.marketCap}</td>
                    <td><button className={styles.button}>Trade</button></td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default CoinTable;