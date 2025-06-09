// Prikupi sve potrebne HTML elemente
const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const tipRange = document.getElementById("tip-range");
const tipValue = document.getElementById("tip-value");

const tipPerPersonDisplay = document.getElementById("tip-per-person");
const totalTipDisplay = document.getElementById("total-tip");
const totalPerPersonDisplay = document.getElementById("total-per-person");

// Funkcija koja resetuje prikaz vrednosti na $0.00
function updateDisplay() {
  const zeroValue = 0;
  tipPerPersonDisplay.textContent = `$${zeroValue.toFixed(2)}`;
  totalTipDisplay.textContent = `$${zeroValue.toFixed(2)}`;
  totalPerPersonDisplay.textContent = `$${zeroValue.toFixed(2)}`;
}

// Prikazuje odgovarajući emoji u zavisnosti od izabrane napojnice
function updateEmoji(percent) {
  const emojiEl = document.getElementById("tip-emoji");
  let emoji = "";

  if (percent < 5) emoji = "😒"; // Veoma mala napojnica
  else if (percent < 10) emoji = "🙂"; // Mala napojnica
  else if (percent < 20) emoji = "😊"; // Pristojna napojnica
  else if (percent < 30) emoji = "😃"; // Velikodušna napojnica
  else emoji = "🤩"; // Veoma velikodušna napojnica

  emojiEl.textContent = emoji;
}

// Elementi za prikaz grešaka
const errorMsgPeople = document.getElementById("people-error");
const errorMsgBill = document.getElementById("bill-error");

// Glavna funkcija koja računa i prikazuje napojnicu
function calculateTip() {
  const bill = parseFloat(billInput.value); // Iznos računa
  const people = parseInt(peopleInput.value); // Broj osoba
  const tipPercent = parseFloat(tipRange.value); // Procenat napojnice

  // Ažuriraj tekst iznad slidera (npr. "15%")
  tipValue.textContent = `${tipPercent}%`;
  updateEmoji(tipPercent); // Ažuriraj emoji prema procentu

  // Validacija računa
  if (isNaN(bill) || bill === 0) {
    errorMsgBill.style.display = "block";
    billInput.focus();
    updateDisplay(); // Resetuj prikaz
    return;
  } else {
    errorMsgBill.style.display = "none";
  }

  // Validacija broja osoba
  if (isNaN(people) || people <= 0 || !Number.isInteger(people)) {
    errorMsgPeople.style.display = "block";
    updateDisplay(); // Resetuj prikaz
    return;
  } else {
    errorMsgPeople.style.display = "none";
  }

  // Proračun napojnice
  const totalTip = (bill * tipPercent) / 100;
  const tipPerPerson = totalTip / people;
  const totalPerPerson = (bill + totalTip) / people;

  // Prikaz rezultata
  tipPerPersonDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalTipDisplay.textContent = `$${totalTip.toFixed(2)}`;
  totalPerPersonDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
}

// Sprečavanje unosa nedozvoljenih karaktera u input za račun
billInput.addEventListener("keydown", (event) => {
  if (
    event.key === "e" ||
    event.key === "E" ||
    event.key === "-" ||
    event.key === "+"
  ) {
    event.preventDefault(); // Blokiraj nedozvoljene karaktere
  }
});
billInput.addEventListener("input", calculateTip); // Pokreni kalkulaciju kada korisnik unosi

// Sprečavanje nedozvoljenih karaktera za broj osoba
peopleInput.addEventListener("keydown", (event) => {
  if (
    event.key === "e" ||
    event.key === "E" ||
    event.key === "-" ||
    event.key === "+"
  ) {
    event.preventDefault();
  }
});
peopleInput.addEventListener("input", calculateTip); // Kalkulacija pri unosu

// Kalkulacija kada se pomeri slider
tipRange.addEventListener("input", calculateTip);

// Dugme za resetovanje forme
const resetBtn = document.getElementById("reset-btn");

resetBtn.addEventListener("click", () => {
  // Resetuj vrednosti polja
  billInput.value = "";
  peopleInput.value = "";
  tipRange.value = 15;
  tipValue.textContent = "15%";

  // Resetuj prikaz i emoji
  updateDisplay();
  updateEmoji(15);
});

// Inicijalni emoji kada se aplikacija učita
updateEmoji(15);
billInput.focus(); // Fokus automatski na prvo polje
