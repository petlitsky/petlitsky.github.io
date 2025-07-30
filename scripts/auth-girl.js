var pass = prompt('Введи наш пароль:', '');

async function getSHA256Hash(str) {
  const buf = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

var hash = getSHA256Hash(pass).then(
	(result) => {
		if (result === '686f746a95b6f836d7d70567c302c3f9ebb5ee0def3d1220ee9d4e9f34f5e131') alert('true')
		else window.location.href = 'index.html';
	});
