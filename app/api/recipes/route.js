export const dynamic = "force-dynamic";

import { getUserMeals } from "../../../lib/meals";

export async function GET(req) {
  try {
    const userId = req.headers.get('userId'); 
    console.log('userId:',userId);
    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const meals = await getUserMeals(userId);

    return new Response(JSON.stringify(meals), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching meals:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch meals' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
