export default function EventTypeIcon({ type }) {
  const icons = {
    Wildfire: "🔥",
    Flood: "🌊",
    Earthquake: "🌍",
    Tornado: "🌪️",
    Hurricane: "🌀",
    Blizzard: "❄️",
    Heatwave: "🔥",
    Drought: "🏜️",
    Tsunami: "🌊",
    Volcano: "🌋",
    Landslide: "🏞️",
    Robbery: "💰",
    Shooting: "🔫",
    Assault: "👊",
    "Car Accident": "🚗",
    Fire: "🔥",
    Explosion: "💥",
    Other: "🚨",
    Construction: "👷🏽",
    Vandalism: "🌌",
    Kidnapping: "👶",
    Roadblock: "🚧",
    Traffic: "🚦",
    Theft: "🦝",
    "Suspicious Activity": "🕵️",
    Protest: "📢",
  };

  return (
    <p className="text-sm text-zinc-600 text-right ">
      <span role="img" aria-label={type}>
        {type} {icons[type]}
      </span>
    </p>
  );
}
