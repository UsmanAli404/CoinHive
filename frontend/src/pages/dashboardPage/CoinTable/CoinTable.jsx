import React from 'react';
import styles from './CoinTable.module.css';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

function CoinTable({ coins }) {
    return (
        <table className={styles.coinTable}>
            <thead>
            <tr>
                <th>Cryptocoin</th>
                <th>Updated</th>
                <th>Change</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {coins.map((coin, index) => (
                <tr key={index}>
                    <td>{coin.name}</td>
                    <td>{coin.updated}</td>
                    <td>
                            <span className={coin.change >= 0 ? styles.positive : styles.negative}>
                                {coin.change >= 0 ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(coin.change)}%
                            </span>
                    </td>
                    <td>{coin.price}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default CoinTable;