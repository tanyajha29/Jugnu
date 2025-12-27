const MoodCard = ({ currentPhase }) => {
  return (
    <div className="card">
      <h3>🧠 Current Phase</h3>
      <p>{currentPhase || "Not set yet"}</p>
    </div>
  );
};

export default MoodCard;
