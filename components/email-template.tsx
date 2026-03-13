interface EmailTemplateProps {
  email: string;
  categories: string[];
  hash: string;
}

export function getEmailHtml({
  email,
  categories,
  hash,
}: EmailTemplateProps): string {
  const categoriesHtml =
    categories.length > 0
      ? `<p>You have chosen to stay updated on the following topics: ${categories.join(
          ", "
        )}.</p>`
      : "";

  return `
    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #111;">Welcome to DailyDach!</h1>
      <p>Hi there,</p>
      <p>
        Thanks for subscribing to our newsletter with <strong>${email}</strong>.
      </p>
      ${categoriesHtml}
      <p>
        We're excited to share curated stories, insightful articles, and
        fresh perspectives on technology, design, and culture with you.
      </p>
      <div
        style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;"
      >
        <p>Sent with ❤️ from DailyDach.</p>
        <p>
          <a
            href="https://www.dailydach.com/subscribe?email=${email}&hash=${hash}&unsubscribe=true"
            style="color: #666; text-decoration: underline;"
          >
            Unsubscribe
          </a>
          &nbsp; • &nbsp;
          <a
            href="https://www.dailydach.com/subscribe?email=${email}&hash=${hash}"
            style="color: #666; text-decoration: underline;"
          >
            Manage Preferences
          </a>
        </p>
      </div>
      <p>
        Best regards,<br />
        The DailyDach Team
      </p>
    </div>
  `;
}
