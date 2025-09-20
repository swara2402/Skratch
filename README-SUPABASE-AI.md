# Supabase AI Integration Setup

This project now uses **Supabase Edge Functions** for AI chat functionality instead of directly calling OpenAI from the frontend. This approach is more secure and scalable.

## 🚀 **Quick Setup**

### 1. **Install Supabase CLI**
```bash
npm install -g supabase
```

### 2. **Set up your Supabase project**
```bash
# Login to Supabase
supabase login

# Initialize Supabase (if not already done)
supabase init

# Link to your existing project (replace with your project ref)
supabase link --project-ref your-project-ref
```

### 3. **Update Environment Variables**
Edit your `.env` file with your actual Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. **Deploy the Edge Function**
```bash
# Deploy the AI chat function
supabase functions deploy chat-with-ai
```

### 5. **Start Development Server**
```bash
npm run dev
```

## 🔧 **How It Works**

1. **Frontend** → Calls Supabase Edge Function
2. **Edge Function** → Processes request securely on server
3. **AI Response** → Generated and saved to database
4. **Frontend** → Displays response from database

## 🎯 **Benefits of This Approach**

- ✅ **Secure** - No API keys exposed to frontend
- ✅ **Scalable** - Server-side processing
- ✅ **Cost-effective** - Better rate limiting
- ✅ **Flexible** - Easy to switch AI providers
- ✅ **Integrated** - Works seamlessly with Supabase auth

## 🔄 **Switching AI Providers**

The Edge Function can easily be updated to use different AI services:

### **Option 1: Anthropic (Claude)**
Update `supabase/functions/chat-with-ai/index.ts`:
```typescript
// Add at the top
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk'

// In the generateAIResponse function
const anthropic = new Anthropic({
  apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
});
```

### **Option 2: Google Gemini**
```typescript
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai'

const genAI = new GoogleGenerativeAI(Deno.env.get('GOOGLE_AI_API_KEY'));
```

### **Option 3: OpenAI (via server)**
```typescript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
    'Content-Type': 'application/json',
  },
  // ... rest of OpenAI request
});
```

## 🛠️ **Development Commands**

```bash
# Start local Supabase (for testing Edge Functions locally)
supabase start

# Deploy all functions
supabase functions deploy

# View function logs
supabase functions logs chat-with-ai

# Test function locally
supabase functions serve chat-with-ai
```

## 📝 **Environment Variables for Edge Functions**

Set these in your Supabase dashboard (Project Settings → Edge Functions):
- `ANTHROPIC_API_KEY` (if using Claude)
- `OPENAI_API_KEY` (if using OpenAI)
- `GOOGLE_AI_API_KEY` (if using Gemini)

## 🎉 **You're All Set!**

Your AI chat now runs securely through Supabase Edge Functions. Users can chat with the AI assistant without any API keys being exposed to the frontend.

**Next Steps:**
1. Test the chat functionality
2. Customize the AI responses in the Edge Function
3. Add more AI agents/features as needed
