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

// ---------- BUSCA EM TEMPO REAL ----------
const MITOS = ['Iara', 'Curupira', 'Boitatá', 'Saci', 'Mula sem Cabeça'];
const limpar = t => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const lista = document.getElementById('search-results');

document.getElementById('search-input').oninput = e => {
  const q = limpar(e.target.value.trim());
  const achados = q ? MITOS.filter(m => limpar(m).includes(q)) : [];

  lista.innerHTML = achados
    .map(m => `<li><a href="${limpar(m).replaceAll(' ', '-')}.html">${m}</a></li>`)
    .join('');
  lista.hidden = !achados.length;
};

// ---------- CARROSSEL ----------
const track = document.getElementById('carousel-track');
const passo = () => track.firstElementChild.offsetWidth + 32;   // largura do card + espaço

document.getElementById('carousel-next').onclick = () => track.scrollBy({ left: passo(), behavior: 'smooth' });
document.getElementById('carousel-prev').onclick = () => track.scrollBy({ left: -passo(), behavior: 'smooth' });