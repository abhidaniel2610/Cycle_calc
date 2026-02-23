function calculatePeriod() {

  // 1. Get values from inputs
  let lastPeriodValue = document.getElementById("lastdate").value;
  let cycleLength = document.getElementById("cycleLength").value;

  localStorage.setItem("lastdate", lastPeriodValue);
localStorage.setItem("cycleLength", cycleLength);

  // 2. Convert date string to Date object
  let lastPeriod = new Date(lastPeriodValue);

  // 3. Convert days to milliseconds
  let daysInMs = cycleLength * 24 * 60 * 60 * 1000;

  // 4. Calculate next period
  let nextPeriod = new Date(lastPeriod.getTime() + daysInMs);

  // 5. Show result
  let resultEl = document.getElementById("result");

resultEl.innerText =
  "Hey ❤️ Your next period may start around " +
  nextPeriod.toDateString();

resultEl.style.animation = "none";
resultEl.offsetHeight; // reset animation
resultEl.style.animation = "popIn 0.5s ease";
resultEl.style.opacity = 1;

    

}
window.onload = function () {

  let savedDate = localStorage.getItem("lastdate");
  let savedCycle = localStorage.getItem("cycleLength");

  if (savedDate && savedCycle) {
    document.getElementById("lastdate").value = savedDate;
    document.getElementById("cycleLength").value = savedCycle;
  }
};