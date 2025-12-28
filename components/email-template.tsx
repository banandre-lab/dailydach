import * as React from "react";

interface EmailTemplateProps {
  email: string;
  categories: string[];
  hash: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  categories,
  hash,
}) => (
  <div style={{ fontFamily: "sans-serif", color: "#333" }}>
    <h1>Welcome to TRIBITAT!</h1>
    <p>Hi there,</p>
    <p>
      Thanks for subscribing to our newsletter with <strong>{email}</strong>.
    </p>
    {categories.length > 0 && (
      <p>
        You have chosen to stay updated on the following topics:{" "}
        {categories.join(", ")}.
      </p>
    )}
    <p>
      We&apos;re excited to share curated stories, insightful articles, and
      fresh perspectives on technology, design, and culture with you.
    </p>
    <div
      style={{
        marginTop: "40px",
        paddingTop: "20px",
        borderTop: "1px solid #eee",
        fontSize: "12px",
        color: "#666",
      }}
    >
      <p>Sent with ❤️ from TRIBITAT.</p>
      <p>
        <a
          href={`https://www.tribitat.com/subscribe?email=${email}&hash=${hash}&unsubscribe=true`}
          style={{ color: "#666", textDecoration: "underline" }}
        >
          Unsubscribe
        </a>
        {" • "}
        <a
          href={`https://www.tribitat.com/subscribe?email=${email}&hash=${hash}`}
          style={{ color: "#666", textDecoration: "underline" }}
        >
          Manage Preferences
        </a>
      </p>
    </div>
    <p>
      Best regards,
      <br />
      The TRIBITAT Team
    </p>
  </div>
);

export default EmailTemplate;
