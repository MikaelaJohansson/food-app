import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

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
            <h1>Meals in Category: {categoryId}</h1>
            <ul>
                {meals && meals.length > 0 ? (
                    meals.map(meal => (
                        <li key={meal.idMeal}>
                            <Link to={`/MealDetails/${meal.idMeal}`} state={{ meal }}>
                                {meal.strMeal} 
                                <img src={meal.strMealThumb} alt={meal.strMeal} />
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>No meals found.</li>
                )}
            </ul>
        </div>
    );
};

export default Category;


