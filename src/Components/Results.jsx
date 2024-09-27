import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const { meals, query } = location.state;

  const navigate = useNavigate();

  const handleClick = (meal) => {
    navigate(`/MealDetails/${meal.idMeal}`, { state: { meal } });
  };

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      <ul>
        {meals.length > 0 ? (
          meals.map((meal) => (
            <li key={meal.idMeal} onClick={() => handleClick(meal)}>
              <h2>{meal.strMeal}</h2>
              <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '200px' }} />
            </li>
          ))
        ) : (
          <p>No results found for "{query}".</p>
        )}
      </ul>
    </div>
  );
}

export default Results;