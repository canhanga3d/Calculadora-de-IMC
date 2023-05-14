
const form = document.querySelector("#formulario");
const display = document.querySelector(".display");
const paragraph = document.querySelector(".display p");
const weight = false;
const height = false;

const IMClevel = [
  { min: 0, max: 18.5, message: "Abaixo do peso" },
  { min: 18.5, max: 24.9, message: "Peso normal" },
  { min: 25, max: 29.9, message: "Sobrepeso" },
  { min: 30, max: 34.9, message: "Obesidade grau 1" },
  { min: 35, max: 39.9, message: "Obesidade grau 2" },
  { min: 40, max: Infinity, message: "Obesidade grau 3" },
];

function verifyValue(weight, height) {
  const verifiedWeight = Number(weight);
  const verifiedHeight = Number(height);
  

  if (isNaN(verifiedWeight) || verifiedWeight <= 0) {
    display.classList.add("error");
    display.innerHTML = `O "${weight}" não é valido deve ser um número válido e maior que zero`;
    setTimeout(() => {
      paragraph.innerHTML = "";
      display.classList.remove("error");
    }, 60000);
    return;
  }
  if (isNaN(verifiedHeight) || verifiedHeight <= 0) {
        display.classList.add("error");
        display.innerHTML = `A "${height}" não é valida deve ser um número válido e maior que zero`;
        setTimeout(() => {
          paragraph.innerHTML = "";
          display.classList.remove("error");
        }, 60000);
        return;
      }
      const imc = getIMC(verifiedWeight, verifiedHeight);
        const imcMessage = IMClevel.find((level) => level.min <= imc && imc <= level.max)
          .message;
        display.classList.toggle("error")
        paragraph.innerHTML = `Seu imc é ${imc}:<br/> ${imcMessage}`;
}

function getIMC(weight, height) {
  const imc = weight / (height * height);
  return Number(imc.toFixed(2));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const weight = e.target.querySelector("#weight").value.trim();
  const height = e.target.querySelector("#height").value.trim();
  verifyValue(weight, height);
  form.reset();
});