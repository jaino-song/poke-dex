// Import axios for making HTTP requests
import axios from 'axios';

// Create an axios instance for remote API calls
const remote = axios.create();

// Define the type for Pokémon list API response
export interface PokemonListResponseType {
  count: number,           // Total number of Pokémon available
  next: string,            // URL for the next page of Pokémon data
  results: {               // Array of Pokémon objects containing basic information
    name: string,          // Pokémon's name
    url: string            // URL to get more detailed information about the Pokémon
  }[]
}

// Function to fetch a list of Pokémon, using the next URL if provided
export const fetchPokemonsAPI = async (nextUrl?: string) => {
  // Determine if it's the initial or next request
  const requestUrl = nextUrl ? nextUrl : `https://pokeapi.co/api/v2/pokemon`; 
  // Send a GET request to fetch Pokémon data
  const response = await remote.get<PokemonListResponseType>(requestUrl);
  // Return the data received from the API
  return response.data;
}

// Define the type for Pokémon detail API response
export interface PokemonDetailResponseType {
  id: number,             // Unique identifier for the Pokémon
  weight: number,         // Weight of the Pokémon (in hectograms)
  height: number,         // Height of the Pokémon (in decimeters)
  name: string,           // Name of the Pokémon
  types: {                // Array of types that the Pokémon belongs to
    type: {
      name: string,       // Name of the type (e.g., grass, fire)
    }
  }[],
  sprites: {              // Object containing different images of the Pokémon
    front_default: string, // Default front image of the Pokémon
    other: {
      dream_world: {
        front_default: string, // Image from the "dream world" artwork
      }
      'official-artwork': {
        front_default: string, // Official artwork of the Pokémon
      }
    }
  },
  stats: {                // Base stats of the Pokémon
    base_stat: number,    // Value of the base stat
    stat: {
      name: string        // Name of the stat (e.g., speed, attack)
    }
  }[]
}

// Define the type for Pokémon species API response, used to provide more detailed species information
interface PokemonSpeciesResponseType {
  color: {                // Color of the Pokémon species (e.g., blue, red)
    name: string
  },
  names: {                // Array of names in different languages
    name: string,         // The name of the Pokémon in a specific language
    language: {
      name: string        // The language of the name (e.g., 'ko' for Korean)
    }
  }[]
}

// Define the type for Pokémon details used in the application
export interface PokemonDetailType {
  id: number,
  weight: number,             // Weight in kg (converted from hectograms)
  height: number,             // Height in meters (converted from decimeters)
  name: string,               // Pokémon's name
  koreanName: string,         // Pokémon's name in Korean
  color: string,              // Color of the Pokémon species
  types: string[],            // Array containing the types of the Pokémon
  images: {                   // Object containing URLs to different Pokémon images
    frontDefault: string,
    dreamWorldFront: string,
    officialArtworkFront: string
  },
  baseStats: {                // Array of base stats with their names and values
    name: string,
    value: number,
  }[]
}

// Function to fetch Pokémon details and species information by Pokémon name
export const fetchPokemonDetailAPI = async (name: string): Promise<PokemonDetailType> => {
  // Define URLs for fetching Pokémon details and species information
  const pokemonDetailUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`;

  // Fetch data from both the Pokémon detail and species APIs
  const response = await remote.get<PokemonDetailResponseType>(pokemonDetailUrl);
  const speciesResponse = await remote.get<PokemonSpeciesResponseType>(pokemonSpeciesUrl);

  // Extract the detail and species data from the responses
  const detail = response.data;
  const species = speciesResponse.data;

  // Return a formatted object containing Pokémon details
  return {
    id: detail.id, // Pokémon's ID
    name: detail.name, // Pokémon's name
    color: species.color.name, // Color of the Pokémon species
    // Find the Korean name of the Pokémon
    koreanName: species.names.find(item => {
      return item.language.name === 'ko';
    })?.name ?? detail.name,               // If Korean name is not found, use the default name
    height: detail.height / 10,            // Convert height from decimeters to meters
    weight: detail.weight / 10,            // Convert weight from hectograms to kilograms
    // Extract and map Pokémon types to an array of type names
    types: detail.types.map(item => item.type.name),
    // Extract URLs of various Pokémon images
    images: {                              
      frontDefault: detail.sprites.front_default,
      dreamWorldFront: detail.sprites.other.dream_world.front_default,
      officialArtworkFront: detail.sprites.other['official-artwork'].front_default,
    },
    // Extract and format the base stats
    baseStats: detail.stats.map(item => {  
      return {
        name: item.stat.name, // Stat name (e.g., speed, attack)
        value: item.base_stat // Value of the stat
      }
    })
  };
}
