import Link from "next/link";
import classes from "./page.module.css";
import { getMeals } from "../../lib/meals";
import MealGrid from "../../components/meals/mealsGrid";
import { Suspense } from "react";

async function MealData() {
  const meals = await getMeals();
  return <MealGrid meals={meals} />;
}

export default function Meals() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created <span className={classes.highlights}>by you</span>
        </h1>
        <p>Choose your favorite recipe and cook it yourself. It is easy and fun.</p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching Recipes...</p>}>
          <MealData />
        </Suspense>
      </main>
    </>
  );
}
