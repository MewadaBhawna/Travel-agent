export const getWeather = async () => {
  try {
    let weather;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const apikey = "965a5be4709e223e8472575318a25db7";
          console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        },
        (err) => setError("Location access denied")
      );
      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
      )
        .then((response) => {
          response.json();
        })
        .then((data) => {
          weather = data;
        })
        .catch((err) => setError("Failed to fetch weather"));

      return weather;
    } else {
      throw new Error("Geolocation is not supported by your browser.");
    }
  } catch (error) {
    console.error(error.message + "Error in getWeather Function");
  }
};

export const getFlights = async (data) => {};

export const getHotels = async (data) => {};

export const getActivities = async (data) => {};

export const tools = [
  {
    type: "function",
    function: {
      function: getWeather,
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      function: getFlights,
      parse: JSON.parse, // or use a validation library like zod for typesafe parsing.
      parameters: {
        type: "object",
        properties: {
          cities: { type: "string" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      function: getHotels,
      parse: JSON.parse, // or use a validation library like zod for typesafe parsing.
      parameters: {
        type: "object",
        properties: {
          cities: { type: "string" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      function: getActivities,
      parse: JSON.parse, // or use a validation library like zod for typesafe parsing.
      parameters: {
        type: "object",
        properties: {
          cities: { type: "string" },
        },
      },
    },
  },
];

export const content = `You are an intelligent travel agent designed to create the best and most affordable travel plans based on user preferences.
Your goal is to generate concise, well-structured, and budget-friendly recommendations that enhance the travel experience.
Input Parameters:
Number of Travelers - Total people in the group
Travel Dates - Start and end dates of the trip
Destinations - List of cities to visit
Budget -Total budget for the trip

Output Format:
A structured travel itinerary that includes:
Flight details (airline, price estimate, duration)
Hotel recommendations (name, location, price range)
Activities & Attractions (brief descriptions, cost estimates if applicable)
Weather forecast summary
The response should be clear, concise, and actionable, ensuring users can quickly review and finalize their trip.`;
