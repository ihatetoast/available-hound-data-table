import { useEffect, useState } from 'react';

import { galtDogs } from './data/dogData';
import { getAgeInYears } from './helpers';

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
  // mock db consts
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dogData, setDogData] = useState([]); // src of truth
  // mutable and maleable:
  const [filteredDogs, setFilteredDogs] = useState([]);
  // consts for the modal/drawers, highlighted rows, handling dots on desktop
  const [selectedDog, setSelectedDog] = useState(null);
  const [expandedDogId, setExpandedDogId] = useState(null);
  const [expandable, setExpandable] = useState(false);
  const [dotsOnHorizontal, setDotsOnHorizontal] = useState(false);
  
  // can be sorted by name and age
  const [sortConfig, setSortConfig] = useState({
    column: null, // null/unsorted or 'age' or 'name
    direction: null, // null is unsorted asc or desc
  });

  // can filter for cat safe OR just not "no cats" (cats ok and unknown) & male/female
  const [filters, setFilters] = useState({
    cats: '',
    sex: '',
  });
  // for resetting
  const filtersAreEmpty = Object.values(filters).every((x) => x === '');

  useEffect(() => {
    const loadHounds = async () => {
      try {
        setIsLoading(true);
        // toggle for testing message component to mock a fail.
        const data = await fetchHoundsData(false); // test for success
        //const data = await fetchHoundsData(true); // test for fail
        setDogData(data);
        setFilteredDogs(data);
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

  function handleHeaderClick(column) {
    const newData = [...dogData];
    let newDir;
    if(sortConfig.column !== column) {
      console.log("sortConfig.column !== column");
      newDir = 'asc';
    } else {
      console.log("toggle");
      newDir = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    if (column === 'name') {
      const sortedName = newData.sort((a, b) =>
        newDir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
      setDogData(sortedName);
    }
    if (column === 'age') {
      const sortedAge = newData.sort((a, b) => {
        const aYrs = getAgeInYears(a.whelped);
        const bYrs = getAgeInYears(b.whelped);
        return newDir === 'asc' ? aYrs - bYrs : bYrs - aYrs;
      });
      setDogData(sortedAge);
    }
    setSortConfig({column, direction: newDir})
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

  function handleSexFilter(value) {
    setFilters({
      ...filters,
      sex: value,
    });
  }

  function handleCatsFilter(value) {
    setFilters({
      ...filters,
      cats: value,
    });
  }

  useEffect(() => {
    const dogsToLoad = dogData.filter((dog) => {
      const matchesSex = filters.sex === '' || filters.sex === dog.sex;
      let matchesCats = true;
      if (filters.cats !== '') {
        matchesCats =
          filters.cats === 'maybe'
            ? dog.cats !== 'no'
            : filters.cats === dog.cats;
      }
      return matchesCats && matchesSex;
    });
    setFilteredDogs(dogsToLoad);
  }, [filters, dogData]);

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
            <Button classes='green' onClick={toggleExpandable}>
              {expandable ? 'Switch to modal mode' : 'Switch to accordion mode'}
            </Button>
            <Button classes='green' onClick={toggleDotsOnHoriz}>
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
                classes='default'
                onClick={() => setFilters({ sex: '', cats: '' })}
                disabled={filtersAreEmpty}
              >
                Clear all
              </Button>
              <ButtonFilter
                classes='lilac'
                options={filterOptions['sex']}
                onOptionClick={handleSexFilter}
              />
              <ButtonFilter
                classes='cyan'
                options={filterOptions['cats']}
                onOptionClick={handleCatsFilter}
              />
            </section>
          </>
        )}
        {!isLoading && !error && (
          <Table
            dogData={filteredDogs}
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

// idea for sorting. on hover, temp show waht i am sorting by
// https://dribbble.com/shots/15178113-Sorting-Interaction
