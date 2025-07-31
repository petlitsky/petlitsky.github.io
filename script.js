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

      const hideDelay = Math.floor(Math.random() * 1000) + 1000;
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
    }, 1000);
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
    // Убрать всё остальное
    document.getElementById('record').classList.remove('show');
    document.body.classList.add('dimmed');

    // Показать шапку
    topBar.classList.add('show');

    // Напечатать "2023 год"
    typingText.classList.remove('hidden');
    typeText('2023 год');
  });
}

function typeText(text) {
  typingText.textContent = '';
  let index = 0;
  const interval = setInterval(() => {
    typingText.textContent += text[index];
    index++;
    if (index >= text.length) clearInterval(interval);
  }, 200);
}