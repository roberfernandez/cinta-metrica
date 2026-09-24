const lines = {
  L1: {
    color: "#e30613",
    stations: [
      [140,"Fondo"],[139,"Santa Coloma"],[138,"Baró de Viver"],[137,"Trinitat Vella"],
      [136,"Torras i Bages"],[135,"Sant Andreu"],[134,"Fabra i Puig"],[133,"Sagrera"],
      [132,"Navas"],[131,"Clot"],[130,"Glòries"],[129,"Marina"],[128,"Arc de Triomf"],
      [127,"Urquinaona"],[126,"Catalunya"],[125,"Universitat"],[124,"Urgell"],[123,"Rocafort"],
      [122,"Espanya"],[121,"Hostafrancs"],[120,"Plaça de Sants"],[119,"Mercat Nou"],
      [118,"Santa Eulàlia"],[117,"Torrassa"],[116,"Florida"],[115,"Can Serra"],
      [114,"Rbla. Just Oliveras"],[113,"Avinguda Carrilet"],[112,"Bellvitge"],[111,"Hospital de Bellvitge"]
    ]
  },
  L2: {
    color: "#9b258f",
    stations: [
      [227,"Badalona / Pompeu Fabra"],[226,"Pep Ventura"],[225,"Gorg"],[224,"Sant Roc"],
      [223,"Artigues / Sant Adrià"],[222,"Verneda"],[221,"La Pau"],[220,"Sant Martí"],
      [219,"Bac de Roda"],[218,"Clot"],[217,"Encants"],[216,"Sagrada Família"],
      [215,"Monumental"],[214,"Tetuàn"],[213,"Passeig de Gràcia"],[212,"Universitat"],
      [211,"Sant Antoni"],[210,"Paral·lel"]
    ]
  },
  L3: {
    color: "#1f9d55",
    stations: [
      [339,"Trinitat Nova"],[338,"Roquetes"],[337,"Canyelles"],[336,"Valldaura"],[335,"Mundet"],
      [334,"Montbau"],[333,"Vall d'Hebrón"],[332,"Penitents"],[331,"Vallcarca"],[330,"Lesseps"],
      [329,"Fontana"],[328,"Diagonal"],[327,"Passeig de Gràcia"],[326,"Catalunya"],[325,"Liceu"],
      [324,"Drassanes"],[323,"Paral·lel"],[322,"Poble Sec"],[321,"Espanya"],[320,"Tarragona"],
      [319,"Sants Estació"],[318,"Plaça del Centre"],[317,"Les Corts"],[316,"Maria Cristina"],
      [315,"Palau Reial"],[314,"Zona Universitària"]
    ]
  },
  L4: {
    color: "#f4d000",
    stations: [
      [434,"Trinitat Nova"],[433,"Via Júlia"],[432,"Llucmajor"],[431,"Maragall"],
      [430,"Guinardó / Hosp. Sant Pau"],[429,"Alfons X"],[428,"Joanic"],[427,"Verdaguer"],
      [426,"Girona"],[425,"Passeig de Gràcia"],[424,"Urquinaona"],[423,"Jaume I"],
      [422,"Barceloneta"],[421,"Ciutadella / V. Olímpica"],[420,"Bogatell"],[419,"Llacuna"],
      [418,"Poblenou"],[417,"Selva de Mar"],[416,"Maresme / Fòrum"],[415,"Besòs Mar"],
      [414,"Besòs"],[413,"La Pau"]
    ]
  },
  L5: {
    color: "#0072bc",
    stations: [
      [534,"Vall d'Hebrón"],[533,"El Coll / La Teixonera"],[532,"El Carmel"],[531,"Horta"],
      [530,"Vilapicina"],[529,"Virrei Amat"],[528,"Maragall"],[527,"Congrés"],[526,"Sagrera"],
      [525,"Camp de l'Arpa"],[524,"Sant Pau / Dos de Maig"],[523,"Sagrada Família"],
      [522,"Verdaguer"],[521,"Diagonal"],[520,"Hospital Clínic"],[519,"Enteça"],
      [518,"Sants Estació"],[517,"Plaça de Sants"],[516,"Badal"],[515,"Collblanc"],
      [555,"Ernest Lluch"],[514,"Pubilla Cases"],[513,"Can Vidalet"],[512,"Can Boixeres"],
      [511,"Sant Idefons"],[510,"Gavarra"],[509,"Cornellà"]
    ]
  },
  L11: {
    color: "#7ac143",
    singleTrack: true,
    stations: [
      [1139,"Can Cuiàs"],[1138,"Ciutat Meridiana"],[1137,"Torre Baró / Vallbona"],[1136,"Casa de l'Aigua"]
    ]
  }
};

const order = ["L1","L2","L3","L4","L5","L11"];
let current = order.indexOf("L4");
const tape = document.querySelector("#tape");
const selector = document.querySelector(".selector");
const lineLabel = selector.querySelector("strong");
const prev = selector.querySelector("[data-dir='prev']");
const next = selector.querySelector("[data-dir='next']");

function renderLine() {
  const key = order[current];
  const line = lines[key];
  document.documentElement.style.setProperty("--line-color", line.color);
  lineLabel.textContent = key;
  selector.setAttribute("aria-label", `Línia ${key.slice(1)}`);
  tape.innerHTML = "";

  line.stations.forEach(([code,name], index) => {
    const row = document.createElement("article");
    row.className = "station";

    let showV2 = false;
    let showV1 = false;
    if (!line.singleTrack) {
      showV2 = index % 4 === 0;
      const distanceFromBottom = line.stations.length - 1 - index;
      showV1 = distanceFromBottom % 4 === 0;
    }

    row.innerHTML = `
      <div class="ticks ticks-left" aria-hidden="true"></div>
      <div class="station-content">
        <div class="code">${code}</div>
        <div class="name">${name}</div>
      </div>
      <div class="ticks ticks-right" aria-hidden="true"></div>
      ${showV2 ? '<div class="direction-marker direction-left">V.2 ↓</div>' : ''}
      ${showV1 ? '<div class="direction-marker direction-right">↑ V.1</div>' : ''}
    `;
    tape.appendChild(row);
  });

  window.scrollTo({top:0,behavior:"smooth"});
}

function changeLine(delta) {
  current = (current + delta + order.length) % order.length;
  renderLine();
}

function pressFeedback(control) {
  control.classList.add("is-pressed");
  window.setTimeout(() => control.classList.remove("is-pressed"), 120);
}

selector.addEventListener("pointerdown", e => {
  const control = e.target.closest(".line-arrow");
  if (!control) return;
  pressFeedback(control);
});

selector.addEventListener("click", e => {
  const control = e.target.closest(".line-arrow");
  if (!control) return;
  e.preventDefault();
  e.stopPropagation();
  changeLine(control.dataset.dir === "prev" ? -1 : 1);
});

let touchX = null;
document.addEventListener("touchstart", e => { touchX = e.changedTouches[0].clientX; }, {passive:true});
document.addEventListener("touchend", e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 70) changeLine(dx < 0 ? 1 : -1);
  touchX = null;
}, {passive:true});

renderLine();