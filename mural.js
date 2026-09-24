/* ============================================================
   DES202 — Mural de Recados
   Salva no navegador (localStorage) + limite de 5 recados
   ============================================================ */

// ============ ELEMENTOS ============
const formMural = document.getElementById('form-recado');
const inputNome = document.getElementById('nome-recado');
const inputTexto = document.getElementById('texto-recado');
const listaMural = document.getElementById('mural-lista');

const LIMITE_RECADOS = 5;
const CHAVE_STORAGE = 'des202-recados';

// ============ FUNÇÕES ============

// Cria o balão de recado
function criarRecado(nome, texto) {
  const recado = document.createElement('div');
  recado.classList.add('recado');

  const strong = document.createElement('strong');
  strong.textContent = nome;

  const p = document.createElement('p');
  p.textContent = texto;

  recado.appendChild(strong);
  recado.appendChild(p);

  return recado;
}

// Salva todos os recados no navegador
function salvarRecados() {
  const recados = [];
  document.querySelectorAll('.recado').forEach(function (recado) {
    const nome = recado.querySelector('strong')?.textContent || '';
    const texto = recado.querySelector('p')?.textContent || '';
    recados.push({ nome, texto });
  });
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(recados));
}

// Carrega os recados salvos quando a página abre
function carregarRecados() {
  const salvos = localStorage.getItem(CHAVE_STORAGE);
  if (!salvos) return;

  try {
    const recados = JSON.parse(salvos);
    listaMural.innerHTML = '';
    recados.forEach(function (r) {
      listaMural.appendChild(criarRecado(r.nome, r.texto));
    });
  } catch (e) {
    console.warn('Erro ao carregar recados:', e);
  }
}

// Aplica o limite de 5 recados (remove os mais antigos)
function aplicarLimite() {
  const todos = listaMural.querySelectorAll('.recado');
  if (todos.length > LIMITE_RECADOS) {
    for (let i = LIMITE_RECADOS; i < todos.length; i++) {
      todos[i].remove();
    }
  }
}

// ============ EVENTO DE ENVIO ============

if (formMural) {
  formMural.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = inputNome.value.trim();
    const texto = inputTexto.value.trim();

    if (nome === '' || texto === '') return;

    // Adiciona no topo
    listaMural.prepend(criarRecado(nome, texto));

    // Aplica o limite de 5
    aplicarLimite();

    // Salva no navegador
    salvarRecados();

    // Limpa o formulário
    formMural.reset();
  });

  // Ao abrir a página, carrega os recados salvos
  carregarRecados();
}