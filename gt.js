function getText() {
  // 1. Получаем элемент по его ID
  const inputElement = document.getElementById("myInput");

  // 2. Получаем значение (текст) из поля ввода
  const textValue = inputElement.value;

  // 3. Выводим полученный текст (например, в <p> тег)
  document.getElementById("output").textContent = " " + textValue;

  // Или просто выводим в консоль:
  console.log(textValue);
}
