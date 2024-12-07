// app/recipes/page.js
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import './recipies.css';
import Image from 'next/image';
import Link from 'next/link';

export default function RecipesPage() {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipes() {
      if (session?.user?.id) {
        try {
          const response = await axios.get('/api/recipes/', {
            headers: {
              userId: session.user.id
            }
          });

          setRecipes(response.data);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching recipes:', err);
          setError('Failed to load recipes');
          setLoading(false);
        }
      }
    }

    fetchRecipes();
  }, [session]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <div className="hey">
              <article className="card">
                <Image
                  className="card__background"
                  src={recipe.image}
                  alt={recipe.title}
                  width={350}
                  height={350}
                  layout="intrinsic" // or "responsive" depending on your needs
                  objectFit="cover"  // Ensures the image maintains its aspect ratio
                />
  
                <div className="card__content flow">
                  <div className="card__content--container flow">
                    <h2 className="card__title">{recipe.title}</h2>
                    <p className="card__description">
                      {recipe.summary}
                    </p>
                  </div>
                  <Link href={`/meals/${recipe.slug}`}>
                    <button className="card__button">View Details</button>
                  </Link>
                </div>
              </article>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
}
