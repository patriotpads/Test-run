const AWS = require('aws-sdk');
const { createClient } = require('@supabase/supabase-js');

// Initialize Amazon SES
const ses = new AWS.SES({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Initialize Supabase (optional)
const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  : null;

exports.handler = async (event, context) => {
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

    // Send email using Amazon SES
    const emailData = {
      Source: 'contact@patriotpads.com', // Your verified domain
      Destination: {
        ToAddresses: ['christina@malibubeachvacations.com'], // Your email address
      },
      Message: {
        Subject: {
          Data: `New Contact Form Submission: ${subject}`,
        },
        Body: {
          Html: {
            Data: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">
                  New Contact Form Submission
                </h2>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Subject:</strong> ${subject}</p>
                </div>
                
                <div style="margin: 20px 0;">
                  <h3 style="color: #1e3a8a;">Message:</h3>
                  <p style="background-color: #ffffff; padding: 15px; border-left: 4px solid #1e3a8a; white-space: pre-wrap;">
                    ${message}
                  </p>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
                  <p>This message was sent from the PatriotPads contact form.</p>
                  <p>Sent on: ${new Date().toLocaleString()}</p>
                </div>
              </div>
            `,
          },
        },
      },
    };

    const emailResult = await ses.sendEmail(emailData).promise();

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
        emailId: emailResult.data?.id
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
