import Head from 'next/head'; // Importation du composant Head
import PokemonList from "@/components/PokemonList"; 
const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Liste des Pokémon générée par Create Next App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon-pokedex.png" /> {/* Assurez-vous que le chemin vers l'icône est correct */}
      </Head>
      <h1>Liste des Pokémon</h1>
      <PokemonList />
    </div>
  );
};

export default HomePage;
