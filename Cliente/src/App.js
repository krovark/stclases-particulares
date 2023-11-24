
import './App.css';
import Home from './HomeMenu/Home';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';


function App() {
  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Home/>
        </PersistGate>
    </Provider>

  );
}

export default App;
