// ELEMENTO DO CONTADOR
const timerEl = document.getElementById('contador');
const pomodoro = document.getElementById('pomodoro');
const shortBreak = document.getElementById('break');
let intervalId = 0;
let timer = 150000;

// ELEMENTO DA BARRA DE PROGRESSO
let bar = document.getElementById('bar');
let dots = document.querySelector('.dots');
let timer_sub = 150000;

// Audio
const alerta_sonoro = document.querySelector("audio")

// ALERTA
const divMessage = document.querySelector('.alert');
let msg = "Acabou o tempo!";

function ativar(msg) {
    const message = document.createElement("div");
    message.classList.add("message");
    message.innerText = msg;
    divMessage.appendChild(message);
  
    setTimeout(() => {
      message.style.display = "none";
    }, 5000);
  }

// FORMATAÇÃO DO TEMPO
const formatTime = (time) => {
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const bolinhaTempo = (time) => {
    dots.style.transform = `rotateZ(${0 + (360 * time) / timer_sub}deg)`;
}

// CONTADOR
let timerFunction = () => {
    const button = document.getElementById('power');

    timer -= 1; 

    if (timer > 0) {
        setTimer(timer);  
        bolinhaTempo(timer);
        bar.style.strokeDashoffset = 942 - (942 * timer) / timer_sub;
    } else{
        alerta_sonoro.play();
        ativar(msg);
        clearInterval(intervalId);
        button.setAttribute('action', 'continue');
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }  
}



// INICIAR CONTADOR
const toggleTimer = () => {
    const button = document.getElementById('power');
    const action = button.getAttribute('action');
    
    clearInterval(intervalId);
    if (timer == 0) {
        return;
    } else { 
        if (action == 'start' || action == 'continue') {
        intervalId = setInterval(timerFunction, 10);

        button.setAttribute('action', 'pause');
        button.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else if (action == 'pause') {
            button.setAttribute('action', 'continue');
            button.innerHTML = '<i class="fa-solid fa-play"></i>';
        } 
    }
    
}

// RESETAR O TEMPO
const resetTimer = () => {
    clearInterval(intervalId);

    const valid = document.getElementById('contador').getAttribute('action');
    
    if(valid == 'doing'){
        bar.style.strokeDashoffset = 0;
        dots.style.transform = `rotateZ(${0}deg)`;
        m = 25;
        timer_sub = 150000;
        timer = 150000;
        setTimer(timer);  
        alerta(msg);
    } else {
        bar.style.strokeDashoffset = 0;
        dots.style.transform = `rotateZ(${0}deg)`;
        m = 5;
        timer_sub = 30000;
        timer = 30000;
        setTimer(timer);  
    }
    
    const button = document.getElementById('power');
    button.setAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
}

const setTimer = (time) => {
    timerEl.innerText = formatTime(time);

}

document.getElementById('power').addEventListener('click', toggleTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('pomodoro').addEventListener('click', function(){
    document.querySelector("body").setAttribute("class", "vermelho");
    
    clearInterval(intervalId);
    bar.style.strokeDashoffset = 0;
    dots.style.transform = `rotateZ(${0}deg)`;
    timer_sub = 150000
    timer = 150000;
    m = 25;
    setTimer(timer);
    
    
    const button = document.getElementById('power');
    button.setAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
    timerEl.setAttribute('action', 'doing');
    pomodoro.setAttribute('class', 'selecionado');
    shortBreak.setAttribute('class', '');
})

document.getElementById('break').addEventListener("click", function(){
    document.querySelector("body").setAttribute("class", "azul");
    
    clearInterval(intervalId);
    bar.style.strokeDashoffset = 0;
    dots.style.transform = `rotateZ(${0}deg)`;
    timer_sub = 30000
    timer = 30000;
    m = 5;
    setTimer(timer);

    const button = document.getElementById('power');
    button.setAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
    timerEl.setAttribute('action', 'break');
    pomodoro.setAttribute('class', '');
    shortBreak.setAttribute('class', 'selecionado');  
})