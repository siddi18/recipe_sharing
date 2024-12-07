export const dynamic = "force-dynamic";

import bcrypt from 'bcryptjs';
import { createUserWithAccount, getUserByEmail } from "../../../utils/user"; 

export const POST = async (req) => {
    try {
        // Parse the request body
        const { name, email, password } = await req.json();
        console.log('Received request with name:', name);

        // Check if the email already exists in the database
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            // Return a response with status 400 if email already exists
            return new Response(
                JSON.stringify({ message: "Email is already in use." }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await createUserWithAccount({
            name,
            email,
            password: hashedPassword,
        });
        return new Response(
            JSON.stringify({ message: "User created", userId: newUser.id }), // Only send userId
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error:', error);
        // Return error response with status 500
        return new Response(
            JSON.stringify({ message: "Internal Server Error", error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};