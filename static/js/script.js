const pokemonKard = document.getElementById("pokemon-image")
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weightP = document.getElementById("weight");
const heightP = document.getElementById("height");
const typeP = document.getElementById("types");
const hitPointsP = document.getElementById("hp");
const dmgP = document.getElementById("attack");
const defP = document.getElementById("defense");
const critDmgP = document.getElementById("special-attack");
const critDefP = document.getElementById("special-defense");
const speedP = document.getElementById("speed");

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const allPokemons = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const filteredPokemon = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";


// Clean card between searches
const cleanCard = () => {
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  weightP.textContent = "";
  heightP.textContent = "";    
  pokemonKard.innerHTML = "";
  typeP.innerHTML = "";
  hitPointsP.textContent = "";
  dmgP.textContent = "";
  defP.textContent = "";
  critDmgP.textContent = "";
  critDefP.textContent = "";
  speedP.textContent = "";
};


// Show pokemon
const showPokemon = (pokemon) => {
    const {name, id, weight, height, types, sprites, stats} = pokemon;    
    const {front_default} = sprites; 
    const statValues = stats.map((item)=> item.base_stat);   
  
    pokemonName.textContent = `Name: ${name}`;
    pokemonId.textContent = `ID: #${id}`;
    weightP.textContent = `Weight: ${weight}`;
    heightP.textContent = `Height: ${height}`;
    pokemonKard.innerHTML = `<img id="sprite" src="${front_default}" alt="picture of the ${name}" />`;
    
    hitPointsP.textContent = `Hp: ${statValues[0]}`
    dmgP.textContent = `Attack: ${statValues[1]}`
    defP.textContent = `Defense: ${statValues[2]}`
    critDmgP.textContent = `Special-attack: ${statValues[3]}`
    critDefP.textContent = `Special-defense: ${statValues[4]}`
    speedP.textContent = `Speed: ${statValues[5]}`


    typeP.innerHTML = types.map(item => {
      const {type} = item;
      return `<p>${type.name.toUpperCase()}</p>`
    }).join("");      
  };
  
  
  // Fetch pokemon with API
  const findPokemon = async(query) => {
    try {
        const res = await fetch(query)
        const pokemon = await res.json()
        showPokemon(pokemon)
    }
    catch (err) {
      alert(`Pokémon not found`)
    }
  }; 
  
  
  // Button main function
  function findPokemonBtn() {
    cleanCard();
    const userInput = searchInput.value.trim().toLowerCase();
    const nameOrId = parseInt(userInput) ? parseInt(userInput) : userInput;
    if (Number.isInteger(nameOrId)) {
      const searchQuery = filteredPokemon+`${nameOrId}`
      findPokemon(searchQuery)
    }
    else {
      const searchQuery = filteredPokemon+userInput
      findPokemon(searchQuery)
    };  
  };
    
  searchBtn.addEventListener("click", findPokemonBtn);