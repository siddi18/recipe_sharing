import Image from 'next/image';
import AuthWrapper from '../../../components/Authwrapper.js';
import classes from './page.module.css';
import { getServerSession } from "next-auth/next";
import options from '../../api/auth/[...nextauth]/options.js';
import Link from "next/link";
import { getMealsDetails } from "../../../lib/meals.js"
import { notFound } from 'next/navigation';


// Main MealDetails component
export default async function MealDetails({ params }) {
    const session = await getServerSession(options);

    const { slug } = params; // Get slug from params
   const meal = await getMealsDetails(slug); // Fetch meal details
   meal.instructions = meal.instructions.replace(/\n/g, '<br />');
    if (!meal) {
        notFound();
    }


    return (
        <AuthWrapper>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main className={classes.main}>
                <div className={classes.instructionsContainer}>
                    <p className={classes.instructions} dangerouslySetInnerHTML={{
                        __html: meal.instructions,
                    }}></p>

                    {meal.creator_id === session.user.id && (
                        <div className={classes.updateButtonContainer}>
                            <Link href={{
                                pathname: '/meals/share',
                                query: {
                                    meal: JSON.stringify(meal) // Pass the meal object as a JSON string
                                }
                            }}>
                                <button className={classes.updateButton}>Update Details</button>
                            </Link>

                        </div>
                    )}
                </div>
            </main>

        </AuthWrapper>
    );
}

