import initialData from "../data/transactions";
import "./Transactions.css";
import { useState } from "react";

export default function Transactions({ role }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("asc");
  const [transactions, setTransactions] = useState(initialData);

  
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      typeFilter === "all" || tx.type === typeFilter;

    return matchesSearch && matchesType;
  });
  
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "amount") {
      return order === "asc"
        ? a.amount - b.amount
        : b.amount - a.amount;
    } else {
      return order === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
  });


  const handleDelete = (id) => {
    const updated = transactions.filter((tx) => tx.id !== id);
    setTransactions(updated);
  };

  return (
    <div className="transactions-container">
      <h2 className="accent-text">Transactions</h2>

      {/* CONTROLS */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
          }}
        />

        {/* FILTER */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
          }}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* SORT */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
          }}
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>

        {/* ORDER */}
        <button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
          {order === "asc" ? "⬆️ Ascending" : "⬇️ Descending"}
        </button>
      </div>

      {/* TABLE */}
      <div className="glass-card" style={{ marginTop: "20px" }}>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {sortedTransactions.length === 0 ? (
              <tr>
                <td colSpan={role === "admin" ? 5 : 4}>
                  No transactions found
                </td>
              </tr>
            ) : (
              sortedTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.date}</td>
                  <td>{tx.category}</td>
                  <td>₹{tx.amount}</td>
                  <td className={tx.type}>{tx.type}</td>

                  {role === "admin" && (
                    <td>
                      <button
                        style={{ background: "#ef4444" }}
                        onClick={() => handleDelete(tx.id)}  // 🔥 FIX HERE
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}