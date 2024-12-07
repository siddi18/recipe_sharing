'use server';
import { redirect } from "next/navigation";
import { saveMeal, updateMealData } from "./meals";
//import { getToken } from "next-auth/jwt";
 import options from "../app/api/auth/[...nextauth]/options";
 import { getServerSession } from "next-auth/next";


export default async function ShareMeals(formdata) {
        console.log('hi darling');
        // why session.user.id is not coming?  i tried using getSession(), getToken()
  const session = await getServerSession(options);
  console.log('session from shareMeals:',session.user);




  if (!session) {
      redirect('/login');
      return;
  }

  const meal = {
    title: formdata.title,               // Access directly from formdata object
    creator: formdata.name,              // Access directly from formdata object
    creator_email: formdata.email,       // Access directly from formdata object
    instructions: formdata.instructions, // Access directly from formdata object
    summary: formdata.summary,           // Access directly from formdata object
    image: formdata.image,               // Handle image properly
    creator_id: session.user.id
  };
  console.log('mealll:',meal);
     await saveMeal(meal);
    redirect('/meals'); // Redirect to the meals page
}

export async function UpdateMeal(formData, mealId) {
    const session = await getServerSession(options);

    if (!session) {
        redirect('/login');
        return;
    }

    const updatedMeal = {
        title: formData.title,
        creator: formData.name,
        creator_email: formData.email,
        instructions: formData.instructions,
        summary: formData.summary,
        image: formData.image,
        creator_id: session.user.id,
    };

    await updateMealData(mealId, updatedMeal); 
    redirect('/meals'); 
}


