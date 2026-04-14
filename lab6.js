async function loadCharacters() {
    const container = document.getElementById('char-list');
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        container.innerHTML = '';
        data.results.forEach(async (pokemon) => {
            // Fetch individual pokemon data to get sprites
            const pokeResponse = await fetch(pokemon.url);
            const pokeData = await pokeResponse.json();

            const listItem = document.createElement('li');
            listItem.textContent = pokemon.name;

            const img = document.createElement('img');
            img.src = pokeData.sprites.front_default;
            img.alt = pokemon.name;
            img.style.display = 'block';

            listItem.appendChild(img);
            container.appendChild(listItem );
        });
    } catch (error) {
        container.innerHTML = 'Failed to load characters.';
        console.error('API error:', error);
    }
}

loadCharacters();