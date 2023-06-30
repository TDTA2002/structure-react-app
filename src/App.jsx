import './App.scss';
import { Route, Routes } from 'react-router-dom';
import LazyLoad from './LazyLoad';
import Navbar from '@components/Navbars/Navbar';

function App() {
  return (
    <div className="App">
      <div className='app-container'>
        <Navbar />
        <Routes>
          <Route path="" element={LazyLoad(() => import("@pages/Homes/Home"))()} />
          <Route path="/about" element={LazyLoad(() => import("@pages/Abouts/About"))()}>
            <Route path='my-infor' element={LazyLoad(() => import("@pages/Abouts/MyInFors/MyInFor"))()}></Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
