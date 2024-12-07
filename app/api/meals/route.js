// app/api/meals/route.js
import { getServerSession } from "next-auth";
//import { saveMeal } from "../../../lib/meals"; // Assuming saveMeal is a function to store the meal data
import options from "../auth/[...nextauth]/options"; // Assuming your NextAuth options are located here
import Meal from "../../../models/meal.model";
import slugify from 'slugify';


export async function POST(request) {
  try {
    // Retrieve form data from the request body
    const formData = await request.json();
    // Get the session to identify the user
    const session = await getServerSession(options);
    
    if (!session) {
      return new Response(JSON.stringify({ message: "Please log in to submit your meal." }), { status: 401 });
    }
    const slugs=slugify(formData.title, { lower: true })
    
    // Create the meal object
    const newMeal =new Meal({
      title: formData.title,
      creator: formData.name,
      creator_email: formData.email,
      instructions: formData.instructions,
      summary: formData.summary,
      slug:slugs,
      image: formData.image, // Handle image properly (you may want to process the image separately)
      creator_id: session.user.id
    });

    console.log('Meal data from post request:', newMeal);

    // Save the meal to the database (you'll need to implement this function)
    // Save the meal to MongoDB
    await newMeal.save();

    // Return a successful response
    return new Response(JSON.stringify({ message: "Meal shared successfully!" }), { status: 200 });

  } catch (error) {
    console.error('Error saving meal:', error);
    return new Response(JSON.stringify({ message: "Failed to share meal." }), { status: 500 });
  }
}
