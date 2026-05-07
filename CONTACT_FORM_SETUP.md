# Contact Form Setup Instructions

This contact form uses Netlify Functions + Resend + optional Supabase storage.

## Required Setup

### 1. Install Dependencies
```bash
npm install resend
```

### 2. Configure Netlify Environment Variables

**Step-by-step instructions:**
1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your site from the list
3. Click on "Site settings" 
4. Scroll down to "Build & deploy" and expand it
5. Click on "Environment"
6. Click "Edit variables" or "Add variable"
7. Add the following:
   - **Key**: `RESEND_API_KEY`
   - **Value**: `re_KuvPyBED_PzVirbBQ68GvGTwboxrq4EcJ`
8. Click "Save"

**Required:**
- `RESEND_API_KEY`: Your Resend API key
  - Your API key: `re_KuvPyBED_PzVirbBQ68GvGTwboxrq4EcJ`

**Optional (for Supabase storage):**
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key

### 3. Configure Resend
1. Sign up at https://resend.com
2. Verify your domain (or use the default `onboarding@resend.dev` for testing)
3. Get your API key from the dashboard
4. Add the API key to your Netlify environment variables

### 4. Optional: Set up Supabase Storage
1. Create a Supabase project at https://supabase.com
2. Run the SQL from `supabase/contact_submissions.sql` in your Supabase SQL editor
3. Add your Supabase URL and anon key to Netlify environment variables

## How It Works

1. **Contact Form**: A modal form in the footer with validation using react-hook-form and zod
2. **Netlify Function**: Handles form submissions at `/.netlify/functions/contact`
3. **Email Sending**: Uses Resend to send formatted emails to `christina@malibubeachvacations.com`
4. **Optional Storage**: Stores submissions in Supabase for future reference

## Testing

1. Deploy your site to Netlify
2. Test the contact form by clicking the "Contact Us" button in the footer
3. Check that emails are received at the configured email address
4. If using Supabase, check that submissions are stored in the `contact_submissions` table

## Customization

### Change Recipient Email
Edit `netlify/functions/contact.js` and update this line:
```javascript
to: ['christina@malibubeachvacations.com'], // Change this email
```

### Customize Email Template
Modify the HTML in the `emailData` object in `netlify/functions/contact.js`

### Change Form Styling
Edit `src/components/ContactForm.tsx` to customize the form appearance

## Troubleshooting

### Common Issues

1. **Email not sending**: Check your Resend API key and domain verification
2. **Function not found**: Make sure `netlify/functions/contact.js` exists and is deployed
3. **CORS errors**: The function includes CORS headers, but check your Netlify configuration
4. **Supabase errors**: Verify your Supabase credentials and that the SQL table was created

### Debugging

Check your Netlify function logs in the Netlify dashboard under Functions > contact.

## Security Features

- Input validation on both client and server side
- CORS protection
- Email format validation
- Optional Supabase storage with RLS policies
- Rate limiting (can be added at Netlify level)
