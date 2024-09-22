import { LineChart } from '@mui/x-charts/LineChart';
import { Link } from "react-router-dom"

export default function DashBoardforEmitter() {


    const BasicLineChart = () => {
        return (
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                    {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                ]}
                width={500}
                height={300}
            />
        );
    }


    return (
        <>
            <div className="relative right-0 left-0 top-0 z-50 w-full h-fit bg--gradientDB place-content-center">
                <div className=" text-center p-10">
                    <h1 className="text-6xl font-semibold font-mono text-white">Blockchain Payment</h1>
                </div>
                <div className=" w-4/5  p-4 md:block ml-8">
                    <h5 className="text-white font-mono text-lg ">Explore the Future of Finance: Buy, Sell, and Manage Your Cryptocurrency Portfolio with Confidence and Security</h5>
                </div>
                <div className="md:block">
                    <nav className="flex p-4 w-full place-content-between bg-black">
                        <div className="hidden md:flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
                            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                                <li className="text-cyan-600 text-xl p-1">
                                    <Link className="font-semibold" to={"/"}>Home</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="hidden md:flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
                            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                                <li className="text-white hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                                    <Link to={"/signIn"}>Public Data Dashboard</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="hidden md:flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
                            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                                <li className="text-white hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                                    <Link to={"/signIn"}>Sign In</Link>
                                </li>
                                <li className="rounded text-white text-lg p-1 bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    <Link to={"/signUp"}>Sign Up</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-2 flex-col border">
                    <ul className="flex flex-col gap-5 mt-2">
                        <li className="nav-item flex items-center gap-2 px-4 py-2">
                            <h1 className="text-2xl ">Dashboard</h1>
                        </li>
                        <li className="nav-item items-center gap-2 px-4 py-2">
                            <button className="bg-black text-white p-4 w-4/5 rounded">
                                Connect
                            </button>
                        </li>
                        <li className="nav-item flex items-center gap-2 px-4 py-2">
                            View all transactions
                        </li>
                        <li className="nav-item flex items-center gap-2 px-4 py-2">
                            Create transactions
                        </li>
                    </ul>
                </div>
                <div className="col-span-3 w-full border p-3">
                    <div className="">
                        <h2 className="text-3xl mx-2">Carbon Credits Dashboard</h2>
                    </div>
                    <div className="grid grid-cols-4 gap-9 mt-6 justify-around">
                        <div className="col-span-1 w-full border">
                            <div className="">
                                <h3 className="text-xl">
                                    Total Carbon Credits
                                </h3>
                            </div>
                            <div className="">
                                <p className="lg">1500</p>
                            </div>
                        </div>
                        <div className="col-span-3 border">
                            <div className="">
                                <h3 className="text-2xl">
                                    Carbon Credits Over Time
                                </h3>
                            </div>
                            <div className="">
                                {BasicLineChart()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
