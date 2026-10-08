/* =========================================================
   quiz.js  –  Gruppen-Finder
   Aufbau:  BILDER  →  fragen  →  gruppen  →  tipps
   und darunter die eigentliche Quiz-Logik.
   ========================================================= */

/* ---------------------------------------------------------
   1. BILDER
   Kleine Cartoon-Zeichnungen, direkt im Code (SVG).
   Kein Bilder-Ordner noetig. Wer echte Fotos benutzen will:
   bei einer Option einfach  bild: "bilder/wald.jpg"  eintragen
   - der Code erkennt den Dateinamen und nimmt ein <img>.
   --------------------------------------------------------- */
const F = "#171c19";
const BILDER = {
  /* --- Natur --- */
  natur: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Wald und Berge"><rect width="240" height="160" fill="#eaf2ea"/><circle cx="196" cy="34" r="16" fill="#f0c560" stroke="${F}" stroke-width="3"/><path d="M-10 96l62-54 46 40 40-32 62 46v10H-10z" fill="#c7ddcb" stroke="${F}" stroke-width="3"/><path d="M52 42l20 20H32z" fill="#fff" stroke="${F}" stroke-width="2.5"/><path d="M0 148h240" stroke="${F}" stroke-width="3"/><g fill="#2e6b4a" stroke="${F}" stroke-width="3"><path d="M42 74l24 34H18zM42 96l20 28H22zM42 118v18h-6v-18z"/><path d="M108 88l20 28H88zM108 106l16 24H92zM108 124v12h-5v-12z"/><path d="M164 96l22 32h-44zM164 116l17 26h-34zM164 132v10h-5v-10z"/></g></svg>`,
  wandern: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Wanderer mit Stock vor einem Berg"><rect width="240" height="160" fill="#eaf2ea"/><circle cx="204" cy="32" r="14" fill="#f0c560" stroke="${F}" stroke-width="3"/><path d="M-8 122L72 40l80 82z" fill="#c7ddcb" stroke="${F}" stroke-width="3"/><path d="M72 40l22 22H50z" fill="#fff" stroke="${F}" stroke-width="3"/><path d="M0 136h240" stroke="${F}" stroke-width="3"/><path d="M60 148q26-8 52 0" fill="none" stroke="${F}" stroke-width="2.5" stroke-dasharray="8 9"/><rect x="163" y="80" width="22" height="26" rx="6" fill="#2e6b4a" stroke="${F}" stroke-width="3"/><g fill="none" stroke="${F}" stroke-width="4.5" stroke-linecap="round"><path d="M159 80l-4 26"/><path d="M155 106l-11 26"/><path d="M155 106l14 25"/><path d="M158 90l19 9"/></g><circle cx="160" cy="66" r="12" fill="#f0c560" stroke="${F}" stroke-width="3"/><path d="M181 74v62" stroke="${F}" stroke-width="3.5" stroke-linecap="round"/></svg>`,
  pilze: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Pilze im Moos"><rect width="240" height="160" fill="#eaf2ea"/><path d="M0 126q40-12 74 0t78 4 88-12v40H0z" fill="#cfe0cf" stroke="${F}" stroke-width="3"/><path d="M92 66c0-18 16-30 36-30s36 12 36 30z" fill="#a63a2e" stroke="${F}" stroke-width="3"/><path d="M110 66h36v36q-18 10-36 0z" fill="#f7efe0" stroke="${F}" stroke-width="3"/><path d="M182 90c0-11 10-18 22-18s22 7 22 18z" fill="#b5762a" stroke="${F}" stroke-width="3"/><path d="M194 90h20v22q-10 6-20 0z" fill="#f7efe0" stroke="${F}" stroke-width="3"/><path d="M40 118c0-9 8-15 18-15s18 6 18 15z" fill="#a63a2e" stroke="${F}" stroke-width="3"/><path d="M50 118h16v16q-8 5-16 0z" fill="#f7efe0" stroke="${F}" stroke-width="3"/><g stroke="#2e6b4a" stroke-width="3" stroke-linecap="round" fill="none"><path d="M22 128q4-14 14-18"/><path d="M228 120q-4-12-14-16"/></g></svg>`,
  sternenhimmel: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Sternenhimmel ueber den Bergen"><rect width="240" height="160" fill="#183048"/><g fill="#f4e6bd"><circle cx="26" cy="26" r="2.4"/><circle cx="64" cy="16" r="1.8"/><circle cx="104" cy="30" r="2.2"/><circle cx="146" cy="18" r="1.8"/><circle cx="214" cy="70" r="2"/><circle cx="40" cy="58" r="1.8"/><circle cx="86" cy="56" r="2.2"/><circle cx="176" cy="52" r="1.8"/><circle cx="20" cy="84" r="2"/><circle cx="126" cy="64" r="1.6"/></g><path d="M190 34l6 14 14 6-14 6-6 14-6-14-14-6 14-6z" fill="#f4e6bd"/><path d="M0 122l56-46 44 34 40-24 100 52v22H0z" fill="#0d1c2b" stroke="#e8eff4" stroke-width="3"/><circle cx="52" cy="34" r="17" fill="none" stroke="#f4e6bd" stroke-width="3"/><path d="M58 22a17 17 0 100 24" fill="#183048"/></svg>`,
  garten: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Gießkanne gießt eine Blume im Topf"><rect width="240" height="160" fill="#eaf2ea"/><path d="M0 138h240" stroke="${F}" stroke-width="3"/><path d="M40 84h64v44H40z" fill="#bcd3dc" stroke="${F}" stroke-width="3"/><path d="M58 72h30v12H58z" fill="#bcd3dc" stroke="${F}" stroke-width="3"/><path d="M40 92c-18 2-18 26-2 28" fill="none" stroke="${F}" stroke-width="3"/><path d="M102 92l34-20 7 10-33 26z" fill="#bcd3dc" stroke="${F}" stroke-width="3"/><g stroke="#1d5c73" stroke-width="3.5" stroke-linecap="round"><path d="M144 84l4 12"/><path d="M154 78l5 12"/><path d="M134 92l3 11"/></g><path d="M176 104h44l-6 30h-32z" fill="#b5762a" stroke="${F}" stroke-width="3"/><path d="M170 92h56v13h-56z" fill="#d59b52" stroke="${F}" stroke-width="3"/><path d="M198 92V58" stroke="#2e6b4a" stroke-width="4" stroke-linecap="round"/><path d="M198 78c-15-2-21-12-21-21 13 0 21 7 21 21z" fill="#2e6b4a" stroke="${F}" stroke-width="3"/><path d="M198 70c13-2 19-10 19-19-11 0-19 7-19 19z" fill="#2e6b4a" stroke="${F}" stroke-width="3"/><circle cx="198" cy="50" r="9" fill="#f0c560" stroke="${F}" stroke-width="3"/></svg>`,

  /* --- Technik --- */
  technik: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Laptop mit Zahnrädern"><rect width="240" height="160" fill="#e6eef2"/><rect x="48" y="30" width="144" height="88" rx="6" fill="#fff" stroke="${F}" stroke-width="3"/><rect x="30" y="118" width="180" height="14" rx="7" fill="#bcd3dc" stroke="${F}" stroke-width="3"/><circle cx="150" cy="70" r="20" fill="none" stroke="#1d5c73" stroke-width="4"/><circle cx="150" cy="70" r="7" fill="#1d5c73"/><path d="M150 44v-9m0 70v-9m26-26h9m-70 0h9m19-19l6-6m-50 50l6-6m38 0l6 6m-50-50l6 6" stroke="#1d5c73" stroke-width="4" stroke-linecap="round"/><path d="M64 52h44M64 66h34M64 80h52M64 94h26" stroke="${F}" stroke-width="4" stroke-linecap="round"/></svg>`,
  code: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Programmier-Fenster"><rect width="240" height="160" fill="#e6eef2"/><rect x="24" y="26" width="192" height="112" rx="6" fill="#fff" stroke="${F}" stroke-width="3"/><path d="M24 52h192" stroke="${F}" stroke-width="3"/><g fill="#1d5c73"><circle cx="42" cy="39" r="5"/><circle cx="60" cy="39" r="5" opacity=".55"/><circle cx="78" cy="39" r="5" opacity=".3"/></g><g stroke-width="5" stroke-linecap="round"><path d="M44 74l-12 10 12 10" stroke="#a63a2e" fill="none"/><path d="M88 74l12 10-12 10" stroke="#a63a2e" fill="none"/><path d="M74 108l16-44" stroke="#2e6b4a" fill="none"/><path d="M120 72h60M120 90h44M120 108h72" stroke="#1d5c73"/></g><rect x="120" y="118" width="20" height="6" fill="${F}"/></svg>`,
  loetkolben: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Lötkolben auf einer Platine"><rect width="240" height="160" fill="#e6eef2"/><rect x="22" y="80" width="196" height="52" rx="5" fill="#2e6b4a" stroke="${F}" stroke-width="3"/><g fill="#f0c560" stroke="${F}" stroke-width="2"><circle cx="52" cy="100" r="6"/><circle cx="86" cy="116" r="6"/><circle cx="128" cy="100" r="6"/><circle cx="170" cy="116" r="6"/></g><rect x="60" y="92" width="34" height="26" rx="2" fill="#f7efe0" stroke="${F}" stroke-width="2"/><rect x="140" y="106" width="26" height="14" rx="2" fill="#f7efe0" stroke="${F}" stroke-width="2"/><path d="M60 100h34M60 110h34" stroke="${F}" stroke-width="2"/><path d="M196 22L120 74" stroke="#b5762a" stroke-width="11" stroke-linecap="round"/><path d="M120 74l-14 10" stroke="#8f9aa3" stroke-width="7" stroke-linecap="round"/><circle cx="100" cy="88" r="5" fill="#f0c560" stroke="${F}" stroke-width="2"/><path d="M116 60c-6 6-4 12 2 16" fill="none" stroke="#a63a2e" stroke-width="3" stroke-linecap="round"/></svg>`,
  gadget: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Smartwatch und Smartphone"><rect width="240" height="160" fill="#e6eef2"/><rect x="30" y="52" width="80" height="60" rx="10" fill="#fff" stroke="${F}" stroke-width="3"/><rect x="42" y="40" width="56" height="12" rx="6" fill="#1d5c73" stroke="${F}" stroke-width="3"/><rect x="42" y="112" width="56" height="12" rx="6" fill="#1d5c73" stroke="${F}" stroke-width="3"/><path d="M40 88h12l6-14 8 24 7-16h20" fill="none" stroke="#1d5c73" stroke-width="3.5" stroke-linecap="round"/><rect x="140" y="26" width="62" height="108" rx="12" fill="#fff" stroke="${F}" stroke-width="3"/><rect x="150" y="42" width="42" height="72" rx="3" fill="#cfe2e9" stroke="${F}" stroke-width="2.5"/><path d="M163 126h16" stroke="${F}" stroke-width="3" stroke-linecap="round"/><path d="M214 44c10 8 10 30 0 38m-14-32c5 4 5 20 0 24" fill="none" stroke="#1d5c73" stroke-width="3.5" stroke-linecap="round"/></svg>`,
  dreidruck: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="3D-Drucker"><rect width="240" height="160" fill="#e6eef2"/><path d="M42 26h156M42 26v110M198 26v110M42 136h156" stroke="${F}" stroke-width="3"/><rect x="64" y="46" width="112" height="12" rx="3" fill="#bcd3dc" stroke="${F}" stroke-width="3"/><path d="M120 58v18" stroke="${F}" stroke-width="3"/><path d="M108 76h24l-6 16h-12z" fill="#1d5c73" stroke="${F}" stroke-width="3"/><path d="M120 92v12" stroke="#1d5c73" stroke-width="3" stroke-dasharray="4 6"/><rect x="60" y="106" width="120" height="12" rx="3" fill="#f7efe0" stroke="${F}" stroke-width="3"/><path d="M104 106v-4q16-16 32 0v4z" fill="#f0c560" stroke="${F}" stroke-width="3"/></svg>`,
  gamepad: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Gamecontroller"><rect width="240" height="160" fill="#e6eef2"/><path d="M62 54h116q26 0 30 30l-6 34q-4 20-22 14-12-4-20-20h-80q-8 16-20 20-18 6-22-14l-6-34q4-30 30-30z" fill="#f7efe0" stroke="${F}" stroke-width="3"/><path d="M74 74v22M63 85h22" stroke="${F}" stroke-width="4" stroke-linecap="round"/><circle cx="158" cy="78" r="6" fill="#a63a2e"/><circle cx="176" cy="94" r="6" fill="#1d5c73"/><circle cx="158" cy="104" r="6" fill="#2e6b4a"/><circle cx="140" cy="92" r="6" fill="#b5762a"/><path d="M98 60h44v16H98z" fill="#bcd3dc" stroke="${F}" stroke-width="3"/></svg>`,

  /* --- Kunst --- */
  museum: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Museum mit Bildern"><rect width="240" height="160" fill="#f5edda"/><path d="M40 60l80-32 80 32z" fill="#f0dcae" stroke="${F}" stroke-width="3"/><rect x="34" y="60" width="172" height="8" fill="#f0dcae" stroke="${F}" stroke-width="3"/><g fill="#fff" stroke="${F}" stroke-width="3"><rect x="48" y="72" width="18" height="54"/><rect x="86" y="72" width="18" height="54"/><rect x="136" y="72" width="18" height="54"/><rect x="174" y="72" width="18" height="54"/></g><path d="M24 134h192" stroke="${F}" stroke-width="3"/><circle cx="120" cy="44" r="7" fill="#b5762a" stroke="${F}" stroke-width="2.5"/></svg>`,
  malen: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Farbpalette mit Pinsel"><rect width="240" height="160" fill="#f5edda"/><ellipse cx="104" cy="92" rx="62" ry="44" fill="#fff" stroke="${F}" stroke-width="3"/><ellipse cx="130" cy="106" rx="14" ry="10" fill="#f5edda" stroke="${F}" stroke-width="3"/><circle cx="74" cy="74" r="9" fill="#a63a2e" stroke="${F}" stroke-width="2.5"/><circle cx="102" cy="62" r="9" fill="#b5762a" stroke="${F}" stroke-width="2.5"/><circle cx="128" cy="74" r="9" fill="#2e6b4a" stroke="${F}" stroke-width="2.5"/><circle cx="68" cy="104" r="9" fill="#1d5c73" stroke="${F}" stroke-width="2.5"/><g transform="rotate(-45 150 96)" stroke="${F}" stroke-width="3"><path d="M148 96l16-10v20z" fill="#a63a2e"/><rect x="164" y="85" width="16" height="22" rx="2" fill="#d9c9a8"/><rect x="180" y="88" width="74" height="16" rx="8" fill="#b5762a"/></g><path d="M188 138h44" stroke="${F}" stroke-width="3"/></svg>`,
  skizzenbuch: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Aufgeschlagenes Skizzenbuch"><rect width="240" height="160" fill="#f5edda"/><path d="M28 40h76q8 0 8 8v82q0-8-8-8H28z" fill="#fff" stroke="${F}" stroke-width="3"/><path d="M212 40h-76q-8 0-8 8v82q0-8 8-8h76z" fill="#fff" stroke="${F}" stroke-width="3"/><path d="M120 40v82" stroke="${F}" stroke-width="3"/><path d="M56 64q16-20 32-4 12 14 20 4" fill="none" stroke="#1d5c73" stroke-width="3" stroke-linecap="round"/><circle cx="52" cy="56" r="6" fill="#f0c560" stroke="${F}" stroke-width="2"/><path d="M136 60h44M136 74h30M136 88h38" stroke="${F}" stroke-width="3" stroke-linecap="round"/><path d="M50 132l64-14 76 10" fill="none" stroke="${F}" stroke-width="3"/></svg>`,
  fotoapparat: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Fotoapparat mit Herbstlaub"><rect width="240" height="160" fill="#f5edda"/><rect x="34" y="52" width="132" height="80" rx="9" fill="#f7efe0" stroke="${F}" stroke-width="3"/><rect x="70" y="40" width="46" height="16" rx="4" fill="#bcd3dc" stroke="${F}" stroke-width="3"/><circle cx="100" cy="94" r="28" fill="#eaf2ea" stroke="${F}" stroke-width="3"/><circle cx="100" cy="94" r="15" fill="#1d5c73" stroke="${F}" stroke-width="3"/><circle cx="52" cy="68" r="6" fill="#a63a2e"/><path d="M178 120c-14-8-18-26-8-40 14 6 20 24 8 40z" fill="#b5762a" stroke="${F}" stroke-width="3"/><path d="M178 120l6 18" stroke="${F}" stroke-width="3"/><path d="M206 96c10-10 8-26-4-32-8 10-8 24 4 32z" fill="#a63a2e" stroke="${F}" stroke-width="3"/></svg>`,
  klavier: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Klavier mit Notenblatt"><rect width="240" height="160" fill="#f5edda"/><rect x="22" y="86" width="196" height="18" fill="#fff" stroke="${F}" stroke-width="3"/><path d="M22 104v26h196v-26" fill="#b5762a" stroke="${F}" stroke-width="3"/><g stroke="${F}" stroke-width="2.5"><path d="M46 86v18M70 86v18M94 86v18M118 86v18M142 86v18M166 86v18M190 86v18"/></g><g fill="#171c19"><rect x="34" y="86" width="10" height="11"/><rect x="58" y="86" width="10" height="11"/><rect x="106" y="86" width="10" height="11"/><rect x="130" y="86" width="10" height="11"/><rect x="178" y="86" width="10" height="11"/></g><path d="M52 30v34l28-6V36" fill="none" stroke="${F}" stroke-width="3"/><path d="M52 52l28-6" stroke="${F}" stroke-width="3"/><ellipse cx="46" cy="64" rx="8" ry="6" fill="#171c19"/><ellipse cx="74" cy="58" rx="8" ry="6" fill="#171c19"/></svg>`,
  keramik: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Tontopf an der Töpferscheibe"><rect width="240" height="160" fill="#f5edda"/><ellipse cx="110" cy="126" rx="72" ry="16" fill="#bcd3dc" stroke="${F}" stroke-width="3"/><path d="M74 90q-10 30 12 34h48q22-4 12-34z" fill="#b5762a" stroke="${F}" stroke-width="3"/><ellipse cx="110" cy="90" rx="36" ry="12" fill="#d59b52" stroke="${F}" stroke-width="3"/><ellipse cx="110" cy="90" rx="20" ry="6" fill="#f5edda" stroke="${F}" stroke-width="2.5"/><path d="M110 100v14" stroke="#8a5a20" stroke-width="3"/><path d="M172 46q24 22 4 48" fill="none" stroke="${F}" stroke-width="4" stroke-linecap="round"/><path d="M172 46q-16 8-14 24" fill="none" stroke="#2e6b4a" stroke-width="4" stroke-linecap="round"/><path d="M0 146h240" stroke="${F}" stroke-width="3"/></svg>`,
  theater: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Theatermasken auf einer Bühne"><rect width="240" height="160" fill="#f5edda"/><path d="M0 128h240v32H0z" fill="#171c19"/><path d="M0 0h240v22q-30 14-60 0t-60 0-60 0-60 0z" fill="#a63a2e" stroke="${F}" stroke-width="3"/><path d="M26 34q0 62 30 74 30-12 30-74z" fill="#f0dcae" stroke="${F}" stroke-width="3"/><path d="M42 56q8-6 16 0M200 56q-8-6-16 0" fill="none" stroke="${F}" stroke-width="3"/><path d="M42 84q10 10 20 0" fill="none" stroke="${F}" stroke-width="3"/><path d="M154 46q0 52 26 62 26-10 26-62z" fill="#f7efe0" stroke="${F}" stroke-width="3"/><path d="M172 82q8-8 18-2" fill="none" stroke="${F}" stroke-width="3"/></svg>`,

  /* --- Sport --- */
  fussball: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Fliegender Fußball"><rect width="240" height="160" fill="#e8efe6"/><path d="M20 130c18-52 56-80 104-88" fill="none" stroke="${F}" stroke-width="3" stroke-dasharray="9 13" stroke-linecap="round"/><ellipse cx="152" cy="132" rx="40" ry="6" fill="rgba(23,28,25,.13)"/><circle cx="152" cy="84" r="40" fill="#fff" stroke="${F}" stroke-width="3"/><path d="M152 69l14 11-5 17h-18l-5-17z" fill="#a63a2e" stroke="${F}" stroke-width="3" stroke-linejoin="round"/><path d="M152 69V44M166 79l24-7M161 96l15 20M143 96l-15 20M138 79l-24-7" stroke="${F}" stroke-width="3"/><path d="M0 138h240" stroke="${F}" stroke-width="3"/></svg>`,
  fahrrad: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Fahrrad"><rect width="240" height="160" fill="#e8efe6"/><g fill="none" stroke="${F}" stroke-width="3"><circle cx="60" cy="100" r="32"/><circle cx="180" cy="100" r="32"/><path d="M60 100h48l30-40M108 100l24-40h28M132 60h30M108 100l-24-40h-24"/></g><path d="M76 56h26" stroke="${F}" stroke-width="4" stroke-linecap="round"/><path d="M162 52h30" stroke="${F}" stroke-width="4" stroke-linecap="round"/><circle cx="108" cy="100" r="7" fill="#a63a2e" stroke="${F}" stroke-width="3"/><path d="M120 66l-16-10" stroke="#1d5c73" stroke-width="4" stroke-linecap="round"/><path d="M0 140h240" stroke="${F}" stroke-width="3"/></svg>`,
  beachvolleyball: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Beachvolleyball-Feld"><rect width="240" height="160" fill="#eaf2ea"/><circle cx="196" cy="34" r="16" fill="#f0c560" stroke="${F}" stroke-width="3"/><path d="M0 116q60-14 120 0t120 0v44H0z" fill="#e6d2a8" stroke="${F}" stroke-width="3"/><path d="M0 128q60-12 120 0t120 0" fill="none" stroke="#2e6b4a" stroke-width="3"/><path d="M120 126V44" stroke="${F}" stroke-width="3"/><path d="M96 50h48v50H96z" fill="none" stroke="${F}" stroke-width="2.5" stroke-dasharray="6 7"/><circle cx="78" cy="52" r="15" fill="#fff" stroke="${F}" stroke-width="3"/><path d="M66 44q12 6 24 0" fill="none" stroke="${F}" stroke-width="2"/><path d="M158 96l-10 22m10-22l12 20" stroke="${F}" stroke-width="3.5" stroke-linecap="round"/><path d="M160 78l-8 14m8-14l10 12" stroke="${F}" stroke-width="3.5" stroke-linecap="round"/><circle cx="160" cy="70" r="10" fill="#f0c560" stroke="${F}" stroke-width="3"/></svg>`,
  bouldern: `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Kletterwand mit Griffen"><rect width="240" height="160" fill="#e8efe6"/><rect x="30" y="0" width="180" height="160" fill="#cfd8d0" stroke="${F}" stroke-width="3"/><g fill="#a63a2e" stroke="${F}" stroke-width="2.5"><rect x="54" y="30" width="20" height="12" rx="4"/><rect x="120" y="62" width="16" height="16" rx="6"/><rect x="166" y="34" width="18" height="12" rx="4"/><rect x="70" y="104" width="16" height="14" rx="5"/></g><g fill="#1d5c73" stroke="${F}" stroke-width="2.5"><rect x="96" y="18" width="14" height="14" rx="6"/><rect x="150" y="110" width="20" height="12" rx="4"/></g><g fill="#2e6b4a" stroke="${F}" stroke-width="2.5"><rect x="46" y="68" width="18" height="12" rx="4"/><rect x="186" y="80" width="14" height="14" rx="6"/></g><circle cx="116" cy="96" r="10" fill="#f0c560" stroke="${F}" stroke-width="3"/><g fill="none" stroke="${F}" stroke-width="4" stroke-linecap="round"><path d="M116 106l-2 20"/><path d="M114 126l-12 16"/><path d="M114 126l14 14"/><path d="M114 110l-24-16"/><path d="M114 110l28-14"/></g></svg>`,
  mannschaft: (() => {
    const trikot = (x, y, s, farbe) =>
      `<g transform="translate(${x},${y}) scale(${s})" stroke="${F}" stroke-width="3"><path d="M-16 14l16-14 8 8-8 8z" fill="${farbe}"/><path d="M60 14L44 0l-8 8 8 8z" fill="${farbe}"/><path d="M0 0q22-12 44 0v48q-22 8-44 0z" fill="${farbe}"/><path d="M14-3q8 11 16 0" fill="none"/></g>`;
    return `<svg class="bild" viewBox="0 0 240 160" role="img" aria-label="Drei Trikots nebeneinander"><rect width="240" height="160" fill="#e8efe6"/><path d="M0 138h240" stroke="${F}" stroke-width="3"/>${trikot(26, 66, .78, "#a63a2e")}${trikot(84, 40, 1, "#fff")}${trikot(154, 62, .84, "#1d5c73")}<path d="M106 60v22M95 71h22" stroke="#a63a2e" stroke-width="4" stroke-linecap="round"/></svg>`;
  })()
};

