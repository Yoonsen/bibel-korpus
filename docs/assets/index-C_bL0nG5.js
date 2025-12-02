(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const E=[{urn:"URN:NBN:no-nb_digibok_2009021704085",title:"NTR - Det nye testamente revidert . [ 1 ] : Lukasevangeliet , Første tessalonikerbrev , Andre tessalonikerbrev , Galaterbrevet , Filipperbrevet",year:2003,publisher:"Det norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2008052304066",title:"Det Nye testamente : oversatt for ungdom",year:1959,authors:"Osnes , Torbjørn",publisher:"Det Norske bibelselskaps forl."},{urn:"URN:NBN:no-nb_digibok_2011060308011",title:"Det nye testamentet",year:2005,publisher:"Det norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2012033008102",title:"Evangeliet etter Lukas",year:1973,publisher:"Det norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2012081508153",title:"Vær ikke redde : evangeliet etter Markus",year:1951,authors:"Skard , Vemund / Osnes , Torbjørn",publisher:"Det norske bibelselskaps forlag"},{urn:"URN:NBN:no-nb_digibok_2013030506026",title:"Bibelen : det Gamle og det Nye testamente : [ bokmål ]",year:1978,publisher:"Det Norske bibelselskaps forlag"},{urn:"URN:NBN:no-nb_digibok_2013020808015",title:"NTR - Det nye testamente revidert . [ 2 ] : Markusevangeliet , Romerbrevet , Første korinterbrev , Andre korinterbrev",year:2003,publisher:"Det norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2013061206082",title:"NTR - Det nye testamente revidert . [ 3 ] : Matteusevangeliet , Efeserbrevet , Kolosserbrevet",year:2004,publisher:"Det norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2015110407068",title:"Godt nytt : Det nye testamentet for menneske i dag ; illustrert av Annie Vallotton",year:1976,authors:"Vallotton , Annie",publisher:"Bibelselskapet"},{urn:"URN:NBN:no-nb_digibok_2016061748023",title:"Godt nytt : Det nye testamente for mennesker i dag : ny oversettelse av 1975",year:1975,authors:"Vallotton , Annie",publisher:"Det norske bibelselskaps forl."},{urn:"URN:NBN:no-nb_digibok_2018020748002",title:"Når Ordet blir norsk : norske bibeloversettelser 1945-2011",year:2011,authors:"Bøe , Sverre / Holmås , Geir Otto",publisher:"Tapir akademisk forl."},{urn:"URN:NBN:no-nb_digibok_2018030805008",title:"Utvalg av det Gamle testamente : oversettelse av 1966",year:1966,publisher:"Det Norske bibelselskaps forl."},{urn:"URN:NBN:no-nb_digibok_2017091807031",title:"Bibelen , eller Den Hellige skrift : det gamle og det Nye testamentes kanoniske bøker",year:1930,publisher:"Det Norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2019061928001",title:"Biblia : Det er den gantske Hellige Scrifft , vdsæt paa Danske",year:1550,publisher:"aff Ludowich Dietz"},{urn:"URN:NBN:no-nb_digibok_2021012648506",title:"Bibelen , eller Den hellige Skrift indeholdende det Gamle og Nye Testamentes kanoniske Bøger",year:1905,publisher:"Det norske Bibelselskabs Forl."},{urn:"URN:NBN:no-nb_digibok_2016031029001",title:"Biblia , Paa Danske : Det er , Den gandske hellige Skriftis Bøgger , Paa ny igiennemseete , med flid , efter den Ebræiske oc Grækiske Text , det næste mueligt var , Oc forbedrede med ny Summarier , fuldkommeligere Concordantzer , oc korte antegnelser udi Bredden , anlangendis de mørcke Ord oc maader ad tale med. 3 : Den Tredie Part Af det Gamle Testamentis Bøgger",year:1647,publisher:"[ved Melchior Martzan oc Melchior Winckler]"},{urn:"URN:NBN:no-nb_digibok_2016040729001",title:"Biblia , Paa Danske : Det er , Den gandske hellige Skriftis Bøgger , Paa ny igiennemseete , med flid , efter den Ebræiske oc Grækiske Text , det næste mueligt var , Oc forbedrede med ny Summarier , fuldkommeligere Concordantzer , oc korte antegnelser udi Bredden , anlangendis de mørcke Ord oc maader ad tale med. 1 : Den første Part Af det Gamle Testamentis Bøgger",year:1647,publisher:"[ved Melchior Martzan oc Melchior Winckler]"},{urn:"URN:NBN:no-nb_digibok_2016040729002",title:"Biblia , Paa Danske : Det er , Den gandske hellige Skriftis Bøgger , Paa ny igiennemseete , med flid , efter den Ebræiske oc Grækiske Text , det næste mueligt var , Oc forbedrede med ny Summarier , fuldkommeligere Concordantzer , oc korte antegnelser udi Bredden , anlangendis de mørcke Ord oc maader ad tale med. 2 : Den Anden Part Af det gamle Testamentis Bøgger",year:1647,publisher:"[ved Melchior Martzan oc Melchior Winckler]"},{urn:"URN:NBN:no-nb_digibok_2010110206027",title:"Evangilja : eller Fagnad-bodi etter Mattæus",year:1915,authors:"Seippel , Alexander",publisher:"Det norske bibel-sellskape"},{urn:"URN:NBN:no-nb_digibok_2011052608017",title:"Det nye testamentet",year:2005,publisher:"Det norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2011053008068",title:"NTR - Det nye testamente revidert . [ 5 ] : Apostlenes gjerninger , Første timoteusbrev , Andre timoteusbrev , Brevet til Titus , Brevet til Filemon , Hebreerbrevet , Jakobs brev , Første petersbrev , Andre petersbrev , Judas ' brev",year:2005,publisher:"Det norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2022030107531",title:"Bibelen : Den hellige skrift : Det gamle og Det nye testamente",year:1985,publisher:"Det norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2021041548624",title:"Bibelen , eller den Hellige Skrift : indeholdende Det gamle og nye Testaments kanoniske Bøger , tilligemed Det gamle Testamentes apokryfiske Bøger",year:1908},{urn:"URN:NBN:no-nb_digibok_2022011028001",title:"Biblia : Det er , Den gantske Hellige Scrifft , paa Danske",year:1589,authors:"Dietrich , Veit / Luther , Martin",publisher:"Aff Matz Vingaardt"},{urn:"URN:NBN:no-nb_digibok_2022011928001",title:"Biblia : Det er Den gantske Hellige Scrifft paa Danske",year:1633,authors:"Luther , Martin / Dietrich , Veit / Martzan , Melchior / Sartor , Salomon",publisher:"Prentet ved Melchior Martzan"},{urn:"URN:NBN:no-nb_digibok_2022030107535",title:"Bibelen : det Gamle og det Nye testamentet : [ nynorsk ]",year:1978,publisher:"Det Norske bibelselskap"},{urn:"URN:NBN:no-nb_digibok_2022012528002",title:"Biblia , Paa Danske : Det er Den gantske hellige scriftis Bøgger igen [ n ] em seete med flijd effter den Ebræiske oc Grækeske Text etc. det negste mueligt vaar Oc effter som de paa andre atskillige Tungemaal vaare best vdsatte",year:1607,authors:"Resen , Hans Poulsen",publisher:"[utgiver ikke identifisert]"},{urn:"URN:NBN:no-nb_digibok_2008040104074",title:"Det Nye Testamente",year:1904,publisher:"Det Norske Bibelselskabs Forl."},{urn:"URN:NBN:no-nb_digibok_2017051148061",title:"Bibelens eller Den hellige Skrifts kanoniske Bøger",year:1891,publisher:"Bibelselskabet"}];E.map(e=>e.urn);const Z="https://api.nb.no/dhlab",C=Z;async function ee(e,t){const n={urns:t.urns.length?t.urns:null,query:t.query,window:_(t.window,1,25),limit:_(t.limit,1,1e3)},o=await U(e,"/conc",n);return ne(o)}async function te(e,t){const n={urn:t.urns.length?t.urns:null,word:t.word,before:Math.max(0,t.before),after:Math.max(0,t.after),samplesize:Math.max(1,t.samplesize)},o=await U(e,"/urncolldist_urn",n);return re(o).sort((a,s)=>{const i=a.avgDistance??Number.POSITIVE_INFINITY,c=s.avgDistance??Number.POSITIVE_INFINITY;return i-c||s.count-a.count})}async function U(e,t,n){const o=`${e.replace(/\/$/,"")}${t}`,r=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!r.ok){const s=await r.text();throw new Error(`API-kall feilet (${r.status} ${r.statusText}): ${s}`)}const a=await r.json();return typeof a=="string"?JSON.parse(a):a}function ne(e){return Array.isArray(e)?e:le(e)?ae(e):[]}function re(e){if(!ie(e))return[];const t=new Set;return[e.counts,e.dist,e.bdist].filter(Boolean).forEach(n=>{Object.keys(n).forEach(o=>t.add(o))}),Array.from(t).map(n=>({word:n,count:Number(e.counts?.[n]??0),distance:w(e.dist?.[n]),avgDistance:oe(w(e.dist?.[n]),Number(e.counts?.[n]??0))}))}function oe(e,t){return e==null||!Number.isFinite(e)||!t?null:e/t}function ae(e){const t=new Set;return Object.values(e).forEach(o=>{Array.isArray(o)?o.forEach((r,a)=>t.add(String(a))):o&&typeof o=="object"&&Object.keys(o).forEach(r=>t.add(r))}),Array.from(t).sort((o,r)=>Number(o)-Number(r)).map(o=>{const r={};for(const[a,s]of Object.entries(e))r[a]=se(s,o);return r})}function se(e,t){if(Array.isArray(e)){const n=Number(t);return Number.isNaN(n)?null:e[n]}return e&&typeof e=="object"?e[t]:e}function le(e){return!!e&&typeof e=="object"}function ie(e){if(!e||typeof e!="object")return!1;const t=e,n=t.counts!==void 0&&t.counts!==null&&typeof t.counts=="object",o=t.dist!==void 0&&t.dist!==null&&typeof t.dist=="object",r=t.bdist!==void 0&&t.bdist!==null&&typeof t.bdist=="object";return n||o||r}function _(e,t,n){return Math.min(Math.max(e,t),n)}function w(e){const t=Number(e);return Number.isFinite(t)?t:null}const l=document.querySelector("#app");if(!l)throw new Error("Fant ikke rot-elementet med id #app");l.innerHTML=`
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

  <main class="workspace">
    <div class="tabs" role="tablist">
      <button class="tab-button" type="button" data-tab-target="corpus">Korpus</button>
      <button class="tab-button" type="button" data-tab-target="concordance">Concordance</button>
      <button class="tab-button" type="button" data-tab-target="collocations">Kollokasjoner</button>
    </div>

    <section class="panel tab-panel" data-tab="corpus" role="tabpanel">
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
      <select id="urn-select" multiple size="12"></select>
    </section>

    <section class="panel tab-panel" data-tab="concordance" role="tabpanel">
      <header>
        <div>
          <p class="eyebrow">Concordance</p>
          <h2>Søk etter uttrykk</h2>
        </div>
      </header>
      <form id="conc-form" class="stack" autocomplete="off">
        <label>
          <span>Søkestreng (SQLite FTS5)</span>
          <input name="query" type="text" placeholder="f.eks. «Gud NEAR/5 kjærlighet»" required />
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
      <div id="conc-results" class="results tall"></div>
    </section>

    <section class="panel tab-panel" data-tab="collocations" role="tabpanel">
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
`;const T=l.querySelector("#urn-select"),A=l.querySelector("#urn-count"),L=l.querySelector("#urn-search"),O=l.querySelector("#conc-results"),j=l.querySelector("#coll-results"),I=l.querySelector("#conc-form"),M=l.querySelector("#coll-form"),x=l.querySelector("#download-conc"),F=l.querySelector("#download-coll"),q=Array.from(l.querySelectorAll("[data-tab-target]")),P=Array.from(l.querySelectorAll("[data-tab]"));if(!T||!A||!O||!j||!I||!M||!L||!x||!F||q.length===0||P.length===0)throw new Error("UI-elementer mangler i DOM-en");const m=T,ce=A,k=O,g=j,y=I,h=M,R=L,z=x,V=F,H=q,ue=P;de();W();B();X("concordance");let G=[],$=[],J=[],K=[];l.querySelector('[data-action="select-all"]')?.addEventListener("click",()=>{W(),B()});l.querySelector('[data-action="clear-all"]')?.addEventListener("click",()=>{m.selectedIndex=-1,B()});m.addEventListener("change",B);R.addEventListener("input",()=>{const e=R.value.toLowerCase().trim();for(const t of Array.from(m.options)){const n=t.textContent?.toLowerCase()??"";t.hidden=e.length>0&&!n.includes(e)}});H.forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.tabTarget;t&&X(t)})});y.addEventListener("submit",async e=>{e.preventDefault();const t=y.querySelector('input[name="query"]'),n=y.querySelector('input[name="window"]'),o=y.querySelector('input[name="limit"]');if(!t||!n||!o)return;const r=t.value.trim();if(!r){u(k,"Du må skrive inn en søkestreng.","error");return}u(k,"Henter concordance …","info"),N([],[]);try{const a=await ee(C,{urns:D(),query:r,window:parseInt(n.value,10)||10,limit:parseInt(o.value,10)||100});if(!a.length){u(k,"Ingen treff for søket.","info"),N([],[]);return}const s=a.map(c=>({...c,kilde:c.urn?`<a href="https://www.nb.no/items/${encodeURIComponent(String(c.urn))}" target="_blank" rel="noopener noreferrer">Til NB</a>`:""})),i=Q(k,s,["docid","kilde","conc"],new Set(["kilde","conc"]));N(s,i)}catch(a){u(k,a.message,"error"),N([],[])}});h.addEventListener("submit",async e=>{e.preventDefault();const t=h.querySelector('input[name="word"]'),n=h.querySelector('input[name="before"]'),o=h.querySelector('input[name="after"]'),r=h.querySelector('input[name="samplesize"]');if(!t||!n||!o||!r)return;const a=t.value.trim();if(!a){u(g,"Skriv inn et basiskord.","error");return}u(g,"Henter kollokasjoner …","info"),v([],[]);try{const s=await te(C,{urns:D(),word:a,before:parseInt(n.value,10)||5,after:parseInt(o.value,10)||5,samplesize:parseInt(r.value,10)||2e5});if(!s.length){u(g,"Ingen kollokasjoner returnert.","info"),v([],[]);return}const i=Q(g,s,["word","count","avgDistance"]);v(s,i)}catch(s){u(g,s.message,"error"),v([],[])}});z.addEventListener("click",()=>{Y($,G,"concordance.csv")});V.addEventListener("click",()=>{Y(K,J,"collocations.csv")});function de(){const e=document.createDocumentFragment();E.forEach(t=>{const n=document.createElement("option");n.value=t.urn,n.textContent=be(t.title,t.year),e.appendChild(n)}),m.replaceChildren(e)}function be(e,t){return t?`${e} (${t})`:e}function W(){for(const e of Array.from(m.options))e.selected=!0}function B(){const e=D().length;ce.value=e===0?"0 valgt":e===m.options.length?`Alle (${e})`:`${e} valgt`}function D(){return Array.from(m.selectedOptions).map(e=>e.value)}function u(e,t,n){e.innerHTML=`<p class="message ${n}">${t}</p>`}function Q(e,t,n,o=new Set){const r=n?.length&&n?.some(d=>d in t[0])?n:Object.keys(t[0]),a=document.createElement("table"),s=document.createElement("thead"),i=document.createElement("tr");r.forEach(d=>{const b=document.createElement("th");b.textContent=d,i.appendChild(b)}),s.appendChild(i),a.appendChild(s);const c=document.createElement("tbody");return t.forEach(d=>{const b=document.createElement("tr");r.forEach(S=>{const f=document.createElement("td"),p=d[S];p==null?f.textContent="":o.has(S)&&typeof p=="string"?f.innerHTML=p:typeof p=="number"?f.textContent=Number.isFinite(p)?p.toLocaleString("nb-NO",{maximumFractionDigits:3}):"":f.textContent=String(p),b.appendChild(f)}),c.appendChild(b)}),a.appendChild(c),e.innerHTML="",e.appendChild(a),r}function N(e,t){$=e,G=t,z.disabled=e.length===0}function v(e,t){K=e,J=t,V.disabled=e.length===0}function Y(e,t,n){if(!e.length)return;const o=t.length?t:Object.keys(e[0]),r=[o.join(",")];e.forEach(c=>{const d=o.map(b=>pe(c[b])).join(",");r.push(d)});const a=new Blob([r.join(`
`)],{type:"text/csv;charset=utf-8;"}),s=URL.createObjectURL(a),i=document.createElement("a");i.href=s,i.download=n,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(s)}function pe(e){const t=typeof e=="string"?e.replace(/<[^>]*>/g,""):e==null?"":String(e),n=/[",\n]/.test(t),o=t.replace(/"/g,'""');return n?`"${o}"`:o}function X(e){H.forEach(t=>{t.classList.toggle("is-active",t.dataset.tabTarget===e)}),ue.forEach(t=>{t.classList.toggle("is-active",t.dataset.tab===e)})}
