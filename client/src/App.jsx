import {Navbar, Footer, InputPage} from './components';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  // const [backendData, setbackendData] = useState([]);

  const fetchData = async () => {
    const emitterData = await axios.get('http://localhost:3000/emitter');
    const issuerData = await axios.get('http://localhost:3000/issuer');
    const verifierData = await axios.get('http://localhost:3000/verifier');
    console.log(emitterData, issuerData, verifierData);
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
