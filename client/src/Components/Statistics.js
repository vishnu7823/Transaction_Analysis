// src/components/Statistics.js
import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../Services/api';
import './Statistics.css';

const Statistics = ({ selectedMonth }) => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const loadStatistics = async () => {
            try {
                const response = await fetchStatistics(selectedMonth);
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            }
        };
        loadStatistics();
    }, [selectedMonth]);

    if (!stats) return <p>Loading statistics...</p>;

    return (
        <div className="statistics">
            <div className="stat-box">
                <p>Total Sales:</p>
                <p>${stats.totalRevenue}</p>
            </div>
            <div className="stat-box">
                <p>Total Sold Items:</p>
                <p>{stats.totalSoldItems}</p>
            </div>
            <div className="stat-box">
                <p>Total Not Sold Items:</p>
                <p>{stats.totalNotSoldItems}</p>
            </div>
        </div>
    );
};

export default Statistics;
    