import React, { useState, useEffect } from "react";
import styles from '@styles/PokemonList.module.css';

const PokemonApp = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(30);
  const [pokemonMap, setPokemonMap] = useState(new Map());

  useEffect(() => {
    fetchInitialPokemon();
  }, []);

  const fetchInitialPokemon = async () => {
    for (let i = 1; i <= limit; i++) {
      await listPokemon(i);
    }
  };

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
    const nextLimit = limit + 15;
    for (let i = limit + 1; i <= nextLimit && i <= 150; i++) {
      await listPokemon(i);
    }
    setLimit(nextLimit);
  };

  const resetPokemonList = async () => {
    setPokemonList([]);
    setLimit(30);
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
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
        className={styles.search}
      />
      <div id="pokemonContainer" className={styles.pokemonContainer}>
        {pokemonList.map((pokemon) => pokemonCard(pokemon))}
      </div>
      <button id="next" onClick={loadMorePokemon} className={styles.button}>
        Load More
      </button>
      <button className={`${styles.home} ${styles.button}`} onClick={resetPokemonList}>
        Home
      </button>
    </div>
  );
};

export default PokemonApp;
