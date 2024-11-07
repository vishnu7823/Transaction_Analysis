// src/components/BarChart.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchBarChart } from '../Services/api';
import './BarChart.css';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  // Register the necessary components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

const BarChart = ({ selectedMonth }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const loadBarChartData = async () => {
            try {
                const response = await fetchBarChart(selectedMonth);
                setChartData({
                    labels: response.data.map(item => item.range),
                    datasets: [
                        {
                            label: 'Number of Items',
                            data: response.data.map(item => item.count),
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching bar chart data:", error);
            }
        };
        loadBarChartData();
    }, [selectedMonth]);

    if (!chartData) return <p>Loading chart...</p>;

    return (
        <div className="chart-container">
            <div className="chart-title">Transactions Distribution</div>
            <Bar data={chartData} />
        </div>
    );
};

export default BarChart;
    