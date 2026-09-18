import { useEffect, useState } from 'react';
import { ArrowUpRight, BadgeCheck, Bell, Check, ChevronDown, CircleHelp, Download, FileText, LockKeyhole, Menu, Play, QrCode, ShieldCheck, Smartphone, Sparkles, X } from 'lucide-react';

const PLANS = [
  { id: 'free', name: 'Free', price: 0, period: 'Forever', color: 'sage', description: 'A thoughtful starting point for exploring Jpay.', features: ['3 premium videos / month', '720p streaming quality', '30 min daily watch time', '2 offline downloads', 'Standard streaming speed'], limits: 'Limited catalog access' },
  { id: 'bronze', name: 'Bronze', price: 299, period: 'month', color: 'bronze', description: 'More room to learn, with the essentials unlocked.', features: ['Unlimited video access', '1080p streaming quality', '2 hr daily watch time', '10 offline downloads', 'Priority content access'], limits: 'Ads included' },
  { id: 'silver', name: 'Silver', price: 599, period: 'month', color: 'silver', description: 'The balanced plan for committed learners.', features: ['Unlimited video access', '1440p streaming quality', '5 hr daily watch time', '25 offline downloads', 'Faster streaming + priority access', 'Exclusive premium courses'], limits: 'Ad-free viewing' },
  { id: 'gold', name: 'Gold', price: 999, period: 'month', color: 'gold', description: 'The complete Jpay experience, without limits.', features: ['Unlimited video access', '4K streaming quality', 'Unlimited daily watch time', 'Unlimited offline downloads', 'Early access to every release', 'Exclusive premium courses', 'Ad-free viewing + fastest streaming'], limits: 'Highest daily usage limits' }
];

const initialSubscription = { planId: 'silver', startedAt: '2026-07-20', expiresAt: '2026-08-20', renewalDate: '2026-08-20', autoRenew: true };
const initialBills = [
  { invoice: 'JP-2026-0720', date: '20 Jul 2026', plan: 'Silver', amount: 599, status: 'Paid', paymentId: 'pay_test_8Jp20' },
  { invoice: 'JP-2026-0620', date: '20 Jun 2026', plan: 'Silver', amount: 599, status: 'Paid', paymentId: 'pay_test_6Jp12' }
];

