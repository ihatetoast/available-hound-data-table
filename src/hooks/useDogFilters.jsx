import {useState, useEffect} from 'react'

export function useDogFilters(dogData) {
  const [filters, setFilters] = useState({cats: "", sex: ""});
  const [filteredDogs, setFilteredDogs] = useState([]);

  function handleSexFilter(value) {
    setFilters((prev)=>({...prev, sex: value}))
  }

  function handleCatsFilter(value) {
    setFilters((prev) =>({...prev, cats: value}))
  }

  function clearFilters() {
    setFilters({cats: "", sex: ""})
  }

  const filtersAreEmpty = Object.values(filters).every((x) => x === '');

 useEffect(() => {
    const dogsToLoad = dogData.filter((dog) => {
      const matchesSex = filters.sex === '' || filters.sex === dog.sex;
      let matchesCats = true;
      if (filters.cats !== '') {
        matchesCats = filters.cats === 'maybe' ? dog.cats !== 'no' : filters.cats === dog.cats;
      }
      return matchesCats && matchesSex;
    });
    setFilteredDogs(dogsToLoad);
  }, [filters, dogData]);

  return {
    filteredDogs,
    filters,
    filtersAreEmpty,
    handleSexFilter,
    handleCatsFilter,
    clearFilters
  }
}


// steps to refactor some functionality and state from bulky app into 
// hooks:
// IN THE HOOK, CHOOK
// 1. create the folder and file for hooks and hooks/useDogFilters (example)
// 2. function useDogFilters needs the data from app, so pass that in
// 3. copy the state over (no change)
// 4. Move the logic (from app's use effect) over but make sure to have the passed in
// dogdata in the dep array to trigger changes
// 5. add handler functions
// 6. RETURN... anything the app needs
// IN APP, CAP.
// 1. import the hook at the top and call the hook, destructure the parts you want 
// hooks are reuseable, so in another app, you might not want destructure everything.
// I do here, because it's small and while this is not being reused, it's a reference app
// 2. clean up or remove in the app what the useDogFilters takes care of. 
