import './style.css'
const sessions = [
  { browser: 'Chrome', version: '126.0.6478', location: 'Bengaluru, Karnataka', device: 'MacBook Pro', type: 'Desktop', ip: '103.76.214.82', time: 'Today, 10:42 AM', current: true, icon: '◒' },
  { browser: 'Safari', version: '17.5', location: 'Bengaluru, Karnataka', device: 'iPhone 15 Pro', type: 'Mobile', ip: '103.76.214.82', time: 'Yesterday, 8:18 PM', icon: '◐' },
  { browser: 'Firefox', version: '127.0', location: 'Pune, Maharashtra', device: 'Windows PC', type: 'Desktop', ip: '49.36.118.201', time: '18 Jun 2024, 4:06 PM', icon: '◓' },
]

const storedTheme = localStorage.getItem('sentinel-theme')
const istHour = Number(new Intl.DateTimeFormat('en-IN', { hour: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }).format(new Date()))
let theme = storedTheme || (istHour >= 5 && istHour < 12 ? 'light' : 'dark')

const sessionRows = sessions.map((session, index) => `<tr data-index="${index}"><td><div class="device-cell"><span class="browser-icon">${session.icon}</span><span><strong>${session.browser} <em>${session.version}</em></strong><small>${session.device} · ${session.type}${session.current ? ' · <b class="current-label">This device</b>' : ''}</small></span></div></td><td><strong>${session.location.split(',')[0]}</strong><small>${session.location.split(',')[1] || ''}</small></td><td class="mono">${session.ip}</td><td><strong>${session.time.split(',')[0]}</strong><small>${session.time.split(',')[1] || ''}</small></td><td><span class="status ${session.current ? 'current' : 'success'}">${session.current ? 'Current' : 'Verified'}</span></td><td><button class="row-menu" aria-label="Session actions" data-menu="${index}">•••</button></td></tr>`).join('')

const render = () => {
  document.documentElement.dataset.theme = theme
  document.querySelector('#app').innerHTML = `<div class="shell"><aside class="sidebar"><div class="brand"><span class="brand-mark">S</span><span>sentinel<span class="brand-dot">.</span></span></div><div class="workspace-label">PERSONAL WORKSPACE</div><nav><button class="nav-item"><span>⌂</span> Overview</button><button class="nav-item active"><span>⌾</span> Security <b>3</b></button><button class="nav-item"><span>☷</span> Preferences</button></nav><div class="sidebar-bottom"><div class="support"><span class="support-icon">?</span><div><strong>Need a hand?</strong><small>Visit Help Center</small></div></div><button class="profile"><span class="avatar">AK</span><span><strong>Arjun Kumar</strong><small>arjun@orbitmail.io</small></span><span class="chevron">⌄</span></button></div></aside><main class="main-content"><header class="topbar"><div class="breadcrumbs"><span>Account</span><span>/</span><strong>Security</strong></div><div class="top-actions"><button class="icon-button" aria-label="Toggle theme" id="theme-toggle">${theme === 'dark' ? '☼' : '☾'}</button><button class="icon-button" aria-label="Notifications">♧<i></i></button></div></header><div class="content-wrap"><div class="page-heading"><div><p class="eyebrow">ACCOUNT PROTECTION</p><h1>Security</h1><p class="subtitle">Keep your account protected and stay in control of your sessions.</p></div><div class="secure-badge"><span>✓</span> Your account is secure</div></div><section class="security-score panel"><div class="score-ring"><div><strong>92</strong><small>/100</small></div></div><div class="score-copy"><p class="eyebrow">SECURITY SCORE</p><h2>Good protection</h2><p>Your account has strong protection enabled. Complete the remaining recommendations to reach an excellent score.</p><div class="score-line"><span><i></i></span><small>2 of 3 recommendations complete</small></div></div><button class="text-button">View recommendations <span>→</span></button></section><div class="section-title"><div><h2>Login activity</h2><p>Review where your account has been accessed recently.</p></div><button class="outline-button" id="download-log">↓ <span>Download log</span></button></div><section class="panel activity-panel"><div class="activity-head"><div class="activity-filters"><button class="filter active">All activity</button><button class="filter">Successful</button><button class="filter">Challenges</button></div><span class="last-updated">Updated just now</span></div><div class="table-wrap"><table><thead><tr><th>Browser & device</th><th>Location</th><th>IP address</th><th>Logged in</th><th>Status</th><th></th></tr></thead><tbody>${sessionRows}</tbody></table></div><div class="activity-foot"><span><span class="live-dot"></span> Live monitoring active</span><button class="text-button">View full history <span>→</span></button></div></section><div class="section-title lower"><div><h2>Trusted devices</h2><p>Devices that can sign in without an extra verification step.</p></div><button class="outline-button" id="add-device">+ <span>Trust a device</span></button></div><section class="panel trusted-panel"><div class="trusted-row"><div class="device-cell"><span class="device-square">⌁</span><span><strong>MacBook Pro <span class="you-tag">YOU</span></strong><small>Chrome 126 · Bengaluru, India · Added today</small></span></div><div class="trust-expiry"><small>TRUST EXPIRES</small><strong>30 days</strong></div><button class="toggle on" aria-label="Toggle trusted device"><span></span></button><button class="row-menu">•••</button></div><div class="trusted-row"><div class="device-cell"><span class="device-square mobile">⌁</span><span><strong>iPhone 15 Pro</strong><small>Safari 17.5 · Bengaluru, India · Added 12 days ago</small></span></div><div class="trust-expiry"><small>TRUST EXPIRES</small><strong>18 days</strong></div><button class="toggle on" aria-label="Toggle trusted device"><span></span></button><button class="row-menu">•••</button></div><div class="trusted-row muted-row"><div class="device-cell"><span class="device-square">⌁</span><span><strong>Windows PC</strong><small>Firefox 127 · Pune, India · Trust expired</small></span></div><div class="trust-expiry"><small>STATUS</small><strong>Expired</strong></div><button class="toggle" aria-label="Toggle trusted device"><span></span></button><button class="row-menu">•••</button></div></section><section class="notice"><span class="notice-icon">!</span><div><strong>New login verification is active</strong><p>We'll ask for a one-time code when we detect a new browser, device, IP address, or location.</p></div><button class="close-notice" aria-label="Dismiss">×</button></section></div></main></div><div class="modal-backdrop" id="otp-modal"><div class="modal"><button class="modal-close" id="close-modal">×</button><span class="modal-lock">⌾</span><p class="eyebrow">NEW DEVICE DETECTED</p><h2>Verify this device</h2><p>Enter the 6-digit code sent to <strong>a••••@orbitmail.io</strong>.</p><div class="otp-inputs">${[1, 2, 3, 4, 5, 6].map(() => '<input maxlength="1" inputmode="numeric" aria-label="OTP digit">').join('')}</div><button class="primary-button" id="verify-otp">Verify device <span>→</span></button><button class="modal-link">Didn't receive a code? Resend</button></div></div>`
  bindEvents()
}

