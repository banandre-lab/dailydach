import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
async function test() {
  try {
    const audiences = await resend.audiences.list();
    console.log('Audiences:', JSON.stringify(audiences, null, 2));
  } catch (e) {
    console.error('Error listing audiences:', e);
  }
}
test();
