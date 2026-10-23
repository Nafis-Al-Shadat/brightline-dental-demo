// Services — shared by the services grid, the details dialog and the booking form
// Lucide icons (ISC licence), inlined so the page needs no icon library
const icons = {
  "shield-check": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
  smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  baby: '<path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/>',
  siren: '<path d="M7 18v-6a5 5 0 1 1 10 0v6"/><path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"/><path d="M21 12h1"/><path d="M18.5 4.5 18 5"/><path d="M2 12h1"/><path d="M12 2v1"/><path d="m4.929 4.929.707.707"/><path d="M12 12v6"/>',
  star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
};
const icon = (name, size = 24) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
document.querySelectorAll("[data-icon]").forEach((el) => { el.innerHTML = icon(el.dataset.icon, 16); });

const services = [
  { id: "checkup", icon: "shield-check", name: "Check-up & clean", short: "Exam, scale and polish.", time: "45 min", price: "$89",
    desc: "A full check of teeth and gums, a professional clean and advice tailored to you.",
    includes: ["Full oral exam", "Scale & polish", "Digital X-rays if needed", "Personal care plan"] },
  { id: "whitening", icon: "sparkles", name: "Teeth whitening", short: "Brighter smile in one visit.", time: "75 min", price: "$249",
    desc: "Safe in-clinic whitening plus a take-home kit to keep your results.",
    includes: ["Shade assessment", "In-clinic session", "Take-home top-up kit", "Follow-up shade check"] },
  { id: "aligners", icon: "smile", name: "Clear aligners", short: "Straighten without metal.", time: "60 min consult", price: "From $2,900",
    desc: "Nearly invisible aligners with a 3D preview of your new smile before you commit.",
    includes: ["3D smile scan", "Treatment preview", "Custom aligner sets", "Regular progress checks"] },
  { id: "fillings", icon: "wrench", name: "Fillings & repairs", short: "Tooth-coloured, long-lasting.", time: "30–60 min", price: "From $120",
    desc: "Natural-looking fillings and repairs for chips, cracks and cavities.",
    includes: ["Numbing for comfort", "Tooth-coloured materials", "Bite check", "Aftercare advice"] },
  { id: "kids", icon: "baby", name: "Kids' dentistry", short: "Fun, gentle first visits.", time: "30 min", price: "$59",
    desc: "Relaxed visits that help children feel at home in the dental chair.",
    includes: ["Gentle exam", "Fluoride treatment", "Brushing coaching", "Sticker reward"] },
  { id: "emergency", icon: "siren", name: "Emergency care", short: "Pain? We'll see you today.", time: "30 min", price: "$95 exam",
    desc: "Same-day help for toothache, swelling, broken teeth and lost fillings.",
    includes: ["Same-day slots", "Pain relief first", "Clear next steps", "X-rays if needed"] },
];

// Opening hours, indexed by Date.getDay() (0 = Sunday). Times in 24h.
const hours = [
  null,
  { open: 9, close: 17 },
  { open: 9, close: 20 },
  { open: 9, close: 17 },
  { open: 9, close: 20 },
  { open: 9, close: 17 },
  { open: 10, close: 14 },
];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const fmtHour = (h) => `${h > 12 ? h - 12 : h}${h >= 12 ? "pm" : "am"}`;

// ---------- Open now status + hours table ----------
const now = new Date();
const today = hours[now.getDay()];
const hourNow = now.getHours() + now.getMinutes() / 60;
const statusEl = document.getElementById("openStatus");
if (today && hourNow >= today.open && hourNow < today.close) {
  statusEl.classList.add("is-open");
  statusEl.innerHTML = `<i></i> Open now · until ${fmtHour(today.close)}`;
} else {
  statusEl.classList.add("is-closed");
  statusEl.innerHTML = `<i></i> Closed now · book online any time`;
}

