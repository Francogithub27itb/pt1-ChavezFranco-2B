const spinBtn = document.getElementById("spin");
const nameOutput = document.getElementById("nameOutput");

let currentAngle = 0;

// Funció per fer girar la ruleta
spinBtn.addEventListener("click", () => {
  if (!names.length) {
    alert("Primer carrega els noms!");
    return;
  }

  const spinTime = Math.random() * 3 + 3; // 3-6 segons
  const spinAngle = Math.random() * 360; // Angle final
  const spinSpeed = spinAngle / spinTime;

  const interval = setInterval(() => {
    currentAngle += spinSpeed;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(currentAngle * Math.PI / 180);
    ctx.translate(-250, -250);
    drawWheel();
    ctx.restore();
  }, 20);

  setTimeout(() => {
    clearInterval(interval);

    // Selecciona el nom
    const selectedIndex = Math.floor(
      ((360 - (currentAngle % 360)) / (360 / names.length)) % names.length
    );
    const selectedName = names[selectedIndex];
    nameOutput.textContent = selectedName;
  }, spinTime * 1000);
});