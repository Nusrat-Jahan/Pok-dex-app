let pokemonRepository = (function (){
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: 0.7,
      types: ['grass', 'poison']
    },
    {
      name: "Pidgey",
      height: 0.3,
      types: ['flying', 'dragon']
    },
    {
      name: "Charmander",
      height: 0.6,
      types: ['fire', 'steel']
    },
    {
      name: "Raichu",
      height: 0.8,
      types: ['electric', 'normal']
    }
  ];

    // function add (newItem){
    //   pokemonList.push (newItem);
    // };

    //added new item in pokemonList and checked is it object or not. checked (name, height, types) are the key and newItem is not empty
    function add (newItem){
      if (typeof newItem === 'object' && newItem !== null && "name" in newItem && "height" in newItem && "types" in newItem){
        pokemonList.push (newItem);
       }else{
         document.write('pokemon is not correct');
      }
    };

    // if clicked on the pokemon button, on the console it will log the clicked pokemon name
    function showDetails(pokemon){
      console.log(pokemon);
    }

    // Added a button for every pokemon
    function addListItem(pokemon){
      let addUlPokemon = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('button-class');
      listItem.appendChild(button);
      addUlPokemon.appendChild(listItem);
      button.addEventListener('click', function(event){
        showDetails(pokemon)
      })
    }

  // tried to use filter() function
  // let filterName =  pokemonList.filter(function(pokemonName) {
  //   return pokemonName.name == "Pidgey";
  // });

    function getAll(){
      return pokemonList;
    };

    // all the function wrote on IIFE, should be on the return in this format
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
    }
})();
// document.write(pokemonRepository.filterName);
pokemonRepository.getAll();
pokemonRepository.add({name: "Nidoran",
height: 0.4,
types: ['poison', 'fighting']});

//used template literals `${}` for adding height
// (function(){
  pokemonRepository.getAll().forEach(function(item){
    pokemonRepository.addListItem(item);
  });
// })();
