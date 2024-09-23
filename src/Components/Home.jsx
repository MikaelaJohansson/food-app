import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // För att navigera

const Home = () => {

    const [meal,setMeal]=useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate(); // Hook för att navigera

    useEffect(()=>{
        axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(response =>{
            setMeal(response.data.categories);
        })
        .catch(error =>{
            console.error('Error fetching Meal')
        })
    },[]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
          const meals = response.data.meals || [];
    
          // Navigera till resultatsidan och skicka sökresultaten som state
          navigate('/Results', { state: { meals, query } });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

  return(
    <>

        <header>
            <h1>Foodies</h1>
            <img src="/img/pexels-ivan-samkov-4783969.jpg" alt="food" width={600} />
        </header>

        <div>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search for a meal"
            />
            <button onClick={handleSearch}>Search</button>
        </div>


        <ul>
            {meal.map(meal =>(
                <li 
                    key={meal.idCategory}>
                    <Link to={`/category/${meal.strCategory}`}>
                        <img src={meal.strCategoryThumb} 
                        alt={meal.strCategory}/>
                        {meal.strCategory} 
                    </Link>                             
                </li>
            ))}
        </ul>
        
    </>
  ) 
};


export default Home;


