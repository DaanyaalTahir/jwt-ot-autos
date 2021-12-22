import React from "react";
import { numberWithCommas } from "../../../global/generalFunctions";

function ListingStats({
  trim,
  fuelType,
  mileage,
  transmission,
  vehicleCondtion,
  color,
}) {
  var statValues = [
    {
      name: "Trim",
      value: trim,
      icon: "directions_car",
    },
    {
      name: "Fuel type",
      value: fuelType,
      icon: "local_gas_station",
    },
    {
      name: "Mileage",
      value: `${numberWithCommas(mileage)} km`,
      icon: "speed",
    },
    {
      name: "Transmission",
      value: transmission,
      icon: "settings",
    },
    {
      name: "Condition",
      value: vehicleCondtion,
      icon: "flare",
    },
    {
      name: "Color",
      value: color,
      icon: "palette",
    },
  ];

  return (
    <div className="vehicle_stats card_container">
      {statValues.map((stat) => {
        return (
          <div className="stat">
            <div className="stat_icon">
              <span className="material-icons-outlined">{stat.icon}</span>
            </div>
            <div className="stat_content">
              <div className="stat_value">{stat.value}</div>
              <div className="stat_name">{stat.name}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListingStats;
