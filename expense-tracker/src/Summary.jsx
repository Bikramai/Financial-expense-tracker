function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const fmt = (n) =>
    '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="summary">
      <div className="summary-card income-card">
        <h3>Income</h3>
        <p className="income-amount">{fmt(totalIncome)}</p>
      </div>
      <div className="summary-card expense-card">
        <h3>Expenses</h3>
        <p className="expense-amount">{fmt(totalExpenses)}</p>
      </div>
      <div className={`summary-card balance-card ${balance >= 0 ? 'positive' : 'negative'}`}>
        <h3>Balance</h3>
        <p className={`balance-amount${balance < 0 ? ' negative' : ''}`}>
          {balance < 0 ? '−' : ''}{fmt(balance)}
        </p>
      </div>
    </div>
  );
}

export default Summary
