import React from 'react';

import Maa from './Maa'

const NaytaMaat = ({ maat, filtteriValue, setFiltteriValue }) => {
  const maatFiltered = maat
    .filter(maa => maa.name.toLowerCase().includes(filtteriValue.toLowerCase()))

  if (!filtteriValue) return <div></div>
  else if (maatFiltered.length > 10) {
    return (
      <div>
        <p>
          Too many matches, specify another filter
        </p>
      </div>
    )
  } else if (maatFiltered.length === 1) {
    const maa = maatFiltered[0]
    return <Maa 
      name={ maa.name }
      capital={ maa.capital }
      population={ maa.population }
      languages={ maa.languages }
      flag={ maa.flag }
    />
  }
  
  const maatMapped = maatFiltered
    .map(maa => <Maa key={maa.alpha2Code} name={ maa.name } setFiltteriValue={ setFiltteriValue } />)

  return (
    <div>
     { maatMapped }    
    </div>
  );
};

export default NaytaMaat;