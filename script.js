// Services — shared by the services grid, the details dialog and the booking form
const services = [
  { id: "checkup", icon: "🦷", name: "Check-up & clean", short: "Exam, scale and polish.", time: "45 min", price: "$89",
    desc: "A full check of teeth and gums, a professional clean and advice tailored to you.",
    includes: ["Full oral exam", "Scale & polish", "Digital X-rays if needed", "Personal care plan"] },
  { id: "whitening", icon: "✨", name: "Teeth whitening", short: "Brighter smile in one visit.", time: "75 min", price: "$249",
    desc: "Safe in-clinic whitening plus a take-home kit to keep your results.",
    includes: ["Shade assessment", "In-clinic session", "Take-home top-up kit", "Follow-up shade check"] },
  { id: "aligners", icon: "😁", name: "Clear aligners", short: "Straighten without metal.", time: "60 min consult", price: "From $2,900",
    desc: "Nearly invisible aligners with a 3D preview of your new smile before you commit.",
    includes: ["3D smile scan", "Treatment preview", "Custom aligner sets", "Regular progress checks"] },
  { id: "fillings", icon: "🛠️", name: "Fillings & repairs", short: "Tooth-coloured, long-lasting.", time: "30–60 min", price: "From $120",
    desc: "Natural-looking fillings and repairs for chips, cracks and cavities.",
    includes: ["Numbing for comfort", "Tooth-coloured materials", "Bite check", "Aftercare advice"] },
  { id: "kids", icon: "🧸", name: "Kids' dentistry", short: "Fun, gentle first visits.", time: "30 min", price: "$59",
    desc: "Relaxed visits that help children feel at home in the dental chair.",
    includes: ["Gentle exam", "Fluoride treatment", "Brushing coaching", "Sticker reward 🙂"] },
  { id: "emergency", icon: "🚑", name: "Emergency care", short: "Pain? We'll see you today.", time: "30 min", price: "$95 exam",
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
    <div class="service__icon">${s.icon}</div>
    <h3>${s.name}</h3>
    <p>${s.short}</p>
    <span class="service__more">View details →</span>
  </button>`).join("");

document.getElementById("servicesGrid").addEventListener("click", (e) => {
  const card = e.target.closest(".service");
  if (!card) return;
  const s = services.find((x) => x.id === card.dataset.id);
  document.getElementById("modalIcon").textContent = s.icon;
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
  <button type="button" class="choice" data-id="${s.id}"><strong>${s.icon} ${s.name}</strong><span>${s.time} · ${s.price}</span></button>`).join("");

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
