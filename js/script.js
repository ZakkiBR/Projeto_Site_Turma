//INICIO DO CARROUSEL DE IMAGENS

    //cria variavel index e cria variavel de referencia para os botões de imagem.
let index = 0;
const img_btn=document.getElementById('###botao de imagem');
const img=document.getElementsByClassName('###imagem');


    //função para mudar a imagem que esta sendo mostrada, se passar do limite de imagens vai para o inicio ou fim
function showImage(index) {
    if (index >= img.length) {
        index = 0;
    }
    if (index < 0) {
        index = img.length - 1;
    }
    img[index].classList.add("###imagem ativa");
    }

    //função para calcular index com o botão de imagem clicado, num botão de imagem para frente, utilize o valor 1 na função, num botão de imagem para trásutilize o valor de -1 na função
function navImg(x) {
    img_btn.addEventListener("click", function() {
        img.classList.remove("###imagem ativa");
        index += (x);
        showImage(index);
        });
    }
//FIM DO CARROUSEL DE IMAGENS

