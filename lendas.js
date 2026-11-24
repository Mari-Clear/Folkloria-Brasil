/* =========================================================
   LENDAS&MITOS — monta a grade a partir do mitos.js e
   aplica os filtros (nome, região e ordenação).
   Tudo dentro de uma função para não "bater" com as
   variáveis do script.js.
   ========================================================= */
(function () {
  const grade = document.getElementById('grade-lendas');
  const contagem = document.getElementById('contagem');
  const vazio = document.getElementById('vazio');

  const btnFiltro = document.getElementById('filtro-btn');
  const painel = document.getElementById('painel-filtros');
  const campoNome = document.getElementById('f-nome');
  const campoRegiao = document.getElementById('f-regiao');
  const campoOrdem = document.getElementById('f-ordem');
  const btnLimpar = document.getElementById('f-limpar');

  // Tira acentos e deixa minúsculo: "boitata" encontra "Boitatá"
  const norm = t => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  // Cria o HTML de um card. alt="" porque o nome já está escrito ao lado da imagem
  const cardHTML = m => `
    <li>
      <a class="lenda-card" href="${m.url}">
        <img src="${encodeURI(m.imagem)}" alt="" loading="lazy">
        <span>${m.titulo}</span>
      </a>
    </li>`;

  function atualizar() {
    const nome = norm(campoNome.value.trim());
    const regiao = campoRegiao.value;

    // 1) filtra
    const lista = MITOS.filter(m => {
      const okNome = !nome || norm(`${m.titulo} ${m.nome} ${m.tags}`).includes(nome);
      // mitos de "Todo o Brasil" aparecem em qualquer região escolhida
      const okRegiao = !regiao || m.regioes.includes(regiao) || m.regioes.includes('Todo o Brasil');
      return okNome && okRegiao;
    });

    // 2) ordena (o filter já devolve uma cópia, então pode ordenar direto)
    if (campoOrdem.value === 'az') {
      lista.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    } else if (campoOrdem.value === 'popular') {
      lista.sort((a, b) => b.popularidade - a.popularidade);
    }

    // 3) desenha
    grade.innerHTML = lista.map(cardHTML).join('');
    vazio.hidden = lista.length > 0;
    contagem.textContent = `${lista.length} ${lista.length === 1 ? 'lenda encontrada' : 'lendas encontradas'}`;
  }

  // Abrir / fechar o painel de filtros
  function abrirPainel(abrir) {
    painel.hidden = !abrir;
    btnFiltro.setAttribute('aria-expanded', abrir);
    btnFiltro.setAttribute('aria-label', abrir ? 'Fechar filtros' : 'Abrir filtros');
    if (abrir) campoNome.focus();
  }

  btnFiltro.onclick = () => abrirPainel(painel.hidden);
  painel.onkeydown = e => {
    if (e.key === 'Escape') { abrirPainel(false); btnFiltro.focus(); }
  };

  campoNome.oninput = atualizar;
  campoRegiao.onchange = atualizar;
  campoOrdem.onchange = atualizar;

  btnLimpar.onclick = () => {
    campoNome.value = '';
    campoRegiao.value = '';
    campoOrdem.value = 'padrao';
    atualizar();
  };

  atualizar();
})();