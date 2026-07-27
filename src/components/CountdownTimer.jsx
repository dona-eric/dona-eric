import React, { useState, useEffect } from "react";

// Target date set to 1 month and 1 week (37 days) from launch date (2026-07-27)
const TARGET_DATE = new Date("2026-09-02T23:59:59").getTime();

export function useCountdown(targetTimestamp = TARGET_DATE) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetTimestamp));

  function calculateTimeLeft(target) {
    const difference = target - new Date().getTime();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTimestamp));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTimestamp]);

  return timeLeft;
}

export default function CountdownTimer({ compact = false }) {
  const { days, hours, minutes, seconds } = useCountdown();

  if (compact) {
    return (
      <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "28px", fontWeight: "700", color: "#a855f7", fontFamily: "'Space Grotesk', sans-serif" }}>
          {String(days).padStart(2, '0')}j {String(hours).padStart(2, '0')}h {String(minutes).padStart(2, '0')}m {String(seconds).padStart(2, '0')}s
        </span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: "12px", justifyContent: "center", alignItems: "center", margin: "12px 0" }}>
      <div style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "12px", padding: "10px 16px", minWidth: "64px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#f8fafc", fontFamily: "'Space Grotesk', sans-serif" }}>{String(days).padStart(2, '0')}</div>
        <div style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Jours</div>
      </div>
      <span style={{ fontSize: "20px", fontWeight: "700", color: "#6366f1" }}>:</span>
      <div style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "12px", padding: "10px 16px", minWidth: "64px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#f8fafc", fontFamily: "'Space Grotesk', sans-serif" }}>{String(hours).padStart(2, '0')}</div>
        <div style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Heures</div>
      </div>
      <span style={{ fontSize: "20px", fontWeight: "700", color: "#6366f1" }}>:</span>
      <div style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "12px", padding: "10px 16px", minWidth: "64px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#f8fafc", fontFamily: "'Space Grotesk', sans-serif" }}>{String(minutes).padStart(2, '0')}</div>
        <div style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Mins</div>
      </div>
      <span style={{ fontSize: "20px", fontWeight: "700", color: "#6366f1" }}>:</span>
      <div style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "12px", padding: "10px 16px", minWidth: "64px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#ec4899", fontFamily: "'Space Grotesk', sans-serif" }}>{String(seconds).padStart(2, '0')}</div>
        <div style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Secs</div>
      </div>
    </div>
  );
}
