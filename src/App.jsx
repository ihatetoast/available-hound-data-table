import { useEffect, useState } from 'react';

import { galtDogs } from './data/dogData';
import { getAgeInYears } from './helpers';

import Header from './components/Header';
import Table from './components/Table';
import CardModal from './components/CardModal';
import Loading from './components/Loading';

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
  const [expandedDogId, setExpandedDogId] = useState(null);
  const [expandable, setExpandable] = useState(false);
  const [dotsOnHorizontal, setDotsOnHorizontal] = useState(false);
  // can be sorted by name and age
  const [nameAtoZ, setNameAtoZ] = useState(false);
  const [ageAsc, setAgeAsc] = useState(false);
  // can filter for cats/nocats male/female

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
    if (expandable) {
      // handle clicking same row v another row
      setExpandedDogId(expandedDogId === dog.id ? null : dog.id);
    } else {
      // modal
      setSelectedDog(dog);
    }
  }

  function handleCloseModal() {
    setSelectedDog(null);
  }

  function resetTargetDogs() {
    setSelectedDog(null);
    setExpandedDogId(null);
  }

  function handleHeaderNameClick() {
    const newData = [...dogData];
    if (!nameAtoZ) {
      const sortedName = newData.sort((a, b) => a.name.localeCompare(b.name));
      setDogData(sortedName);
      setNameAtoZ(true);
    } else {
      const sortedName = newData.sort((a, b) => b.name.localeCompare(a.name));
      setDogData(sortedName);
      setNameAtoZ(false);
    }
  }
  function handleHeaderAgeClick() {
    const newData = [...dogData];
    if (!ageAsc) {
      const sortedAge = newData.sort((a, b) => {
        const aYrs = getAgeInYears(a.whelped);
        const bYrs = getAgeInYears(b.whelped);
        return aYrs - bYrs;
      });
      setDogData(sortedAge);
      setAgeAsc(true);
    } else {
      const sortedAge = newData.sort((a, b) => {
        const aYrs = getAgeInYears(a.whelped);
        const bYrs = getAgeInYears(b.whelped);
        return bYrs - aYrs;
      });
      setDogData(sortedAge);
      setAgeAsc(false);
    }
  }

  return (
    <>
      <Header title="GALT's Greyhounds">
        <p>
          These are the greyhounds currently in the care of Greyhound Adoption
          League of Texas (GALT). Click on a hound to learn more.
        </p>
        <p>
          <strong>
            <span className='warning'>NOTE:</span> Hounds recently adopted or on
            the injured reserved (IR) list appear as unavailable until removed
            from IR or their adoption probationary period has lapsed and are
            removed entirely.
          </strong>{' '}
        </p>

        {!isLoading && !error && (
          <div className='header-btns-container'>
            <button
              className='header-btn'
              onClick={() => {
                setExpandable((prev) => !prev);
                resetTargetDogs();
              }}
            >
              {expandable ? 'Switch to modal mode' : 'Switch to accordion mode'}
            </button>
            <button
              className='header-btn'
              onClick={() => {
                setDotsOnHorizontal((prev) => !prev);
                resetTargetDogs();
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
        {isLoading && <Loading />}
        {error && <p>Uh oh. {error}</p>}
        {!isLoading && !error && (
          <Table
            dogData={dogData}
            expandable={expandable}
            selectedDog={selectedDog}
            expandedDogId={expandedDogId}
            onRowClick={handleRowClick}
            onHeaderNameClick={handleHeaderNameClick}
            onHeaderAgeClick={handleHeaderAgeClick}
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
