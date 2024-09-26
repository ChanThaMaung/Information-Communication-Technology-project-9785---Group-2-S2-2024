import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const data = [
  { value: 40  },  // Orange color for the 40% segment
  { value: 60 },  // Light gray color for the 60% segment
];

const size = {
  width: 300,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 40,
  fontWeight: 'thin',
  fontFamily: 'monospace',
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel() {
  return (
    <PieChart 
      series={[{ 
        data, 
        innerRadius: 80,
        highlightScope: { faded: 'none', highlighted: 'none' },
      }]} 
      slotProps={{
        legend: { hidden: true },
      }}
      tooltip={{ trigger: 'none' }}
      {...size}
    >
      <PieCenterLabel>~40%</PieCenterLabel>
    </PieChart>
  );
}