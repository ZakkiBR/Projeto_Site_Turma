const html = document.documentElement;
const btn = document.getElementById('btn-tema');

function aplicarTema(tema) {
  html.setAttribute('data-theme', tema);
  localStorage.setItem('tema', tema);

  const escuro = tema === 'escuro';
  btn.textContent = escuro ? '☀️' : '🌙';
  btn.setAttribute('aria-pressed', escuro);
}

function temaInicial() {
  const salvo = localStorage.getItem('tema');
  if (salvo) return salvo;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
}

aplicarTema(temaInicial());

btn.addEventListener('click', () => {
  const atual = html.getAttribute('data-theme');
  aplicarTema(atual === 'escuro' ? 'claro' : 'escuro');
});