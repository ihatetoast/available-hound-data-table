import { useEffect, useState } from 'react';

import { galtDogs } from './data/dogData';

import Header from './components/Header';
import Table from './components/Table';
import CardModal from './components/CardModal';

// simulated db query
const fetchHoundsData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(galtDogs);
    }, 500); // increase this for testing loading component.
  });
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [dogData, setDogData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDog, setSelectedDog] = useState(null);
  const [expandable, setExpandable] = useState(false);
  const [dotsOnHorizontal, setDotsOnHorizontal] = useState(false);


  useEffect(() => {
    const loadHounds = async () => {
      try {
        setIsLoading(true);
        const data = await fetchHoundsData();
        setDogData(data);
      } catch (err) {
        console.log(err);
        setError('Failed to load hound data.');
      } finally {
        setIsLoading(false);
      }
    };
    loadHounds();
  }, []);

  function handleRowClick(dog) {
    if(selectedDog?.id === dog.id){
      console.log("you need to unselect the dog");
      setSelectedDog(null);
    } else {
      console.log("you need to select the dog");
          setSelectedDog(dog);
    }

  }

  function handleCloseModal() {
    setSelectedDog(null);

  }

  return (
    <>
      <Header title="GALT's Greyhounds">
        <p>
          These are the greyhounds currently in the care of Greyhound Adoption
          League of Texas (GALT). Click on a hound to learn more.</p>
          <p><strong><span className="warning">NOTE:</span> Hounds recently adopted or on the injured reserved (IR) list appear as unavailable until they're either removed from IR or their adoption probationary period has lapsed and are removed entirely.</strong> </p>
        
        {!isLoading && !error && (
          <div className="header-btns-container">
          <button
            className="header-btn"
            onClick={() => {
              setExpandable((prev) => !prev);
              setSelectedDog(null);
            }}
          >
            {expandable
              ? 'Switch to modal mode'
              : 'Switch to accordion mode'}
          </button>
          <button
            className="header-btn"
            onClick={() => {
              setDotsOnHorizontal((prev) => !prev);
              setSelectedDog(null);
            }}
          >
            {dotsOnHorizontal
              ? 'Switch to arrows on horizontal'
              : 'Switch to dots on horizontal'}
          </button>
          </div>
        )}
      </Header>
      <main>
        {isLoading && <p>Loading ... MAKE A LOADING COMPONENT</p>}
        {error && <p>Uh oh. {error}</p>}
        {!isLoading && !error && (
          <Table
            dogData={dogData}
            expandable={expandable}
            selectedDog={selectedDog}
            onRowClick={handleRowClick}
          />
        )}
      </main>
      {selectedDog && !expandable && (
        <CardModal
          selectedDogData={selectedDog}
          handleCloseModal={handleCloseModal}
          dotsOnHorizontal={dotsOnHorizontal}
        />
      )}
    </>
  );
}

export default App;
