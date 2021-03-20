let pokemonRepository = (function (){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';
  // let modalContainer = document.querySelector('#modal-container');
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
      listItem.classList.add('list-group-item');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('btn');
      button.classList.add('btn-primary');
      // button.classList.add('btn-block');
      button.classList.add('button-class');
      button.setAttribute("data-target", "#exampleModal");
      button.setAttribute("data-toggle", "modal");
      listItem.appendChild(button);
      addUlPokemon.appendChild(listItem);
      button.addEventListener('click', function(event) {
        showDetails(pokemon);
      });
    }
    // show the modal content
    function showModal(item){
      let modalBody = $(".modal-body");
      let modalTitle = $(".modal-title");
      let modalHeader = $(".modal-header");

      // Clear all existing modal content
      modalTitle.empty();
      modalBody.empty();

      // Create element for pokemon name in modal content
      let nameElement = $("<h1>" + item.name + "<h1>");
      // Create element for pokemon image in modal content
      let imageElement = $('<img class="modal-img" style="width:50%">');
      imageElement.attr("src", item.imageUrl);
      // Create element for pokemon height in modal content
      let heightElement = $("<p>" + "Height : " + item.height + "</p>");
      // Create element for pokemon weight in modal content
      let weightElement = $("<p>" + "Weight : " + item.weight + "</p>");
      // Create element for type in modal content
      let typesElement = $("<p>" + "Types : " + item.types + "</p>");

      modalTitle.append(nameElement);
      modalBody.append(imageElement);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typesElement);
    }

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
        showModal(item);
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
      showDetails: showDetails,
      showModal: showModal
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
