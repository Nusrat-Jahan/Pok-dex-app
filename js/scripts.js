let pokemonRepository = (function (){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';
  let modalContainer = document.querySelector('#modal-container');
    // function add (newItem){
    //   pokemonList.push (newItem);
    // };

    function cap(first_word){
      return first_word[0].toUpperCase() + first_word.substring(1);
    }

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
          name: cap(item.name),
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
       item.weight = details.weight;
       item.types = details.types;

       //ARRAY to loop throgh the item of types
       item.types = [] // let pokemonTypes =[];
       details.types.forEach(function(pokemon) {
           item.types.push(cap(pokemon.type.name));
           //pokemonTypes.push(pokemon.type.name);
       });
       // join function to add a space between the items
       let types = item.types.join(', '); //let types = pokemonTypes.join(', ')
       item.types = types;
    }).catch(function (e) {
      console.log(e);
    });
    }

    // takes a pokemon item as a parameter, if clicked on the pokemon button, on the console it will log the clicked pokemon information
    function showDetails(item) {
      loadDetails(item).then(function () {
        console.log(item);
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal);

        let pokemon_name = document.createElement('h1');
        pokemon_name.classList.add('h1');
        pokemon_name.innerHTML = cap(item.name);

        let pokemon_height = document.createElement('h2');
        pokemon_height.classList.add('h2');
        pokemon_height.innerHTML = `Height: ${item.height}`;

        let pokemon_weight = document.createElement('h3');
        pokemon_weight.classList.add('h3');
        pokemon_weight.innerHTML = `Weight: ${item.weight}`;

        let pokemon_types = document.createElement('h3');
        pokemon_types.classList.add('h3');
        pokemon_types.innerHTML = 'Type: ' + (item.types);

        let pokemon_img = document.createElement('img');
        pokemon_img.classList.add('pokemon_img_call')
        pokemon_img.src = item.imageUrl;
        pokemon_img.alt = `image of ${item.name}`;

        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemon_name);
        modal.appendChild(pokemon_height);
        modal.appendChild(pokemon_weight);
        modal.appendChild(pokemon_types);
        modal.appendChild(pokemon_img);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');

        function hideModal(){
          modalContainer.classList.remove('is-visible');
        }

        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
          }
        });

        modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly outside the modal
          let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
        });



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
// pokemonRepository.add({name: "Nidoran",
// height: 0.4,
// types: ['poison', 'fighting']});

//used template literals `${}` for adding height
// (function(){
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
// })();