/* ---------------------------------------------------------
   2. FRAGEN
   12 Fragen, vier Antwortmoeglichkeiten - eine pro Gruppe.
   Die Reihenfolge der Felder wandert von Frage zu Frage,
   damit nie zweimal dieselbe Gruppe oben links steht.
   Gewaehlt wird ein Feld -> die Gruppe dahinter punktet.
   Wer einer Gruppe treu bleibt, holt alle 12 Punkte.
   --------------------------------------------------------- */
const fragen = [
  { frage: "Ein freier Sonntagnachmittag. Womit verbringst du ihn?",
    optionen: [
      { text: "Barfuß durch den Auwald",       gruppe: "Natur",   bild: "natur" },
      { text: "Mit dem Lötkolben an der Platine", gruppe: "Technik", bild: "loetkolben" },
      { text: "Mit dem Skizzenbuch losziehen", gruppe: "Kunst",   bild: "skizzenbuch" },
      { text: "Kicken im Ballspielkäfig",      gruppe: "Sport",   bild: "fussball" } ] },

  { frage: "Dein perfekter Herbsttag in Wien:",
    optionen: [
      { text: "Die eigene App zu Ende bauen",  gruppe: "Technik", bild: "code" },
      { text: "Den ganzen Herbst fotografieren", gruppe: "Kunst", bild: "fotoapparat" },
      { text: "Beachvolleyball auf der Donauinsel", gruppe: "Sport", bild: "beachvolleyball" },
      { text: "Pilze und Beeren bestimmen",    gruppe: "Natur",   bild: "pilze" } ] },

  { frage: "Der Arbeitstag war lang. Wie lässt du ihn ausklingen?",
    optionen: [
      { text: "Abends Klavier üben",           gruppe: "Kunst",   bild: "klavier" },
      { text: "Bouldern, bis die Finger brennen", gruppe: "Sport", bild: "bouldern" },
      { text: "Allein stundenlang bergauf gehen", gruppe: "Natur", bild: "wandern" },
      { text: "Zocken, bis die Augen brennen", gruppe: "Technik", bild: "gamepad" } ] },

  { frage: "Wofür gibst du viel zu viel Geld aus?",
    optionen: [
      { text: "Teamkram für die Liga",         gruppe: "Sport",   bild: "mannschaft" },
      { text: "Setzlinge für den Schrebergarten", gruppe: "Natur", bild: "garten" },
      { text: "Kleinkram fürs Bastelregal",    gruppe: "Technik", bild: "gadget" },
      { text: "Konzert- und Theaterkarten",    gruppe: "Kunst",   bild: "theater" } ] },

  { frage: "Filmabend - welche Doku darfst du aussuchen?",
    optionen: [
      { text: "Die Sterne über der Rax",       gruppe: "Natur",   bild: "sternenhimmel" },
      { text: "Wie das Internet wirklich funktioniert", gruppe: "Technik", bild: "technik" },
      { text: "Wer diesen einen Bruegel gemalt hat", gruppe: "Kunst", bild: "malen" },
      { text: "Eine Etappe der Tour de France", gruppe: "Sport",  bild: "fahrrad" } ] },

  { frage: "Geburtstag! Was wünschst du dir wirklich?",
    optionen: [
      { text: "Einem Kurs an der Töpferscheibe", gruppe: "Kunst",  bild: "keramik" },
      { text: "Einen Startplatz beim Staffellauf", gruppe: "Sport", bild: "fussball" },
      { text: "Eine Wanderung bis zur Alm",     gruppe: "Natur",   bild: "wandern" },
      { text: "Einen eigenen 3D-Drucker",       gruppe: "Technik", bild: "dreidruck" } ] },

  { frage: "Wo lernst du am meisten dazu?",
    optionen: [
      { text: "In der Mannschaft, durchs Machen", gruppe: "Sport", bild: "fussball" },
      { text: "Draußen, mit allen Sinnen",     gruppe: "Natur",   bild: "natur" },
      { text: "Abends über Tutorials am Rechner", gruppe: "Technik", bild: "code" },
      { text: "Vor Originalen im Museum",      gruppe: "Kunst",   bild: "museum" } ] },

  { frage: "Dein Lieblingsplatz in Wien wäre:",
    optionen: [
      { text: "Die Werkstatt mit dem 3D-Drucker", gruppe: "Technik", bild: "dreidruck" },
      { text: "MuseumsQuartier, Bank, Skizzenbuch am Schoß", gruppe: "Kunst", bild: "skizzenbuch" },
      { text: "Der Beachvolleyballplatz am Orasteig", gruppe: "Sport", bild: "beachvolleyball" },
      { text: "Ein Beet im Schrebergarten",    gruppe: "Natur",   bild: "garten" } ] },

  { frage: "Stromausfall in der Wohnung. Was machst du?",
    optionen: [
      { text: "Raus - Vögel beobachten bei Tageslicht", gruppe: "Natur", bild: "natur" },
      { text: "Löten bei Kerzenlicht",         gruppe: "Technik", bild: "loetkolben" },
      { text: "Klavier spielen, weil sonst nichts geht", gruppe: "Kunst", bild: "klavier" },
      { text: "Radtour, solange es hell ist",  gruppe: "Sport",   bild: "fahrrad" } ] },

  { frage: "Womit verschwindest du stundenlang, ohne die Zeit zu merken?",
    optionen: [
      { text: "Malen, bis das Licht weg ist",  gruppe: "Kunst",   bild: "malen" },
      { text: "Wand für Wand hinauf",          gruppe: "Sport",   bild: "bouldern" },
      { text: "Im Wald Pilze suchen",          gruppe: "Natur",   bild: "pilze" },
      { text: "An deinem eigenen Game basteln", gruppe: "Technik", bild: "gamepad" } ] },

  { frage: "Du hast dir ein Projekt für nächstes Jahr vorgenommen:",
    optionen: [
      { text: "Mit dem Rad über die Alpen",    gruppe: "Sport",   bild: "fahrrad" },
      { text: "Ein eigener Gemüsegarten",      gruppe: "Natur",   bild: "garten" },
      { text: "Dein erstes Open-Source-Projekt veröffentlichen", gruppe: "Technik", bild: "code" },
      { text: "Eine kleine Fotoausstellung",   gruppe: "Kunst",   bild: "fotoapparat" } ] },

  { frage: "Was macht dich am ehesten du selbst?",
    optionen: [
      { text: "Alles mit Stecker, Schraube und Code", gruppe: "Technik", bild: "gadget" },
      { text: "Bühne, Galerie, Plattensammlungen", gruppe: "Kunst", bild: "theater" },
      { text: "Ohne Training läuft der Tag nicht", gruppe: "Sport", bild: "mannschaft" },
      { text: "Ein Tag ohne Bäume ist ein verlorener Tag", gruppe: "Natur", bild: "sternenhimmel" } ] }
];

