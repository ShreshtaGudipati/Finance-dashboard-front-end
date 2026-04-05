import transactionsData from "../data/transactions";
import { PieChart, Pie, Cell, Legend } from "recharts";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  
  const totalIncome = transactionsData
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactionsData
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // ✅ CHART DATA
  const chartData = transactionsData.map((tx) => ({
    date: tx.date,
    amount: tx.amount,
  }));

  const categoryData = Object.values(
    transactionsData.reduce((acc, tx) => {
      if (!acc[tx.category]) {
        acc[tx.category] = { name: tx.category, value: 0 };
      }
      acc[tx.category].value += tx.amount;
      return acc;
    }, {})
  );

  const COLORS = ["#6366f1", "#7c3aed", "#22c55e", "#ef4444"];

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="accent-text">Dashboard</h2>

      {/* 🔥 SUMMARY CARDS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <div className="glass-card">
          <h3>Total Balance</h3>
          <p>₹{balance}</p>
        </div>

        <div className="glass-card">
          <h3>Income</h3>
          <p style={{ color: "#22c55e" }}>₹{totalIncome}</p>
        </div>

        <div className="glass-card">
          <h3>Expenses</h3>
          <p style={{ color: "#ef4444" }}>₹{totalExpense}</p>
        </div>
      </div>

      {/* LINE CHART */}
      <div
        className="glass-card"
        style={{ marginTop: "20px", height: "300px" }}
      >
        <h3>Spending Trend</h3>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#7c3aed"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div
  className="glass-card"
  style={{ marginTop: "20px", height: "300px" }}
>
  <h3>Category Breakdown</h3>

  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={categoryData}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
        label
      >
        {categoryData.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>
    </div>
  );
}