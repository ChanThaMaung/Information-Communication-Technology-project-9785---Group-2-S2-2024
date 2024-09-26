function Navbar({ type }) {
    return (
        <div className="navbar">
            <div className="flex mb-4">
                <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#transactions">View All Transactions</a></li>
                {type === 'issuer' || type === 'emitter' ? (
                    <li><a href="#create-transaction">Create a new transaction</a></li>
                ) : null}
            </ul>
        </div>
    )
}

export default Navbar;