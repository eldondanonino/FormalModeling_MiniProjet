function counter() {
  let seconds = 0;
  setInterval(() => {
    seconds += 2;
    document.getElementById(
      "app"
    ).innerHTML = `<p>You have been here for ${seconds} seconds.</p>`;
  }, 1000);
}
counter();
