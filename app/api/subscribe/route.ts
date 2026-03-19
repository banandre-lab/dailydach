import { Resend } from "resend";
import { getEmailHtml } from "@/components/email-template";
import { NextResponse } from "next/server";
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
      const segmentId =
        process.env.RESEND_SEGEMENT_ID || process.env.RESEND_SEGMENT_ID;

      if (!segmentId) {
        console.error("Missing Resend segment configuration");
      } else {
        // Add or update the contact in the configured segment.
        await resend.contacts.create({
          email,
          segments: [{ id: segmentId }],
          unsubscribed: false,
        });
      }
    } catch (contactError) {
      console.error("Error managing contact in Resend:", contactError);
    }

    // 2. Only send Welcome Email if it's a NEW subscription (no hash provided)
    if (!isUpdate) {
      // Get the email HTML string directly (no React rendering needed in the API)
      const emailHtml = getEmailHtml({
        email,
        categories: selectedCategories,
        hash: currentHash,
      });

      const { data, error } = await resend.emails.send({
        from: "DailyDach <contact@dailydach.com>",
        to: [email],
        subject: "Welcome to DailyDach Newsletter!",
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