function money(value) { return value === 0 ? 'Free' : `₹${value.toLocaleString('en-IN')}`; }
function dateLabel(date) { return new Date(`${date}T12:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }
const UPI_ID = import.meta.env.VITE_UPI_ID || 'your-upi@bank';

export default function App() {
  const [subscription, setSubscription] = useState(() => JSON.parse(localStorage.getItem('jpay-subscription') || JSON.stringify(initialSubscription)));
  const [bills, setBills] = useState(() => JSON.parse(localStorage.getItem('jpay-bills') || JSON.stringify(initialBills)));
  const [selectedPlan, setSelectedPlan] = useState('silver');
  const [activeTab, setActiveTab] = useState('plans');
  const [notice, setNotice] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [upiOpen, setUpiOpen] = useState(false);
  const currentPlan = PLANS.find((plan) => plan.id === subscription.planId) || PLANS[0];
  const daysLeft = Math.max(0, Math.ceil((new Date(subscription.expiresAt) - new Date('2026-08-20')) / 86400000));
  const selected = PLANS.find((plan) => plan.id === selectedPlan);
  const usage = currentPlan.id === 'gold' ? 74 : currentPlan.id === 'silver' ? 68 : 42;

  useEffect(() => localStorage.setItem('jpay-subscription', JSON.stringify(subscription)), [subscription]);
  useEffect(() => localStorage.setItem('jpay-bills', JSON.stringify(bills)), [bills]);

  const actionLabel = selectedPlan === subscription.planId ? 'Renew plan' : PLANS.findIndex((p) => p.id === selectedPlan) > PLANS.findIndex((p) => p.id === subscription.planId) ? 'Upgrade now' : 'Downgrade plan';

  function checkout(plan) {
    if (plan.id === 'free') {
      setSubscription({ planId: 'free', startedAt: '2026-08-20', expiresAt: '2099-12-31', renewalDate: null, autoRenew: false });
      setNotice('You are now on the Free plan. Your watch history is preserved.');
      return;
    }
    const paymentId = `pay_test_${Math.random().toString(36).slice(2, 10)}`;
    const invoice = `JP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const expiry = new Date('2026-08-20'); expiry.setMonth(expiry.getMonth() + 1);
    setSubscription({ planId: plan.id, startedAt: '2026-08-20', expiresAt: expiry.toISOString().slice(0, 10), renewalDate: expiry.toISOString().slice(0, 10), autoRenew: true, paymentId });
    setBills((previous) => [{ invoice, date: '20 Aug 2026', plan: plan.name, amount: plan.price, status: 'Paid', paymentId }, ...previous]);
    setNotice(`Payment verified. ${plan.name} is active and your invoice was emailed.`);
    setActiveTab('overview');
  }

  return <div className="app-shell">
    <aside className={mobileOpen ? 'sidebar open' : 'sidebar'}>
      <div className="brand"><span className="brand-mark">J</span><span>jpay<span className="brand-dot">.</span></span></div>
      <div className="workspace-label">YOUR SPACE</div>
      <nav><button className="nav-item"><Play size={17} /> Home</button><button className="nav-item"><Sparkles size={17} /> Discover</button><button className="nav-item active"><BadgeCheck size={17} /> Membership</button><button className="nav-item"><Download size={17} /> Downloads</button></nav>
      <div className="sidebar-bottom"><button className="nav-item"><CircleHelp size={17} /> Help centre</button><div className="profile"><div className="avatar">AR</div><div><strong>Arjun Rao</strong><span>Personal account</span></div><ChevronDown size={15} /></div></div>
    </aside>
    {mobileOpen && <button className="scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu" />}
    <main>
      <header><button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu /></button><div className="breadcrumb">Account <span>/</span> Membership</div><div className="header-actions"><button className="icon-button" aria-label="Notifications"><Bell size={18} /><i /></button><div className="mini-avatar">AR</div></div></header>
      <section className="content">
        <div className="title-row"><div><p className="eyebrow">MEMBERSHIP CONTROL CENTRE</p><h1>More of what moves you.</h1><p className="subtitle">Choose the access that fits your rhythm. Change or cancel anytime.</p></div><div className="secure-note"><ShieldCheck size={18} /><span><strong>Secure payments</strong><br />Razorpay test mode</span></div></div>
        {notice && <div className="notice"><Check size={18} />{notice}<button onClick={() => setNotice('')} aria-label="Dismiss"><X size={16} /></button></div>}
        <div className="tabs"><button className={activeTab === 'overview' ? 'tab active' : 'tab'} onClick={() => setActiveTab('overview')}>Overview</button><button className={activeTab === 'plans' ? 'tab active' : 'tab'} onClick={() => setActiveTab('plans')}>Plans & pricing</button><button className={activeTab === 'billing' ? 'tab active' : 'tab'} onClick={() => setActiveTab('billing')}>Billing history</button></div>
        {activeTab === 'overview' && <Overview plan={currentPlan} subscription={subscription} daysLeft={daysLeft} usage={usage} onManage={() => setActiveTab('plans')} />}
        {activeTab === 'billing' && <Billing bills={bills} />}
        {activeTab === 'plans' && <><div className="section-heading"><div><h2>Find your fit</h2><p>All plans renew automatically. Upgrade instantly, downgrade from your next cycle.</p></div><div className="compare-label"><LockKeyhole size={15} /> Compare benefits</div></div><div className="plans-grid">{PLANS.map((plan) => <PlanCard key={plan.id} plan={plan} selected={selectedPlan === plan.id} current={currentPlan.id === plan.id} onSelect={() => setSelectedPlan(plan.id)} />)}</div><div className="checkout-bar"><div><span className="checkout-kicker">READY WHEN YOU ARE</span><strong>{selected.name} plan <em>{money(selected.price)}{selected.price > 0 && <small> / month</small>}</em></strong><span className="checkout-copy">{selected.price > 0 ? 'Includes a 7-day grace period on renewal.' : 'No card required. Keep exploring for free.'}</span></div><div className="checkout-actions"><button className="upi-button" onClick={() => selected.price > 0 && setUpiOpen(true)} disabled={selected.price === 0}><QrCode size={17} /> Pay via UPI</button><button className="primary-button" onClick={() => checkout(selected)}>{actionLabel} <ArrowUpRight size={17} /></button></div></div></>}
      </section>
    </main>
    {upiOpen && <UpiModal plan={selected} onClose={() => setUpiOpen(false)} />}
  </div>;
}

