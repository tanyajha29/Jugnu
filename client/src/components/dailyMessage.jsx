const DailyMessage = ({ message }) => {
  return (
    <div className="card highlight">
      <h3>🌤 Daily Message</h3>
      <p>{message}</p>
    </div>
  );
};

export default DailyMessage;
