import SurveyMail from '../../../components/surveyemail';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'no-reply@tm.glasscube.io',
      to: ['robertbenn95@gmail.com'],
      subject: 'Hello world',
      react: <SurveyMail username='Nodirbek', testTitle='Test 1'/>
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
