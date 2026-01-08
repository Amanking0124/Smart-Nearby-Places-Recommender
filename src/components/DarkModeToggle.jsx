export default function DarkModeToggle({ dark, setDark }) {
  return (
    <button className="dark-toggle" onClick={() => setDark(!dark)}>
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
