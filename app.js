const formulär = document.getElementById("kontakt-form");
const lista = document.getElementById("forfragningslista");
const meddelande = document.getElementById("form-meddelande");
const lagringsNyckel = "hundforfragningar";

let forfragningar = [];

try {
  forfragningar = JSON.parse(localStorage.getItem(lagringsNyckel)) || [];
} catch {
  forfragningar = [];
}

function sparaOchRita() {
  localStorage.setItem(lagringsNyckel, JSON.stringify(forfragningar));
  ritaLista();
}

function ritaLista() {
  lista.replaceChildren();

  if (forfragningar.length === 0) {
    const tomRad = document.createElement("li");
    tomRad.textContent = "Du har inga förfrågningar än.";
    lista.appendChild(tomRad);
    return;
  }

  for (const forfragan of forfragningar) {
    const rad = document.createElement("li");
    const text = document.createElement("span");

    text.textContent =
      `${forfragan.hundensNamn} – önskat datum: ${forfragan.onskatDatum}`;

    const avbokaKnapp = document.createElement("button");
    avbokaKnapp.type = "button";
    avbokaKnapp.textContent = "Avboka";
    avbokaKnapp.dataset.id = forfragan.id;

    rad.append(text, " ", avbokaKnapp);
    lista.appendChild(rad);
  }
}

formulär.addEventListener("submit", (event) => {
  event.preventDefault();

  const hundensNamn = formulär.elements.hundensNamn.value.trim();
  const onskatDatum = formulär.elements.onskatDatum.value;

  if (!hundensNamn || !onskatDatum) {
    meddelande.textContent = "Fyll i både hundens namn och önskat datum.";
    return;
  }

  forfragningar.push({
    id: Date.now().toString() + Math.random().toString(16).slice(2),
    hundensNamn,
    onskatDatum
  });

  sparaOchRita();
  formulär.reset();
  meddelande.textContent = "Förfrågan har lagts till.";
});

lista.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;

  const id = event.target.dataset.id;
  forfragningar = forfragningar.filter((forfragan) => forfragan.id !== id);

  sparaOchRita();
});

ritaLista();



const reviews = [
{
    name: '   Lionel messi',
    image: 'images/messi.jpeg',
    job: 'idrottare',
    review: ' Bästa hund pensionatet, väldig trevlig personal',
},
{
  name: 'Prinsessan Victoria',
  image: 'images/victoria.jpeg',
  job: 'svenska-riket',
  review: 'Ett väldigt trevligt hund panssionat, hade en fantastisk dag',
},
{
  name: 'jensen haung',
  image: 'images/niv.jpeg',
  job: 'Ceo-nvidia',
  review: 'Det känns tryggt att lämna vår hund här. Vi får alltid ett glatt bemötande och vet att hon har det bra',
},
{
  name: 'Karl gustav',
  image: 'images/kung.jpeg',
  job: 'sveriges stadschef',
  review: 'Jag har med stort nöje följt hur min hund utvecklats på detta hunddagis. Den omsorg, trygghet och glädje',
},
{
  name: 'jeff bezos',
  image: 'images/jeff.jpeg',
  job: 'Amazon',
  review: 'jag uppskattar en verksamhet som kombinerar omtanke med riktigt hög kvalitet. Personalen är engagerad',
},
];

const person = document.getElementById('name');
const image = document.getElementById('image');
const job = document.getElementById('job');
const review = document.querySelector('#opinion p');
const btns = document.querySelectorAll('.review-btn');

let index = 0;




function showReview() {
const item = reviews[index];

person.textContent = item.name;
image.src = item.image;
job.textContent = item.job;
review.textContent = item.review;
}


btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.id === 'btn_prev') {
      index--;
    } else if (btn.id === 'btn_next') {
      index++;
    } else {
      index = Math.floor(Math.random() * reviews.length);
    }

    if (index < 0) {
      index = reviews.length - 1;
    } else if (index >= reviews.length) {
      index = 0;
    }

    showReview();
  });
});

showReview();





  const pages = document.querySelectorAll(".page");

  document.querySelectorAll("nav [data-section]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const selectedId = link.dataset.section;

      pages.forEach((page) => {
        page.hidden = page.id !== selectedId;
      });
    });
  });




  class Oppettider {
  constructor() {
    this.klocka = document.getElementById("klocka");
    this.datum = document.getElementById("datum");
    this.status = document.getElementById("status");
  }

  uppdatera() {
    const nu = new Date();

    const timmar = String(nu.getHours()).padStart(2, "0");
    const minuter = String(nu.getMinutes()).padStart(2, "0");
    const sekunder = String(nu.getSeconds()).padStart(2, "0");

    this.klocka.textContent = `${timmar}:${minuter}:${sekunder}`;

    this.datum.textContent = new Intl.DateTimeFormat("sv-SE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(nu);

    const veckodag = nu.getDay(); // söndag = 0, måndag = 1, ..., lördag = 6
    const timme = nu.getHours();

    const oppet =
      (veckodag >= 1 && veckodag <= 5 && timme >= 7 && timme < 18) ||
      (veckodag === 6 && timme >= 9 && timme < 14);

    this.status.textContent = oppet ? "Öppet just nu" : "Stängt just nu";
    this.status.className = oppet ? "oppet" : "stangt";
  }
}

const tassenOppettider = new Oppettider();
tassenOppettider.uppdatera();

setInterval(() => {
  tassenOppettider.uppdatera();
}, 1000);