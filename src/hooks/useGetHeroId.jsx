import { useEffect, useState } from "react";
import { getHeroById } from "../helpers/getHeroes";

export const useGetHeroId = (heroId) => {

  const [state, setState] = useState({
    data: [],
    loading: true
  });

  useEffect(() => {
    getHeroById(heroId)
      .then(hero => {
        setState({
          data: hero,
          loading: false
        });
      })
  }, [heroId]);

  return state;
}