/* ---------------------------------------------------------
   3. GRUPPEN: Farbe, Text, Siegel-Bild, Fun Facts, Wien-Tipps
   --------------------------------------------------------- */
const gruppen = {
  Natur: {
    farbe: "var(--natur)", icon: "natur",
    text: "Draußen läuft dir alles leicht: Weite, frische Luft, was Wachsenes. Ein Bildschirm ist für dich Werkzeug, kein Zuhause.",
    fakten: [
      "Der Wienerwald ist das größte zusammenhängende Laubwaldgebiet Mitteleuropas – und liegt direkt vor deiner Haustür.",
      "Bäume im Wald teilen sich Nährstoffe über ein Pilzgeflecht im Boden. Forstleute nennen es scherzhaft das Wood Wide Web.",
      "Über die Hälfte des Wiener Stadtgebietes ist Grünraum: Wiesen, Auen, Weingärten und Wald."
    ],
    tipps: [
      { name: "Lobau und Lobauwasser", where: "22., Kagraner Steg · U1 Kagran",
        why: "Auwald, Reiher und im Sommer Tretbootfahren auf der Alten Donau – der ruhigste Teil Wiens.", tags: ["gratis","Öffi","Draußen","Sommer"] },
      { name: "Steinhofgrund", where: "14., Penfingerweg · 54B/56B",
        why: "Ein stiller Waldtal-Wanderweg zwischen Otto-Wagner-Areal und Sophienalpe, kaum zwei Bezirke vom Ring.", tags: ["gratis","Wald","Herbst","Hund"] },
      { name: "Alte Donau", where: "22., Mainstraße · U1 Kagran",
        why: "1,6 km Badesee mit gratis Zugang, Liegewiesen und Tretboot- und SUP-Verleih.", tags: ["gratis","Bad","Sommer","Team"] },
      { name: "Nussberg und Kahlenberg", where: "19., Kletzaugergasse · 39A",
        why: "Weinterrassen, Fernblick bis zu den Kleinen Karpaten und unten ein Heuriger zum Einkehren.", tags: ["Öffi","Aussicht","Wanderung"] },
      { name: "Schrebergarten-Parzelle", where: "Stadtgärten Wien, überall in der Stadt",
        why: "Ein eigenes Beet für ein paar hundert Euro im Jahr – Warteliste früh anfragen, es gibt viele Standorte.", tags: ["Garten","Kosten","langfristig"], alterBis: 99 },
      { name: "Pilzkurs statt Raten", where: "VHS Wien und Mykologische Gesellschaft",
        why: "Wer Pilze sammeln will, lernt es am besten mit Expert:innen – zwei Abende, und du lässt alles stehen, was du nicht kennst.", tags: ["Kurs","Herbst","Kosten"], geschlecht: "alle" }
    ]
  },

  Technik: {
    farbe: "var(--technik)", icon: "technik",
    text: "Du willst wissen, wie etwas innen aussieht. Geräte, Code, neue Tools – du bist der Mensch im Freundeskreis, den alle anrufen, wenn etwas nicht startet.",
    fakten: [
      "Hedy Lamarr wurde in Wien geboren und erfand ein Frequenzspring-Verfahren, auf dem später WLAN und Bluetooth aufbauten.",
      "Der erste dokumentierte Software-Fehler war ein echter Käfer: 1947 klebte eine Motte im Relais eines Harvard-Rechners.",
      "Das erste Programm der Welt schrieb Ada Lovelace 1843 – für eine Maschine, die zu ihren Lebzeiten nie gebaut wurde."
    ],
    tipps: [
      { name: "Infolab an der TU Wien", where: "1., Getreidemarkt · U1/U2/U4 Karlsplatz",
        why: "Offener Lernraum mit 3D-Druck, Laser-Cutter und Vinyl-Plotter – nutzbar, ohne etwas zu kaufen.", tags: ["Maschinen","Studentisch","Regenprogramm"] },
      { name: "Makerspaces und Hackerräume", where: "z. B. Metalab, 2., Quader-/Solowerkgasse",
        why: "An den offenen Abenden darf rein, wer etwas bauen will. Werkzeug, Netzwerk, Leute, die schon alles kaputt gemacht haben.", tags: ["Abend","Community","Regenprogramm"] },
      { name: "Coding-Kurs an der VHS", where: "VHS-Standorte in fast jedem Bezirk",
        why: "Python, Datenanalyse oder Web-Grundlagen für einen Bruchteil dessen, was Anbieter außerhalb verlangen.", tags: ["Kurs","Kosten","Regenprogramm"] },
      { name: "Science Center im Haus des Meeres", where: "6., Mollardgasse 8 · U4 Pilgramgasse",
        why: "Experimente zum Anfassen und Haie daneben. Ausstellungen wechseln – vorher kurz die Website ansehen.", tags: ["Ausflug","Kosten","Regenprogramm"] },
      { name: "Technisches Museum", where: "14., Linzer Straße 189 · U4 Hütteldorf",
        why: "U-Bahn-Simulator, echte Lokomotiven und eine eigene Maker-Werkstatt an Wochenenden.", tags: ["Museum","Kosten","Regenprogramm"] },
      { name: "Dev-Meetups", where: "ViennaJS, Python- und Security-Stammtische, meist abends",
        why: "Einmal im Monat, meist gratis, immer mit Essen: der schnellste Weg zu Leuten, die dasselbe Problem haben wie du.", tags: ["Abend","Community","gratis"] }
    ]
  },

  Kunst: {
    farbe: "var(--kunst)", icon: "malen",
    text: "Formen, Farben, Geschichten: Du nimmst die Welt gestalterisch wahr und willst sie mit eigenen Händen zurückgeben.",
    fakten: [
      "Hundertwasser hielt die gerade Linie für gottlos – sein Haus in Wien hat deshalb schiefen Boden und Bäume auf dem Balkon.",
      "Das Kunsthistorische Museum besitzt die größte Bruegel-Sammlung der Welt, mehr Bilder als jedes andere Haus.",
      "Über dem Eingang der Secession steht das Programm der Wiener Moderne: „Der Zeit ihre Kunst, der Kunst ihre Freiheit.“"
    ],
    tipps: [
      { name: "Volkskundemuseum", where: "8., Laudongasse 15–19 · U6 Währinger Straße",
        why: "Wechselausstellungen, Workshop-Räume und ein schöner Innenhof – für unter 20-Jährige gratis.", tags: ["gratis-u20","Museum","Workshop"] },
      { name: "MuseumsQuartier", where: "7., Museumsplatz 1 · U2/U3 Volkstheater",
        why: "Leopold, MUMOK und Architektur dazwischen; der Hof selbst ist gratis und im Sommer voll Skateboards.", tags: ["Museum","Öffi","Sommer","Studentisch"] },
      { name: "Zentralfriedhof, Tor 2", where: "11., Simmeringer Hauptstraße 234 · 71/O",
        why: "Beethoven, Schubert, die Klimt-Grabgruppe und alte Bäume – der größte Friedhof Wiens ist ein Park mit Geschichte.", tags: ["Draußen","Kultur","Herbst"] },
      { name: "Restkarten an der Abendkassa", where: "Volksoper, Raimundtheater, Kammerspiele",
        why: "Als junger Mensch bekommt man ab einer Stunde vor Beginn Karten weit unter dem Vorverkaufspreis.", tags: ["Abend","günstig","Studentisch"], alterAb: 15 },
      { name: "Kultursommer und Opern Air", where: "in der ganzen Stadt, Juli bis Anfang September",
        why: "Ein Sommerprogramm bei freiem Eintritt, und zur Opern Air braucht man fürs Open-Air-Konzert nicht einmal ein Ticket.", tags: ["gratis","Sommer","Musik"], jahreszeit: "Sommer" },
      { name: "Töpfern oder Radierung im Kurs", where: "Volksbildung und Ateliers, z. B. 6./15./20.",
        why: "Werkstatt-Kurse laufen über das ganze Jahr. Ton, Presse und Brennofen sind dabei – man bringt nur sich mit.", tags: ["Workshop","Kosten","Regenprogramm"] }
    ]
  },

  Sport: {
    farbe: "var(--sport)", icon: "fussball",
    text: "Bewegung und Team geben dir den Takt. Du wirst unruhig, wenn nichts passiert, und stark, wenn andere mitziehen.",
    fakten: [
      "Vom Stadtzentrum bis zum Donauursprung in Budapest sind es rund 50 Flusskilometer – der erste Abschnitt liegt mitten in Wien.",
      "Im Sommer gibt es ein stadtweites Gratis-Sportprogramm: von Frühsport am Donauinsel-Strand bis Qi Gong im Augarten.",
      "Die Neue Donau ist ein 21 Kilometer langer künstlicher Flussarm – gebaut gegen Hochwasser, heute Wiens Badesommer."
    ],
    tipps: [
      { name: "Bewegt im Park", where: "Parks in allen Bezirken, Juni bis September",
        why: "Ein Sommer lang kostenlose Sportkurse zwischen Bäumen: Yoga, Kickboxen, Funktionstraining, einfach hinkommen.", tags: ["gratis","Sommer","Draußen","Team"], jahreszeit: "Sommer" },
      { name: "Kletterhalle Wieden (KWM)", where: "4., Rechte Wienzeile 121 · U1 Taubstummengasse",
        why: "Bouldern und Klettern unter Dach, mit Leihschuhen. Wenn es regnet, ist das hier der beste Ort der Stadt.", tags: ["Regenprogramm","Kosten","Klettern","Solo"] },
      { name: "Fußballkäfig und Parkplatz", where: "Käfige u. a. 2. Max-Winter-Platz, 9. Lichtentalerpark, 20. Allerheiligenplatz",
        why: "Über 200 Ballspielkäfige gibt es in Wien, dazu Wiesen mit Toren in den Parks – Kicken kostet nichts, Ball selbst mitbringen.", tags: ["gratis","Team","Draußen"] },
      { name: "Beachvolleyball am Orasteig", where: "21., Orasteig · U1 Aderklaaer Straße",
        why: "Ein frei zugänglicher Beachvolleyballplatz der Stadt Wien – ohne Eintritt, ohne Anmeldung; Strandstimmung gibt es daneben auf der Donauinsel.", tags: ["gratis","Sommer","Team","Bad"] },
      { name: "Radrunde Donaukanal bis Klosterneuburg", where: "Einstieg 2., Aspernbrückengasse · U4",
        why: "Flach, asphaltiert, fast immer getrennt vom Auto – die Standard-Ausfahrt, wenn du Tempo willst.", tags: ["Rad","Draußen","gratis","Sommer"] },
      { name: "Lauftreff im Prater (nur für Frauen)", where: "1., Meiereistraße · U1 Hauptallee",
        why: "Tempo und Tempo sind zweierlei: hier läuft man in Ruhe und in Gruppe, ohne Gaffer-Blick.", tags: ["gratis","Team","frauen*"], geschlecht: "frauen" }
    ]
  }
};

