/*
  LOBITO ASISTENTE · Blood Moon Lycan
  -----------------------------------
  Este archivo es todo el lobito. En tu index.html solo hace falta esta línea
  (una vez, antes de </body>):

      <script src="lobito.js" defer></script>

  Tiene que estar en la misma carpeta que index.html y lobito.png.
  Para cambiar preguntas o textos, editá solamente la parte de CONFIGURACIÓN.
*/
(function () {
  "use strict";

  /* ================= CONFIGURACIÓN ================= */

  var WHATSAPP_LINK = "https://chat.whatsapp.com/BRgllPk3IGrAPvUoTqxvwy?s=cl&p=a&iam=2";

  // Campos del formulario: [id del input, etiqueta que se copia]
  var CAMPOS = [
    ["lbF0", "Nombre / Nick"],
    ["lbF1", "Servidor"],
    ["lbF2", "ID del juego"],
    ["lbF3", "Rol que dominás"],
    ["lbF4", "Cuál es tu main"]
  ];

  // Preguntas del lobito: agregá más objetos a esta lista y las va rotando en cada toque
  // Si una pregunta lleva formulario: true, al responder Sí se muestra el formulario
  var PREGUNTAS = [
    {
      q: "¿Querés formar parte de nuestra manada?",
      si: "¡Bienvenido, cazador! Completá este pequeño formulario, copialo y pegalo en el grupo de WhatsApp una vez que te acepten.",
      no: "¡Sin drama, cazador! Las puertas de la manada quedan abiertas.",
      formulario: true
    },
    {
      q: "¿Querés saber el nombre del alfa de la manada?",
      si: "¡Atento, cazador! El alfa de la manada se llama Lobo16.",
      no: "¡Sin drama, cazador! Cuando quieras te cuento."
    },
    {
      q: "Cazador, ¿ya conocés la ley del alfa?",
      si: "¡Perfecto, cazador! Entonces ya sabés que la manada va siempre unida. ¡Aullemos fuerte, que la cacería es nuestra!",
      no: "¡Tranqui, cazador! Te llevo ahora mismo a la ley del alfa.",
      noDespues: "Llegamos, cazador. Léela, por favor.",
      irALeyEnNo: true
    },
    {
      q: "Cazador, ¿querés saber el ID del escuadrón Blood Moon Lycan?",
      si: "¡Anotá, cazador! El ID del escuadrón Blood Moon Lycan es 15710718.",
      idCopiable: "15710718",
      no: "¡Sin drama, cazador! Cuando lo necesites, acá estoy."
    }
  ];

  /* ======= Desde acá para abajo no hace falta tocar nada ======= */

  // La imagen se busca al lado de este archivo
  var actualScript = document.currentScript;
  var BASE = actualScript && actualScript.src ? actualScript.src.replace(/[^\/]*$/, "") : "";
  var IMG = BASE + "lobito.png";

  var CSS = `
#lobito{--noche:#171226;--sangre:#c8283a;--luna:#f2e8d0;
  position:fixed;right:16px;bottom:16px;z-index:9999;display:flex;flex-direction:column;align-items:flex-end;gap:8px;font-family:inherit}
#lobito .lb-panel{background:var(--noche);color:var(--luna);border:2px solid var(--sangre);border-radius:16px 16px 4px 16px;
  max-height:calc(100vh - 150px);overflow-y:auto;padding:12px 14px;width:min(260px,calc(100vw - 32px));font-size:15px;line-height:1.4;box-shadow:0 0 18px rgba(200,40,58,.35);animation:lb-pop .22s ease-out}
#lobito .lb-panel[hidden],#lobito .lb-yn[hidden]{display:none}
#lobito .lb-yn{display:flex;gap:8px;margin-top:8px}
#lobito .lb-yn .lb-btn{margin-top:0;text-align:center}
#lobito .lb-form{margin-top:6px}
#lobito .lb-form[hidden]{display:none}
#lobito .lb-form label{display:block;margin-top:8px;font-size:13px}
#lobito .lb-form input{display:block;box-sizing:border-box;width:100%;margin-top:3px;padding:8px 10px;border:1.5px solid var(--luna);
  border-radius:8px;background:rgba(242,232,208,.08);color:var(--luna);font:inherit;font-size:16px}
#lobito .lb-form input:focus-visible{outline:2px solid var(--sangre);outline-offset:1px}
#lobito .lb-form .lb-btn{margin-top:12px;text-align:center}
#lobito [hidden]{display:none !important}
#lobito .lb-wolfwrap{position:relative}
#lobito .lb-min{position:absolute;top:-8px;right:-8px;width:30px;height:30px;padding:0;display:flex;align-items:center;justify-content:center;
  border:2px solid var(--luna);border-radius:50%;background:var(--noche);color:var(--luna);font:inherit;font-size:18px;line-height:1;cursor:pointer}
#lobito .lb-min:hover{background:var(--sangre);border-color:var(--sangre)}
#lobito .lb-min:focus-visible,#lobito .lb-mini:focus-visible{outline:3px solid var(--luna);outline-offset:3px}
#lobito .lb-mini{width:56px;height:56px;padding:0;overflow:hidden;border:3px solid var(--sangre);border-radius:50%;background:var(--noche);cursor:pointer;
  box-shadow:0 0 14px rgba(200,40,58,.45)}
#lobito .lb-mini img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 10%}
#lobito .lb-form .lb-link{display:block;margin-top:8px;text-align:center}
#lobito .lb-manual{display:block;box-sizing:border-box;width:100%;margin-top:8px;padding:8px 10px;border:1.5px solid var(--luna);border-radius:8px;
  background:rgba(242,232,208,.08);color:var(--luna);font:inherit;font-size:14px}
#lobito .lb-manual[hidden]{display:none}
#lobito .lb-text{margin:0}
#lobito .lb-actions{margin-top:6px}
#lobito .lb-btn{display:block;box-sizing:border-box;width:100%;margin-top:8px;padding:9px 12px;background:transparent;color:var(--luna);
  border:1.5px solid var(--luna);border-radius:10px;font:inherit;font-size:14px;text-align:left;text-decoration:none;cursor:pointer}
#lobito .lb-btn:hover{background:rgba(242,232,208,.12)}
#lobito .lb-btn.lb-main{background:var(--sangre);border-color:var(--sangre);color:#fff}
#lobito .lb-btn.lb-main:hover{filter:brightness(1.12)}
#lobito .lb-btn:focus-visible,#lobito .lb-wolf:focus-visible{outline:3px solid var(--luna);outline-offset:3px}
#lobito .lb-wolf{background:none;border:0;padding:0;cursor:pointer;border-radius:12px;line-height:0;
  filter:drop-shadow(0 4px 8px rgba(0,0,0,.45));animation:lb-bob 3s ease-in-out infinite;transition:transform .15s}
#lobito .lb-wolf img{display:block;height:100px;width:auto}
#lobito .lb-wolf:hover{transform:scale(1.07)}
@keyframes lb-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes lb-pop{from{opacity:0;transform:translateY(6px) scale(.96)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){#lobito .lb-wolf,#lobito .lb-panel{animation:none}}
`;

  var HTML = `
<div id="lobito">
  <div class="lb-panel" id="lbPanel" role="status" aria-live="polite" hidden>
    <p class="lb-text" id="lbText"></p>
    <button type="button" class="lb-btn lb-main" id="lbCopiarId" hidden>Copiar ID</button>
    <div class="lb-yn" id="lbYN" hidden>
      <button type="button" class="lb-btn lb-main" id="lbSi">Sí</button>
      <button type="button" class="lb-btn" id="lbNo">No</button>
    </div>
    <div class="lb-form" id="lbForm" hidden>
      <label>Nombre / Nick<input id="lbF0" type="text" autocomplete="off"></label>
      <label>Servidor<input id="lbF1" type="text" autocomplete="off"></label>
      <label>ID del juego (o ID de tu cuenta)<input id="lbF2" type="text" inputmode="numeric" autocomplete="off"></label>
      <label>Rol que dominás<input id="lbF3" type="text" autocomplete="off"></label>
      <label>Cuál es tu main<input id="lbF4" type="text" autocomplete="off"></label>
      <button type="button" class="lb-btn lb-main" id="lbCopiar">Copiar</button>
      <textarea class="lb-manual" id="lbManual" rows="5" readonly hidden aria-label="Texto del formulario para copiar a mano"></textarea>
      <a class="lb-btn lb-link" id="lbWA" target="_blank" rel="noopener noreferrer">Ir al grupo de WhatsApp</a>
    </div>
  </div>

  <div class="lb-wolfwrap" id="lbWrap">
    <button type="button" class="lb-wolf" id="lbWolf" aria-label="Hablar con el Lobito Asistente" aria-expanded="false">
      <img src="${IMG}" alt="" width="89" height="130">
    </button>
    <button type="button" class="lb-min" id="lbMin" aria-label="Minimizar al lobito" title="Minimizar">&times;</button>
  </div>
  <button type="button" class="lb-mini" id="lbMini" aria-label="Abrir al Lobito Asistente" title="Abrir al lobito" hidden><img id="lbMiniImg" alt=""></button>
</div>
`;

  function iniciar() {
    if (document.getElementById("lobito")) return;
    var estilo = document.createElement("style");
    estilo.textContent = CSS;
    document.head.appendChild(estilo);
    var cont = document.createElement("div");
    cont.innerHTML = HTML.trim();
    document.body.appendChild(cont.firstChild);

    var wolf = document.getElementById("lbWolf");
    var wrap = document.getElementById("lbWrap");
    var btnMin = document.getElementById("lbMin");
    var mini = document.getElementById("lbMini");
    var miniImg = document.getElementById("lbMiniImg");
    var panel = document.getElementById("lbPanel");
    var text = document.getElementById("lbText");
    var yn = document.getElementById("lbYN");
    var form = document.getElementById("lbForm");
    var btnCopiar = document.getElementById("lbCopiar");
    var btnId = document.getElementById("lbCopiarId");
    var manual = document.getElementById("lbManual");
    var timer;

    miniImg.src = wolf.querySelector("img").src;
    document.getElementById("lbWA").href = WHATSAPP_LINK;


    var iPregunta = 0;
    var actual = null;

    function guardarMin(v) {
      try { if (v) { localStorage.setItem("lobitoMin", "1"); } else { localStorage.removeItem("lobitoMin"); } } catch (e) {}
    }
    function estaMin() {
      try { return localStorage.getItem("lobitoMin") === "1"; } catch (e) { return false; }
    }

    function show(msg, conOpciones, conFormulario, conCopiarId) {
      clearTimeout(timer);
      text.textContent = msg;
      yn.hidden = !conOpciones;
      form.hidden = !conFormulario;
      btnId.hidden = !conCopiarId;
      panel.hidden = false;
      wolf.setAttribute("aria-expanded", String(!!(conOpciones || conFormulario)));
    }
    function hide() {
      clearTimeout(timer);
      panel.hidden = true;
      yn.hidden = true;
      form.hidden = true;
      btnId.hidden = true;
      wolf.setAttribute("aria-expanded", "false");
    }
    function minimizar() {
      hide();
      wrap.hidden = true;
      mini.hidden = false;
      guardarMin(true);
      mini.focus();
    }
    function restaurar() {
      wrap.hidden = false;
      mini.hidden = true;
      guardarMin(false);
      wolf.focus();
      show("¡Acá estoy de nuevo, cazador!", false, false, false);
      timer = setTimeout(hide, 4000);
    }

    function buscarLey() {
      var porId = document.getElementById("ley-del-alfa");
      if (porId) return porId;
      var hs = document.querySelectorAll("h1, h2, h3, h4");
      for (var i = 0; i < hs.length; i++) {
        if (hs[i].closest("#lobito")) continue;
        if (/ley\s+del\s+alfa/i.test(hs[i].textContent)) return hs[i].closest("section") || hs[i];
      }
      return null;
    }
    function irALey() {
      var destino = buscarLey();
      if (!destino) return false;
      var suave = !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      destino.scrollIntoView({ behavior: suave ? "smooth" : "auto", block: "start" });
      return true;
    }
    function preguntar() {
      actual = PREGUNTAS[iPregunta % PREGUNTAS.length];
      iPregunta++;
      show(actual.q, true, false, false);
    }

    function textoFormulario() {
      return CAMPOS.map(function (c) {
        return c[1] + ": " + document.getElementById(c[0]).value.trim();
      }).join("\n");
    }
    function copiarFallback(valor) {
      return new Promise(function (ok, fail) {
        var t = document.createElement("textarea");
        t.value = valor;
        t.setAttribute("readonly", "");
        t.style.position = "fixed";
        t.style.top = "0";
        t.style.left = "0";
        t.style.opacity = "0";
        document.body.appendChild(t);
        t.focus();
        t.select();
        t.setSelectionRange(0, valor.length);
        var bien = false;
        try { bien = document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(t);
        bien ? ok() : fail();
      });
    }
    function copiar(valor) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(valor).catch(function () {
          return copiarFallback(valor);
        });
      }
      return copiarFallback(valor);
    }
    function avisoBoton(btn, msg, original) {
      btn.textContent = msg;
      setTimeout(function () { btn.textContent = original; }, 2200);
    }

    wolf.addEventListener("click", function () {
      if (!panel.hidden && !yn.hidden) { hide(); return; }
      preguntar();
    });
    btnMin.addEventListener("click", minimizar);
    mini.addEventListener("click", restaurar);

    document.getElementById("lbSi").addEventListener("click", function () {
      show(actual.si, false, !!actual.formulario, !!actual.idCopiable);
    });
    document.getElementById("lbNo").addEventListener("click", function () {
      if (actual.irALeyEnNo) {
        if (irALey()) {
          show(actual.no, false, false, false);
          timer = setTimeout(function () { show(actual.noDespues, false, false, false); }, 1100);
        } else {
          show("No encuentro la ley del alfa en esta página, cazador.", false, false, false);
        }
        return;
      }
      show(actual.no, false, false, false);
    });

    btnCopiar.addEventListener("click", function () {
      var textoCompleto = textoFormulario();
      copiar(textoCompleto).then(function () {
        manual.hidden = true;
        avisoBoton(btnCopiar, "¡Copiado!", "Copiar");
      }).catch(function () {
        // Último recurso: mostrar el texto ya seleccionado para copiarlo a mano
        manual.value = textoCompleto;
        manual.hidden = false;
        manual.focus();
        manual.select();
        avisoBoton(btnCopiar, "Copialo a mano", "Copiar");
      });
    });
    btnId.addEventListener("click", function () {
      copiar(actual.idCopiable).then(function () {
        avisoBoton(btnId, "¡ID copiado!", "Copiar ID");
      }).catch(function () {
        avisoBoton(btnId, "Copialo a mano", "Copiar ID");
      });
    });

    if (estaMin()) {
      wrap.hidden = true;
      mini.hidden = false;
    } else {
      setTimeout(function () {
        if (panel.hidden && !wrap.hidden) {
          show("¡Hola, cazador! ¿Listo para la cacería?", false, false, false);
          timer = setTimeout(hide, 6000);
        }
      }, 1200);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
