// ============ CARROSSEL DA GALERIA ============
let indiceAtual = 0;
const slides = document.querySelectorAll('.carrossel-item');
const btnAnterior = document.getElementById('btn-anterior');
const btnProximo = document.getElementById('btn-proximo');
const indicador = document.getElementById('carrossel-indicador');

// Função para atualizar qual slide está visível
function mostrarSlide(index) {
  // Trata limites para criar o loop infinito
  if (index >= slides.length) {
    indiceAtual = 0;
  } else if (index < 0) {
    indiceAtual = slides.length - 1;
  } else {
    indiceAtual = index;
  }

  // Oculta todos e ativa apenas o slide atual
  slides.forEach((slide) => slide.classList.remove('ativo'));
  slides[indiceAtual].classList.add('ativo');

  // Atualiza o texto do indicador
  if (indicador) {
    indicador.textContent = `Foto ${indiceAtual + 1} de ${slides.length}`;
  }
}

// Eventos dos botões de avançar e voltar
btnProximo?.addEventListener('click', () => mostrarSlide(indiceAtual + 1));
btnAnterior?.addEventListener('click', () => mostrarSlide(indiceAtual - 1));


// ============ AMPLIAÇÃO (MODAL / LIGHTBOX) ============
const moldura = document.getElementById('carrossel-moldura');
const modal = document.getElementById('modal-galeria');
const modalConteudo = document.getElementById('modal-conteudo');
const modalFechar = document.getElementById('modal-fechar');

// Ao clicar na imagem/moldura, abre o modal com o conteúdo da imagem ativa
moldura?.addEventListener('click', () => {
  const itemAtivo = slides[indiceAtual].innerHTML;
  modalConteudo.innerHTML = itemAtivo;
  modal.classList.add('aberto');
});

// Fechar ao clicar no "X"
modalFechar?.addEventListener('click', () => {
  modal.classList.remove('aberto');
});

// Fechar se clicar na área escura fora da foto
modal?.addEventListener('click', (evento) => {
  if (evento.target === modal) {
    modal.classList.remove('aberto');
  }
});

// Fechar com a tecla 'ESC' ou navegar com as setas do teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('aberto')) {
    modal.classList.remove('aberto');
  } else if (e.key === 'ArrowRight' && !modal.classList.contains('aberto')) {
    mostrarSlide(indiceAtual + 1);
  } else if (e.key === 'ArrowLeft' && !modal.classList.contains('aberto')) {
    mostrarSlide(indiceAtual - 1);
  }
});

