import { useEffect, useState } from "react";
import "./App.css";

const modes = {
  Focus: 25 * 60,
  "Short Break": 5 * 60,
  "Long Break": 15 * 60,
};

function App() {
  const [mode, setMode] = useState("Focus");
  const [time, setTime] = useState(modes.Focus);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (time !== 0 || !isRunning) return;

    setIsRunning(false);

    if (mode === "Focus") {
      setSessions((prev) => prev + 1);
    }
  }, [time, isRunning, mode]);

  const changeMode = (newMode) => {
    setMode(newMode);
    setTime(modes[newMode]);
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(modes[mode]);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  return (
    <div className="app">
      <main className="timer-card">
        <h1>Focus Timer</h1>
        <p className="subtitle">Focus on what matters.</p>

        <div className="mode-buttons">
          {Object.keys(modes).map((item) => (
            <button
              key={item}
              className={mode === item ? "active" : ""}
              onClick={() => changeMode(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="timer">{formatTime(time)}</div>

        <div className="controls">
          <button
            className="start-button"
            onClick={() => setIsRunning(!isRunning)}
            disabled={time === 0}
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <button className="reset-button" onClick={resetTimer}>
            Reset
          </button>
        </div>

        <p className="sessions">
          Completed focus sessions: <strong>{sessions}</strong>
        </p>
      </main>
    </div>
  );
}

export default App;
