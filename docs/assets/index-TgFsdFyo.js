(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}})();const C=[{urn:"URN:NBN:no-nb_digibok_2009021704085",title:"NTR - Det nye testamente revidert . [ 1 ] : Lukasevangeliet , Første tessalonikerbrev , Andre tessalonikerbrev , Galaterbrevet , Filipperbrevet",year:2003,publisher:"Det norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2008052304066",title:"Det Nye testamente : oversatt for ungdom",year:1959,authors:"Osnes , Torbjørn",publisher:"Det Norske bibelselskaps forl."},{urn:"URN:NBN:no-nb_digibok_2011060308011",title:"Det nye testamentet",year:2005,publisher:"Det norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2012033008102",title:"Evangeliet etter Lukas",year:1973,publisher:"Det norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2012081508153",title:"Vær ikke redde : evangeliet etter Markus",year:1951,authors:"Skard , Vemund / Osnes , Torbjørn",publisher:"Det norske bibelselskaps forlag"},{urn:"URN:NBN:no-nb_digibok_2013030506026",title:"Bibelen : det Gamle og det Nye testamente : [ bokmål ]",year:1978,publisher:"Det Norske bibelselskaps forlag"},{urn:"URN:NBN:no-nb_digibok_2013020808015",title:"NTR - Det nye testamente revidert . [ 2 ] : Markusevangeliet , Romerbrevet , Første korinterbrev , Andre korinterbrev",year:2003,publisher:"Det norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2013061206082",title:"NTR - Det nye testamente revidert . [ 3 ] : Matteusevangeliet , Efeserbrevet , Kolosserbrevet",year:2004,publisher:"Det norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2015110407068",title:"Godt nytt : Det nye testamentet for menneske i dag ; illustrert av Annie Vallotton",year:1976,authors:"Vallotton , Annie",publisher:"Bibelselskapet"},{urn:"URN:NBN:no-nb_digibok_2016061748023",title:"Godt nytt : Det nye testamente for mennesker i dag : ny oversettelse av 1975",year:1975,authors:"Vallotton , Annie",publisher:"Det norske bibelselskaps forl."},{urn:"URN:NBN:no-nb_digibok_2018020748002",title:"Når Ordet blir norsk : norske bibeloversettelser 1945-2011",year:2011,authors:"Bøe , Sverre / Holmås , Geir Otto",publisher:"Tapir akademisk forl."},{urn:"URN:NBN:no-nb_digibok_2018030805008",title:"Utvalg av det Gamle testamente : oversettelse av 1966",year:1966,publisher:"Det Norske bibelselskaps forl."},{urn:"URN:NBN:no-nb_digibok_2017091807031",title:"Bibelen , eller Den Hellige skrift : det gamle og det Nye testamentes kanoniske bøker",year:1930,publisher:"Det Norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2019061928001",title:"Biblia : Det er den gantske Hellige Scrifft , vdsæt paa Danske",year:1550,publisher:"aff Ludowich Dietz"},{urn:"URN:NBN:no-nb_digibok_2021012648506",title:"Bibelen , eller Den hellige Skrift indeholdende det Gamle og Nye Testamentes kanoniske Bøger",year:1905,publisher:"Det norske Bibelselskabs Forl."},{urn:"URN:NBN:no-nb_digibok_2016031029001",title:"Biblia , Paa Danske : Det er , Den gandske hellige Skriftis Bøgger , Paa ny igiennemseete , med flid , efter den Ebræiske oc Grækiske Text , det næste mueligt var , Oc forbedrede med ny Summarier , fuldkommeligere Concordantzer , oc korte antegnelser udi Bredden , anlangendis de mørcke Ord oc maader ad tale med. 3 : Den Tredie Part Af det Gamle Testamentis Bøgger",year:1647,publisher:"[ved Melchior Martzan oc Melchior Winckler]"},{urn:"URN:NBN:no-nb_digibok_2016040729001",title:"Biblia , Paa Danske : Det er , Den gandske hellige Skriftis Bøgger , Paa ny igiennemseete , med flid , efter den Ebræiske oc Grækiske Text , det næste mueligt var , Oc forbedrede med ny Summarier , fuldkommeligere Concordantzer , oc korte antegnelser udi Bredden , anlangendis de mørcke Ord oc maader ad tale med. 1 : Den første Part Af det Gamle Testamentis Bøgger",year:1647,publisher:"[ved Melchior Martzan oc Melchior Winckler]"},{urn:"URN:NBN:no-nb_digibok_2016040729002",title:"Biblia , Paa Danske : Det er , Den gandske hellige Skriftis Bøgger , Paa ny igiennemseete , med flid , efter den Ebræiske oc Grækiske Text , det næste mueligt var , Oc forbedrede med ny Summarier , fuldkommeligere Concordantzer , oc korte antegnelser udi Bredden , anlangendis de mørcke Ord oc maader ad tale med. 2 : Den Anden Part Af det gamle Testamentis Bøgger",year:1647,publisher:"[ved Melchior Martzan oc Melchior Winckler]"},{urn:"URN:NBN:no-nb_digibok_2010110206027",title:"Evangilja : eller Fagnad-bodi etter Mattæus",year:1915,authors:"Seippel , Alexander",publisher:"Det norske bibel-sellskape"},{urn:"URN:NBN:no-nb_digibok_2011052608017",title:"Det nye testamentet",year:2005,publisher:"Det norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2011053008068",title:"NTR - Det nye testamente revidert . [ 5 ] : Apostlenes gjerninger , Første timoteusbrev , Andre timoteusbrev , Brevet til Titus , Brevet til Filemon , Hebreerbrevet , Jakobs brev , Første petersbrev , Andre petersbrev , Judas ' brev",year:2005,publisher:"Det norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2022030107531",title:"Bibelen : Den hellige skrift : Det gamle og Det nye testamente",year:1985,publisher:"Det norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2021041548624",title:"Bibelen , eller den Hellige Skrift : indeholdende Det gamle og nye Testaments kanoniske Bøger , tilligemed Det gamle Testamentes apokryfiske Bøger",year:1908},{urn:"URN:NBN:no-nb_digibok_2022011028001",title:"Biblia : Det er , Den gantske Hellige Scrifft , paa Danske",year:1589,authors:"Dietrich , Veit / Luther , Martin",publisher:"Aff Matz Vingaardt"},{urn:"URN:NBN:no-nb_digibok_2022011928001",title:"Biblia : Det er Den gantske Hellige Scrifft paa Danske",year:1633,authors:"Luther , Martin / Dietrich , Veit / Martzan , Melchior / Sartor , Salomon",publisher:"Prentet ved Melchior Martzan"},{urn:"URN:NBN:no-nb_digibok_2022030107535",title:"Bibelen : det Gamle og det Nye testamentet : [ nynorsk ]",year:1978,publisher:"Det Norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2022012528002",title:"Biblia , Paa Danske : Det er Den gantske hellige scriftis Bøgger igen [ n ] em seete med flijd effter den Ebræiske oc Grækeske Text etc. det negste mueligt vaar Oc effter som de paa andre atskillige Tungemaal vaare best vdsatte",year:1607,authors:"Resen , Hans Poulsen",publisher:"[utgiver ikke identifisert]"},{urn:"URN:NBN:no-nb_digibok_2008040104074",title:"Det Nye Testamente",year:1904,publisher:"Det Norske Bibelselskabs Forl."},{urn:"URN:NBN:no-nb_digibok_2017051148061",title:"Bibelens eller Den hellige Skrifts kanoniske Bøger",year:1891,publisher:"Bibelselskabet"}];C.map(e=>e.urn);const W="https://api.nb.no/dhlab",E=W;async function Q(e,t){const r={urns:t.urns.length?t.urns:null,query:t.query,window:_(t.window,1,25),limit:_(t.limit,1,1e3)},o=await U(e,"/conc",r);return Y(o)}async function X(e,t){const r={urn:t.urns.length?t.urns:null,word:t.word,before:Math.max(0,t.before),after:Math.max(0,t.after),samplesize:Math.max(1,t.samplesize)},o=await U(e,"/urncolldist_urn",r);return Z(o).sort((s,i)=>i.count-s.count)}async function U(e,t,r){const o=`${e.replace(/\/$/,"")}${t}`,n=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!n.ok){const i=await n.text();throw new Error(`API-kall feilet (${n.status} ${n.statusText}): ${i}`)}const s=await n.json();return typeof s=="string"?JSON.parse(s):s}function Y(e){return Array.isArray(e)?e:ne(e)?ee(e):[]}function Z(e){if(!re(e))return[];const t=new Set;return[e.counts,e.dist,e.bdist].filter(Boolean).forEach(r=>{Object.keys(r).forEach(o=>t.add(o))}),Array.from(t).map(r=>({word:r,count:Number(e.counts?.[r]??0),distance:w(e.dist?.[r]),bayesianDistance:w(e.bdist?.[r])}))}function ee(e){const t=new Set;return Object.values(e).forEach(o=>{Array.isArray(o)?o.forEach((n,s)=>t.add(String(s))):o&&typeof o=="object"&&Object.keys(o).forEach(n=>t.add(n))}),Array.from(t).sort((o,n)=>Number(o)-Number(n)).map(o=>{const n={};for(const[s,i]of Object.entries(e))n[s]=te(i,o);return n})}function te(e,t){if(Array.isArray(e)){const r=Number(t);return Number.isNaN(r)?null:e[r]}return e&&typeof e=="object"?e[t]:e}function ne(e){return!!e&&typeof e=="object"}function re(e){if(!e||typeof e!="object")return!1;const t=e,r=t.counts!==void 0&&t.counts!==null&&typeof t.counts=="object",o=t.dist!==void 0&&t.dist!==null&&typeof t.dist=="object",n=t.bdist!==void 0&&t.bdist!==null&&typeof t.bdist=="object";return r||o||n}function _(e,t,r){return Math.min(Math.max(e,t),r)}function w(e){const t=Number(e);return Number.isFinite(t)?t:null}const l=document.querySelector("#app");if(!l)throw new Error("Fant ikke rot-elementet med id #app");l.innerHTML=`
  <header class="hero">
    <div class="hero-copy">
      <p class="eyebrow">Bibel-korpus</p>
      <h1>Concordance & kollokasjoner</h1>
      <p>
        Velg hvilke utgaver som skal inngå i subkorpuset, og hent concordancer
        eller kollokasjoner direkte fra NB sitt DH-lab API.
      </p>
    </div>
  </header>

  <main class="grid">
    <section class="panel">
      <header>
        <div>
          <p class="eyebrow">Subkorpus</p>
          <h2>Velg bibelutgaver</h2>
        </div>
        <output id="urn-count">0 valgt</output>
      </header>
      <div class="subkorpus-controls">
        <div class="actions">
          <button type="button" data-action="select-all">Velg alle</button>
          <button type="button" data-action="clear-all">Fjern alle</button>
        </div>
        <label class="search-label" for="urn-search">
          <span>Søk etter tittel</span>
          <input id="urn-search" type="search" placeholder="Filtrer på navn/år" />
        </label>
      </div>
      <select id="urn-select" multiple size="10"></select>
    </section>

    <section class="panel">
      <header>
        <div>
          <p class="eyebrow">Concordance</p>
          <h2>Søk etter uttrykk</h2>
        </div>
      </header>
      <form id="conc-form" class="stack" autocomplete="off">
        <label>
          <span>Søkestreng (SQLite FTS5)</span>
          <input name="query" type="text" placeholder="f.eks. "Gud NEAR/5 kjærlighet"" required />
        </label>
        <div class="form-grid">
          <label>
            <span>Vindusstørrelse</span>
            <input name="window" type="number" min="1" max="25" value="10" />
          </label>
          <label>
            <span>Maks linjer per dokument</span>
            <input name="limit" type="number" min="1" max="1000" value="100" />
          </label>
        </div>
        <button type="submit">Hent concordance</button>
      </form>
      <div class="result-actions">
        <button type="button" id="download-conc" disabled>Last ned CSV</button>
      </div>
      <div id="conc-results" class="results"></div>
    </section>

    <section class="panel">
      <header>
        <div>
          <p class="eyebrow">Kollokasjoner</p>
          <h2>Finn medkontekst</h2>
        </div>
      </header>
      <form id="coll-form" class="stack" autocomplete="off">
        <label>
          <span>Basiskord</span>
          <input name="word" type="text" value="arbeid" required />
        </label>
        <div class="form-grid">
          <label>
            <span>Ord før</span>
            <input name="before" type="number" min="0" max="25" value="5" />
          </label>
          <label>
            <span>Ord etter</span>
            <input name="after" type="number" min="0" max="25" value="5" />
          </label>
          <label>
            <span>Utvalg (samplesize)</span>
            <input name="samplesize" type="number" min="1" value="200000" />
          </label>
        </div>
        <button type="submit">Hent kollokasjoner</button>
      </form>
      <div class="result-actions">
        <button type="button" id="download-coll" disabled>Last ned CSV</button>
      </div>
      <div id="coll-results" class="results"></div>
    </section>
  </main>
`;const A=l.querySelector("#urn-select"),L=l.querySelector("#urn-count"),O=l.querySelector("#urn-search"),T=l.querySelector("#conc-results"),j=l.querySelector("#coll-results"),M=l.querySelector("#conc-form"),x=l.querySelector("#coll-form"),q=l.querySelector("#download-conc"),F=l.querySelector("#download-coll");if(!A||!L||!T||!j||!M||!x||!O||!q||!F)throw new Error("UI-elementer mangler i DOM-en");const b=A,oe=L,p=T,m=j,y=M,f=x,R=O,I=q,P=F;se();$();B();let z=[],H=[],V=[],G=[];l.querySelector('[data-action="select-all"]')?.addEventListener("click",()=>{$(),B()});l.querySelector('[data-action="clear-all"]')?.addEventListener("click",()=>{b.selectedIndex=-1,B()});b.addEventListener("change",B);R.addEventListener("input",()=>{const e=R.value.toLowerCase().trim();for(const t of Array.from(b.options)){const r=t.textContent?.toLowerCase()??"";t.hidden=e.length>0&&!r.includes(e)}});y.addEventListener("submit",async e=>{e.preventDefault();const t=y.querySelector('input[name="query"]'),r=y.querySelector('input[name="window"]'),o=y.querySelector('input[name="limit"]');if(!t||!r||!o)return;const n=t.value.trim();if(!n){c(p,"Du må skrive inn en søkestreng.","error");return}c(p,"Henter concordance …","info"),N([],[]);try{const s=await Q(E,{urns:D(),query:n,window:parseInt(r.value,10)||10,limit:parseInt(o.value,10)||100});if(!s.length){c(p,"Ingen treff for søket.","info"),N([],[]);return}const i=J(p,s,["docid","urn","conc"],new Set(["conc"]));N(s,i)}catch(s){c(p,s.message,"error"),N([],[])}});f.addEventListener("submit",async e=>{e.preventDefault();const t=f.querySelector('input[name="word"]'),r=f.querySelector('input[name="before"]'),o=f.querySelector('input[name="after"]'),n=f.querySelector('input[name="samplesize"]');if(!t||!r||!o||!n)return;const s=t.value.trim();if(!s){c(m,"Skriv inn et basiskord.","error");return}c(m,"Henter kollokasjoner …","info"),v([],[]);try{const i=await X(E,{urns:D(),word:s,before:parseInt(r.value,10)||5,after:parseInt(o.value,10)||5,samplesize:parseInt(n.value,10)||2e5});if(!i.length){c(m,"Ingen kollokasjoner returnert.","info"),v([],[]);return}const a=J(m,i,["word","count","distance","bayesianDistance"]);v(i,a)}catch(i){c(m,i.message,"error"),v([],[])}});I.addEventListener("click",()=>{K(H,z,"concordance.csv")});P.addEventListener("click",()=>{K(G,V,"collocations.csv")});function se(){const e=document.createDocumentFragment();C.forEach(t=>{const r=document.createElement("option");r.value=t.urn,r.textContent=ie(t.title,t.year),e.appendChild(r)}),b.replaceChildren(e)}function ie(e,t){return t?`${e} (${t})`:e}function $(){for(const e of Array.from(b.options))e.selected=!0}function B(){const e=D().length;oe.value=e===0?"0 valgt":e===b.options.length?`Alle (${e})`:`${e} valgt`}function D(){return Array.from(b.selectedOptions).map(e=>e.value)}function c(e,t,r){e.innerHTML=`<p class="message ${r}">${t}</p>`}function J(e,t,r,o=new Set){const n=r?.length&&r?.some(u=>u in t[0])?r:Object.keys(t[0]),s=document.createElement("table"),i=document.createElement("thead"),a=document.createElement("tr");n.forEach(u=>{const d=document.createElement("th");d.textContent=u,a.appendChild(d)}),i.appendChild(a),s.appendChild(i);const k=document.createElement("tbody");return t.forEach(u=>{const d=document.createElement("tr");n.forEach(S=>{const g=document.createElement("td"),h=u[S];h==null?g.textContent="":o.has(S)&&typeof h=="string"?g.innerHTML=h:g.textContent=String(h),d.appendChild(g)}),k.appendChild(d)}),s.appendChild(k),e.innerHTML="",e.appendChild(s),n}function N(e,t){H=e,z=t,I.disabled=e.length===0}function v(e,t){G=e,V=t,P.disabled=e.length===0}function K(e,t,r){if(!e.length)return;const o=t.length?t:Object.keys(e[0]),n=[o.join(",")];e.forEach(k=>{const u=o.map(d=>le(k[d])).join(",");n.push(u)});const s=new Blob([n.join(`
`)],{type:"text/csv;charset=utf-8;"}),i=URL.createObjectURL(s),a=document.createElement("a");a.href=i,a.download=r,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i)}function le(e){const t=typeof e=="string"?e.replace(/<[^>]*>/g,""):e==null?"":String(e),r=/[",\n]/.test(t),o=t.replace(/"/g,'""');return r?`"${o}"`:o}
