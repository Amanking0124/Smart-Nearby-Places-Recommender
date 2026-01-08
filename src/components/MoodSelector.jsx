const moods = ["Work", "Date", "Quick Bite", "Budget"];

export default function MoodSelector({ setMood }) {
  return (
    <div>
      <h2>Select Your Mood</h2>
      {moods.map(mood => (
        <button
  className={`mood-btn ${mood === "work" ? "active" : ""}`}
  onClick={() => setMood("work")}
>
  💻 Work
</button>
      ))}
    </div>
  );
}
