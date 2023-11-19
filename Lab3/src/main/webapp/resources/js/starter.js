const updateCurrentTime = () => {
    const currentTimeElement = document.getElementById('currentDateTime');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    currentTimeElement.innerText = formattedTime;
}

setInterval(updateCurrentTime, 12000);

window.onload = updateCurrentTime;