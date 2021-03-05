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

// used for loop to print pokemon name and height
//used template literals `${}` for adding height

// for(let i = 0; i < pokemonList.length; i++){
//   if(pokemonList[i].height > 0.7){
//     document.write('<p>'+ pokemonList[i].name + ` (height: ${pokemonList[i].height}) - Wow, that's big!` + '<p>');
//   }else{
//   document.write('<p>' + pokemonList[i].name + ` (height: ${pokemonList[i].height})` + '</p>' )
//  }
// }
pokemonList.forEach(function(item){
  if(item.height > 0.7){
    document.write(`<p> ${item.name} (height: ${item.height}) - wow that's big </p>`);
  }else{
    document.write(`<p> ${item.name} (height: ${item.height}) </p>`);
  }
});
