import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import styles from '../css/Home.module.css';  



const Home = () => {

    const [meal,setMeal]=useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate(); 

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
          navigate('/Results', { state: { meals, query } });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

  return(
    <div className={styles.container}>
        <header className={styles.head}>
            <h1 className={styles.headH1}>Cooking Together</h1>
        </header>

        <div>
            <input 
                className={styles.input}
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search for a meal"
            />
            <button className={styles.input} onClick={handleSearch}>Search</button>
        </div>

        <ul className={styles.kategoriesContainer}>
            {meal.map(meal => (
                <li className={styles.kategories} key={meal.idCategory}>
                    <Link to={`/category/${meal.strCategory}`}>
                        {meal.strCategory}
                        <img src={meal.strCategoryThumb} alt={meal.strCategory} />
                        
                    </Link>                             
                </li>
            ))}
        </ul>
    </div>
  ) 
};


export default Home;


