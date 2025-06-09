// Dohvatanje referenci na HTML elemente
const dice = document.getElementById("dice");
const quote = document.getElementById("quote");
const number = document.getElementById("number");
const spinner = document.getElementById("spinner");

// Asinhrona funkcija za dobijanje saveta sa API-ja
async function getAdvice() {
  // Prikaz poruke i animacije dok traje učitavanje
  quote.textContent = "Loading advice...";
  number.textContent = "";
  spinner.hidden = false;

  try {
    // Slanje GET zahteva ka API-ju za savet
    const response = await fetch("https://api.adviceslip.com/advice");

    // Provera odgovora
    if (!response.ok) throw new Error("Network error");

    // Parsiranje JSON odgovora
    const { slip } = await response.json();

    // Prikaz dobijenog saveta i njegovog ID-a
    quote.textContent = slip.advice;
    number.textContent = slip.id;
  } catch (error) {
    // Prikaz poruke o grešci u slučaju neuspešnog zahteva
    quote.textContent = "Failed to fetch advice. Please try again.";
    number.textContent = "--";
    console.error("Error fetching advice:", error);
  } finally {
    // Sakrivanje spiner animacije
    spinner.hidden = true;
  }
}

dice.addEventListener("click", getAdvice);
getAdvice();
