import React, { useState, useEffect } from "react";
import styles from '@styles/PokemonList.module.css';

const PokemonApp = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(30);
  const [pokemonMap, setPokemonMap] = useState(new Map());

  useEffect(() => {
    let i = 1;
    const interval = setInterval(() => {
      if (i <= limit && i <= 150) {
        listPokemon(`${i}`);
        i++;
      }
    }, 20);
    return () => clearInterval(interval);
  }, [limit]);

  const listPokemon = (pokemonName) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => res.json())
      .then((data) => {
        if (!pokemonMap.has(data.id)) {
          setPokemonMap((prevMap) => new Map(prevMap).set(data.id, true));
          setPokemonList((prevList) => [...prevList, data]);
        }
      });
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const searchPokemon = searchTerm.toLowerCase();
      setPokemonList([]);
      listPokemon(searchPokemon);
      setSearchTerm("");
    }
  };

  const loadMorePokemon = () => {
    const nextLimit = limit + 15;
    if (nextLimit <= 150) {
      for (let i = limit + 1; i <= nextLimit; i++) {
        if (i <= 150) {
          listPokemon(`${i}`);
        }
      }
      setLimit(nextLimit);
    }
  };

  const resetPokemonList = () => {
    setPokemonList([]);
    setLimit(30);
    setPokemonMap(new Map());
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
