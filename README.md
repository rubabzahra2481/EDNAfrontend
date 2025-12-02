# E-DNA Quiz Frontend

React + TypeScript + Vite application for the Entrepreneurial DNA Quiz with email verification, results preview, and GHL checkout integration.

## 🚀 Features

- **Interactive Quiz**: 40+ questions assessing entrepreneurial DNA
- **Full-Page Email Verification**: Supabase OTP authentication
- **Instant Results**: Short results preview shown immediately
- **Async PDF Generation**: Background PDF creation for seamless UX
- **GHL Checkout Integration**: Redirect to GoHighLevel payment page
- **Responsive Design**: Mobile-first, works on all devices
- **TypeScript**: Type-safe code with full IDE support

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see backend README)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <your-frontend-repo-url>
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
- Backend API URL
- Supabase URL and anon key
- GHL checkout URL

4. **Start development server**
```bash
npm run dev
```

App will run on `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── EDNAQuiz.tsx              # Main quiz component
│   │   ├── EDNAResultsPage.tsx       # Full results page
│   │   ├── EmailVerificationPage.tsx # Email verification (full-page)
│   │   ├── ShortResultsPreview.tsx   # Quick results after verification
│   │   ├── PDFResultsPage.tsx        # PDF generation route
│   │   ├── Home.tsx                  # Landing page
│   │   ├── Navigation.tsx            # Nav bar
│   │   └── ui/                       # Reusable UI components
│   ├── utils/
│   │   └── supabase/
│   │       ├── client.ts             # Supabase client
│   │       ├── quiz-results.ts       # Quiz results storage
│   │       └── backend-status.ts     # Backend health check
│   ├── lib/
│   │   └── subtype-profiles-database.ts  # Subtype data
│   ├── App.tsx                       # Main app component
│   └── main.tsx                      # Entry point
├── public/                           # Static assets
├── index.html                        # HTML template
├── vite.config.ts                    # Vite configuration
├── package.json                      # Dependencies
├── .env.example                      # Environment template
├── .gitignore                        # Git ignore rules
└── README.md                         # This file
```

## 🎯 User Flow

1. **Home Page** → User clicks "Take Quiz"
2. **Quiz** → User answers 40+ questions
3. **Email Verification** → Full-page OTP verification
4. **Short Results** → Instant preview (1-2 seconds)
5. **Checkout** → Redirect to GHL for payment
6. **Email** → Full PDF report sent after purchase

## 🔌 API Integration

### Backend Endpoints Used

#### Save Results (Fast, Async)
```typescript
fetch('http://localhost:3001/api/quiz/save-results', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    name: 'User Name',
    results: quizResults
  })
});
```

## 🎨 Components

### EDNAQuiz
Main quiz component with 40+ questions across multiple categories:
- Decision-making patterns
- Mirror pair awareness
- Subtype identification
- Learning preferences
- Neurodiversity assessment

### EmailVerificationPage
Full-page email verification flow:
- Step 1: Enter email
- Step 2: Verify OTP code
- Gradient background
- No navigation bar
- Supabase OTP integration

### ShortResultsPreview
Quick results display after email verification:
- Core type (Architect/Alchemist/Blurred)
- Primary subtype
- Core type mastery percentage
- Subtype mastery percentage
- CTA button to GHL checkout

### EDNAResultsPage
Full results page (shown after purchase):
- Complete personality analysis
- Mirror pair awareness
- Learning style preferences
- Neurodiversity assessment
- Mindset and personality traits

### PDFResultsPage
Special route for Puppeteer PDF generation:
- Accessed at `/pdf-results?data={encoded_results}`
- Renders EDNAResultsPage with data from URL
- Used by backend for PDF generation

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key (frontend) | Yes |
| `VITE_GHL_CHECKOUT_URL` | GHL checkout page URL | Yes |

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import in Vercel**
   - Connect GitHub repository
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Set environment variables** in Vercel dashboard

4. **Deploy** - Automatic on push

### Netlify

1. **Create `netlify.toml`**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. **Deploy via Git** or Netlify CLI

### AWS Amplify / Cloudflare Pages

Similar process:
- Build command: `npm run build`
- Publish directory: `dist`
- Add environment variables

## 🧪 Testing

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Type Check
```bash
npx tsc --noEmit
```

## 📝 Package Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "@supabase/supabase-js": "^2.38.4",
  "typescript": "^5.2.2",
  "vite": "^5.0.0"
}
```

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Built with shadcn/ui patterns
- **Responsive**: Mobile-first design
- **Dark Mode**: Not implemented (can be added)

## ⚠️ Important Notes

1. **Backend URL**: Update `VITE_API_URL` for production
2. **CORS**: Backend must allow your frontend domain
3. **Supabase**: Use anon key for frontend (NOT service role key)
4. **PDF Route**: `/pdf-results` must be accessible for backend PDF generation
5. **LocalStorage**: Stores `resultId` and `userEmail` after verification

## 🔗 Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Landing page |
| `/quiz` | EDNAQuiz | Quiz questions |
| `/results` | EDNAResultsPage | Full results (after purchase) |
| `/dashboard` | Dashboard | User dashboard (auth required) |
| `/chat` | AI Chat | AI assistant (auth required) |
| `/pdf-results` | PDFResultsPage | PDF generation route (for backend) |

## 🐛 Troubleshooting

### Backend Connection Failed
- Check `VITE_API_URL` is correct
- Verify backend is running
- Check CORS settings on backend

### Email Verification Not Working
- Verify Supabase URL and anon key
- Check Supabase email template is configured
- Look in spam folder for OTP email

### PDF Generation Times Out
- Frontend must be accessible at `VITE_API_URL`
- `/pdf-results` route must work
- Check backend logs for Puppeteer errors

### Build Fails
- Run `npm install` to ensure all dependencies installed
- Check for TypeScript errors: `npx tsc --noEmit`
- Clear cache: `rm -rf node_modules dist && npm install`

## 📊 Performance

- **First Load**: < 2 seconds
- **Quiz Completion**: 5-10 minutes
- **Email Verification**: 1-2 seconds
- **Results Display**: Instant
- **PDF Generation**: 20-30 seconds (background)

## 🔄 Updates

### Adding New Questions
Edit `src/components/EDNAQuiz.tsx`:
```typescript
const questions = [
  // Add your questions here
];
```

### Customizing Colors
Edit Tailwind config or component classes:
- Architect: Purple (`from-purple-600`)
- Alchemist: Orange (`from-orange-500`)
- Blurred: Gradient (`from-purple-600 via-orange-500`)

### Changing Checkout URL
Update `.env`:
```
VITE_GHL_CHECKOUT_URL=https://your-new-checkout-url.com
```

## 📄 License

Proprietary - Brandscaling

## 👥 Support

For issues or questions, contact the development team.
