/* ============================================================
   DES202 — Calendário de Eventos
   Salva no navegador (localStorage) + deletar + ordenação
   ============================================================ */

const formEvento = document.getElementById('form-evento');
const inputNomeEvento = document.getElementById('nome-evento');
const inputDataEvento = document.getElementById('data-evento');
const selectTipoEvento = document.getElementById('tipo-evento');
const listaEventos = document.getElementById('lista-eventos');

const CHAVE_EVENTOS = 'des202-eventos';

// Eventos que aparecem por padrão na primeira vez
const EVENTOS_INICIAIS = [
  { nome: 'Prova de HTML e CSS', data: '2026-10-10', tipo: 'prova' },
  { nome: 'Entrega do projeto final', data: '2026-10-18', tipo: 'trabalho' },
  { nome: 'Apresentação dos sites', data: '2026-10-25', tipo: 'evento' }
];

// ============ FUNÇÕES ============

// Formata a data de "2026-10-10" pra "10/10"
function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}`;
}

// Verifica se a data já passou
function jaPassou(dataISO) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const dataEvento = new Date(dataISO + 'T00:00:00');
  return dataEvento < hoje;
}

// Cria o item <li> de um evento
function criarItemEvento(evento, index) {
  const li = document.createElement('li');
  li.classList.add('evento-item');

  // Marca como passado se a data já passou
  if (jaPassou(evento.data)) {
    li.classList.add('passado');
  }

  // Data
  const spanData = document.createElement('span');
  spanData.classList.add('data');
  spanData.textContent = formatarData(evento.data);

  // Nome do evento
  const spanEvento = document.createElement('span');
  spanEvento.classList.add('evento');
  spanEvento.textContent = evento.nome;

  // Tag do tipo
  const spanTag = document.createElement('span');
  spanTag.classList.add('tag', `tag-${evento.tipo}`);
  spanTag.textContent = evento.tipo.charAt(0).toUpperCase() + evento.tipo.slice(1);

  // Botão deletar
  const btnDeletar = document.createElement('button');
  btnDeletar.classList.add('btn-deletar');
  btnDeletar.textContent = '🗑️';
  btnDeletar.title = 'Remover evento';
  btnDeletar.addEventListener('click', function () {
    deletarEvento(index);
  });

  li.appendChild(spanData);
  li.appendChild(spanEvento);
  li.appendChild(spanTag);
  li.appendChild(btnDeletar);

  return li;
}

// Renderiza todos os eventos na tela
function renderizarEventos() {
  const eventos = carregarEventos();

  // Ordena por data (mais próximos primeiro)
  eventos.sort((a, b) => new Date(a.data) - new Date(b.data));

  listaEventos.innerHTML = '';

  if (eventos.length === 0) {
    const vazio = document.createElement('li');
    vazio.classList.add('evento-vazio');
    vazio.textContent = 'Nenhum evento cadastrado ainda.';
    listaEventos.appendChild(vazio);
    return;
  }

  eventos.forEach(function (evento, index) {
    listaEventos.appendChild(criarItemEvento(evento, index));
  });
}

// Carrega os eventos do navegador
function carregarEventos() {
  const salvos = localStorage.getItem(CHAVE_EVENTOS);

  if (!salvos) {
    // Primeira vez: salva os eventos iniciais
    localStorage.setItem(CHAVE_EVENTOS, JSON.stringify(EVENTOS_INICIAIS));
    return [...EVENTOS_INICIAIS];
  }

  try {
    return JSON.parse(salvos);
  } catch (e) {
    console.warn('Erro ao carregar eventos:', e);
    return [];
  }
}

// Salva a lista no navegador
function salvarEventos(eventos) {
  localStorage.setItem(CHAVE_EVENTOS, JSON.stringify(eventos));
}

// Adiciona um novo evento
function adicionarEvento(nome, data, tipo) {
  const eventos = carregarEventos();
  eventos.push({ nome, data, tipo });
  salvarEventos(eventos);
  renderizarEventos();
}

// Deleta um evento pelo índice
function deletarEvento(index) {
  const eventos = carregarEventos();

  // Ordena igual na renderização pra o index bater
  eventos.sort((a, b) => new Date(a.data) - new Date(b.data));

  eventos.splice(index, 1);
  salvarEventos(eventos);
  renderizarEventos();
}

// ============ EVENTOS ============

if (formEvento) {
  formEvento.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = inputNomeEvento.value.trim();
    const data = inputDataEvento.value;
    const tipo = selectTipoEvento.value;

    if (nome === '' || data === '') return;

    adicionarEvento(nome, data, tipo);

    // Limpa o formulário
    formEvento.reset();
  });

  // Carrega ao abrir a página
  renderizarEventos();
}