export function getAgeInYears(dateStr) {
  const date = new Date(dateStr);
  // handle human error
  if (typeof dateStr !== 'string' || isNaN(date)) {
    return 'Age unknown';
  }
  const yearNow = new Date().getFullYear();
  // regex for year only:
  const regex = /^\d{4}$/;
  if (regex.test(dateStr)) {
    return yearNow - Number(dateStr);
  } else {
    const birthYear = date.getFullYear();
    return yearNow - birthYear;
  }
}

export function getStatusClass(status) {
  if (status === 'adoption pending') {
    return 'pending';
  }
  if (['adopted', 'injured reserve', 'training camp'].includes(status)) {
    return 'unavailable';
  }
  return 'unavailable';
}

export function sortDogs(dogsArr, column, direction) {
  const dogs = [...dogsArr];

  if (column === 'name') {
    return dogs.sort((a, b) =>
      direction === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }

  if(column === 'age') {
    return dogs.sort((a, b) => {
        const aYrs = getAgeInYears(a.whelped);
        const bYrs = getAgeInYears(b.whelped);
        return direction === 'asc' ? aYrs - bYrs : bYrs - aYrs;
      });
  }

  // fail safe
  return dogs;
}
