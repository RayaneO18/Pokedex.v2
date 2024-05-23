import React, { useState, useEffect } from "react";
import styles from '@/styles/PokemonList.module.css';

const PokemonApp = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(33);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchInitialPokemon();
  }, []);

  const fetchInitialPokemon = async () => {
    setIsLoading(true);
    const promises = [];
    for (let i = 1; i <= limit; i++) {
      promises.push(listPokemon(i));
    }
    //permet de faire plusieurs requetes et d'eviter les conflits
    await Promise.all(promises);
    setIsLoading(false);
  };

  const fetchGenerationPokemon = async (start, end) => {
    setIsLoading(true);
    setPokemonList([]);
    const promises = [];
    for (let i = start; i <= end; i++) {
      promises.push(listPokemon(i));
    }
    await Promise.all(promises);
    setIsLoading(false);
  };

  const listPokemon = async (pokemonIdOrName) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`);
      const data = await res.json();
      setPokemonList((prevList) => {
        const newList = [...prevList, data];
        const uniqueList = Array.from(new Set(newList.map(p => p.id)))
                                .map(id => newList.find(p => p.id === id));
        return uniqueList;
      });
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setIsLoading(true);
      const searchPokemon = searchTerm.toLowerCase();
      setPokemonList([]);
      await listPokemon(searchPokemon);
      setSearchTerm("");
      setIsLoading(false);
    }
  };


  const loadMorePokemon = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const nextLimit = limit + 33;
    const promises = [];
    for (let i = limit + 1; i <= nextLimit && i <= 151; i++) {
      promises.push(listPokemon(i));
    }
    await Promise.all(promises);
    setLimit(nextLimit);
    setIsLoading(false);
  };

  const resetPokemonList = async () => {
    setIsLoading(true);
    setPokemonList([]);
    setLimit(33);
    await fetchInitialPokemon();
    setIsLoading(false);
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
        <button onClick={() => fetchGenerationPokemon(1, 151)} className={styles.genBoutton}>1ère génération</button>
        <button onClick={() => fetchGenerationPokemon(152, 251)} className={styles.genBoutton}>2ème génération</button>
        <button onClick={() => fetchGenerationPokemon(252, 386)} className={styles.genBoutton}>3ème génération</button>
        <button onClick={() => fetchGenerationPokemon(387, 493)} className={styles.genBoutton}>4ème génération</button>
        <button onClick={() => fetchGenerationPokemon(494, 649)} className={styles.genBoutton}>5ème génération</button>
        <button onClick={() => fetchGenerationPokemon(650, 721)} className={styles.genBoutton}>6ème génération</button>
        <button onClick={() => fetchGenerationPokemon(722, 809)} className={styles.genBoutton}>7ème génération</button>
        <button onClick={() => fetchGenerationPokemon(810, 905)} className={styles.genBoutton}>8ème génération</button>
        <button onClick={() => fetchGenerationPokemon(906, 1025)} className={styles.genBoutton}>9ème génération</button>
      </div>

      {/* Liste des Pokemon */}
      <div id="pokemonContainer" className={styles.pokemonContainer}>
        {pokemonList.map((pokemon) => pokemonCard(pokemon))}
      </div>

      {/* Bouton pour charger plus de Pokemon */}
      <button id="next" onClick={loadMorePokemon} className={styles.button} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load More'}
      </button>

      {/* Bouton pour revenir à la page d'accueil */}
      <button className={`${styles.home} ${styles.button}`} onClick={resetPokemonList} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Home'}
      </button>
    </div>
  );
};

export default PokemonApp;
