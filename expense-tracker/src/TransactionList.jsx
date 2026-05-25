import { useState } from 'react'

function TransactionList({ transactions, categories = [], onDelete }) {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  let filtered = transactions;
  if (filterType !== 'all') filtered = filtered.filter(t => t.type === filterType);
  if (filterCategory !== 'all') filtered = filtered.filter(t => t.category === filterCategory);

  const fmt = (n) =>
    '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleDelete = (id) => {
    if (onDelete) onDelete(id);
    setPendingDeleteId(null);
  };

  return (
    <div className="transactions">
      <div className="transactions-header">
        <p className="section-label" style={{ marginBottom: 0 }}>Transactions</p>
        <div className="filters">
          <select
            className="filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            className="filter-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="transactions-table-wrap">
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(t => (
            <tr key={t.id}>
              <td><span className="tx-date">{t.date}</span></td>
              <td><span className="tx-description">{t.description}</span></td>
              <td><span className={`category-pill cat-${categories.includes(t.category) ? t.category : 'unknown'}`}>{t.category}</span></td>
              <td>
                <span className={`tx-amount ${t.type}`}>
                  {t.type === 'income' ? '+' : '−'}{fmt(t.amount)}
                </span>
              </td>
              <td>
                {pendingDeleteId === t.id ? (
                  <span className="delete-confirm">
                    <button className="confirm-yes-btn" onClick={() => handleDelete(t.id)}>Yes</button>
                    <button className="confirm-no-btn" onClick={() => setPendingDeleteId(null)}>No</button>
                  </span>
                ) : (
                  <button
                    className="delete-btn"
                    onClick={() => setPendingDeleteId(t.id)}
                    title="Delete transaction"
                    aria-label="Delete transaction"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14H6L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4h6v2" />
                    </svg>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default TransactionList
