// src/components/TransactionsTable.js
import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../Services/api';
import './TransactionsTable.css';

const TransactionsTable = ({ selectedMonth }) => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                console.log(`Fetching transactions for month: ${selectedMonth}, search: ${search}, page: ${page}`);
                const response = await fetchTransactions(selectedMonth, search, page);
                console.log("API Response:", response.data);
                setTransactions(response.data.products);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };
        loadTransactions();
    }, [selectedMonth, search, page]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1); // Reset to the first page when the search term changes
    };

    return (
        <div className="transactions-table">
            <input
                type="text"
                className="search-box"
                placeholder="Search transactions"
                value={search}
                onChange={handleSearchChange}
            />
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Date of Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>{transaction.title}</td>
                            <td>{transaction.description}</td>
                            <td>${transaction.price}</td>
                            <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button 
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
            </div>
        </div>
    );
};

export default TransactionsTable;
