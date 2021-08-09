// selector variables
const play = document.querySelector("#btn-2");
const play2 = document.querySelector("#btn-4");
const pause = document.querySelector("#btn-1");
const resetbtn = document.querySelector(".reset");
const minutes = document.querySelector(".mins");
const seconds = document.querySelector(".sec");
const type = document.querySelector(".type");
const audio = document.querySelector("audio");

// Start of functions

//function to set Initial Time
function setInitialTime(session_minutes, session_seconds) {
  minutes.innerHTML = session_minutes;
  seconds.innerHTML = session_seconds;
}

//function to start the time for session
function start_work() {
  const workTime = document.querySelector("#focusTime").value;

  session_minutes = workTime - 1;
  session_seconds = 59;

  setInitialTime(session_minutes, session_seconds);

  minutes_interval = setInterval(minutesTimer, 60000);
  seconds_interval = setInterval(secondsTimer, 1000);

  function minutesTimer() {
    session_minutes = session_minutes - 1;
    minutes.innerHTML = session_minutes;
  }
  function secondsTimer() {
    session_seconds = session_seconds - 1;
    seconds.innerHTML = session_seconds;

    if (session_seconds <= 0) {
      if (session_minutes <= 0) {
        clearInterval(minutes_interval);
        clearInterval(seconds_interval);
        audio.play();
        type.innerHTML = "Break Time";
        type.classList.add("break");
        start_break(breakTime);
      }
      session_seconds = 60;
    }
  }
}

//function to start of break time
function start_break() {
  const breakTime = document.querySelector("#breakTime").value;
  session_minutes = breakTime - 1;
  session_seconds = 59;

  setInitialTime(session_minutes, session_seconds);

  minutes_interval = setInterval(minutesTimer, 60000);
  seconds_interval = setInterval(secondsTimer, 1000);

  function minutesTimer() {
    session_minutes = session_minutes - 1;
    minutes.innerHTML = session_minutes;
  }
  function secondsTimer() {
    session_seconds = session_seconds - 1;
    seconds.innerHTML = session_seconds;

    if (session_seconds <= 0) {
      if (session_minutes <= 0) {
        clearInterval(minutes_interval);
        clearInterval(seconds_interval);
        audio.play();
        type.innerHTML = "Focus Time";
        type.classList.remove("break");
        start_break(breakTime);
      }
      session_seconds = 60;
    }
  }
}

//function to reset the time
function reset() {
  clearInterval(minutes_interval);
  clearInterval(seconds_interval);

  let session_seconds = "00";
  let session_minutes = 00;
  setInitialTime(session_minutes, session_seconds);
}
//Event Listeners

play.addEventListener("click", () => {
  start_work();

  play.classList.add("d-none");
  pause.classList.remove("d-none");
});

pause.addEventListener("click", () => {
  clearInterval(minutes_interval);
  clearInterval(seconds_interval);

  pause.classList.add("d-none");
  play2.classList.remove("d-none");
});

play2.addEventListener("click", () => {
  minutes_interval = setInterval(() => {
    session_minutes = session_minutes - 1;
    minutes.innerHTML = session_minutes;
  }, 60000);

  seconds_interval = setInterval(() => {
    session_seconds = session_seconds - 1;
    seconds.innerHTML = session_seconds;
  }, 1000);

  pause.classList.remove("d-none");
  play2.classList.add("d-none");
  play.classList.add("d-none");
});

resetbtn.addEventListener("click", () => {
  reset();

  play.classList.remove("d-none");
  pause.classList.add("d-none");
  play2.classList.add("d-none");
});
