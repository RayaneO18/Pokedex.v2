import React, { useState, useEffect } from "react";
import styles from '@/styles/PokemonList.module.css';

const PokemonApp = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(33);
  const [pokemonMap, setPokemonMap] = useState(new Map());

  useEffect(() => {
    fetchInitialPokemon();
  }, []);

  const fetchInitialPokemon = async () => {
    for (let i = 1; i <= limit; i++) {
      await listPokemon(i);
    }
  };

  // fetch les 9 générations de Pokemon
  const fetchFirstGenerationPokemon = async () => {
    setPokemonList([]);
    setPokemonMap(new Map());
    for (let i = 1; i <= 151; i++) {
      await listPokemon(i);
    }
  };

  const fetchSecondGenerationPokemon = async () => {
    setPokemonList([]);
    setPokemonMap(new Map());
    for (let i = 152; i <= 251; i++) {
      await listPokemon(i);
    }
  };

  const fetchThirdGenerationPokemon = async () => {
    setPokemonList([]);
    setPokemonMap(new Map());
    for (let i = 252; i <= 386; i++) {
      await listPokemon(i);
    }
  };

  const fetchFourthGenerationPokemon = async () => {
    setPokemonList([]);
    setPokemonMap(new Map());
    for (let i = 387; i <= 493; i++) {
      await listPokemon(i);
    }
  };

  const fetchFifthGenerationPokemon = async () => {
    setPokemonList([]);
    setPokemonMap(new Map());
    for (let i = 494; i <= 649; i++) {
      await listPokemon(i);
    }
  };

  const fetchSixthGenerationPokemon = async () => {
    setPokemonList([]);
    setPokemonMap(new Map());
    for (let i = 494; i <= 721; i++) {
      await listPokemon(i);
    }
  };

  const fetchSeventhGenerationPokemon = async () => {
    setPokemonList([]);
    setPokemonMap(new Map());
    for (let i = 722; i <= 809; i++) {
      await listPokemon(i);
    }
  };

  const fetchEighthGenerationPokemon = async () => {
    setPokemonList([]);
    setPokemonMap(new Map());
    for (let i = 810; i <= 905; i++) {
      await listPokemon(i);
    }
  };

  const fetchNinthGenerationPokemon = async () => {
    setPokemonList([]);
    setPokemonMap(new Map());
    for (let i = 906; i <= 1025; i++) {
      await listPokemon(i);
    }
  };
// fin des fetch Pokemon


  const listPokemon = async (pokemonIdOrName) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`);
      const data = await res.json();
      if (!pokemonMap.has(data.id)) {
        setPokemonMap((prevMap) => new Map(prevMap).set(data.id, true));
        setPokemonList((prevList) => {
          const newList = [...prevList, data];
          const uniqueList = Array.from(new Set(newList.map(p => p.id)))
                                  .map(id => newList.find(p => p.id === id));
          return uniqueList;
        });
      }
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const searchPokemon = searchTerm.toLowerCase();
      setPokemonList([]);
      setPokemonMap(new Map());
      await listPokemon(searchPokemon);
      setSearchTerm("");
    }
  };

  const loadMorePokemon = async () => {
    const nextLimit = limit + 33;
    for (let i = limit + 1; i <= nextLimit && i <= 151; i++) {
      await listPokemon(i);
    }
    setLimit(nextLimit);
  };

  const resetPokemonList = async () => {
    setPokemonList([]);
    setLimit(33);
    setPokemonMap(new Map());
    await fetchInitialPokemon();
  };

  const pokemonCard = (pokemon) => {
    const type = pokemon.types[0].type.name;
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id;

    return (
      <div key={id} className={`${styles.pokemon} ${styles[type]}`}>
        <div className={styles.imgContainer}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={name}
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.type}>
            Type: <span>{type}</span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className={styles.title}>Liste des Pokémon</h1>

      {/* Barre de recherche */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
        className={styles.search}
      />

      {/* Boutons pour les générations */}
      <div className={styles.bouttonGeneration}>
  <button onClick={fetchFirstGenerationPokemon} className={styles.genBoutton}>
    1ère génération
  </button>
  <button onClick={fetchSecondGenerationPokemon} className={styles.genBoutton}>
    2ème génération
  </button>
  <button onClick={fetchThirdGenerationPokemon} className={styles.genBoutton}>
    3ème génération
  </button>
  <button onClick={fetchFourthGenerationPokemon} className={styles.genBoutton}>
    4ème génération
  </button>
  <button onClick={fetchFifthGenerationPokemon} className={styles.genBoutton}>
    5ème génération
  </button>
  <button onClick={fetchSixthGenerationPokemon} className={styles.genBoutton}>
    6ème génération
  </button>
  <button onClick={fetchSeventhGenerationPokemon} className={styles.genBoutton}>
    7ème génération
  </button>
  <button onClick={fetchEighthGenerationPokemon} className={styles.genBoutton}>
    8ème génération
  </button>
  <button onClick={fetchNinthGenerationPokemon} className={styles.genBoutton}>
    9ème génération
  </button>
</div>


      {/* Liste des Pokemon */}
      <div id="pokemonContainer" className={styles.pokemonContainer}>
        {pokemonList.map((pokemon) => pokemonCard(pokemon))}
      </div>

      {/* Bouton pour charger plus de Pokemon */}
      <button id="next" onClick={loadMorePokemon} className={styles.button}>
        Load More
      </button>

      {/* Bouton pour revenir à la page d'accueil */}
      <button className={`${styles.home} ${styles.button}`} onClick={resetPokemonList}>
        Home
      </button>
    </div>
  );
};

export default PokemonApp;
