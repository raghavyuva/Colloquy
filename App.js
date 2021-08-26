import React, { useState, useEffect, useRef } from 'react'
import IndexNavigator from './Navigation/IndexNav'
import "@firebase/auth";
import "@firebase/firestore";

import { Provider } from 'react-redux';
import store from './redux/Store';
 
function App() {
  const [loading, setLoading] = useState(true);
  const [connected, setconnected] = useState(null);
  useEffect(() => {

    return () => {
    };
  }, [])
  return (
    <Provider store={store}>
        <IndexNavigator />
    </Provider>
  )
}

export default App;
