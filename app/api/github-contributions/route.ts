import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const revalidate = 3600;

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? 'SantoshKandari22';

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

type Level = 0 | 1 | 2 | 3 | 4;

const LEVEL_MAP: Record<string, Level> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export async function GET() {
  if (!process.env.GITHUB_TOKEN) {
    return NextResponse.json({ error: 'Missing GITHUB_TOKEN' }, { status: 500 });
  }

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_USERNAME } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'GitHub API error' }, { status: 502 });
  }

  const json = await res.json();
  const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    return NextResponse.json({ error: 'No contribution data' }, { status: 502 });
  }

  const days = calendar.weeks.flatMap((w: { contributionDays: any[] }) =>
    w.contributionDays.map((d) => ({
      date: d.date,
      count: d.contributionCount,
      level: LEVEL_MAP[d.contributionLevel] ?? 0,
    }))
  );

  return NextResponse.json({ total: calendar.totalContributions, days });
}
