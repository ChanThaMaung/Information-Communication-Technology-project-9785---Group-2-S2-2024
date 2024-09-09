import {Navbar, Footer, InputPage} from './components';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [backendData, setbackendData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:3000/api');
    console.log(response.data.emitters)
  }

  useEffect(() => {
    fetchData();
  }, []);
    
  return (
    <>
      <div className="App">
        <Navbar />  
        <InputPage />
        <Footer />
      </div>
    </>
  )
}

export default App
