document.addEventListener("DOMContentLoaded", () => {
    const taskValue = localStorage.getItem("taskValue") || "No task available";
    const displayTask = document.getElementById("task");

    if (displayTask) {
        displayTask.textContent = taskValue; // Display task in <p>
    }

    startCountdown(10); // Start countdown after the page loads
});

function startCountdown(durationMins) {
    let duration = durationMins * 60; // Convert minutes to seconds
    const displayTime = document.getElementById("time-remaining");

    function updateCountdown() {
        let minutes = Math.floor(duration / 60);
        let seconds = duration % 60;

        displayTime.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (duration > 0) {
            duration--;
        } else {
            clearInterval(interval);
            window.electronAPI.loadPage("stopBreak.html"); // Change for browser testing
        }
    }

    updateCountdown(); // Show the first value immediately
    const interval = setInterval(updateCountdown, 1000);
}
