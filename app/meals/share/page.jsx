'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ImagePicker from '../../../components/meals/image-picker';
import classes from './page.module.css';
import FormSubmit from '../../../components/meals/mealFormSubmit';
import AuthWrapper from '../../../components/Authwrapper';
import { UpdateMeal } from '../../../lib/actions';

function ShareMealPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        title: '',
        summary: '',
        instructions: '',
        image: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    const meal = searchParams.get('meal');
    console.log('meal:', meal)

    useEffect(() => {
        if (meal) {
            const mealData = JSON.parse(meal);
            setFormData({
                name: mealData.creator,
                email: mealData.creator_email,
                title: mealData.title,
                summary: mealData.summary,
                instructions: mealData.instructions,
                image: mealData.image
            });
            setIsEditing(true); // Set editing flag to true
        }
    }, [meal]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          if (isEditing) {
            console.log('edited data:', formData);
            if (meal && meal._id) {
              await UpdateMeal(formData, meal._id); // Call API for updating meal
            } else {
              console.error('Meal ID is missing or invalid.');
            }
          } else {
            console.log('created data:', formData.image);
            if(!formData.image) return 
            const data = new FormData();
            data.append("file", formData.image);
            data.append("upload_preset", "First_Time_Using_Cloudinary");
            data.append("cloud_name", "diqynm3ie");

            const res = await fetch("https://api.cloudinary.com/v1_1/diqynm3ie/image/upload", {
                method: "POST",
                body: data
            });
            const uploadedImageUrl = await res.json();
            formData.image = uploadedImageUrl.url;

            const response = await fetch('/api/meals', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
            });

            if (!response.ok) {
              throw new Error('Failed to create meal');
            }
          }

          router.push('/meals'); // Navigate to meals page after successful submission
        } catch (error) {
          console.error('Submission failed:', error);
          alert('An error occurred while submitting the form. Please try again.');
        }
    };

    return (
        <AuthWrapper>
            <header className={classes.header}>
                <h1>
                    Share your <span className={classes.highlight}>favorite meal</span>
                </h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>
            <main className={classes.main}>
                <form className={classes.form} onSubmit={handleFormSubmit}>
                    <div className={classes.row}>
                        <p>
                            <label htmlFor="name">Your name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </p>
                        <p>
                            <label htmlFor="email">Your email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </p>
                    </div>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </p>
                    <p>
                        <label htmlFor="summary">Short Summary</label>
                        <input
                            type="text"
                            id="summary"
                            name="summary"
                            value={formData.summary}
                            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                            required
                        />
                    </p>
                    <p>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            rows="10"
                            value={formData.instructions}
                            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                            required
                        ></textarea>
                    </p>
                    {/* <ImagePicker label='Your image' name='image' value={formData.image} onChange={(image) => setFormData({ ...formData, image })}  /> */}
                    <ImagePicker
                        label='Your image'
                        name='image'
                        value={formData.image}
                        onChange={(image) => setFormData({ ...formData, image })}
                    />

                    <p className={classes.actions}>
                        <FormSubmit />
                    </p>
                </form>
            </main>
        </AuthWrapper>
    );
}

// Wrap the component inside Suspense
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShareMealPage />
    </Suspense>
  );
}
