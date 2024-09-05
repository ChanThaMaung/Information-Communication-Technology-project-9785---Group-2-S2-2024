// import * as React from 'react';

import { PieChart, LineChart } from '@mui/x-charts';
import { Link } from 'react-router-dom';

export default function Dashboard() {

  const tableData = [
    {
      "id": 1,
      "Amount": 1500,
      "Timestamp": "",
      "End_Date": "10/10/25",
      "Status": "true",
    },
    {
      "id": 2,
      "Amount": 1500,
      "Timestamp": "",
      "End_Date": "10/10/25",
      "Status": "true",
    },
    {
      "id": 3,
      "Amount": 1500,
      "Timestamp": "",
      "End_Date": "10/10/25",
      "Status": "true",
    },
    {
      "id": 4,
      "Amount": 1500,
      "Timestamp": "",
      "End_Date": "10/10/25",
      "Status": "true",
    },
    {
      "id": 5,
      "Amount": 1500,
      "Timestamp": "",
      "End_Date": "10/10/25",
      "Status": "true",
    },
    {
      "id": 6,
      "Amount": 1500,
      "Timestamp": "",
      "End_Date": "10/10/25",
      "Status": "true",
    },
  ]

  const createLineChart = () => {

    var uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    var xLabels = [
      'Page A',
      'Page B',
      'Page C',
      'Page D',
      'Page E',
      'Page F',
      'Page G',
    ];
    return (
      <LineChart
        width={500}
        height={300}
        series={[
          { data: uData, label: 'uv' },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
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
            <Link to={"/home"} className='text-black text-2xl p-2 bg-white rounded'>Home</Link>
          </div>
        </nav>

        <div className="w-full grid grid-cols-4">
          <div className="text-center col-span-1 h-full">
            <div className="sidebar border-r border-gray-300 md:col-span-3 lg:col-span-2 p-0 bg-gray-100">
              <div className="fixed md:static top-0 right-0 bg-gray-100 w-64 h-screen transform md:translate-x-0 transition-transform" id="sidebarMenu">
                <div className="flex justify-between items-center p-4">
                  <h5 className="text-lg font-semibold">Dashboard</h5>
                  <button type="button" className="text-gray-500" aria-label="Close" >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
                <div className="flex flex-col p-0 pt-4 overflow-y-auto">
                  <ul className="flex flex-col">
                    <li className="nav-item">
                      <a className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200" href="#">
                        <svg className="w-5 h-5"><use xlinkHref="#file-earmark"></use></svg>
                        Orders
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200" href="#">
                        <svg className="w-5 h-5"><use xlinkHref="#cart"></use></svg>
                        Products
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200" href="#">
                        <svg className="w-5 h-5"><use xlinkHref="#people"></use></svg>
                        Customers
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200" href="#">
                        <svg className="w-5 h-5"><use xlinkHref="#graph-up"></use></svg>
                        Reports
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200" href="#">
                        <svg className="w-5 h-5"><use xlinkHref="#puzzle"></use></svg>
                        Integrations
                      </a>
                    </li>
                  </ul>

                  <h6 className="flex justify-between items-center px-4 mt-4 mb-1 text-sm text-gray-500 uppercase">
                    <span>Saved reports</span>
                    <a className="text-gray-500" href="#" aria-label="Add a new report">
                      <svg className="w-5 h-5"><use xlinkHref="#plus-circle"></use></svg>
                    </a>
                  </h6>
                  <ul className="flex flex-col mb-auto">
                    <li className="nav-item">
                      <a className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200" href="#">
                        <svg className="w-5 h-5"><use xlinkHref="#file-earmark-text"></use></svg>
                        Current month
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200" href="#">
                        <svg className="w-5 h-5"><use xlinkHref="#file-earmark-text"></use></svg>
                        Last quarter
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200" href="#">
                        <svg className="w-5 h-5"><use xlinkHref="#file-earmark-text"></use></svg>
                        Social engagement
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200" href="#">
                        <svg className="w-5 h-5"><use xlinkHref="#file-earmark-text"></use></svg>
                        Year-end sale
                      </a>
                    </li>
                  </ul>

                  <hr className="my-3" />

                  <ul className="flex flex-col mb-auto">
                    <li className="nav-item">
                      <a className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200" href="#">
                        <svg className="w-5 h-5"><use xlinkHref="#gear-wide-connected"></use></svg>
                        Settings
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200" href="#">
                        <svg className="w-5 h-5"><use xlinkHref="#door-closed"></use></svg>
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
          <div className=" h-full col-span-3 grid grid-cols-2">
            <div className="w-full col-span-1 gap-3">
              {createPieChat()}
            </div>
            <div className="w-full grid-cols-1 gap-3 ">
              {createLineChart()}
            </div>
            <div className='col-span-full'>
              <hr className='my-2' />
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">#</th>
                    <th className="border border-gray-300 px-4 py-2">Amount</th>
                    <th className="border border-gray-300 px-4 py-2">Timestamp</th>
                    <th className="border border-gray-300 px-4 py-2">End Date</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map(item => (
                    <tr key={item.id}>
                      <th className="border border-gray-300 px-4 py-2">{item.id}</th>
                      <th className="border border-gray-300 px-4 py-2">{item.Amount}</th>
                      <td className="border border-gray-300 px-4 py-2">{item.End_Date}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.Status}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.Timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}



