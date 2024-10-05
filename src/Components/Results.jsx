import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
      <header className={styles.resultsHeader}>
        <h1>Cooking Together</h1>
        <nav>
            <ul>
              <li>Find your next favorite meal!</li>
              <li>Ingredients, recipes, and inspiration</li>
            </ul>
        </nav>
      </header>

      <div className={styles.resultsMainContent}>
        <h1 className={styles.resultText}>Search Results for: {query}</h1>
        <ul className={styles.resultContainer}>
          {meals.length > 0 ? (
            meals.map((meal) => (
              <li key={meal.idMeal} onClick={() => handleClick(meal)} className={styles.ObjectContainer}>
                <h2>{meal.strMeal}</h2>
                <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '200px' }} />
              </li>
            ))
          ) : (
            <p>No results found for "{query}".</p>
          )}
        </ul>
      </div>

      <footer className={styles.resultsFooter}>
        <p>&copy; 2024 Cooking Together. Alla rättigheter reserverade.</p>
      </footer>
    </div>
  );
}

export default Results;
