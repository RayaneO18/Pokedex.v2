import Head from 'next/head'; // Importation du composant Head
import PokemonList from "@/components/PokemonList";

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Pokedex</title>
        <meta name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon-pokedex.png" />
      </Head>
      
      <PokemonList />
    </div>
  );
};

export default HomePage;
