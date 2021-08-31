import axios from 'axios';

export const getHeroesByName = async (name) => {
  try {
    const url = `https://superheroapi.com/api.php/4238353352842732/search/${name}`;
    const { data: heroes } = await axios.get(url);
    return heroes.results || [];
  } catch (error) {
    return error;
  }
}

export const getHeroById = async (heroId) => {
  try {
    const url = `https://superheroapi.com/api.php/4238353352842732/${heroId}`;
    const { data: hero } = await axios.get(url);
    return hero;
  } catch (error) {
    return error;
  }
}

