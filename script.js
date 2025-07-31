const input = document.getElementById('passwordInput');
const heart = document.getElementById('heartIcon');
const result = document.getElementById('result');
const container = document.querySelector('.container');
const record = document.getElementById('record');
const music = document.getElementById('bgMusic');

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

      // Через 5–7 секунд скрываем контейнер и показываем пластинку
      const hideDelay = Math.floor(Math.random() * 1000) + 1000;
      setTimeout(() => {
        container.classList.add('hidden');

        // Показать пластинку через 1 сек после скрытия
        setTimeout(() => {
          record.classList.add('show');
          playLoopedSegment(music, 146, 168); // 2:26 – 2:48
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

function playLoopedSegment(audio, startTime, endTime) {
  const fadeDuration = 2;
  const maxVolume = 0.5;

  audio.currentTime = startTime;
  audio.volume = 0;
  audio.play();

  // Fade in
  const fadeIn = setInterval(() => {
    if (audio.volume < maxVolume) {
      audio.volume = Math.min(audio.volume + 0.05, maxVolume);
    } else {
      clearInterval(fadeIn);
    }
  }, 200);

  // Loop handler
  const loop = setInterval(() => {
    if (audio.currentTime >= endTime - fadeDuration) {
      // Start fade out
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(audio.volume - 0.05, 0);
        } else {
          clearInterval(fadeOut);
          audio.pause();
          audio.currentTime = startTime;
          audio.play();

          // Restart fade in
          audio.volume = 0;
          const fadeInAgain = setInterval(() => {
            if (audio.volume < maxVolume) {
              audio.volume = Math.min(audio.volume + 0.05, maxVolume);
            } else {
              clearInterval(fadeInAgain);
            }
          }, 200);
        }
      }, 200);
    }
  }, 500);
}
