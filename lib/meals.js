import Meal from '../models/meal.model'; // Import the Meal model
import connectToDatabase from './mongo';




export async function getUserMeals(userId) {
    try {
        // Convert the userId string to a MongoDB ObjectId
       // const objectId = new mongoose.Types.ObjectId(userId);
        
        // Fetch the meals based on the creator_id
        const meals = await Meal.find({ creator_id: userId });
        return meals;
    } catch (error) {
        console.error('Error fetching user meals:', error);
        throw error;
    }
}

export async function getMeals() {
    connectToDatabase();
    try {
        const meals = await Meal.find(); // or Meal.find({});
        //console.log('meals:',meals);
        return meals.map(meal => meal.toObject());
    } catch (error) {
        console.error('Error fetching meals:', error);
        throw new Error('Could not fetch meals');
    }
}
export async function getMealsDetails(slug) {
    connectToDatabase();
    try {

        // Fetch the meal by slug
        const meal = await Meal.findOne({ slug }).lean();
        console.log('meallllas:',meal);
        if (!meal) {
            console.log('No meal found with the given slug:', slug);
            throw new Error(`Meal with slug "${slug}" not found`);
        }

        return meal; // Return the meal details
    } catch (error) {
        console.error('Error fetching meal details:', error.message);
        throw error; // Rethrow the error for higher-level handling
    }
}




export async function updateMealData(mealId, updatedMeal) {
    try {
        // Find the meal by ID and update it with the new data
        const updatedDoc = await Meal.findByIdAndUpdate(
            mealId, // Find the meal by its ID
            updatedMeal, // The updated meal data
            { new: true } // Option to return the newly updated document
        );

        if (!updatedDoc) {
            throw new Error(`Meal with id ${mealId} not found`);
        }

        console.log('Meal successfully updated:', updatedDoc);
        return updatedDoc; // Return the updated meal document if needed
    } catch (error) {
        console.error('Error updating meal:', error);
        throw new Error('Failed to update meal');
    }
}



