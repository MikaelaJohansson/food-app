import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import styles from '../CSS/Catergory.module.css'

const Category = () => {
    const { categoryId } = useParams();
    const [meals, setMeals] = useState([]);
    
    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryId}`);
                if (response.data.meals) {
                    setMeals(response.data.meals);
                } else {
                    setMeals([]); 
                }
            } catch (error) {
                console.error("Error fetching meals:", error);
                setMeals([]); 
            }
        };
        fetchMeals();
    }, [categoryId]);

    return (
        <div>
            <header className={styles.header}>
                <h1>Cooking Together</h1>
                <nav>
                    <ul>
                        <li>Find your next favorite meal!</li>
                        <br />
                        <li>Ingredients, recipes, and inspiration</li>
                    </ul>
                </nav>
            </header>
            <h1 className={styles.categoryText}>Meals in Category: {categoryId}</h1>
            <ul className={styles.categoryContainer}>
                {meals && meals.length > 0 ? (
                    meals.map(meal => (
                        <li key={meal.idMeal} className={styles.catlist} >
                            <Link to={`/MealDetails/${meal.idMeal}`} state={{ meal }} className={styles.categorylist}>
                                <div className={styles.mealText}>{meal.strMeal}</div> 
                                <img src={meal.strMealThumb} alt={meal.strMeal} />
                            </Link>

                        </li>
                    ))
                ) : (
                    <li>No meals found.</li>
                )}
            </ul>
            <footer className={styles.footer}>
             <p>&copy; 2024 Cooking Togheter. Alla rättigheter reserverade.</p>
            </footer>
        </div>
    );
};

export default Category;


