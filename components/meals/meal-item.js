'use client'
import Image from 'next/image';
import Link from 'next/link';
import classes from './meal-item.module.css';
import Spinner from '../Spinner';
import { useState } from "react";

export default function MealItem({ title, slug, image, summary, creator }) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShareClick = () => {
    setIsSharing(true);
  };
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={image}
            alt={title}
            fill // Replaces `layout="fill"`
            style={{
              objectFit: 'cover', // Replaces `objectFit="cover"`
            }}
          />
        </div>


        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <div><p className={classes.summary}>{summary}</p></div>
        <div className={classes.spaces}>
          <Link href={`/meals/${slug}`} className={classes.card__button} prefetch={false} onClick={handleShareClick}>
          {isSharing ? (
              <Spinner />
            ) : (
              "View Details"
            )}
          </Link>

        </div>
      </div>
    </article>
  );
}
