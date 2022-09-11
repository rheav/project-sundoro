"use strict";

// Configurei as durações
const standards = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
};

// Objeto para conter valores que preciso chamar globalmente
const timeStorage = { selectedTime: 25, lastMin: 26, lastSec: 1, clickCount: 0, lastCounter: 0, testeContagem: 0 };

// Background do ceú que recebe gradiente
const skyBackground = document.getElementById("sky-bg");

// Botões seletores
const modeBtn = document.querySelectorAll(".mode-selector");

// Botão de Start/Stop
const startBtn = document.getElementById("btn-start");
const stopBtn = document.getElementById("btn-stop");

// Evento no clique do Start/Stop
startBtn.addEventListener("click", startCountDown);
startBtn.addEventListener("click", bgChanger);
startBtn.addEventListener("click", function () {
  timeStorage.clickCount++;
  console.log(timeStorage.clickCount);
});

// Criação dos Timers
const timer = document.getElementById("main-timer");

// Loop para capturar clique em cada botão seletor
modeBtn.forEach((modeBtn) => {
  modeBtn.addEventListener("click", selectMode);
});

// Função para iniciar animação do background
function bgChanger() {
  skyBackground.classList.add("animation-go");
}

// Função para mudar modo ativo
function selectMode(e) {
  // Remover/adicionar classe active
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");

  // Mudança de modo (bg, tempo)
  document.body.style.backgroundColor = `var(--${e.target.dataset.mode})`;

  // Mudar duração de acordo com o modo
  let objectMode = e.target.dataset.mode;
  timer.innerHTML = standards[objectMode] < 10 ? `0${standards[objectMode]}:00` : `${standards[objectMode]}:00`;
  timeStorage.selectedTime = standards[objectMode];

  // Trazer botão de start ao invés do stop
  startBtn.style.display = "block";
  stopBtn.style.display = "none";
}

// Setar o inicial em 25
timer.innerHTML = "25:00";

// Começar função de countdown
function startCountDown() {
  // Manipulando exibição dos botões de ação start/stop
  stopBtn.style.display = "block";
  startBtn.style.display = "none";

  // Iniciando animação de bg
  skyBackground.classList.add("animation-go");

  // Quando eu descobrir como pausar/resume o clock certinho,
  // isso aqui embaixo vai retomar a animação no momento em que parou
  //skyBackground.style.animationPlayState = "running";

  let duration = 60 * timeStorage.selectedTime;

  let counter = duration,
    minutes,
    seconds;

  let timeFunction = setInterval(function () {
    minutes = parseInt(counter / 60, 10);
    seconds = parseInt(counter % 60, 10);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    timer.textContent = `${minutes}:${seconds}`;

    timeStorage.lastMin = minutes;
    timeStorage.lastSec = seconds;
    timeStorage.lastCounter = counter;

    if (--counter < 0) {
      clearInterval(timeFunction);
      counter = "00:00";
    }

    // Clicar nos botões de seleção de modo para a contagem
    modeBtn.forEach((modeBtn) => {
      modeBtn.addEventListener("click", function () {
        clearInterval(timeFunction);
      });
    });

    // Clicar no btn de stop para a contagem e traz o btn de start de novo
    stopBtn.addEventListener("click", function () {
      // Quando eu descobrir como pausar/resume o clock certinho,
      // isso aqui embaixo vai retomar a animação no momento em que parou
      //skyBackground.style.animationPlayState = "paused";

      // Pausando animação de bg
      skyBackground.classList.remove("animation-go");

      // Manipulando btns
      startBtn.style.display = "block";
      stopBtn.style.display = "none";

      // Parando o setInterval
      clearInterval(timeFunction);
    });

    // Só teste para acompanhar contagem
    timeStorage.testeContagem = timeStorage.testeContagem + 1;
    console.log(timeStorage);
  }, 1000);
}

// Verificação Jullia

const julliaBtn = document.getElementById("btn-jullia");
const julliaInput = document.getElementById("input-jullia");
const julliaYesMsg = document.getElementById("jullia-proceed");
const julliaNoMsg = document.getElementById("jullia-not-proceed");
const julliaH2 = document.getElementById("jullia-h2");
const julliaSeguir = document.getElementById("btn-jullia-proceed");
const julliaModal = document.getElementById("jullia-ver");

julliaBtn.addEventListener("click", julliaVerification);

function julliaVerification() {
  let validationJullia = julliaInput.value;

  julliaInput.style.display = "none";
  julliaBtn.classList.add("hidden");
  julliaH2.classList.add("hidden");

  if (validationJullia == "Jullia" || validationJullia == "jullia") {
    console.log("É ela");
    julliaYesMsg.classList.remove("hidden");
  } else {
    console.log("Não é ela");
    julliaNoMsg.classList.remove("hidden");
  }
}

julliaSeguir.addEventListener("click", function () {
  julliaModal.classList.add("hidden");
});
