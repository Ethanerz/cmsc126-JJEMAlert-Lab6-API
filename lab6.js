async function loadCharacters() {
    const container = document.getElementById('char-list');
    container.innerHTML = `
            <div class="loading-container">
                <p class="loading-text">Loading Pokémon...</p>
                <img src="img/loading.gif" alt="Loading..." class="loading-pokemon">

            </div>
        `;

    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const pokemon_list = await Promise.all(
            data.results.map(pokemon => fetch(pokemon.url).then(r => r.json()))
        );

        container.innerHTML = '';
        let row;
        pokemon_list.forEach((pokeData, index) => {
            if (index % 6 === 0) {
                row = document.createElement('tr');
                container.appendChild(row);
            }

            const td = document.createElement('td');

            const card = document.createElement('div');
            card.classList.add('poke-card');

            // use first type for background color
            card.classList.add(pokeData.types[0].type.name);

            const name = document.createElement('p');
            name.textContent = pokeData.name;
            name.classList.add('poke-name');

            const img = document.createElement('img');
            img.src = pokeData.sprites.front_default;
            img.alt = pokeData.name;

            const types = document.createElement('p');
            types.textContent = "Type: " + pokeData.types.map(t => t.type.name).join(', ');
            types.classList.add('poke-type');

            const abilities = document.createElement('p');
            abilities.textContent = "Abilities: " + pokeData.abilities.map(a => a.ability.name).join(', ');
            abilities.classList.add('poke-abilities');

            card.appendChild(name);
            card.appendChild(img);
            card.appendChild(types);
            card.appendChild(abilities);

            td.appendChild(card);
            row.appendChild(td);
        });

    } catch (error) {
        container.innerHTML = '<tr><td>Failed to load characters.</td></tr>';
        console.error('API error:', error);
    }
}

loadCharacters();