document.getElementById("hoursTable").innerHTML = [1, 2, 3, 4, 5, 6, 0].map((d) => {
  const h = hours[d];
  return `<tr class="${d === now.getDay() ? "is-today" : ""}"><td>${dayNames[d]}${d === now.getDay() ? " (today)" : ""}</td><td>${h ? `${fmtHour(h.open)} – ${fmtHour(h.close)}` : "Closed"}</td></tr>`;
}).join("");

// ---------- Services grid + details dialog ----------
const modal = document.getElementById("serviceModal");
document.getElementById("servicesGrid").innerHTML = services.map((s) => `
  <button class="service" data-id="${s.id}">
    <div class="service__icon">${icon(s.icon)}</div>
    <h3>${s.name}</h3>
    <p>${s.short}</p>
    <span class="service__more">View details →</span>
  </button>`).join("");

document.getElementById("servicesGrid").addEventListener("click", (e) => {
  const card = e.target.closest(".service");
  if (!card) return;
  const s = services.find((x) => x.id === card.dataset.id);
  document.getElementById("modalIcon").innerHTML = icon(s.icon, 28);
  document.getElementById("modalTitle").textContent = s.name;
  document.getElementById("modalDesc").textContent = s.desc;
  document.getElementById("modalList").innerHTML = s.includes.map((i) => `<li>${i}</li>`).join("");
  document.getElementById("modalMeta").textContent = `${s.time} · ${s.price}`;
  document.getElementById("modalBook").dataset.service = s.id;
  modal.showModal();
});
document.getElementById("modalClose").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

// ---------- Booking form ----------
const form = document.getElementById("bookForm");
const steps = [...form.querySelectorAll(".book__step")];
const progress = [...form.querySelectorAll(".book__progress span")];
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const errorEl = document.getElementById("bookError");
const booking = { service: null, date: null, time: null };
let step = 0;

document.getElementById("serviceChoices").innerHTML = services.map((s) => `
  <button type="button" class="choice" data-id="${s.id}"><strong><span class="choice__icon">${icon(s.icon, 18)}</span>${s.name}</strong><span>${s.time} · ${s.price}</span></button>`).join("");

function selectService(id) {
  booking.service = services.find((s) => s.id === id);
  form.querySelectorAll(".choice").forEach((c) => c.classList.toggle("is-selected", c.dataset.id === id));
}
document.getElementById("serviceChoices").addEventListener("click", (e) => {
  const c = e.target.closest(".choice");
  if (c) { selectService(c.dataset.id); errorEl.textContent = ""; }
});

// Any "Book this" link pre-selects its service
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-service]");
  if (!link) return;
  modal.close();
  resetBooking();
  selectService(link.dataset.service);
});

// Next 10 days; Sundays are closed
const daysEl = document.getElementById("days");
const slotsEl = document.getElementById("slots");
const upcoming = Array.from({ length: 10 }, (_, i) => {
  const d = new Date(now);
  d.setDate(now.getDate() + i + 1);
  return d;
});
daysEl.innerHTML = upcoming.map((d, i) => `
  <button type="button" class="day" data-i="${i}" ${hours[d.getDay()] ? "" : "disabled"}>
    <small>${dayNames[d.getDay()].slice(0, 3)}</small><strong>${d.getDate()}</strong>
  </button>`).join("");

// Deterministic "booked" slots so the demo looks realistic but stays stable
const isTaken = (date, h) => (date.getDate() * 7 + h * 3) % 5 === 0;

function renderSlots(date) {
  const h = hours[date.getDay()];
  const list = [];
  for (let t = h.open; t < h.close; t += 0.5) list.push(t);
  slotsEl.innerHTML = list.map((t) => {
    const label = `${Math.floor(t) > 12 ? Math.floor(t) - 12 : Math.floor(t)}:${t % 1 ? "30" : "00"}${t >= 12 ? "pm" : "am"}`;
    return `<button type="button" class="slot" data-label="${label}" ${isTaken(date, t) ? "disabled" : ""}>${label}</button>`;
  }).join("");
}
slotsEl.innerHTML = `<p class="slots__empty">Pick a day to see free times.</p>`;

