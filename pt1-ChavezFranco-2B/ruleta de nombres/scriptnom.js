const loadNamesBtn = document.getElementById("loadNames");
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let names = [];

// Funció per carregar noms des d'un fitxer
loadNamesBtn.addEventListener("click", async () => {
  try {
    const response = await fetch("./noms.txt");
    const text = await response.text();
    names = text.split("\n").map(name => name.trim()).filter(name => name);
    drawWheel();
    alert("Noms carregats!");
  } catch (error) {
    alert("Error carregant els noms.");
  }
});

// Funció per dibuixar la ruleta
function drawWheel() {
  const numSegments = names.length;
  const anglePerSegment = (2 * Math.PI) / numSegments;

  names.forEach((name, index) => {
    const startAngle = anglePerSegment * index;
    const endAngle = startAngle + anglePerSegment;

    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, startAngle, endAngle);
    ctx.fillStyle = index % 2 === 0 ? "#FFD700" : "#FF4500";
    ctx.fill();
    ctx.stroke();

    // Escriure el nom
    const textAngle = startAngle + anglePerSegment / 2;
    const textX = 250 + Math.cos(textAngle) * 150;
    const textY = 250 + Math.sin(textAngle) * 150;

    ctx.save();
    ctx.translate(textX, textY);
    ctx.rotate(textAngle);
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(name, -ctx.measureText(name).width / 2, 0);
    ctx.restore();
  });
  drawArrow();
}

function drawArrow() {
  const radius = 250; // Radio de la ruleta
  const arrowLength = 20; // Longitud de la flecha

  ctx.beginPath();
  // Punta de la flecha en el borde derecho de la ruleta
  ctx.moveTo(250 + radius + arrowLength, 250);
  // Lado superior de la flecha
  ctx.lineTo(250 + radius, 250 - 10);
  // Lado inferior de la flecha
  ctx.lineTo(250 + radius, 250 + 10);
  ctx.closePath();

  ctx.fillStyle = "black";
  ctx.fill();
}