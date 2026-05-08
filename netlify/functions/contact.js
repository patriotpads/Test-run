const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase (optional)
const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  : null;

exports.handler = async (event, context) => {
  console.log('Function invoked with method:', event.httpMethod);
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'All fields are required' }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Invalid email address' }),
      };
    }

    console.log('Processing contact form submission:', {
      name,
      email,
      subject,
      timestamp: new Date().toISOString()
    });

    // Send email using Netlify Forms
    const emailData = {
      to: 'christina@malibubeachvacations.com',
      from: 'PatriotPads Website <noreply@patriotpads.com>',
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
        
        ---
        This message was sent from the PatriotPads contact form.
        Sent on: ${new Date().toLocaleString()}
      `,
      replyTo: email,
    };

    // Use Netlify's built-in email functionality
    const response = await fetch('https://api.netlify.com/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NETLIFY_FORMS_TOKEN}`,
      },
      body: JSON.stringify({
        form: 'contact',
        data: emailData,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email via Netlify Forms');
    }

    const emailResult = await response.json();

    // Optionally store in Supabase
    if (supabase) {
      try {
        const { error: supabaseError } = await supabase
          .from('contact_submissions')
          .insert({
            name,
            email,
            subject,
            message,
            created_at: new Date().toISOString(),
          });

        if (supabaseError) {
          console.error('Supabase storage error:', supabaseError);
          // Don't fail the request if Supabase storage fails
        }
      } catch (supabaseErr) {
        console.error('Supabase storage exception:', supabaseErr);
        // Don't fail the request if Supabase storage fails
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        success: true,
        message: 'Contact form submitted successfully',
        netlifyResponse: emailResult
      }),
    };

  } catch (error) {
    console.error('Contact form error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'Failed to process contact form submission'
      }),
    };
  }
};
