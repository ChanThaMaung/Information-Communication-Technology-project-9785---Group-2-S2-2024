import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center h-screen">
        <h1 className="text-2xl">Page Not Found</h1>
        <p className="text-lg">Oops! It seems the page you are looking for does not exist.</p>
        <Link to="/" className="text-blue-500 underline">Go back to Home</Link>
    </div>
  )
}
