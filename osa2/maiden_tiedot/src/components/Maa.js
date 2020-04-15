import React from 'react';

const Maa = ({ name, capital, population, languages, flag, setFiltteriValue }) => {
  const maaKaikkiStatsit = () => {
    return (
      <div>
        <h1>{ name }</h1>
        <p>{ capital }</p>
        <p>population { population }</p>
        <h2>languages</h2>
        <ul>
          { languages.map((language, i) => <li key={ i }>{ language.name }</li>) }
        </ul>
        <img src={ flag } alt={ name } width="300" height="150" />
      </div>
    )
  }

  if (capital) {
    return maaKaikkiStatsit()  
  }

  return (
    <div>
      { name }
      <button onClick={ () => setFiltteriValue(name) }>show</button>
    </div>
  );
};

export default Maa;