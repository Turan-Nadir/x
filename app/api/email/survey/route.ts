import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(Request: Request) {
  try {
    const { email, username, testTitle } = await Request.json(); // Parse JSON from request body

    const data = await resend.emails.send({
        from: "no-reply@tm.glasscube.io",
        to: [email],
        subject: "Survey Completion Confirmation",
        html: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Survey Completion Confirmation</title>
              <style>
                body { font-family: Arial, sans-serif; }
                .container { margin: 0 auto; padding: 20px; max-width: 600px; }
                .heading { font-size: 24px; font-weight: bold; }
                .text { font-size: 16px; line-height: 1.5; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1 class="heading">Thank you for completing the survey!</h1>
                <p class="text">Hi ${username},</p>
                <p class="text">Thank you for participating in the "${testTitle}" survey.</p>
                <p class="text">Your responses have been successfully recorded. We appreciate your time and feedback.</p>
              </div>
            </body>
          </html>
        `,
      });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
