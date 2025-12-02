import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Initialize Supabase client with service role key for admin operations
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-1695dddc/health", (c) => {
  return c.json({ status: "ok" });
});

// User signup endpoint
app.post("/make-server-1695dddc/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return c.json({ error: "Missing email, password, or name" }, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: "Invalid email format" }, 400);
    }

    // Validate password length
    if (password.length < 8) {
      return c.json({ error: "Password must be at least 8 characters long" }, 400);
    }

    // Create user using admin client with auto email confirmation
    // NOTE: email_confirm is set to true because email server hasn't been configured
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: { name: name },
      email_confirm: true // Automatically confirm the user's email
    });

    if (error) {
      console.error('Signup error:', error.message);
      
      // Handle specific error cases - check for duplicate email errors
      const errorMsg = error.message.toLowerCase();
      if (errorMsg.includes('already') || 
          errorMsg.includes('duplicate') || 
          errorMsg.includes('exists') ||
          errorMsg.includes('registered')) {
        return c.json({ 
          error: "EMAIL_ALREADY_EXISTS",
          message: "This email is already registered. Please sign in instead." 
        }, 409); // 409 Conflict status code
      }
      
      return c.json({ error: error.message || "Failed to create user" }, 400);
    }

    if (!data.user) {
      return c.json({ error: "Failed to create user" }, 500);
    }

    // Return success with user info (don't return sensitive data)
    return c.json({ 
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name
      },
      message: "Account created successfully"
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return c.json({ error: error.message || "Failed to create user" }, 500);
  }
});

// User signin endpoint (for consistency, though client can also use Supabase directly)
app.post("/make-server-1695dddc/signin", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ error: "Missing email or password" }, 400);
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Signin error:', error.message);
      return c.json({ error: "Invalid email or password" }, 401);
    }

    if (!data.session || !data.user) {
      return c.json({ error: "Failed to sign in" }, 500);
    }

    return c.json({ 
      success: true,
      session: data.session,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name
      }
    });
  } catch (error: any) {
    console.error("Error signing in:", error);
    return c.json({ error: error.message || "Failed to sign in" }, 500);
  }
});

// Save quiz results
app.post("/make-server-1695dddc/quiz-results", async (c) => {
  try {
    const body = await c.req.json();
    const { user_id, results } = body;

    if (!user_id || !results) {
      return c.json({ error: "Missing user_id or results" }, 400);
    }

    // Store results in KV store with user_id as key
    const key = `quiz_results:${user_id}`;
    await kv.set(key, {
      user_id,
      results,
      completed_at: new Date().toISOString()
    });

    return c.json({ success: true, message: "Quiz results saved successfully" });
  } catch (error: any) {
    console.error("Error saving quiz results:", error);
    return c.json({ error: error.message || "Failed to save quiz results" }, 500);
  }
});

// Get quiz results for a user
app.get("/make-server-1695dddc/quiz-results/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    
    if (!userId) {
      return c.json({ error: "Missing userId parameter" }, 400);
    }

    const key = `quiz_results:${userId}`;
    const data = await kv.get(key);

    if (!data) {
      return c.json({ results: null, message: "No quiz results found" }, 404);
    }

    return c.json(data);
  } catch (error: any) {
    console.error("Error retrieving quiz results:", error);
    return c.json({ error: error.message || "Failed to retrieve quiz results" }, 500);
  }
});

Deno.serve(app.fetch);