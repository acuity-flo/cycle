import React from 'react';
import PeriodChart from '../dataVis/PeriodChart';

export default function ChartHome() {
  return (
    <div>
      <h2>HOME OF CHARTS</h2>
      <br />
      <br />
      <PeriodChart />
      <br />
      <p>click here to see your period data</p>
      <br />
      <h4>symptoms chart</h4>
      <br />
      <p>click here to see your symptoms data</p>
      <br />
      <h4>financial chart</h4>
      <br />
      <p>click here to see your financial data</p>
      <br />
    </div>
  );
}
