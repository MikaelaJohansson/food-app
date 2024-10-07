import React from 'react';
import { useLocation,useNavigate,Link } from 'react-router-dom';
import styles from '../css/Results.module.css'; 

function Results() {
  const location = useLocation();
  const { meals, query } = location.state;

  const navigate = useNavigate();

  const handleClick = (meal) => {
    navigate(`/MealDetails/${meal.idMeal}`, { state: { meal } });
  };

  return (
    <div className={styles.resultsPageWrapper}>
      <div className={styles.resultsMainContent}>
        <h1 className={styles.resultText}>Search Results for: {query}</h1>
        <ul className={styles.resultContainer}>
          {meals.length > 0 ? (
            meals.map((meal) => (
              <li key={meal.idMeal} onClick={() => handleClick(meal)} className={styles.ObjectContainer}>
                <h2>{meal.strMeal}</h2>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
              </li>
            ))
          ) : (
            <p>No results found for "{query}".</p>
          )}
        </ul>
      </div>

      <footer className={styles.resultsFooter}>
        <Link className={styles.link} to="/">Go back to the Home Page</Link>
        <br />
        <p>&copy; 2024 Kitchen Creations. Alla rättigheter reserverade.</p>
      </footer>
    </div>
  );
}

export default Results;
