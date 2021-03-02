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

for(let i = 0; i < pokemonList.length; i++){
  if(pokemonList[i].height > 0.7){
    document.write('<p>'+ pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!" + '<p>');
  }else{
  document.write('<p>' + pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + '</p>' )
 }
}
