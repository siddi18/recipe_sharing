// meals-grid.js

import MealItem from './meal-item.js'; // Importing the default export correctly
import classes from './meals-grid.module.css';

export default function MealGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal._id.toString()}>
          <MealItem
            title={meal.title}
            slug={meal.slug}
            image={meal.image}
            summary={meal.summary}
            creator={meal.creator}
          />
        </li>
      ))}
    </ul>
  );
}
