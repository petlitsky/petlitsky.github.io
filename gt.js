function getText() {
  // 1. Получаем элемент по его ID
  const inputElement = document.getElementById("myInput");

  // 2. Получаем значение (текст) из поля ввода
  const textValue = inputElement.value;

  if (textValue === "103122") document.getElementById("output").textContent = "Ограждения рельсов на 20 вагоне: hwtTtNpls5:3/V/3dxiRsgkR.ay1a/ndd/eyxb.";

  // Или просто выводим в консоль:
  console.log(textValue);
}
