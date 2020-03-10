import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState();
  const [subData, setSubData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchSubData = async subDataId => {
    const result = await axios(`http://localhost:9000/api/${subDataId}`);
    console.log('result in fetchSubData', result, 'of subDataId', subDataId);
    console.log(
      'result.data in fetchSubData',
      result.data.toString(),
      'of subDataId',
      subDataId
    );
    console.log('subData in fetchSubData', subData);
    setSubData(prevState => [...prevState, result.data]);
  };

  const fetchData = async () => {
    const result = await axios('http://localhost:9000/api');
    setData(result.data);
    console.log('result.data', result.data);
    result.data.forEach(item => fetchSubData(item));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>JoyPi IHM - Centrale Lille</h1>
      </header>
      <div className="App-body">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          List of all available Components :
          {data &&
            data.map(item => <div style={{ marginRight: '10px' }}>{item}</div>)}
        </div>

        {subData &&
          subData.map(item => (
            <div dangerouslySetInnerHTML={{ __html: item }}></div>
          ))}
      </div>
    </div>
  );
}

export default App;