/* ---------------------------------------------------------
   4. ALLGEMEINE FUN FACTS (werden zufaellig gespickt)
   --------------------------------------------------------- */
const allgemeineFakten = [
  "In Wien gibt es mehr Ratten als Einwohner:innen – geschätzt, weil niemand genau nachzählt.",
  "Das Wort „Roboter“ stammt aus dem Tschechischen und wurde 1920 in Karel Čapeks Bühnenstück „R.U.R.“ eingeführt.",
  "Der Donaukanal ist keine natürliche Wasserstraße, sondern ein regulierter Flussarm – deshalb liegen Kajak, Beachvolleyball und Clubs direkt daneben."
];

const alternativen = ["weiblich", "männlich", "divers", "keine Angabe"];

/* ---------------------------------------------------------
   5. ZUSTAND
   --------------------------------------------------------- */
let aktuelleFrage = 0;
let punkte = { Natur: 0, Technik: 0, Kunst: 0, Sport: 0 };
let antworten = [];                       // ["Natur","Kunst", ...]
let texte = [];                           // gewaehlter Text je Frage, fuer die Antwortenliste
let sperre = false;                       // klickt Schutz: 260 ms nur eine Auswahl
let person = { name: "", alter: null, geschlecht: "" };

const $ = id => document.getElementById(id);
const KURZ = { gratis: "gratis", "gratis-u20": "gratis unter 20", "Öffi": "Öffi", "Rad": "Rad" };

