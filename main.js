const inp = document.getElementById("inp");
const output = document.getElementById("output");
const searchBtn = document.getElementById("searchBtn");

let lastWeatherData = null;

async function searchCity(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}
      ?key=UZNCUXBJNV6N9DJMKYP4WKXE9`,
      {
        mode: "cors",
      }
    );
    const weatherData = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return weatherData;
  } catch {
    alert("This place doesn't exist. At least not in our database.");
  }
}

function toC(f) {
  return ((f - 32) * 5) / 9;
}

async function getData(city) {
  const data = await searchCity(city);
  const f = data.currentConditions.temp;
  const c = toC(f);

  return {
    location: data.resolvedAddress,
    conditions: data.currentConditions.conditions,
    tempF: f.toFixed(1),
    tempC: c.toFixed(1),
  };
}

function updateDisplay() {
  if (!lastWeatherData) return;

  const unit = document.querySelector('input[name="unit"]:checked').value;
  const temp =
    unit === "c"
      ? `${lastWeatherData.tempC} C°`
      : `${lastWeatherData.tempF} F°`;
  output.innerHTML = `
        <h2>${lastWeatherData.location}</h2>
        <p>Temperature: ${temp}</p>
        <p>Conditions: ${lastWeatherData.conditions}</p>
        `;
}

searchBtn.addEventListener("click", async () => {
  const searchCiu = inp.value.trim();
  if (!searchCiu) return;
  lastWeatherData = await getData(searchCiu);
  updateDisplay();
});

document.querySelectorAll('input[name="unit"]').forEach((unit) => {
  unit.addEventListener("change", updateDisplay);
});
