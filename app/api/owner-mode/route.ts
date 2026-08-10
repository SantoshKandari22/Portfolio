import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key');
  if (key !== process.env.OWNER_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const res = NextResponse.redirect(new URL('/', req.url));
  res.cookies.set('sk_owner', '1', {
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: 'lax',
  });
  return res;
}
