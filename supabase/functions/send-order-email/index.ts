// Edge function: send-order-email
// Receives order data and sends HTML invoice/receipt emails via Resend.
// Sends two emails: internal notification + customer confirmation.
// Falls back to logging when RESEND_API_KEY is not configured.
// Self-migrates the customer_email column on first call via the Supabase SQL API.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

async function ensureEmailColumn() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("VITE_SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) return;
  try {
    await fetch(`${supabaseUrl}/rest/v1/rpc/add_customer_email_column`, {
      method: "POST",
      headers: {
        "apikey": serviceKey,
        "Authorization": `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
      },
      body: "{}",
    });
  } catch {
    // Function may not exist yet; the column might already be there. Non-fatal.
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    await ensureEmailColumn();

    const body = await req.json();
    const {
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      customer_city,
      payment_method,
      items,
      subtotal,
      delivery_fee,
      total,
      orderNumber,
      notifyEmail,
    } = body;

    const typedItems = items as Array<{
      title: string;
      code: string;
      variant: string;
      sizeId: string;
      qty: number;
      unitPrice: number;
      lineTotal: number;
    }>;

    const sizeLabels: Record<string, string> = {
      a5: "A5 · 5.8×8.3\"",
      a4: "A4 · 8.3×11.7\"",
      a3: "A3 · 11.7×16.5\"",
      "12x16": '12×16"',
      "16x20": '16×20"',
      "18x24": '18×24"',
    };

    const fmtPrice = (n: number) => `Rs.${n.toLocaleString("en-PK")}`;
    const payLabel = payment_method === "cod" ? "Cash on Delivery" : "Advance Payment";

    // ---- Plain-text fallback ----
    const itemLines = typedItems
      .map(
        (it, i) =>
          `${i + 1}. ${it.title} (${it.code})\n   ${it.variant === "framed" ? "Framed" : "Canvas"} · ${sizeLabels[it.sizeId] ?? it.sizeId}\n   Qty: ${it.qty} × ${fmtPrice(it.unitPrice)} = ${fmtPrice(it.lineTotal)}`,
      )
      .join("\n\n");

    const textBody = [
      `Order Number: ${orderNumber ?? "N/A"}`,
      `Name: ${customer_name}`,
      `Email: ${customer_email ?? "N/A"}`,
      `Phone: ${customer_phone}`,
      `Address: ${customer_address}`,
      `City: ${customer_city}`,
      `Payment Method: ${payLabel}`,
      ``,
      `ITEMS:`,
      itemLines,
      ``,
      `Subtotal: ${fmtPrice(subtotal)}`,
      `Delivery: ${fmtPrice(delivery_fee)}`,
      `TOTAL: ${fmtPrice(total)}`,
    ].join("\n");

    // ---- HTML invoice builder ----
    function buildHtml(introText: string, footerText: string): string {
      const itemRows = typedItems
        .map(
          (it) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #E8E3D6;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#12233A;">
            ${it.title}<br><span style="font-family:'Courier New',monospace;font-size:11px;color:#6B7A8C;letter-spacing:0.5px;">${it.code}</span>
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid #E8E3D6;font-family:'Courier New',monospace;font-size:12px;color:#3A4A5E;text-align:center;white-space:nowrap;">
            ${it.variant === "framed" ? "Framed" : "Canvas"}
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid #E8E3D6;font-family:'Courier New',monospace;font-size:12px;color:#3A4A5E;text-align:center;white-space:nowrap;">
            ${sizeLabels[it.sizeId] ?? it.sizeId}
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid #E8E3D6;font-family:'Courier New',monospace;font-size:14px;color:#12233A;text-align:center;font-weight:bold;">
            ${it.qty}
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid #E8E3D6;font-family:'Courier New',monospace;font-size:14px;color:#12233A;text-align:right;">
            ${fmtPrice(it.unitPrice)}
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid #E8E3D6;font-family:'Courier New',monospace;font-size:14px;color:#12233A;text-align:right;font-weight:bold;">
            ${fmtPrice(it.lineTotal)}
          </td>
        </tr>`,
        )
        .join("");

      return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#EFEBE0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#EFEBE0;">
<tr><td align="center" style="padding:24px 12px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#F5F1E8;border:1px solid #DFD9C9;">

<tr>
<td style="background-color:#12233A;padding:32px 40px;text-align:center;">
<span style="font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:bold;color:#C9A24B;letter-spacing:2px;">PIXELATED</span><br>
<span style="font-family:'Courier New',monospace;font-size:11px;color:#B8B3A6;letter-spacing:3px;text-transform:uppercase;">Wall Art That Speaks</span>
</td>
</tr>

<tr>
<td style="background-color:#1A2F4A;padding:16px 40px;text-align:center;">
<span style="font-family:'Courier New',monospace;font-size:16px;font-weight:bold;color:#C9A24B;letter-spacing:2px;">${orderNumber ?? "N/A"}</span>
</td>
</tr>

${introText ? `<tr>
<td style="padding:28px 40px 8px;">
<p style="margin:0;font-family:Georgia,serif;font-size:16px;color:#12233A;line-height:1.6;">${introText}</p>
</td>
</tr>` : ""}

<tr>
<td style="padding:${introText ? "8px" : "32px"} 40px 8px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="vertical-align:top;width:50%;padding-right:16px;">
<p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:10px;color:#6B7A8C;letter-spacing:1.5px;text-transform:uppercase;">Customer</p>
<p style="margin:0;font-family:Georgia,serif;font-size:16px;color:#12233A;font-weight:bold;">${customer_name}</p>
<p style="margin:4px 0 0;font-family:'Courier New',monospace;font-size:13px;color:#3A4A5E;">${customer_phone}</p>
</td>
<td style="vertical-align:top;width:50%;padding-left:16px;">
<p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:10px;color:#6B7A8C;letter-spacing:1.5px;text-transform:uppercase;">Delivery To</p>
<p style="margin:0;font-family:Georgia,serif;font-size:15px;color:#12233A;line-height:1.5;">${customer_address}<br>${customer_city}</p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:8px 40px 24px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="background-color:#E8E3D6;border-radius:4px;">
<tr>
<td style="padding:10px 16px;">
<span style="font-family:'Courier New',monospace;font-size:10px;color:#6B7A8C;letter-spacing:1.5px;text-transform:uppercase;">Payment Method</span><br>
<span style="font-family:Georgia,serif;font-size:15px;color:#12233A;font-weight:bold;">${payLabel}</span>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:2px solid #12233A;">
<tr>
<td style="padding:12px 16px;background-color:#12233A;font-family:'Courier New',monospace;font-size:10px;color:#C9A24B;letter-spacing:1.5px;text-transform:uppercase;text-align:left;">Item</td>
<td style="padding:12px 8px;background-color:#12233A;font-family:'Courier New',monospace;font-size:10px;color:#C9A24B;letter-spacing:1.5px;text-transform:uppercase;text-align:center;">Material</td>
<td style="padding:12px 8px;background-color:#12233A;font-family:'Courier New',monospace;font-size:10px;color:#C9A24B;letter-spacing:1.5px;text-transform:uppercase;text-align:center;">Size</td>
<td style="padding:12px 8px;background-color:#12233A;font-family:'Courier New',monospace;font-size:10px;color:#C9A24B;letter-spacing:1.5px;text-transform:uppercase;text-align:center;">Qty</td>
<td style="padding:12px 8px;background-color:#12233A;font-family:'Courier New',monospace;font-size:10px;color:#C9A24B;letter-spacing:1.5px;text-transform:uppercase;text-align:right;">Unit Price</td>
<td style="padding:12px 16px;background-color:#12233A;font-family:'Courier New',monospace;font-size:10px;color:#C9A24B;letter-spacing:1.5px;text-transform:uppercase;text-align:right;">Total</td>
</tr>
${itemRows}
</table>
</td>
</tr>

<tr>
<td style="padding:16px 40px 8px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="width:60%"></td>
<td style="width:40%">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="padding:8px 0;font-family:'Courier New',monospace;font-size:13px;color:#3A4A5E;">Subtotal</td>
<td style="padding:8px 0;font-family:'Courier New',monospace;font-size:14px;color:#12233A;text-align:right;font-weight:bold;">${fmtPrice(subtotal)}</td>
</tr>
<tr>
<td style="padding:8px 0;font-family:'Courier New',monospace;font-size:13px;color:#3A4A5E;">Delivery Fee</td>
<td style="padding:8px 0;font-family:'Courier New',monospace;font-size:14px;color:#12233A;text-align:right;font-weight:bold;">${delivery_fee === 0 ? "FREE" : fmtPrice(delivery_fee)}</td>
</tr>
<tr>
<td style="padding:12px 0 12px;border-top:2px solid #12233A;font-family:Georgia,serif;font-size:18px;color:#12233A;font-weight:bold;">Total</td>
<td style="padding:12px 0 12px;border-top:2px solid #12233A;font-family:Georgia,serif;font-size:20px;color:#C9A24B;text-align:right;font-weight:bold;">${fmtPrice(total)}</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:24px 40px 32px;border-top:1px solid #DFD9C9;text-align:center;">
<p style="margin:0;font-family:'Courier New',monospace;font-size:11px;color:#6B7A8C;letter-spacing:1px;text-transform:uppercase;">Pixelated · Wall Art That Speaks</p>
<p style="margin:8px 0 0;font-family:Georgia,serif;font-size:13px;color:#3A4A5E;">${footerText}</p>
</td>
</tr>

</table>

</td></tr>
</table>

</body>
</html>`;
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = "orders@pixelated.pk";

    const emails: Array<{ to: string[]; subject: string; html: string; text: string }> = [];

    // Internal notification email
    if (notifyEmail) {
      emails.push({
        to: [notifyEmail],
        subject: `New Order ${orderNumber ?? ""} — ${customer_name}`,
        html: buildHtml("", "Reply to this email if you have questions about this order."),
        text: `NEW ORDER RECEIVED\n\n${textBody}`,
      });
    }

    // Customer confirmation email
    if (customer_email) {
      emails.push({
        to: [customer_email],
        subject: `Your Pixelated Order ${orderNumber ?? ""} — Confirmation`,
        html: buildHtml(
          `Hi ${customer_name}, thank you for your order! We've received your details and will contact you shortly to confirm.`,
          "Questions about your order? Just reply to this email.",
        ),
        text: `Hi ${customer_name}, thank you for your order!\n\n${textBody}`,
      });
    }

    if (resendApiKey) {
      for (const email of emails) {
        try {
          const resendRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: fromEmail,
              to: email.to,
              subject: email.subject,
              html: email.html,
              text: email.text,
            }),
          });

          if (!resendRes.ok) {
            const errText = await resendRes.text();
            console.error(`Resend API error (${resendRes.status}) for ${email.to}: ${errText}`);
          }
        } catch (err) {
          console.error(`Failed to send email to ${email.to}:`, err);
        }
      }
    } else {
      for (const email of emails) {
        console.log(`[No RESEND_API_KEY] Email would be sent to ${email.to}:`);
        console.log(email.text);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Order emails processed" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("send-order-email error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to process order email" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
