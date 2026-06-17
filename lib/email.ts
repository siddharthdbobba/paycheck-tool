import { Resend } from 'resend'

// Initialize lazily — Resend key might not be set in dev
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

export async function sendPlanEmail(email: string): Promise<{ ok: boolean; error?: string }> {
  const resend = getResend()
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — email not sent')
    return { ok: false, error: 'RESEND_API_KEY not configured' }
  }

  try {
    await resend.emails.send({
      from: 'Paycheck Tool <plan@paychecktool.app>',
      to: email,
      subject: 'Your personalized first-paycheck plan',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
          <h1 style="font-size: 20px; margin-bottom: 16px;">Your First-Paycheck Plan</h1>
          <p style="color: #444; line-height: 1.6;">
            Thanks for using the New Grad Paycheck Calculator. Here's your quick-start checklist:
          </p>
          <ol style="color: #444; line-height: 1.8; padding-left: 20px;">
            <li><strong>Enroll in your 401k</strong> — contribute at least up to the employer match</li>
            <li><strong>Open a Roth IRA</strong> — start with $50/month if that's all you can do</li>
            <li><strong>Move your savings</strong> to a high-yield account (3.5-4.5% APY)</li>
            <li><strong>Get a starter credit card</strong> — one with no annual fee, set autopay</li>
          </ol>
          <p style="color: #888; font-size: 12px; margin-top: 24px;">
            Estimates only. This is educational information, not financial, tax, or investment advice.
          </p>
        </div>
      `,
    })
    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[email] send failed:', message)
    return { ok: false, error: message }
  }
}
