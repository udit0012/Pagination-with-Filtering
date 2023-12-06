import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Teams from './Components/Teams';
import { Provider } from 'react-redux';
import {store} from './ReduxStore/Store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="bg-gray-900 min-h-[100vh]">
          <Navbar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/teams' element={<Teams />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
