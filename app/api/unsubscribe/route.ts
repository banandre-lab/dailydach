import { Resend } from "resend";
import { NextResponse } from "next/server";
import { verifySubscriptionHash } from "@/lib/security";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, hash } = await request.json();

    if (!email || !hash) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    // Verify the hash before performing any sensitive operation
    if (!verifySubscriptionHash(email, hash)) {
      return NextResponse.json(
        { error: "Invalid secure link" },
        { status: 401 }
      );
    }

    const segmentId = process.env.RESEND_SEGEMENT_ID;
    if (!segmentId) {
      return NextResponse.json(
        { error: "Missing configuration" },
        { status: 500 }
      );
    }

    // Find the contact in the segment
    const { data: contacts } = await resend.contacts.list({
      audienceId: segmentId,
    });

    const contact = contacts?.data?.find(
      (c) => c.email.toLowerCase() === email.toLowerCase()
    );

    if (contact) {
      // Option 1: Update contact to unsubscribed status
      await resend.contacts.update({
        id: contact.id,
        audienceId: segmentId,
        unsubscribed: true,
      });

      // Option 2: Remove contact entirely (uncomment if preferred)
      // await resend.contacts.remove({
      //   id: contact.id,
      //   audienceId: segmentId,
      // });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unsubscribe API error:", err);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
