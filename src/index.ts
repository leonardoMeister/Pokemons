import axios from "axios";
import Swal from "sweetalert2";

const form = document.getElementById("form") as HTMLFormElement;
const nomePokemon = document.getElementById("txtNomePokemon") as HTMLInputElement;

const telaPokemon = document.getElementById("cardPokemons") as HTMLDivElement;

async function carregarDadosPokemonNaTela(pokemon: string) {
  try { 
    const resposta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, { responseType: "json" });

    const dadosPokemon = resposta.data;

    const identificador = document.createElement("p");
    const nomePokemon = document.createElement("p");
    const fotoPokemon = document.createElement("img");
    const tipoPokemon = document.createElement("p");

    identificador.innerText = `Number: ${dadosPokemon.id}`;
    nomePokemon.innerText = `Name: ${dadosPokemon.name}`;
    fotoPokemon.src = dadosPokemon.sprites.front_default;
    tipoPokemon.innerText = `Tipe: ${dadosPokemon.types[0].type.name}`;


    while (telaPokemon.firstChild) telaPokemon.firstChild.remove();

    telaPokemon.appendChild(identificador);
    telaPokemon.appendChild(nomePokemon);
    telaPokemon.appendChild(fotoPokemon)
    telaPokemon.appendChild(tipoPokemon);

  } catch { Swal.fire({ title: "Erro.", text: "Algo Saiu Mal! :(", icon: "error" }); }

}

function carregarNaTela(eventoTela: SubmitEvent) {
  eventoTela.preventDefault();
  if (nomePokemon.value == "") {
    Swal.fire({ text: "Favor inserir algum valor!", icon: "warning" });
    return;
  }
  carregarDadosPokemonNaTela(nomePokemon.value.toLowerCase());
}

form.addEventListener("submit", function (evt: SubmitEvent) { carregarNaTela(evt); });




