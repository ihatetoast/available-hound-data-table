import { useEffect, useState } from 'react'

import {galtDogs} from './data/dogData';

import Header from './components/Header'
import Table from './components/Table'
import CardModal from './components/CardModal'

// simulated db query
const fetchHoundsData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(galtDogs);
    }, 500); // increase this for testing loading.
  });
};

function App() {
  // have a delay to fetch the data as though I'm getting it from the db fairies.
  const [isLoading, setIsLoading] = useState(true);
  const [dogData, setDogData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDog, setSelectedDog] = useState(null); // hardcoded while making the card
  const [expandable, setExpandable] =  useState(false);



// have a load more? there are 20 dogs. load 5. pagination?
// load all for now. 

useEffect(() => {
  const loadHounds = async () => {
    try {
      setIsLoading(true);
      const data = await fetchHoundsData();
      setDogData(data);
    }
    catch(err){
      console.log(err);
      setError('Failed to load hound data.');
    }
    finally {
      setIsLoading(false);
    }
  }
  loadHounds();
}, [])

  function handleRowClick(dog){
    setSelectedDog(dog);
  }

  function handleCloseModal(){
    setSelectedDog(null);
  }

  return (
    <>
    <Header title="Available Greyhounds">
      <p>These are the greyhounds currently in the care of Greyhound Adoption League of Texas (GALT). Click on a hound to learn more.</p>
      <p>Click on the button to view the details as an expanded drawer or as a modal. </p>
      {!isLoading && !error && <button onClick={()=>{setExpandable(prev => !prev)}}>{expandable ? "Switch to separate card mode" : "Switch to accordion mode"}</button>}
    </Header>
      {isLoading && <p>Loading ... MAKE A LOADING COMPONENT</p>}
      {error && <p>Uh oh. {error}</p>}
      {!isLoading && !error && <Table dogData={dogData} expandable={expandable} onRowClick={handleRowClick}/>}
      { selectedDog && !expandable && <CardModal selectedDogData={selectedDog} handleCloseModal={handleCloseModal}/>}
    </>
  )
}

export default App
