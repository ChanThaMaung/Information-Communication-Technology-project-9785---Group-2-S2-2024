// import * as React from 'react';

import { PieChart, BarChart } from '@mui/x-charts';
import { Link } from 'react-router-dom';

export default function Dashboard() {

  const createBarChart = () => {
    return (
      <BarChart
        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        width={500}
        height={300}
      />
    );
  }

  const createPieChat = () => {
    return (
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
              { id: 2, value: 20, label: 'series C' },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    );
  }

  return (
    <>
      <div className="w-full">
        <nav className="bg-slate-500 p-4">
          <div className="">
            <Link to={"/home"} className='text-black text-2xl p-2 bg-white'>Home</Link>
            <a href="#" className="text-3xl text-white font-semibold font-mono">Dashboard</a>
          </div>
        </nav>
        <div className="w-full grid grid-cols-3 gap-4">
          <div className="bg-red-700 text-center col-span-2 h-full">
            {createPieChat()}
          </div>
          <div className="bg-slate-400 h-full">
            {createBarChart()}
          </div>
          <div className="bg-amber-300 h-screen col-span-full">

          </div>

        </div>
      </div>
    </>
  )
}



