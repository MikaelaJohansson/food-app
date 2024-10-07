
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Category from './Components/Category';
import Results from './Components/Results';
import MealDetails from './Components/MealDetails'; 
import './index.css';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path='/Results' element={<Results/>}/>
        <Route path="/MealDetails/:id" element={<MealDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


