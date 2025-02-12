import { getWeather, getFlights, getHotels, content } from "./utils";

const availableFunctions = { getWeather, getFlights, getHotels };

const messages = [{ role: "system", content }];

const agent = (formdata) => {};

export default agent;
