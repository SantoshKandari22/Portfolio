interface VisitorEmailData {
  time: string;
  ip: string;
  location: string;
  deviceType: string;
  browser: string;
  os: string;
  referrer: string;
  source: 'resume' | 'github' | 'referrer' | 'direct';
  landingPage: string;
  pages: string[];
  githubProfile: string | null;
}

export function renderVisitorEmail(d: VisitorEmailData): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 12px;color:#8b949e;font:13px monospace;white-space:nowrap;">${label}</td>
      <td style="padding:6px 12px;color:#c9d1d9;font:13px monospace;">${escapeHtml(value)}</td>
    </tr>`;

  return `
  <div style="background:#0d1117;padding:24px;font-family:monospace;">
    <div style="max-width:560px;margin:0 auto;background:#161b22;border:1px solid #30363d;border-radius:8px;overflow:hidden;">
      <div style="background:#1e2327;padding:12px 16px;color:#39d353;font-size:13px;">
        &gt; new_visitor.log
      </div>
      <table style="width:100%;border-collapse:collapse;">
        ${row('time', d.time)}
        ${row('ip', d.ip)}
        ${row('location', d.location)}
        ${row('device', d.deviceType)}
        ${row('browser', d.browser)}
        ${row('os', d.os)}
        ${row('referrer', d.referrer)}
        ${row('source', d.source)}
        ${row('landing_page', d.landingPage)}
        ${row('pages_viewed', d.pages.join(' -> '))}
        ${d.githubProfile ? row('github', `github.com/${d.githubProfile}`) : ''}
      </table>
    </div>
  </div>`;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}
