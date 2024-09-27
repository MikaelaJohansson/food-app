import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MealDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (response.data.meals) {
          setMeal(response.data.meals[0]);
        }
      } catch (error) {
        console.error("Error fetching meal details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!meal) return <p>No meal found.</p>;

  return (
    <div>
      <h1>{meal.strMeal}</h1>
      <p>{meal.strInstructions}</p>
      <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '400px' }} />
      <h3>Ingredients:</h3>
      <ul>
        {Object.keys(meal).filter(key => key.includes('strIngredient') && meal[key]).map((key, index) => (
          <li key={index}>{meal[key]}</li>
        ))}
      </ul>
    </div>
  );
};

export default MealDetails;


