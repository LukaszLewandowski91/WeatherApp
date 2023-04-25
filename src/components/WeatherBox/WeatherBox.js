import PickCity from "../PickCity/PickCity";
import WeatherSummary from "../WeatherSummary/WeatherSummary";
import Loader from "../Loader/Loader";
import { useCallback, useState } from "react";

const WeatherBox = (props) => {
  const [weather, setWeather] = useState("");
  const handleCityChange = useCallback(
    (city) => {
      console.log(city);
      fetch(
        `http://api.weatherapi.com/v1/current.json?key=e1f9864192514b8691f164842232504&q=${city}&aqi=no`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const weatherData = {
            city: data.location.name,
            temp: data.current.temp_c,
            icon: data.current.condition.icon,
            description: data.current.condition.text,
          };
          setWeather(weatherData);
        });
    },
    [weather]
  );
  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary {...weather} />
      <Loader />
    </section>
  );
};

export default WeatherBox;
