import { useEffect, useState } from 'react';
import { useDogFilters} from './hooks/useDogFilters';
import {useDogSort} from './hooks/useDogSort'
import { galtDogs } from './data/dogData';

import Header from './components/Header';
import Button from './components/Button';
import Table from './components/Table';
import CardModal from './components/CardModal';
import Message from './components/Message';
import SelectFilter from './components/SelectFilter';
import ButtonFilter from './components/ButtonFilter';

// simulated db query
const fetchHoundsData = (mockFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockFail) {
        reject(new Error('Failed to fetch data.'));
      } else {
        resolve(galtDogs);
      }
    }, 400); // increase to test loading
  });
};

const filterOptions = {
  sex: [
    { value: '', text: 'All' },
    { value: 'male', text: 'Male' },
    { value: 'female', text: 'Female' },
  ],
  cats: [
    { value: '', text: 'All' },
    { value: 'yes', text: 'Cats OK' },
    { value: 'no', text: 'No cats' },
    { value: 'maybe', text: 'Cats OK & unknown' },
  ],
};

function App() {
    const [dogData, setDogData] = useState([]); // src of truth (filteredDogs for changing)
// hooks (chained):
    const { filteredDogs, filtersAreEmpty, handleSexFilter, handleCatsFilter, clearFilters} = useDogFilters(dogData);
    const {sortedData, sortConfig, handleHeaderClick} = useDogSort( filteredDogs);
   // mock db consts
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // custom hook with dogData passed in
  // consts for the modal/drawers, highlighted rows, handling dots on desktop
  const [selectedDog, setSelectedDog] = useState(null);
  const [expandedDogId, setExpandedDogId] = useState(null);
  const [expandable, setExpandable] = useState(false);
  const [dotsOnHorizontal, setDotsOnHorizontal] = useState(false);
  

  useEffect(() => {
    const loadHounds = async () => {
      try {
        setIsLoading(true);
        // toggle for testing message component to mock a fail.
        const data = await fetchHoundsData(false); // test for success
        //const data = await fetchHoundsData(true); // test for fail
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

  // header btns' fcn for demo f
  function toggleExpandable() {
    setExpandable((prev) => !prev);
    resetTargetDogs();
  }
  function toggleDotsOnHoriz() {
    setDotsOnHorizontal((prev) => !prev);
    resetTargetDogs();
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
            the injured reserved or training camp list appear as unavailable until removed or their adoption probationary period has lapsed and are
            removed entirely.
          </strong>
        </p>
        {!isLoading && !error && (
          <div className='header-btns-container'>
            <Button className='green' onClick={toggleExpandable}>
              {expandable ? 'Switch to modal mode' : 'Switch to accordion mode'}
            </Button>
            <Button className='green hideOnMobile' onClick={toggleDotsOnHoriz}>
              {dotsOnHorizontal
                ? 'Switch to arrows on horizontal'
                : 'Switch to dots on horizontal'}
            </Button>
          </div>
        )}
      </Header>
      <main>
        {isLoading && (
          <Message>
            <div className='loading-emoji'>🐕</div>
            <p>Herding the hounds ...</p>
          </Message>
        )}
        {error && (
          <Message>
            <div className='loading-emoji error'>💩</div>
            <p>
              <span className='warning'>Uh oh! </span>
              {error}
            </p>
          </Message>
        )}
        {!isLoading && !error && (
          <>
            <section className='select-filter-section'>
              <SelectFilter
                labelText='Sex:'
                topic='sex'
                options={filterOptions['sex']}
                onFilterChange={handleSexFilter}
              />
              <SelectFilter
                labelText='Cat tolerance:'
                topic='cats'
                options={filterOptions['cats']}
                onFilterChange={handleCatsFilter}
              />
            </section>
            <section className='button-filter-section'>
              <span className='filters-title'>Filters:</span>
              <Button
                className='default'
                onClick={clearFilters}
                disabled={filtersAreEmpty}
              >
                Clear all
              </Button>
              <ButtonFilter
                className='lilac'
                options={filterOptions['sex']}
                onOptionClick={handleSexFilter}
              />
              <ButtonFilter
                className='cyan'
                options={filterOptions['cats']}
                onOptionClick={handleCatsFilter}
              />
            </section>
          </>
        )}
        {!isLoading && !error && (
          <Table
            dogData={sortedData}
            expandable={expandable}
            selectedDog={selectedDog}
            expandedDogId={expandedDogId}
            sortConfig={sortConfig}
            onRowClick={handleRowClick}
            onHeaderClick={handleHeaderClick}
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
