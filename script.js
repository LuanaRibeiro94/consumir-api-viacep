/*
// Faz a requisição para api 
var consultaCEP = fetch('https://viacep.com.br/ws/01001000/json/')
    // recebe a response em bytes e converte em json 
    .then(resposta => resposta.json())
    // verificar se o cep é inexistente
    .then(r => {
      if (r.erro) {
        throw Error('Esse cep não existe');
      } else 
      console.log(r)
    }) // then é para quando funcionar corretamente
    .catch(erro => console.log(erro)) // catch é para quando tiver erro
    .finally(mensagem => console.log('Processamento concluído'));
console.log(consultaCEP);
*/

// Outro jeito de fazer um código assíncrono

async function buscaEndereco(cep) {
  var mensagemErro = document.getElementById('erro');
  mensagemErro.innerHTML = "";

  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaCEPConvertida = await consultaCEP.json();
    if (consultaCEPConvertida.erro) {
      throw Error('CEP não existente');
    }

    // pegar os valores dos elementos html e salvar nas variáveis
    var logradouro = document.getElementById('endereco');
    var bairro = document.getElementById('bairro');
    var cidade = document.getElementById('cidade');
    var estado = document.getElementById('estado');

    // Insere nos campos os dados obtidos  
    logradouro.value = consultaCEPConvertida.logradouro;
    bairro.value = consultaCEPConvertida.bairro;
    cidade.value = consultaCEPConvertida.localidade;
    estado.value = consultaCEPConvertida.uf;

    console.log(consultaCEPConvertida);
    return consultaCEPConvertida;
  } catch (erro) {
    mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!`;
    console.log(erro);
  } 
}

// pegar elemento html pelo id e salvar na variável
var cep = document.getElementById('cep');
// adiciona o elemento em um ouvinte de eventos, chamado 'focus out' (quando clica fora do campo) e quando sai do campo, chama a função busca endereço passando o valor do cep
cep.addEventListener("focusout", () => buscaEndereco(cep.value));

/* Exemplo usando promise.all
let ceps = ['01001000', '01001001'];
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
console.log(conjuntoCeps);
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));
*/
