import { NextRequest, NextResponse } from 'next/server';
import { UAParser } from 'ua-parser-js';
import { Resend } from 'resend';
import { renderVisitorEmail } from '@/lib/email';

export const runtime = 'nodejs';

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? 'kandarisantosh3@gmail.com';
const BOT_UA = /bot|crawl|spider|slurp|facebookexternalhit|headless|lighthouse|vercel-screenshot|preview/i;

interface TrackPayload {
  pages: string[];
  referrer: string;
  landingPage: string;
  sourceHint?: string;
  firstSeenAt: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TrackPayload;
    const ua = req.headers.get('user-agent') ?? '';

    if (BOT_UA.test(ua)) {
      return NextResponse.json({ skipped: 'bot' });
    }
    if (req.cookies.get('sk_owner')?.value === '1') {
      return NextResponse.json({ skipped: 'owner' });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ ok: false, error: 'Missing RESEND_API_KEY' }, { status: 500 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown';
    const country = req.headers.get('x-vercel-ip-country') ?? 'Unknown';
    const region = req.headers.get('x-vercel-ip-country-region') ?? '';
    const cityRaw = req.headers.get('x-vercel-ip-city');
    const city = cityRaw ? decodeURIComponent(cityRaw) : 'Unknown';

    const parser = new UAParser(ua);
    const browser = parser.getBrowser();
    const os = parser.getOS();
    const device = parser.getDevice();
    const deviceType = device.type
      ? (device.type.charAt(0) || 'd').toUpperCase() + device.type.slice(1)
      : 'Desktop';

    let githubProfile: string | null = null;
    let source: 'resume' | 'github' | 'referrer' | 'direct' = 'direct';

    if (body.sourceHint === 'resume') {
      source = 'resume';
    } else if (body.referrer) {
      source = 'referrer';
      const m = body.referrer.match(/^https?:\/\/(www\.)?github\.com\/([^/?#]+)\/?$/);
      if (m && m[2]) {
        githubProfile = m[2];
        source = 'github';
      }
    }

    const html = renderVisitorEmail({
      time: new Date(body.firstSeenAt).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'medium',
      }),
      ip,
      location: [city, region, country].filter((s) => s && s !== 'Unknown').join(', ') || 'Unknown',
      deviceType,
      browser: `${browser.name ?? 'Unknown'} ${browser.version ?? ''}`.trim(),
      os: `${os.name ?? 'Unknown'} ${os.version ?? ''}`.trim(),
      referrer: body.referrer || 'Direct / no referrer',
      source,
      landingPage: body.landingPage,
      pages: body.pages,
      githubProfile,
    });

    await resend.emails.send({
      from: 'Portfolio Visitor <onboarding@resend.dev>',
      to: NOTIFY_EMAIL,
      subject: githubProfile
        ? `👀 ${githubProfile} just viewed your portfolio`
        : `👀 New portfolio visitor — ${country}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('track-visit error', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
