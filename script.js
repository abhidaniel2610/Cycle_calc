function formatDate(dateInput) {
  const date = new Date(dateInput);
  return Number.isNaN(date.getTime()) ? "" : date.toDateString();
}

function renderSavedInfo(lastDate, nextDate) {
  const savedInfoEl = document.getElementById("savedInfo");
  if (!lastDate || !nextDate) {
    savedInfoEl.innerText = "";
    return;
  }

  savedInfoEl.innerText = `Saved cycle: last period ${formatDate(lastDate)} • upcoming period ${formatDate(nextDate)}`;
}

function calculatePeriod() {
  const lastPeriodValue = document.getElementById("lastdate").value;
  const cycleLength = Number(document.getElementById("cycleLength").value);
  const resultEl = document.getElementById("result");

  if (!lastPeriodValue || !cycleLength || cycleLength < 1) {
    resultEl.innerText = "Please add a valid last period date and cycle length.";
    return;
  }

  const lastPeriod = new Date(lastPeriodValue);
  const daysInMs = cycleLength * 24 * 60 * 60 * 1000;
  const nextPeriod = new Date(lastPeriod.getTime() + daysInMs);
  const nextPeriodValue = nextPeriod.toISOString().split("T")[0];

  localStorage.setItem("lastdate", lastPeriodValue);
  localStorage.setItem("cycleLength", String(cycleLength));
  localStorage.setItem("nextdate", nextPeriodValue);

  resultEl.innerText = "Hey ❤️ Your next period may start around " + nextPeriod.toDateString();
  resultEl.style.animation = "none";
  resultEl.offsetHeight; // reset animation
  resultEl.style.animation = "popIn 0.5s ease";
  resultEl.style.opacity = 1;

  renderSavedInfo(lastPeriodValue, nextPeriodValue);
}

window.onload = function () {
  const savedDate = localStorage.getItem("lastdate");
  const savedCycle = localStorage.getItem("cycleLength");
  const savedNextDate = localStorage.getItem("nextdate");

  if (savedDate) {
    document.getElementById("lastdate").value = savedDate;
  }

  if (savedCycle) {
    document.getElementById("cycleLength").value = savedCycle;
  }

  if (savedNextDate) {
    document.getElementById("result").innerText =
      "Hey ❤️ Your next period may start around " + formatDate(savedNextDate);
  }

  renderSavedInfo(savedDate, savedNextDate);
};
