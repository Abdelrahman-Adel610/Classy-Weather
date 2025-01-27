import React from "react";
import { getWeatherIcon, formatDay } from "./Utilities";

export class Card extends React.Component {
  render() {
    console.log(this.props);

    return (
      <div className="day">
        <span>{getWeatherIcon(this.props.weathercode)}</span>
        <p>{formatDay(this.props.time)}</p>
        <p>
          {this.props.min}&deg; &mdash;
          {this.props.max}&deg;
        </p>
      </div>
    );
  }
}
