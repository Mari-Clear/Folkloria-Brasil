/* =========================================================
   script.js — funções COMUNS a todas as páginas
   (tema, menu mobile, busca da navbar) + carrossel da home.
   Precisa do mitos.js carregado antes.
   ========================================================= */

// Páginas dentro de subpastas (ex.: mitos/mula.html) declaram <body data-raiz="../">
// para que os links gerados por JavaScript apontem para o lugar certo.
const RAIZ = document.body.dataset.raiz || '';

// ---------- TEMA CLARO / ESCURO ----------
const html = document.documentElement;
const btnTema = document.getElementById('theme-toggle');

function aplicarTema(tema) {
  html.dataset.theme = tema;
  btnTema.querySelector('i').className = tema === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  localStorage.setItem('folkloria-tema', tema);
}

btnTema.onclick = () => aplicarTema(html.dataset.theme === 'dark' ? 'light' : 'dark');
aplicarTema(html.dataset.theme);

// ---------- MENU MOBILE ----------
document.getElementById('menu-btn').onclick = () =>
  document.getElementById('menu-links').classList.toggle('is-open');

// ---------- BUSCA EM TEMPO REAL (usa a lista MITOS do mitos.js) ----------
const limpar = t => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const lista = document.getElementById('search-results');

document.getElementById('search-input').oninput = e => {
  const q = limpar(e.target.value.trim());
  const achados = q
    ? MITOS.filter(m => limpar(`${m.nome} ${m.titulo} ${m.regioes.join(' ')} ${m.tags}`).includes(q))
    : [];

  lista.innerHTML = achados.map(m => `<li><a href="${RAIZ}${m.url}">${m.nome}</a></li>`).join('');
  lista.hidden = !achados.length;
};

// ---------- ÍCONE DE LOGIN (muda se a pessoa já entrou) ----------
function atualizarIconeLogin() {
  const link = document.querySelector('.login-link');
  if (!link) return;

  let usuario = null;
  try { usuario = JSON.parse(localStorage.getItem('folkloria-usuario')); } catch (e) {}

  link.querySelector('i').className = usuario ? 'fa-solid fa-circle-user' : 'fa-regular fa-circle-user';
  link.setAttribute('aria-label', usuario ? `Minha conta (${usuario.nome})` : 'Entrar na conta');
}
atualizarIconeLogin();

// ---------- CARROSSEL (só existe na página inicial) ----------
const track = document.getElementById('carousel-track');

if (track) {
  const passo = () => track.firstElementChild.offsetWidth + 32;   // largura do card + espaço
  document.getElementById('carousel-next').onclick = () => track.scrollBy({ left: passo(), behavior: 'smooth' });
  document.getElementById('carousel-prev').onclick = () => track.scrollBy({ left: -passo(), behavior: 'smooth' });
}