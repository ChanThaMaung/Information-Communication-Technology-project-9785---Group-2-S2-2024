// import * as React from 'react';

import { PieChart } from '@mui/x-charts/PieChart';

export default function Dashboard() {

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
                    <div className="container mx-auto">
                        <a href="#" className="text-3xl text-white font-semibold font-mono">Dashboard</a>
                    </div>
                </nav>
                <div className="w-full grid grid-cols-3 gap-4">
                    <div className="bg-red-700 h-8 col-span-2 h-full">
                        {createPieChat()}
                    </div>
                    <div className="bg-slate-400 h-8">

                    </div>
                    <div className="bg-amber-300 h-screen col-span-full">

                    </div>

                </div>
            </div>
        </>
    )
}



