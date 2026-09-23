const stations = [
  [434, "Trinitat Nova"],
  [433, "Via Júlia"],
  [432, "Llucmajor"],
  [431, "Maragall"],
  [430, "Guinardó / Hosp. Sant Pau"],
  [429, "Alfons X"],
  [428, "Joanic"],
  [427, "Verdaguer"],
  [426, "Girona"],
  [425, "Passeig de Gràcia"],
  [424, "Urquinaona"],
  [423, "Jaume I"],
  [422, "Barceloneta"],
  [421, "Ciutadella / V. Olímpica"],
  [420, "Bogatell"],
  [419, "Llacuna"],
  [418, "Poblenou"],
  [417, "Selva de Mar"],
  [416, "Maresme / Fòrum"],
  [415, "Besòs Mar"],
  [414, "Besòs"],
  [413, "La Pau"]
];

const tape = document.querySelector("#tape");

stations.forEach(([code, name], index) => {
  const row = document.createElement("article");
  row.className = "station";

  const repeatDirections = index % 4 === 2;
  const isLastStation = index === stations.length - 1;

  row.innerHTML = `
    <div class="ticks ticks-left" aria-hidden="true"></div>
    <div class="station-content">
      <div class="code">${code}</div>
      <div class="name">${name}</div>
    </div>
    <div class="ticks ticks-right" aria-hidden="true"></div>
    ${repeatDirections ? '<div class="direction-marker direction-left">V.2 ↓</div><div class="direction-marker direction-right">↑ V.1</div>' : ''}
    ${isLastStation ? '<div class="direction-marker direction-right end-direction">↑ V.1</div>' : ''}
  `;
  tape.appendChild(row);
});