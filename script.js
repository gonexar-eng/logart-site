// TODO: вписать реальные контакты компании
const WHATSAPP_PHONE = "79000000000"; // только цифры, без +
const TELEGRAM_USER = "logart";       // ник в Telegram без @

const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  })
);

document.querySelectorAll("[data-wa]").forEach((a) => (a.href = `https://wa.me/${WHATSAPP_PHONE}`));
document.querySelectorAll("[data-tg]").forEach((a) => (a.href = `https://t.me/${TELEGRAM_USER}`));

// Форма собирает заявку в сообщение и открывает WhatsApp — сервер не нужен
const form = document.getElementById("form");
const note = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  let valid = true;
  form.querySelectorAll("[required]").forEach((input) => {
    const empty = !input.value.trim();
    input.classList.toggle("is-error", empty);
    if (empty) valid = false;
  });
  if (!valid) {
    note.textContent = "Заполните обязательные поля: откуда, куда, имя и телефон.";
    note.classList.remove("is-ok");
    return;
  }

  const lines = [
    "Заявка с сайта Лог-Арт",
    `Маршрут: ${data.from} → ${data.to}`,
    data.weight && `Вес: ${data.weight} кг`,
    data.volume && `Объём: ${data.volume} м³`,
    data.cargo && `Груз: ${data.cargo}`,
    `Имя: ${data.name}`,
    `Телефон: ${data.phone}`,
  ].filter(Boolean);

  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  note.textContent = "Спасибо! Открываем WhatsApp, чтобы отправить заявку.";
  note.classList.add("is-ok");
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