function bindEvents() {
  document.querySelector('#theme-toggle').onclick = () => { theme = theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('sentinel-theme', theme); render() }
  document.querySelector('#add-device').onclick = () => document.querySelector('#otp-modal').classList.add('show')
  document.querySelector('#close-modal').onclick = () => document.querySelector('#otp-modal').classList.remove('show')
  document.querySelector('#verify-otp').onclick = () => { document.querySelector('#otp-modal').classList.remove('show'); document.querySelector('#add-device').textContent = '✓ Device trusted' }
  document.querySelector('.close-notice').onclick = (event) => event.currentTarget.closest('.notice').remove()
  document.querySelectorAll('.toggle').forEach((toggle) => toggle.onclick = () => toggle.classList.toggle('on'))
  document.querySelectorAll('.row-menu').forEach((menu) => menu.onclick = () => { if (menu.dataset.menu !== undefined) menu.closest('tr').classList.toggle('flagged') })
  document.querySelectorAll('.nav-item').forEach((item) => item.onclick = () => { document.querySelectorAll('.nav-item').forEach((nav) => nav.classList.remove('active')); item.classList.add('active') })
  document.querySelector('#download-log').onclick = () => { const blob = new Blob(['Sentinel security log\nExport generated: ' + new Date().toISOString()], { type: 'text/plain' }); const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'sentinel-security-log.txt'; link.click() }
  const inputs = [...document.querySelectorAll('.otp-inputs input')]; inputs.forEach((input, index) => input.oninput = () => inputs[index + 1]?.focus())
}

render()

document.querySelector('#app').innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${javascriptLogo}" class="framework" alt="JavaScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Get started</h1>
    <p>Edit <code>src/main.js</code> and save to test <code>HMR</code></p>
  </div>
  <button id="counter" type="button" class="counter"></button>
</section>

<div class="ticks"></div>

<section id="next-steps">
  <div id="docs">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#documentation-icon"></use></svg>
    <h2>Documentation</h2>
    <p>Your questions, answered</p>
    <ul>
      <li>
        <a href="https://vite.dev/" target="_blank">
          <img class="logo" src="${viteLogo}" alt="" />
          Explore Vite
        </a>
      </li>
      <li>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
          <img class="button-icon" src="${javascriptLogo}" alt="">
          Learn more
        </a>
      </li>
    </ul>
  </div>
  <div id="social">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
    <h2>Connect with us</h2>
    <p>Join the Vite community</p>
    <ul>
      <li><a href="https://github.com/vitejs/vite" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>GitHub</a></li>
      <li><a href="https://chat.vite.dev/" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>Discord</a></li>
      <li><a href="https://x.com/vite_js" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>X.com</a></li>
      <li><a href="https://bsky.app/profile/vite.dev" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>Bluesky</a></li>
    </ul>
  </div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>
`

setupCounter(document.querySelector('#counter'))
