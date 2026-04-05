import transactionsData from "../data/transactions";

export default function Insights() {
  
  const categoryTotals = transactionsData.reduce((acc, tx) => {
    if (tx.type === "expense") {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    }
    return acc;
  }, {});

  // 🏆 TOP CATEGORY
  const topCategory = Object.entries(categoryTotals).reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max),
    ["None", 0]
  );

  // 💰 TOTALS
  const totalIncome = transactionsData
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactionsData
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="accent-text">Insights</h2>

      {/* 🏆 TOP CATEGORY */}
      <div className="glass-card" style={{ marginTop: "20px" }}>
        <h3>Top Spending Category</h3>
        <p>
          {topCategory[0]} — ₹{topCategory[1]}
        </p>
      </div>

      {/* 💰 INCOME VS EXPENSE */}
      <div className="glass-card" style={{ marginTop: "20px" }}>
        <h3>Income vs Expenses</h3>
        <p>Income: ₹{totalIncome}</p>
        <p>Expenses: ₹{totalExpense}</p>
      </div>

      {/* 📊 SMART INSIGHT */}
      <div className="glass-card" style={{ marginTop: "20px" }}>
        <h3>Observation</h3>
        <p>
          {totalExpense > totalIncome
            ? "⚠️ Your expenses are higher than income."
            : "✅ You are saving money this month!"}
        </p>
      </div>
    </div>
  );
}