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
  const [isLoading, setIsLoading] = useState(true);
  const [dogData, setDogData] = useState([]);
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDog, setSelectedDog] = useState(null);
  const [expandedDogId, setExpandedDogId] = useState(null);
  const [expandable, setExpandable] = useState(false);
  const [dotsOnHorizontal, setDotsOnHorizontal] = useState(false);
  // can be sorted by name and age
  const [nameAtoZ, setNameAtoZ] = useState(false);
  const [ageAsc, setAgeAsc] = useState(false);
  // can filter for cat safe OR just not "no cats" (cats ok and unknown) & male/female
  const [filters, setFilters] = useState({
    cats: '',
    sex: '',
  });
  const filtersAreEmpty = Object.values(filters).every(x => x === '');

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
      if(filters.cats !== '') {
        matchesCats = filters.cats === 'maybe' ? dog.cats !== 'no' : filters.cats === dog.cats;
      }
      return matchesCats && matchesSex;
    })
    setFilteredDogs(dogsToLoad);
  }, [filters, dogData]);
console.log("filters are empty: ", filtersAreEmpty);
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
              <span className="filters-title">Filters:</span>
              <Button classes="default" onClick={()=>setFilters({sex: '', cats: ''})} disabled={filtersAreEmpty}>Clear all</Button>
              <ButtonFilter classes="lilac" options={filterOptions['sex']} onOptionClick={handleSexFilter}/>
              <ButtonFilter classes="cyan" options={filterOptions['cats']} onOptionClick={handleCatsFilter}/>
            </section>
          </>
        )}
        {!isLoading && !error && (
          <Table
            dogData={filteredDogs}
            expandable={expandable}
            selectedDog={selectedDog}
            expandedDogId={expandedDogId}
            onRowClick={handleRowClick}
            onHeaderNameClick={handleHeaderNameClick}
            onHeaderAgeClick={handleHeaderAgeClick}
            isAtoZ={nameAtoZ}
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
