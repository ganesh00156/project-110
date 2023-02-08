import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
export const options = {
  title: "Graphical display",
};

const Gpsdata = ({ pieData }) => {
  // const mapData = values.map((item) => [item.key, item.value]);
  // data.push(mapData);

  console.log(pieData);
  return (
    <>
      <Chart
        chartType="PieChart"
        data={pieData}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </>
  );
};

export default Gpsdata;
