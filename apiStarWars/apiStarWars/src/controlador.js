window.addEventListener('DOMContentLoaded', (event) => {
  const apiUrl = 'https://swapi.dev/api/people/';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const characters = data.results;

      // Obtener el contenedor donde se mostrarán las tarjetas de personajes
      const characterContainer = document.getElementById('character-container');

      characters.forEach(character => {
        // Crear una tarjeta para cada personaje
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');

        // Nombre del personaje
        const name = document.createElement('h3');
        name.textContent = character.name;
        characterCard.appendChild(name);

        // Características del personaje
        const characteristics = document.createElement('ul');
        characteristics.classList.add('characteristics');

        // Altura
        const height = document.createElement('li');
        height.textContent = `Altura: ${character.height}`;
        characteristics.appendChild(height);

        // Peso
        const weight = document.createElement('li');
        weight.textContent = `Peso: ${character.mass}`;
        characteristics.appendChild(weight);

        // Color de pelo
        const hairColor = document.createElement('li');
        hairColor.textContent = `Color de pelo: ${character.hair_color}`;
        characteristics.appendChild(hairColor);

        // Agregar las características a la tarjeta del personaje
        characterCard.appendChild(characteristics);

        // Agregar la tarjeta del personaje al contenedor
        characterContainer.appendChild(characterCard);
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
});
