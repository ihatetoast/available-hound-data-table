  export function getAgeInYears(dateStr){
    const date = new Date(dateStr);
    // handle human error
    if(typeof dateStr !== 'string' || isNaN(date)){
      return "Age unknown";
    }
    const yearNow = new Date().getFullYear();
    // regex for year only:
    const regex = /^\d{4}$/;
    if(regex.test(dateStr)){
      return yearNow - Number(dateStr);
    } else {
      const birthYear = date.getFullYear();
      return yearNow - birthYear;
    }
  }