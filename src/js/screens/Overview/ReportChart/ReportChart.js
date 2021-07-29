import React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import styles from './ReportChart.module.scss';

export const ReportChart = ({ data, barColor }) => {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart
        data={data}>
        <XAxis 
        dataKey="date" 
        tickLine={{ stroke: 'transporent' }} 
        axisLine={{ stroke: 'transporent' }}
        tick={{fill: styles.tickStroke, fontWeight: 600, fontSize: 12}}
        />
        <Tooltip />
        <Bar
          dataKey="amount"
          fill={barColor}
          stackId="a"
          barSize={12}
          radius={3}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
