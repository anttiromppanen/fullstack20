import React, { useState, useEffect } from 'react';
import axios from 'axios'

import NaytaMaat from './components/NaytaMaat'
import Filtteri from './components/Filtteri'

const App = () => {
  const [ maat, setMaat ] = useState([])
  const [ filtteriValue, setFiltteriValue ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setMaat(res.data)
      })
  }, [])

  return (
    <div>
      <Filtteri filtteriValue={ filtteriValue } setFiltteriValue={ setFiltteriValue } />
      <NaytaMaat maat={ maat } filtteriValue={ filtteriValue } setFiltteriValue={ setFiltteriValue } />
    </div>
  );
}

export default App;
