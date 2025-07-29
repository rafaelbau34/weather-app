const inp = document.getElementById("inp");
const output = document.getElementById("output");
const searchBtn = document.getElementById("searchBtn");

output.classList.add("out");

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
  } catch (error) {
    alert(error);
  }
}

async function getData(city) {
  const data = await searchCity(city);
  return {
    location: data.resolvedAddress,
    conditions: data.currentConditions.conditions,
    temp: data.currentConditions.temp,
  };
}

searchBtn.addEventListener("click", async () => {
  const searchCiu = inp.value.trim();
  if (searchCiu) {
    const weather = await getData(searchCiu);
    if (weather) {
      output.innerHTML = `
        <h2>${weather.location}</h2>
        <p>Temperature: ${weather.temp}</p>
        <p>Conditions: ${weather.conditions}</p>
        `;
    }
  }
});
