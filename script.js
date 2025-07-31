const input = document.getElementById('passwordInput');
const heart = document.getElementById('heartIcon');
const result = document.getElementById('result');
const container = document.querySelector('.container');
const record = document.getElementById('record');
const music = document.getElementById('bgMusic');
const startButton = document.querySelector('.start-button');
const topBar = document.getElementById('topBar');
const typingText = document.getElementById('typingText');

const correctHash = 'cbfad02f9ed2a8d1e08d8f74f5303e9eb93637d47f82ab6f1c15871cf8dd0481';
let visible = false;
let accessGranted = false;

heart.addEventListener('click', () => {
  if (input.disabled) return;
  visible = !visible;
  input.type = visible ? 'text' : 'password';
  heart.textContent = visible ? '💘' : '❤️';
});

async function hashText(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

input.addEventListener('input', async () => {
  if (accessGranted) return;

  const entered = input.value;
  const hashed = await hashText(entered);

  if (hashed === correctHash) {
    accessGranted = true;

    result.textContent = 'Пароль верный ✅';
    result.className = 'result success';
    input.disabled = true;
    heart.style.pointerEvents = 'none';

    setTimeout(() => {
      container.innerHTML = `<div class="loading">Загружаю воспоминания<span id="dots">.</span></div>`;
      startDotAnimation();

      const hideDelay = Math.floor(Math.random() * 2000) + 5000;
      setTimeout(() => {
        container.classList.add('hidden');

        setTimeout(() => {
          record.classList.add('show');
          music.currentTime = 0;
          music.loop = true;
          music.volume = 0.5;
          music.play();
        }, 1000);
      }, hideDelay);
    }, 5000);
  } else {
    result.textContent = 'Неверный пароль ❌';
    result.className = 'result fail';
  }
});

function startDotAnimation() {
  const dots = document.getElementById('dots');
  const states = ['.', '..', '...'];
  let index = 0;

  setInterval(() => {
    if (dots) {
      dots.textContent = states[index];
      index = (index + 1) % states.length;
    }
  }, 500);
}

if (startButton) {
  startButton.addEventListener('click', () => {
    document.getElementById('record').classList.remove('show');
    document.body.classList.add('dimmed');
    topBar.classList.add('show');
    typingText.classList.remove('hidden');

    typeSequence([
      { text: '7 февраля 2022 года', className: 'line1' },
      { text: 'Начало нашего общения', className: 'line2' }
    ]).then(() => {
      setTimeout(async () => {
        const line1 = document.querySelector('.line1');
        const line2 = document.querySelector('.line2');

        await clearText(line1);
        await typeNewText(line1, '12 декабря 2023 года');

        await clearText(line2);
        await typeNewText(line2, 'Начало наших отношений');

        setTimeout(async () => {
          await clearText(line2);
          await clearText(line1);

          await typeNewText(line1, 'История начинается', 80);

          setTimeout(() => {
            typingText.classList.add('fade-out');
            document.body.classList.add('remove-dimmed');
            setTimeout(() => {
              document.body.classList.remove('dimmed', 'remove-dimmed');
              typingText.classList.add('hidden');

              setTimeout(() => {
                typingText.classList.remove('hidden', 'fade-out');
                typingText.classList.add('move-up'); // добавляем смещение вверх
                typeSequence([
                  { text: '23 марта 2023 года', className: 'line1' },
                  { text: 'У тебя дома', className: 'line2' }
                ]);
                setTimeout(() => {
                  typingText.classList.add('move-up');

                  const grid = document.getElementById('photoGrid');
                  grid.classList.remove('hidden');

                  // Плавное появление
                  setTimeout(() => {
                    grid.classList.add('show');
                  }, 100);
                }, 4000); // через 4 секунды после последней печати
                setTimeout(async () => {
                  const line1 = document.querySelector('.line1');
                  const line2 = document.querySelector('.line2');

                  await clearText(line1);
                  await typeNewText(line1, '25 и 28 мая 2023 года');

                  await clearText(line2);
                  await typeNewText(line2, 'Прощай школа');

                  // Меняем фотографии
                  const photos = document.querySelectorAll('.photo-grid img');
                  photos.forEach((img, index) => {
                    img.src = `./image/${index + 5}.jpg`;
                  });
                  setTimeout(async () => {
                    const line1 = document.querySelector('.line1');
                    const line2 = document.querySelector('.line2');

                    await clearText(line1);
                    await typeNewText(line1, '6 февраля 2024 года');

                    await clearText(line2);
                    await typeNewText(line2, 'Зимняя пора');

                    // Меняем фотографии
                    const photos = document.querySelectorAll('.photo-grid img');
                    photos.forEach((img, index) => {
                      img.src = `./image/${index + 9}.jpg`;
                    });
                    setTimeout(async () => {
                      // Исчезновение сетки
                      const grid = document.getElementById('photoGrid');
                      grid.classList.remove('show');
                      setTimeout(() => {
                        grid.classList.add('hidden');
                      }, 500);

                      // Возврат текста в центр
                      typingText.classList.remove('move-up');

                      const line1 = document.querySelector('.line1');
                      const line2 = document.querySelector('.line2');

                      // Ждём пока вернется анимация
                      setTimeout(async () => {
                        await clearText(line1);
                        await typeNewText(line1, '8 декабря 2024 года');

                        await clearText(line2);
                        await typeNewText(line2, 'Конец истории?');
                        setTimeout(async () => {
                          const line1 = document.querySelector('.line1');
                          const line2 = document.querySelector('.line2');

                          await clearText(line1);
                          await typeNewText(line1, 'Это был лишь эпизод.');

                          await clearText(line2);
                          await typeNewText(line2, 'История продолжается.');
                          setTimeout(async () => {
                            const line1 = document.querySelector('.line1');
                            const line2 = document.querySelector('.line2');

                            // Поднимаем текст вверх (если еще не поднят)
                            typingText.classList.add('move-up');

                            // Стираем и печатаем финальный текст
                            await clearText(line1);
                            await typeNewText(line1, 'Июль 2025 года');

                            await clearText(line2);
                            await typeNewText(line2, 'Вчера, сегодня и завтра');

                            // Показываем новую сетку фотографий
                            const grid = document.getElementById('photoGrid');
                            grid.classList.remove('hidden');

                            // Обновляем изображения на 13–16.jpg
                            const photos = document.querySelectorAll('.photo-grid img');
                            photos.forEach((img, index) => {
                              img.src = `./image/${index + 13}.jpg`;
                            });

                            // Плавное появление
                            setTimeout(() => {
                              grid.classList.add('show');
                            }, 100);
                            setTimeout(() => {
                              // Меняем фотографии на 17–20
                              const photos = document.querySelectorAll('.photo-grid img');
                              photos.forEach((img, index) => {
                                img.src = `./image/${index + 17}.jpg`;
                              });
                              setTimeout(() => {
                                // Меняем фотографии на 17–20
                                const photos = document.querySelectorAll('.photo-grid img');
                                photos.forEach((img, index) => {
                                  img.src = `./image/${index + 21}.jpg`;
                                });
                                setTimeout(() => {
                                  // Меняем фотографии на 17–20
                                  const photos = document.querySelectorAll('.photo-grid img');
                                  photos.forEach((img, index) => {
                                    img.src = `./image/${index + 25}.jpg`;
                                  });
                                  setTimeout(() => {
                                    // Меняем фотографии на 17–20
                                    const photos = document.querySelectorAll('.photo-grid img');
                                    photos.forEach((img, index) => {
                                      img.src = `./image/${index + 29}.jpg`;
                                    });
                                    setTimeout(() => {
                                      // Меняем фотографии на 17–20
                                      const photos = document.querySelectorAll('.photo-grid img');
                                      photos.forEach((img, index) => {
                                        img.src = `./image/${index + 33}.jpg`;
                                      });
                                      setTimeout(async () => {
                                        // Убираем сетку
                                        const grid = document.getElementById('photoGrid');
                                        grid.classList.remove('show');
                                        setTimeout(() => {
                                          grid.classList.add('hidden');
                                        }, 500);

                                        // Возвращаем текст на середину
                                        typingText.classList.remove('move-up');

                                        const line1 = document.querySelector('.line1');
                                        const line2 = document.querySelector('.line2');

                                        // Стираем по очереди и печатаем новые строки
                                        await clearText(line1);
                                        await clearText(line2);

                                        await typeNewText(line1, 'Я люблю тебя солнышко❤️');
                                        await typeNewText(line2, 'До встречи 30 августа');
                                      }, 7000);
                                    }, 7000);
                                  }, 7000);
                                }, 7000);
                              }, 7000);
                            }, 7000);
                          }, 7000);
                        }, 7000);
                      }, 1000);
                    }, 7000);
                  }, 7000);
                }, 7000);
              }, 3000);
            }, 2000);
          }, 5000);
        }, 5000);
      }, 5000);
    });
  });
}

function typeSequence(lines, speed = 80) {
  typingText.innerHTML = '';
  let lineIndex = 0;

  return new Promise(resolve => {
    function typeLine() {
      if (lineIndex >= lines.length) {
        resolve();
        return;
      }

      const { text, className } = lines[lineIndex];
      const lineElem = document.createElement('div');
      lineElem.className = className;

      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      cursor.textContent = '|';

      typingText.appendChild(lineElem);
      lineElem.appendChild(cursor);

      let i = 0;
      const interval = setInterval(() => {
        lineElem.textContent = text.slice(0, i + 1);
        lineElem.appendChild(cursor);
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          cursor.remove();
          lineIndex++;
          setTimeout(typeLine, 500);
        }
      }, speed);
    }

    typeLine();
  });
}

function clearText(elem) {
  return new Promise(resolve => {
    let text = elem.textContent;
    const interval = setInterval(() => {
      text = text.slice(0, -1);
      elem.textContent = text + '|';
      if (text.length === 0) {
        clearInterval(interval);
        elem.textContent = '';
        resolve();
      }
    }, 50);
  });
}

function typeNewText(elem, newText, speed = 80) {
  return new Promise(resolve => {
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '|';
    elem.appendChild(cursor);

    let i = 0;
    const interval = setInterval(() => {
      elem.textContent = newText.slice(0, i + 1);
      elem.appendChild(cursor);
      i++;
      if (i >= newText.length) {
        clearInterval(interval);
        cursor.remove();
        resolve();
      }
    }, speed);
  });
}
