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
    Homicide: "🔪",
    "Sexual Assault": "🚨",
    "Domestic Violence": "🏠",
    "Human Trafficking": "🚸",
    "Drug Crime": "💊",
    "Gang Crime": "🕶️",
    March: "🚶",
    Parade: "🎉",
    Harassment: "💢",
    Terrorism: "💣",
    "Public Disruptions": "⚠️",
    "Weather Alert": "🌤️",
    "Power Outage": "🔌",
    "Gas Leak": "💨",
    "Community Alert": "📢",
    "Natural Disaster": "🌪️",
    "Missing Person": "🔍",
    "School Closure": "🏫",
    "Charity Event": "🎗️",
    "Public Safety Announcement": "📢",
    Others: "❓",
  };

  return (
    <p className="text-xs font-semibold text-zinc-600 text-right ">
      <span role="img" aria-label={type}>
        {type} {icons[type]}
      </span>
    </p>
  );
}
