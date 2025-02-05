const getWeather = () => {
  try {
    let weather;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        },
        (err) => setError("Location access denied")
      );
      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`
      )
        .then((response) => {
          response.json();
        })
        .then((data) => {
          weather = data;
        })
        .catch((err) => setError("Failed to fetch weather"));
    } else {
      throw new Error("Geolocation is not supported by your browser.");
    }
  } catch (error) {
    console.error(error.message + "Error in getWeather Function");
  }
};
