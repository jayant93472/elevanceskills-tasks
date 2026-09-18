import './style.css'

const hour = new Date().getHours()
const suggestedTheme = hour >= 5 && hour < 12 ? 'Light' : 'Dark'
const time = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit' }).format(new Date())

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<main class="shell">
  <aside class="sidebar"><div class="brand"><b>S</b> Sentinel</div><p class="eyebrow">WORKSPACE</p><nav><a href="#">⌂ Overview</a><a class="active" href="#security">◈ Account security</a><a href="#activity">◷ Activity</a></nav><div class="profile"><span>AR</span><div><strong>Alex Rivera</strong><small>alex@sentinel.dev</small></div></div></aside>
  <section class="content" id="security"><header><div><p class="eyebrow">ACCOUNT / SETTINGS</p><h1>Account security</h1></div><span class="secure">● All systems secure</span></header>
  <div class="intro"><div><h2>Keep your account protected</h2><p>Review your sign-in activity, manage trusted devices, and control how Sentinel verifies you.</p></div><div class="score"><small>Security score</small><strong>92</strong><span>/ 100</span><i></i></div></div>
  <div class="cards"><article class="panel"><div class="heading"><div><p class="eyebrow">APPEARANCE</p><h3>Login-based theme</h3></div><em>Auto</em></div><p>Sentinel adapts your workspace based on when you sign in.</p><div class="theme"><span>☼</span><div><strong>${suggestedTheme} theme suggested</strong><small>Based on your ${time} IST login</small></div><label><input type="checkbox" checked><b></b></label></div><div class="choices"><button class="${suggestedTheme === 'Light' ? 'selected' : ''}">Light</button><button class="${suggestedTheme === 'Dark' ? 'selected' : ''}">Dark</button><button>Auto</button></div><small class="muted">Your preference syncs across all devices.</small></article>
  <article class="panel"><div class="heading"><div><p class="eyebrow">VERIFICATION</p><h3>Two-step verification</h3></div><em class="green">Enabled</em></div><p>Extra protection is required when we detect an unfamiliar sign-in.</p><div class="method">✉ <div><strong>Email verification</strong><small>alex@sentinel.dev</small></div><a>Edit</a></div><div class="method">▣ <div><strong>Authenticator app</strong><small>Added Jan 14, 2025</small></div><a>Manage</a></div></article>
  <article class="panel wide" id="activity"><div class="heading"><div><p class="eyebrow">ACCESS HISTORY</p><h3>Recent login activity</h3></div><a>View all activity →</a></div><div class="login"><div>▣ <div><strong>Chrome on Windows</strong><small>Bengaluru, Karnataka · 103.214.56.18</small></div><span class="green">Current session<small>Just now</small></span></div><div>▱ <div><strong>Safari on iPhone</strong><small>Bengaluru, Karnataka · 103.214.56.18</small></div><span class="blue">Trusted<small>Yesterday, 8:42 PM</small></span></div><div>▣ <div><strong>Firefox on macOS</strong><small>Mumbai, Maharashtra · 49.36.118.72</small></div><span class="orange">Verified by OTP<small>Aug 18, 11:06 AM</small></span></div></div></article>
  <article class="panel"><div class="heading"><div><p class="eyebrow">REMEMBERED ACCESS</p><h3>Trusted devices <sup>3</sup></h3></div><a>Manage →</a></div><p>Devices that can sign in without an OTP for the next 30 days.</p><div class="devices">▣　▱　⌁ <small>+ 1 more device</small></div></article></div>
  <footer>Last security review <strong>Today, ${time} IST</strong>　·　<a>Security & privacy center →</a></footer></section>
</main>`

document.querySelectorAll<HTMLButtonElement>('.choices button').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.choices button').forEach(item => item.classList.remove('selected')); button.classList.add('selected') }))
