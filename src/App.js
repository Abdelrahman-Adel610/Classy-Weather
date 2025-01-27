import React from "react";
import { convertToFlag } from "./Utilities";
import { Card } from "./Card";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: localStorage.getItem("location") || "",
      isLoading: false,
      country: "",
      weather: {},
    };
    this.getWeather = this.getWeather.bind(this);
  }
  async getWeather() {
    try {
      this.setState({ isLoading: true });
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({ country: `${name} ${convertToFlag(country_code)}` });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }
  componentDidMount = () => {
    this.setState({ location: localStorage.getItem("location") || "" });
    this.getWeather();
  };
  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <input
          placeholder="Search for Location"
          value={this.state.location}
          onChange={(e) => {
            this.setState({ location: e.target.value });
            if (e.target.value.length <= 2)
              return this.setState({ weather: {} });
            this.getWeather();
            localStorage.setItem("location", e.target.value);
          }}
        />
        {this.state.isLoading ? <p>Loading...</p> : ""}
        {this.state.weather.weathercode && (
          <>
            <h2>Weather {this.state.country}</h2>
            <ul className="weather">
              {this.state.weather.temperature_2m_min.map((el, i) => (
                <Card
                  weathercode={this.state.weather.weathercode[i]}
                  time={this.state.weather.time[i]}
                  min={el}
                  max={this.state.weather.temperature_2m_max[i]}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
}
export default App;
