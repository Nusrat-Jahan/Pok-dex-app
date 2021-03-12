let pokemonRepository = (function (){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';
    // function add (newItem){
    //   pokemonList.push (newItem);
    // };

    //added new item in pokemonList and checked is it object or not. checked (name, height, types) are the key and newItem is not empty
    function add (newItem){
      if (typeof newItem === 'object') {
        pokemonList.push (newItem);
       }else{
         document.write('pokemon is not correct');
      }
    };

    // Added a button for every pokemon
    function addListItem(pokemon) {
      let addUlPokemon = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('button-class');
      listItem.appendChild(button);
      addUlPokemon.appendChild(listItem);
      button.addEventListener('click', function(event) {
        showDetails(pokemon);
      });
    }

  // tried to use filter() function
  // let filterName =  pokemonList.filter(function(pokemonName) {
  //   return pokemonName.name == "Pidgey";
  // });

  function loadList() {
    return fetch(apiUrl).then(function (response){
      return response.json();
    }).then(function (json){
      json.results.forEach(function (item){
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e){
      console.error(e);
    })
  }

  //Loads the list of 50 pokemon from pokeapi.
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details){
       item.imageUrl = details.sprites.front_default;
       item.height = details.height;
       item.types = details.types;
    }).catch(function (e) {
      console.log(e);
    });
    }

    // takes a pokemon item as a parameter, if clicked on the pokemon button, on the console it will log the clicked pokemon information
    function showDetails(item) {
      loadDetails(item).then(function () {
        console.log(item);
      });
    }

    function getAll() {
      return pokemonList;
    };

    // all the function wrote on IIFE, should be on the return in this format
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    }
})();

// document.write(pokemonRepository.filterName);
pokemonRepository.getAll();
pokemonRepository.add({name: "Nidoran",
height: 0.4,
types: ['poison', 'fighting']});

//used template literals `${}` for adding height
// (function(){
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
// })();