daysEl.addEventListener("click", (e) => {
  const d = e.target.closest(".day");
  if (!d || d.disabled) return;
  daysEl.querySelectorAll(".day").forEach((x) => x.classList.toggle("is-selected", x === d));
  booking.date = upcoming[Number(d.dataset.i)];
  booking.time = null;
  renderSlots(booking.date);
  errorEl.textContent = "";
});
slotsEl.addEventListener("click", (e) => {
  const s = e.target.closest(".slot");
  if (!s || s.disabled) return;
  slotsEl.querySelectorAll(".slot").forEach((x) => x.classList.toggle("is-selected", x === s));
  booking.time = s.dataset.label;
  errorEl.textContent = "";
});

// Show the first free slot in the hero card
(() => {
  for (const d of upcoming) {
    const h = hours[d.getDay()];
    if (!h) continue;
    for (let t = h.open; t < h.close; t += 0.5) {
      if (!isTaken(d, t)) {
        const label = `${Math.floor(t) > 12 ? Math.floor(t) - 12 : Math.floor(t)}:${t % 1 ? "30" : "00"}${t >= 12 ? "pm" : "am"}`;
        const dayLabel = d.getDate() === upcoming[0].getDate() ? "Tomorrow" : dayNames[d.getDay()];
        document.getElementById("nextSlot").textContent = `${dayLabel}, ${label}`;
        return;
      }
    }
  }
})();

function validate() {
  if (step === 0 && !booking.service) return "Please choose a service.";
  if (step === 1 && !booking.date) return "Please pick a day.";
  if (step === 1 && !booking.time) return "Please pick a time.";
  if (step === 2) {
    let msg = "";
    const checks = {
      name: (v) => v.trim().length >= 2,
      phone: (v) => v.replace(/\D/g, "").length >= 7,
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    };
    for (const [field, ok] of Object.entries(checks)) {
      const input = form.elements[field];
      const valid = ok(input.value);
      input.classList.toggle("is-invalid", !valid);
      if (!valid && !msg) msg = `Please enter a valid ${field}.`;
    }
    return msg;
  }
  return "";
}

function showStep(n) {
  step = n;
  steps.forEach((s, i) => s.classList.toggle("is-active", i === n));
  progress.forEach((p, i) => {
    p.classList.toggle("is-active", i === n);
    p.classList.toggle("is-done", i < n);
  });
  prevBtn.hidden = n === 0;
  nextBtn.textContent = n === steps.length - 1 ? "Confirm booking" : "Continue";
  errorEl.textContent = "";
}

nextBtn.addEventListener("click", () => {
  const err = validate();
  if (err) { errorEl.textContent = err; return; }
  if (step < steps.length - 1) { showStep(step + 1); return; }

  // Final step: show confirmation (demo — nothing is sent anywhere)
  const name = form.elements.name.value.trim().split(" ")[0];
  const dateText = booking.date.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
  document.getElementById("bookSummary").textContent =
    `Thanks ${name}! ${booking.service.name} on ${dateText} at ${booking.time}.`;
  steps.forEach((s) => s.classList.remove("is-active"));
  form.querySelector(".book__progress").hidden = true;
  document.getElementById("bookNav").hidden = true;
  document.getElementById("bookDone").hidden = false;
});
prevBtn.addEventListener("click", () => showStep(step - 1));

function resetBooking() {
  form.reset();
  Object.assign(booking, { service: null, date: null, time: null });
  form.querySelectorAll(".is-selected, .is-invalid").forEach((el) => el.classList.remove("is-selected", "is-invalid"));
  slotsEl.innerHTML = `<p class="slots__empty">Pick a day to see free times.</p>`;
  form.querySelector(".book__progress").hidden = false;
  document.getElementById("bookNav").hidden = false;
  document.getElementById("bookDone").hidden = true;
  showStep(0);
}
document.getElementById("bookAgain").addEventListener("click", resetBooking);

// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});
