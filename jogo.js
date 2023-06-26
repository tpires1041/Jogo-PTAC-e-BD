const nomeJogador = prompt ("Qual seu nome?")
document.write("Seja bem vindo "+nomeJogador)
localStorage.setItem("nome", nomeJogador)


const numDeKills = 40;
const tempoInicial = 10;
let pontos = 0;
let tempo = 0;
let timer = null;

const jogador = new Object({
  pontuacao: pontos,
  nome: nomeJogador
})



    
function iniciaJogo() {
    pontos = 0;
    tempo = tempoInicial;
    let tela = document.getElementById("tela");
    tela.innerHTML = "";

    for(let i = 0; i < numDeKills; i++){
        let barata = document.createElement("img");
        barata.src = "barata.png";
        barata.id = "b" + i;
        barata.onclick = function() {
            mataBarata(this);
        }
        barata.ondragstart = function() {
            return false;
        }
        tela.appendChild(barata);
    }

    timer = setInterval(contaTempo, 1000);

    fetch('http://localhost:5050/score', {
      method: "POST",
      body: JSON.stringify(jogador),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => console.log(json))
    .catch(err => console.log(err));
   
// Função para criar um elemento HTML e adicionar ao container
function criarElemento(nomeJogador, pontos) {
  const container = document.getElementById('container');
  const nome = document.createElement('h3');
  const pontuacao = document.createElement('h4');

  nome.textContent = nome;
 pontuacao.textContent = pontuacao;

  container.appendChild(nome);
  container.appendChild(pontuacao);
}
}



function mataBarata(barata) {
    if (tempo <= 0) return; // early return
        barata.onclick = null;
        barata.src = "explosao.png";
        ++pontos;

        let contadorPontos = document.getElementById("pontos");
        contadorPontos.innerText = pontos;

}

function contaTempo(){
    --tempo;
    let contadorTempo = document.getElementById("tempo");
    contadorTempo.innerText = tempo

    if(tempo <= 0){
      clearInterval(timer)
      if(pontos <= 10){
          alert("Parabéns "+nomeJogador+"! Você é MUITO RUIM! e fez somente "+pontos+" pontos")
      }
      else{
          if(pontos >= 10){
              alert("Parabéns "+nomeJogador+"! Você não é tão inutil e fez "+pontos+" pontos")
          }
          else{
              if(pontos = 48){
                  alert("Parabéns "+nomeJogador+"! Você matou todas as barata! Tu é bão mesmo! fez "+pontos+" pontos")
              }
          }
      }
        iniciaJogo();
    }
  }







fetch('http://localhost:5050/score')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }
    return response.json();
  })
  .then(data => {
    // Processar os dados e exibir a lista no HTML
    console.log(data);

    const jogadores = data;

    jogadores.forEach(jogador => {
      criarElemento(jogador.name, jogador.pontuacao);
    });
  })
  .catch(error => {
    console.error(error);
  });

    