function UpiModal({ plan, onClose }) {
  const paymentUrl = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent('Jpay Membership')}&am=${plan.price}&cu=INR&tn=${encodeURIComponent(`${plan.name} membership`)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(paymentUrl)}`;
  return <div className="modal-backdrop" role="presentation" onClick={onClose}><div className="upi-modal" role="dialog" aria-modal="true" aria-labelledby="upi-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close payment dialog"><X size={18} /></button><div className="modal-icon"><QrCode size={22} /></div><p className="eyebrow">DIRECT UPI PAYMENT</p><h2 id="upi-title">Scan to pay {money(plan.price)}</h2><p className="modal-copy">Open any UPI app and scan this code. Your bank will show the final confirmation before payment.</p><img className="upi-qr" src={qrUrl} alt={`UPI payment QR code for ${plan.name} membership`} /><div className="upi-id"><span>UPI ID</span><strong>{UPI_ID}</strong></div><a className="open-upi" href={paymentUrl}><Smartphone size={16} /> Open in UPI app</a><p className="payment-warning">Only pay if this UPI ID belongs to your business account.</p></div></div>;
}

function PlanCard({ plan, selected, current, onSelect }) { return <button className={`plan-card ${plan.color} ${selected ? 'selected' : ''}`} onClick={onSelect}><div className="plan-top"><span className="plan-name">{plan.name}</span>{current && <span className="current-pill">Current</span>}{selected && !current && <span className="selected-check"><Check size={13} /></span>}</div><div className="price">{money(plan.price)}{plan.price > 0 && <span>/mo</span>}</div><p>{plan.description}</p><div className="rule" /><ul>{plan.features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul><span className="limits">{plan.limits}</span></button>; }
function Overview({ plan, subscription, daysLeft, usage, onManage }) { return <><div className="overview-grid"><div className="current-card"><div className="current-card-head"><div><span className="eyebrow">CURRENT PLAN</span><h2>{plan.name} <span>membership</span></h2></div><span className="active-pill"><i /> Active</span></div><div className="progress-wrap"><div className="progress-label"><span>Cycle progress</span><strong>{daysLeft} days left</strong></div><div className="progress"><span style={{ width: `${Math.min(100, Math.max(5, 100 - daysLeft / 31 * 100))}%` }} /></div><div className="date-row"><span>Started {dateLabel(subscription.startedAt)}</span><span>Renews {subscription.renewalDate ? dateLabel(subscription.renewalDate) : 'Manually'}</span></div></div><div className="current-footer"><span>Auto-renew is <strong>{subscription.autoRenew ? 'on' : 'off'}</strong></span><button onClick={onManage}>Manage plan <ArrowUpRight size={15} /></button></div></div><div className="usage-card"><div className="usage-icon"><Play size={18} /></div><span className="eyebrow">TODAY'S USAGE</span><h3>{plan.id === 'gold' ? 'Unlimited' : '3h 24m'} <small>/ {plan.id === 'gold' ? 'day' : plan.id === 'silver' ? '5h limit' : '2h limit'}</small></h3><div className="usage-bar"><span style={{ width: `${usage}%` }} /></div><p>Resets in 6h 12m</p></div></div><div className="feature-strip"><div><span className="eyebrow">UNLOCKED FOR YOU</span><h3>Your premium toolkit</h3></div><div className="feature-list"><span><BadgeCheck size={16} /> {plan.id === 'free' ? 'Selected videos' : 'Full video library'}</span><span><Download size={16} /> {plan.id === 'gold' ? 'Unlimited downloads' : `${plan.id === 'silver' ? 25 : plan.id === 'bronze' ? 10 : 2} downloads`}</span><span><Sparkles size={16} /> {plan.id === 'free' ? 'Standard access' : 'Priority content'}</span></div></div></>; }
function Billing({ bills }) { return <div className="billing"><div className="section-heading"><div><h2>Billing history</h2><p>Your receipts and payment records, all in one place.</p></div><button className="outline-button"><FileText size={16} /> Payment settings</button></div><div className="table"><div className="table-head"><span>Invoice</span><span>Date</span><span>Plan</span><span>Amount</span><span>Status</span><span /></div>{bills.map((bill) => <div className="table-row" key={bill.invoice}><strong>{bill.invoice}</strong><span>{bill.date}</span><span>{bill.plan}</span><span>₹{bill.amount.toLocaleString('en-IN')}</span><span className="paid"><Check size={13} /> {bill.status}</span><button className="download" aria-label={`Download ${bill.invoice}`}><Download size={16} /></button></div>)}</div></div>; }
