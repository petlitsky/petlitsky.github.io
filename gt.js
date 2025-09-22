function getText() {
  // 1. Получаем элемент по его ID
  const inputElement = document.getElementById("myInput");

  // 2. Получаем значение (текст) из поля ввода
  const textValue = inputElement.value;

  if (textValue === "103122") document.getElementById("output").textContent = "Ограждения рельсов на 20 вагоне: hwtTtNpls5:3/V/3dxiRsgkR.ay1a/ndd/eyxb.";
  if (textValue === "bublegum") document.getElementById("output").textContent = "yHIxRbj2";
  if (textValue === "3301") document.getElementById("output").textContent = "https://disk.yandex.by/d/LsLkbNKniB0luw";
  if (textValue === "123321") document.getElementById("output").textContent = "https://disk.yandex.by/d/9J043UxqKFir-w";
  if (textValue === "hjskslfhfcsd") document.getElementById("output").textContent = "https:/vetlitszy.jithub.iu/zvuj.html";

  // Или просто выводим в консоль:
  console.log(textValue);
}