/* ---------------------------------------------------------
   6. FORSCHRITTSLEISTE
   --------------------------------------------------------- */
function baueSchritte(){
  const leiste = $("schritte");
  leiste.innerHTML = "";
  fragen.forEach((f, i) => {
    if(i > 0){
      const strich = document.createElement("span");
      strich.className = "strich";
      strich.innerHTML = "<i></i>";
      leiste.appendChild(strich);
    }
    const p = document.createElement("span");
    p.className = "schritt";
    p.textContent = i + 1;
    leiste.appendChild(p);
  });
}

function zeigeFortschritt(){
  $("schritte").classList.remove("versteckt");
  $("fortschritt-zeile").classList.remove("versteckt");
  const stepEls = $("schritte").querySelectorAll(".schritt");
  const strichEls = $("schritte").querySelectorAll(".strich");

  stepEls.forEach((el, i) => {
    el.className = "schritt";
    if(i < antworten.length){
      el.classList.add("ist-fertig");
      el.style.background = gruppen[antworten[i]].farbe;
      el.textContent = "\u2713";
    } else {
      el.style.background = "";
      el.textContent = i + 1;
      if(i === aktuelleFrage) el.classList.add("ist-aktuell");
    }
  });
  strichEls.forEach((el, i) => el.classList.toggle("voll", i < antworten.length));

  const done = antworten.length;
  $("fortschritt-text").innerHTML = done >= fragen.length
    ? "Alle <b>" + fragen.length + "</b> Fragen beantwortet &middot; <b>100 %</b>"
    : "Frage <b>" + (aktuelleFrage + 1) + "</b> von " + fragen.length
      + " &middot; <b>" + Math.round(done / fragen.length * 100) + " %</b> geschafft";

  let pkt = "";
  antworten.forEach(g => { pkt += '<span class="punkt" style="background:' + gruppen[g].farbe + '"></span>'; });
  $("fortschritt-gruppen").innerHTML = pkt;
}

