const WeeklyMoodChart = ({ moods }) => {
  return (
    <div className="card">
      <h3>📊 Weekly Mood Trend</h3>
      <ul>
        {moods.map((m, i) => (
          <li key={i}>
            {new Date(m.date).toDateString()} → {m.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyMoodChart;
