# 👤 Create Demo User - Quick Setup Guide

## 🎯 Purpose

This guide helps you create a demo user account in your Brandscaling platform for testing purposes.

---

## 🚀 Option 1: Via UI (Recommended)

### Step 1: Open the App
Navigate to your Brandscaling app homepage.

### Step 2: Click "Sign Up"
Click the "Sign Up" or "Get Started" button.

### Step 3: Fill Demo Credentials
```
First Name: Demo
Last Name: User
Email: demo@brandscaling.co.uk
Password: password123
Confirm Password: password123
```

### Step 4: Submit
Click "Create Account" and you'll be automatically signed in!

---

## 🔧 Option 2: Via Server Endpoint (After Backend Deployed)

### Using cURL:

```bash
curl -X POST https://xuhkruljgrspjzluqyjo.supabase.co/functions/v1/make-server-1695dddc/signup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1aGtydWxqZ3JzcGp6bHVxeWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNDIzNjMsImV4cCI6MjA3NjcxODM2M30.co041NDkA9uvROGbSl62PNaeeWhAeYacNfSoIkbXy5k" \
  -d '{
    "email": "demo@brandscaling.co.uk",
    "password": "password123",
    "name": "Demo User"
  }'
```

### Using JavaScript (Browser Console):

```javascript
fetch('https://xuhkruljgrspjzluqyjo.supabase.co/functions/v1/make-server-1695dddc/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1aGtydWxqZ3JzcGp6bHVxeWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNDIzNjMsImV4cCI6MjA3NjcxODM2M30.co041NDkA9uvROGbSl62PNaeeWhAeYacNfSoIkbXy5k'
  },
  body: JSON.stringify({
    email: 'demo@brandscaling.co.uk',
    password: 'password123',
    name: 'Demo User'
  })
})
.then(r => r.json())
.then(data => console.log('Demo user created:', data))
.catch(err => console.error('Error:', err));
```

---

## 🧪 Option 3: Via Supabase Dashboard

### Step 1: Login to Supabase
Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)

### Step 2: Select Your Project
Select project: `xuhkruljgrspjzluqyjo`

### Step 3: Go to Authentication
Click "Authentication" → "Users" in the sidebar

### Step 4: Add User
1. Click "Add User" button
2. Fill in:
   ```
   Email: demo@brandscaling.co.uk
   Password: password123
   Auto Confirm User: ✅ YES
   ```
3. Click "Create User"

### Step 5: Add User Metadata (Optional)
1. Click on the newly created user
2. Go to "User metadata"
3. Add:
   ```json
   {
     "name": "Demo User"
   }
   ```
4. Save changes

---

## ✅ Verification

### Test the Demo Account:

1. Go to your app
2. Click "Sign In"
3. Enter:
   ```
   Email: demo@brandscaling.co.uk
   Password: password123
   ```
4. Click "Sign In"
5. ✅ You should be logged in!

---

## 🎭 Multiple Test Users

Create different personas for testing:

### Architect Persona User
```javascript
{
  email: "architect@brandscaling.co.uk",
  password: "password123",
  name: "Alex Architect"
}
```

### Alchemist Persona User
```javascript
{
  email: "alchemist@brandscaling.co.uk",
  password: "password123",
  name: "Amy Alchemist"
}
```

### Blurred Type User
```javascript
{
  email: "blurred@brandscaling.co.uk",
  password: "password123",
  name: "Bailey Balanced"
}
```

---

## 🔒 Security Notes

**⚠️ Important for Production:**

1. **Change default passwords** - Don't use "password123" in production
2. **Use strong passwords** - Minimum 12 characters with mixed case, numbers, symbols
3. **Enable MFA** - Add multi-factor authentication for sensitive accounts
4. **Rotate credentials** - Change demo passwords regularly
5. **Limit demo access** - Consider disabling demo accounts in production

---

## 🐛 Troubleshooting

### "Email already registered"
The demo user already exists! Just sign in with the credentials.

### "Backend not connected"
The app works without backend deployed. User creation will work once backend is deployed (see `/DEPLOY_BACKEND_QUICK_FIX.md`).

### "Invalid credentials"
Make sure you're using:
- Email: `demo@brandscaling.co.uk`
- Password: `password123`

### "Email confirmation required"
Make sure `email_confirm: true` is set in the signup endpoint, or confirm the email via Supabase Dashboard.

---

## 📊 Demo User with Quiz Results

To create a demo user with pre-filled quiz results:

### Step 1: Create the user (as above)

### Step 2: Sign in as the demo user

### Step 3: Take the quiz
Complete the E-DNA quiz with any answers

### Step 4: Quiz results auto-saved
Results are automatically saved to backend (if deployed)

**OR manually via API:**

```javascript
// After creating demo user, save sample results
fetch('https://xuhkruljgrspjzluqyjo.supabase.co/functions/v1/make-server-1695dddc/quiz-results', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_SESSION_TOKEN'
  },
  body: JSON.stringify({
    user_id: 'DEMO_USER_ID',
    results: {
      core_type: 'architect',
      subtype: 'tactical_executive',
      scores: { /* ... */ },
      // ... other quiz result data
    }
  })
});
```

---

## 🎉 Success!

You now have a demo user account set up and ready for testing!

**Next Steps:**
1. ✅ Sign in with demo credentials
2. ✅ Take the E-DNA quiz
3. ✅ Explore personalized dashboard
4. ✅ Try the AI mentor chat
5. ✅ Test PDF export and sharing

---

## 📚 Related Documentation

- [SUPABASE_AUTH_COMPLETE.md](/SUPABASE_AUTH_COMPLETE.md) - Full auth implementation guide
- [AUTH_FLOW_DIAGRAM.md](/AUTH_FLOW_DIAGRAM.md) - Visual flow diagrams
- [DEPLOY_BACKEND_QUICK_FIX.md](/DEPLOY_BACKEND_QUICK_FIX.md) - Backend deployment guide
- [QUICK_START_AUTHENTICATION.md](/QUICK_START_AUTHENTICATION.md) - Quick start guide

---

**Happy Testing! 🚀**