/* ---------------------------------------------------------
   7. ANMELDUNG
   --------------------------------------------------------- */
function baueChips(){
  const feld = $("chips-geschlecht");
  alternativen.forEach(w => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = w;
    b.setAttribute("aria-pressed", "false");
    b.onclick = () => {
      person.geschlecht = w;
      $("fehler-geschlecht").textContent = "";
      feld.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
    };
    feld.appendChild(b);
  });
}

function pruefeAnmeldung(){
  let ok = true;
  person.name  = $("name").value.trim();
  const roh = $("alter").value.trim();

  if(person.name.length < 2){ $("fehler-name").textContent = "Bitte trag deinen Namen ein."; ok = false; }
  else $("fehler-name").textContent = "";

  const a = Number(roh);
  if(roh === "" || !Number.isFinite(a) || a < 6 || a > 99){
    $("fehler-alter").textContent = "Bitte ein Alter zwischen 6 und 99 angeben."; ok = false;
  } else { person.alter = Math.round(a); $("fehler-alter").textContent = ""; }

  if(!person.geschlecht){
    $("fehler-geschlecht").textContent = "Bitte eine Auswahl treffen – auch „keine Angabe\" ist möglich."; ok = false;
  }
  return ok;
}

/* ---------------------------------------------------------
   8. QUIZ
   --------------------------------------------------------- */
