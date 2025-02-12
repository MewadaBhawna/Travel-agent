const worker = async (messages) => {
  const workerURL = "https://openai-api-worker.bhawnaislive.workers.dev/";
  const response = await fetch(workerURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  });
  const data = await response.json();
  return data;
};

export const getWeather = async (data) => {
  try {
    const value = JSON.parse(data);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value.city}&appid=${apikey}`
    );
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error(error.message + "Error in getWeather Function");
  }
};

export const generateItinerary = async (city, startDate, endDate) => {
  const prompt = `
      Based on the travel dates from ${startDate} to ${endDate} in ${city}, generate a day-by-day itinerary.
      Include major attractions and activities for each day.
    `;

  const messages = [
    {
      role: "system",
      content: "You are a travel agent who creates day-by-day itineraries.",
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  const data = await worker(messages);
  return data;
};

export const findFlights = async (from, to, budget) => {
  const prompt = `
      Based on the given budget of ${budget} NOK, please find flight options from ${from} to ${to}.
      return flight numbers, airlines, departure and arrival times, and price in object.if you find no flights in budget return 'Sorry ! Not in your budget'. if flights are not available return 'Flights not found'.
    `;
  const messages = [
    {
      role: "system",
      content: `You are a travel agent who suggests the best 2 flight options. Consider following cases
        1.if to and from are not correct return response for example  {flights: 'Flights not found' }
        2.if you find no flights in given budget just return response for example { flights: 'Sorry ! Not in your budget'}. 
        3.if flights are not available  return  response for example  {flights: 'Flights not found' } 
        4.return response if details are correct for example {flights: [
          {
            flightNumber: "AB123",
            airline: "Air Norway",
            departure: "2025-02-26 08:00",
            arrival: "2025-02-26 10:00",
            price: "2000 NOK",
          },
          {
            flightNumber: "XY456",
            airline: "Norwegian Air",
            departure: "2025-02-26 09:00",
            arrival: "2025-02-26 11:00",
            price: "2500 NOK",
          },
      ]}`,
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  const data = await worker(messages);
  return data;
};

export const findHotels = async (city, budget, traveller) => {
  const prompt = `
      Based on the budget of ${budget} NOK, find suitable hotel options in ${city} for ${traveller} traveller.
    `;
  const messages = [
    {
      role: "system",
      content: `You are a travel agent who suggests the best 2 hotel options. Consider 3 cases
        1.if you find no hotels in budget return 'Sorry ! Not in your budget'. 
        2.if hotels are not available return 'Hotels not found'
        3.return response for example
        {
        hotels: [
          {
            name: "Hotel Oslo",
            price: "1500 NOK",
            rating: 4.5,
            location: "Central Oslo",
          },
          {
            name: "Radisson Blu",
            price: "2000 NOK",
            rating: 4.0,
            location: "Oslo Airport",
          },
        ]}`,
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  const data = await worker(messages);
  return data;
};

export const tools = [
  {
    type: "function",
    function: {
      function: getWeather,
      description: "Fetches short weather forecast for a destination city.",
      parameters: {
        type: "object",
        properties: {
          city: { type: "string", description: "Destination city" },
        },
      },
      required: ["city"],
    },
  },
  {
    type: "function",
    function: {
      function: findFlights,
      description: "Finds best flight options based on budget.",
      parameters: {
        type: "object",
        properties: {
          from: { type: "string", description: "Departure city" },
          to: { type: "string", description: "Destination city" },
          budget: { type: "number", description: "Travel budget" },
        },
      },
      required: ["from", "to", "budget"],
    },
  },
  {
    type: "function",
    function: {
      function: findHotels,
      description: "Finds best hotel options based on budget.",
      parameters: {
        type: "object",
        properties: {
          city: { type: "string", description: "Destination city" },
          budget: { type: "number", description: "Travel budget" },
          traveller: { type: "number", description: "number of traveller" },
        },
      },
      required: ["city", "budget"],
    },
  },
  {
    type: "function",
    function: {
      function: generateItinerary,
      description: "Creates a day-wise travel itinerary  as per weather.",
      parameters: {
        type: "object",
        properties: {
          city: { type: "string", description: "Destination city" },
          startDate: { type: "string", description: "Travel start date" },
          endDate: { type: "string", description: "Travel end date" },
        },
      },
      required: ["city", "startDate", "endDate"],
    },
  },
];

export const content = `You are an intelligent travel agent designed to create the best and most affordable travel itinerary plans based on user preferences. 
which includes 
1.to run weather function for destination city and frame combine short weather forecast for travel duration in 30 words.
2.Suggest best flight option as per budget and no of traveller
3.Suggest best hotel  as per budget and no of traveller
4.day wise plan with activities as per weather and budget - it should be short and precise


generate final output (considering budget, weather, duration and number of travellers)in format as mentioned below
{
weather: "short weather forecast for travel duration in 30 word",
flights: [{
            flightNumber: "AB123",
            airline: "Air Norway",
            departure: "2025-02-26 08:00",
            arrival: "2025-02-26 10:00",
            price: "2000 NOK",
          },
          {
            flightNumber: "XY456",
            airline: "Norwegian Air",
            departure: "2025-02-26 09:00",
            arrival: "2025-02-26 11:00",
            price: "2500 NOK",
          }],
 hotels: [
          {
            name: "Hotel Oslo",
            price: "1500 NOK",
            rating: 4.5,
            location: "Central Oslo",
          },
          {
            name: "Radisson Blu",
            price: "2000 NOK",
            rating: 4.0,
            location: "Oslo Airport",
          },
        ],
 itinerary: [{day-1 : activites},{day-2 : activites}, ]                  }
`;
