import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../CSS/MealDetails.module.css'

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
    <>
      <div className={styles.detailContainer}>
        <h1>{meal.strMeal}</h1>
        <br />
        <img className={styles.detailContainerimg} src={meal.strMealThumb} alt={meal.strMeal}  />
        <br />
        <h3>Cooking instructions:</h3>
        <p>{meal.strInstructions}</p>
        <br />
        <h3>Ingredients:</h3>
        <br />
        <ul>
          {Object.keys(meal).filter(key => key.includes('strIngredient') && meal[key]).map((key, index) => (
            <li key={index}>{meal[key]}</li>
          ))}
        </ul>
      </div>
     
      <footer className={styles.footer}>
        <Link className={styles.link} to="/">Go back to the Home Page</Link>
        <p>&copy; 2024 Kitchen Creations. Alla rättigheter reserverade.</p>
      </footer>
   </>
  );
};

export default MealDetails;