function starte(){
  aktuelleFrage = 0;
  punkte = { Natur: 0, Technik: 0, Kunst: 0, Sport: 0 };
  antworten = [];
  texte = [];
  sperre = false;
  $("ergebnis-bereich").classList.add("versteckt");
  $("quiz").classList.remove("versteckt");
  $("anmeldung").classList.add("versteckt");
  $("status").textContent = "Quiz läuft";
  baueSchritte();
  zeigeFrage();
}

function zeigeFrage(){
  const frageObj = fragen[aktuelleFrage];
  $("frage-nummer").textContent = "Frage " + (aktuelleFrage + 1) + " von " + fragen.length;
  $("frage-text").textContent = frageObj.frage;

  /* vier Felder, eines pro Gruppe; Reihenfolge wandert laut Fragenliste */
  const feld = $("optionen");
  feld.innerHTML = "";
  frageObj.optionen.forEach((option, i) => {
    const button = document.createElement("button");
    button.className = "option";
    button.type = "button";
    button.onclick = () => waehle(i);
    zeigeOption(button, option);
    feld.appendChild(button);
  });
  $("zurueck").style.visibility = aktuelleFrage === 0 ? "hidden" : "visible";
  zeigeFortschritt();
}

function zeigeOption(button, option){
  button.style.setProperty("--akzent", gruppen[option.gruppe].farbe);
  const grafik = option.bild
    ? (/\.(svg|png|jpe?g|gif|webp)$/i.test(option.bild)
        ? '<img class="bild" src="' + option.bild + '" alt="' + option.text + '">'
        : BILDER[option.bild])
    : "";
  button.innerHTML = grafik
    + '<span class="text"><strong>' + option.text + '</strong><span>' + option.gruppe + '</span></span>';
}

function waehle(i){
  if(sperre) return;
  sperre = true;
  const option = fragen[aktuelleFrage].optionen[i];
  punkte[option.gruppe]++;
  antworten[aktuelleFrage] = option.gruppe;
  texte[aktuelleFrage] = option.text;

  const btn = $("optionen").children[i];
  btn.classList.add("wird-gewaehlt");
  zeigeFortschritt();
  setTimeout(() => {
    btn.classList.remove("wird-gewaehlt");
    sperre = false;
    if(aktuelleFrage + 1 < fragen.length){ aktuelleFrage++; zeigeFrage(); }
    else zeigeErgebnis();
  }, 260);
}

