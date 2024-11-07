// src/App.js
import React, { useState } from 'react';
import TransactionsTable from './Components/TransactionsTable';
import Statistics from './Components/Statistics';
import BarChart from './Components/BarChart';
import "./App.css"

const App = () => {
    const [selectedMonth, setSelectedMonth] = useState("March");

    // const handleMonthChange = (e) => {
    //     setSelectedMonth(e.target.value);
    // };

    const handleMonthChange = (event) => {
        const selectedMonth = event.target.value;
        console.log('Selected Month:', selectedMonth); // Check if the month changes
        setSelectedMonth(selectedMonth);
      };

    return (
        <div>
            <h1>Transactions Analysis</h1>
            <div>
                <label htmlFor="month">Select Month:</label>
                <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                        .map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                </select>
            </div>
            <Statistics selectedMonth={selectedMonth} />
            <TransactionsTable selectedMonth={selectedMonth} />
            <BarChart selectedMonth={selectedMonth} />
        </div>
    );
};

export default App;
