import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    summary: { type: String, required: true },
    instructions: { type: String, required: true },
    creator: { type: String, required: true },
    creator_email: { type: String, required: true },
    creator_id: { type: String, required: true }
});

// const Meal = mongoose.model('Meal', mealSchema);

// export default Meal;
// Combine declaration and export
//export default mongoose.model('Meal', mealSchema);

// Check if the model already exists
const Meal = mongoose.models.Meal || mongoose.model('Meal', mealSchema);

export default Meal;