function zurueck(){
  if(sperre || aktuelleFrage === 0) return;
  aktuelleFrage--;
  punkte[antworten[aktuelleFrage]]--;
  antworten.length = texte.length = aktuelleFrage;
  zeigeFrage();
}

/* ---------------------------------------------------------
   9. TIPP-AUSWAHL nach Alter, Geschlecht und Jahreszeit
   --------------------------------------------------------- */
function aktiveTipps(g){
  const monat = new Date().getMonth() + 1;        // 1 bis 12
  const sommer = monat >= 6 && monat <= 9;
  return g.tipps.filter(t => {
    if(t.jahreszeit === "Sommer" && !sommer) return false;
    if(t.alterAb && person.alter < t.alterAb) return false;
    if(t.alterBis && person.alter > t.alterBis) return false;
    if(t.geschlecht === "frauen" && person.geschlecht === "männlich") return false;
    if(t.tempo === "kinder" && person.alter >= 16) return false;
    if(t.tempo === "nacht" && person.alter < 18) return false;
    if((t.tempo === "kinder" || t.tempo === "nacht") && person.alter < 16) return false;
    return true;
  });
}

function tagZeile(t){
  const liste = t.tags.slice();
  if(person.alter < 16 && !t.tags.includes("Begleitung")) liste.push("bis 16 mit Begleitung");
  if(person.alter < 19 && t.tags.includes("Museum")) liste.push("bis 19 gratis");
  return '<span class="tags">' + liste.map(x => '<span class="tag">' + (KURZ[x] || x) + '</span>').join("") + "</span>";
}

/* ---------------------------------------------------------
   10. ERGEBNIS
   --------------------------------------------------------- */
function zeigeErgebnis(){
  zeigeFortschritt();
  $("status").textContent = "Fertig";
  $("schritte").querySelectorAll(".schritt").forEach((el, i) => {
    el.className = "schritt ist-fertig";
    el.style.background = gruppen[antworten[i]].farbe;
    el.textContent = "\u2713";
  });

  const max = Math.max(...Object.values(punkte));
  const sieger = Object.keys(punkte).filter(g => punkte[g] === max);
  const g = gruppen[sieger[0]];
  const gleichstand = sieger.length > 1;
  const mini = n => '<span class="mini" title="' + n + '">' + BILDER[gruppen[n].icon] + "</span>";

  $("quiz").classList.add("versteckt");
  $("ergebnis-bereich").classList.remove("versteckt");
  $("ergebnis-text").innerHTML = sieger.map(n => '<span class="kopf">' + mini(n) + n + "</span>")
    .join('<span class="und"> + </span>');
  document.documentElement.style.setProperty("--aktiv", g.farbe);
  $("ergebnis-siegel").innerHTML = sieger.map(n => BILDER[gruppen[n].icon]).join("");

  $("ergebnis-beschreibung").innerHTML = gleichstand
    ? "<b>Du hast eine ausgeprägte Vorliebe für beide: " + sieger.join(" und ") + ".</b> "
      + sieger.map(n => gruppen[n].text).join(" ")
    : sieger[0] + " ist deine Gruppe. " + g.text;

  /* Jede Frage haelt genau eine Option pro Gruppe bereit - Punktemaximum
     ist immer die Zahl der Fragen. */
  $("verteilung").innerHTML = Object.keys(punkte).map(name => {
    const p = punkte[name];
    return '<li><span class="namemit">' + mini(name) + name + '</span><span class="balken"><i style="width:'
      + (p / fragen.length * 100) + '%;background:' + gruppen[name].farbe + '"></i></span>'
      + '<span class="anzahl">' + p + " / " + fragen.length + '</span></li>';
  }).join("");

  $("antworten-liste").innerHTML = fragen.map((f, i) => {
    const grp = antworten[i];
    return '<li><span class="punkt" style="background:' + gruppen[grp].farbe + '"></span>'
      + '<span>' + f.frage + ' <b style="color:var(--tinte)">' + (texte[i] || "") + '</b></span></li>';
  }).join("");

  /* Fun Facts: im Gleichstand einer aus jeder Siegergruppe, sonst einer
     zur Gruppe plus einer gemischte */
  if(gleichstand){
    $("fakten").innerHTML = sieger.map(n =>
      '<li class="eigen"><span>Für ' + n + "</span><p>"
      + gruppen[n].fakten[Math.floor(Math.random() * gruppen[n].fakten.length)] + "</p></li>"
    ).join("");
  } else {
    const misc = allgemeineFakten[Math.floor(Math.random() * allgemeineFakten.length)];
    $("fakten").innerHTML = [g.fakten[Math.floor(Math.random() * g.fakten.length)], misc]
      .map((t, i) => '<li class="' + (i ? "fremd" : "eigen") + '"><span>' + (i ? "Außerdem" : "Für " + sieger[0]) + '</span><p>' + t + "</p></li>")
      .join("");
  }

  /* Wien-Tipps: im Gleichstand nur einer pro Siegergruppe, sonst alle passenden */
  let tippe;
  if(gleichstand){
    tippe = sieger.map(n => {
      const liste = aktiveTipps(gruppen[n]);
      return { grp: n, t: liste[0] || gruppen[n].tipps[0] };
    });
  } else {
    tippe = aktiveTipps(g).map(t => ({ grp: sieger[0], t }));
  }
  $("tipp-liste").innerHTML = tippe.map(x =>
    '<article class="tipp"' + (gleichstand ? ' style="border-top-color:' + gruppen[x.grp].farbe + '"' : "") + ">"
    + (gleichstand ? '<p class="tipp-gruppe" style="color:' + gruppen[x.grp].farbe + '">' + x.grp + "</p>" : "")
    + "<h4>" + x.t.name + '</h4><p class="wo">' + x.t.where + "</p><p>" + x.t.why + "</p>" + tagZeile(x.t) + "</article>"
  ).join("");

  $("tipp-hinweis").textContent = (gleichstand
      ? "Bei Gleichstand zeigen wir bewusst nur einen Tipp pro Gruppe. "
      : "")
    + "Gefiltert für " + person.alter + " Jahre"
    + (person.geschlecht ? ", " + person.geschlecht : "")
    + " · Stand " + new Date().toLocaleDateString("de-AT", { month: "long", year: "numeric" })
    + ". Öffnungszeiten und Preise vor dem Hingehen kurz prüfen.";

  $("steckbrief").innerHTML = "Ausgewertet für <b>" + person.name + "</b>, " + person.alter
    + " Jahre, " + person.geschlecht + ". &middot; Stand: "
    + new Date().toLocaleDateString("de-AT", { day: "2-digit", month: "long", year: "numeric" }) + ".";

  window.scrollTo({ top: 0, behavior: "smooth" });
  const t = $("ergebnis-text"); t.setAttribute("tabindex", "-1"); t.focus({ preventScroll: true });
}

/* ---------------------------------------------------------
   11. START
   --------------------------------------------------------- */
window.onload = function(){
  baueChips();
  $("loslegen").onclick = () => { if(pruefeAnmeldung()) starte(); };
  ["name", "alter"].forEach(id => $(id).addEventListener("keydown", e => {
    if(e.key === "Enter" && pruefeAnmeldung()) starte();
  }));
};
