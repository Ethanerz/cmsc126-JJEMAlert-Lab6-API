async function loadCharacters() {
    const container = document.getElementById('char-list');
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const pokemon_list = await Promise.all(
            data.results.map(pokemon => fetch(pokemon.url).then(r => r.json()))
        );

        let row;
        pokemon_list.forEach((pokeData, index) => {
            if (index % 6 === 0) {
                row = document.createElement('tr');
                container.appendChild(row);
            }

            const td = document.createElement('td');

            const name = document.createElement('p');
            name.textContent = pokeData.name;

            const img = document.createElement('img');
            img.src = pokeData.sprites.front_default;
            img.alt = pokeData.name;

            td.appendChild(name);
            td.appendChild(img);
            row.appendChild(td);
        });
    } catch (error) {
        container.innerHTML = 'Failed to load characters.';
        console.error('API error:', error);
    }
}

loadCharacters();