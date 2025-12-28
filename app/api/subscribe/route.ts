import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
import { NextResponse } from "next/server";
import { renderToStaticMarkup } from "react-dom/server";
import * as React from "react";
import {
  generateSubscriptionHash,
  verifySubscriptionHash,
} from "@/lib/security";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, categories, hash } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // If a hash is provided, verify it. This allows updating without re-verifying email.
    const isUpdate = !!hash;
    if (isUpdate && !verifySubscriptionHash(email, hash)) {
      return NextResponse.json(
        { error: "Invalid secure link" },
        { status: 401 }
      );
    }

    const selectedCategories =
      categories && categories.length > 0 ? categories : ["All Topics"];

    const currentHash = isUpdate ? hash : generateSubscriptionHash(email);

    // 1. Manage Audience and Contact
    try {
      // Use the provided segment ID or fallback to listing segments
      const segmentId = process.env.RESEND_SEGEMENT_ID;

      // Add or update the contact in the segment
      // resend.contacts.create also acts as an update if the contact exists in some cases,
      // but let's be explicit if we have a hash (meaning it's likely an existing user)
      await resend.contacts.create({
        email,
        audienceId: segmentId, // The SDK still uses audienceId for the contact's segment
        unsubscribed: false,
      });
    } catch (contactError) {
      // Log but don't fail the whole request if contact creation fails
      console.error("Error managing contact in Resend:", contactError);
    }

    // 2. Only send Welcome Email if it's a NEW subscription (no hash provided)
    if (!isUpdate) {
      // Pre-render the email template to HTML using standard React server rendering
      // to avoid issues with Prettier dependencies in Cloudflare Workers
      const emailHtml = renderToStaticMarkup(
        React.createElement(EmailTemplate, {
          email,
          categories: selectedCategories,
          hash: currentHash,
        })
      );

      const { data, error } = await resend.emails.send({
        from: "TRIBITAT <noreply@tribitat.com>",
        to: [email],
        subject: "Welcome to TRIBITAT Newsletter!",
        html: emailHtml,
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json({ error }, { status: 500 });
      }

      return NextResponse.json({ data });
    }

    return NextResponse.json({ success: true, updated: true });
  } catch (err) {
    console.error("Subscription API error:", err);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
