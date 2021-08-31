import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetHeroId } from '../../hooks/useGetHeroId';
import Swal from 'sweetalert2';
import { startDeletingHero, startNewHeroe } from '../../actions/team';

export const ButtonAdd = ({ id }) => {

  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();
  const { team } = useSelector(state => state.team);
  const { data: hero } = useGetHeroId(id);

  const isFavorite = () => {
    const heroes = Object.entries(team).map(h => h[1]);
    if (heroes.find(h => h.id === id) !== undefined) {
      return true;
    }
  }

  useEffect(() => {
    if (isFavorite()) {
      setFavorite(true);
    }
  }, []);

  const handleFavorite = () => {
    if (team.length < 6) {
      if (hero.biography.alignment === 'good'){
        if (good === 3) {
          Swal.fire('Error', 'Your team already has 3 good heroes', 'error');
        } else {
          dispatch(startNewHeroe(hero));
          setFavorite(!favorite);
          Swal.fire('Added', 'Added', 'success');
        }
      }
      if (hero.biography.alignment === 'bad') {
        if (bad === 3) {
          Swal.fire('Error', 'Your team already has 3 bad heroes', 'error');
        } else {
          dispatch(startNewHeroe(hero));
          setFavorite(!favorite);
          Swal.fire('Added', 'Added', 'success');
        }
      }
    } else {
      Swal.fire('Error', 'Your team is at their maximum capacity', 'error');
    }
  }

  const handleRemove = () => {
    dispatch(startDeletingHero(id));
    setFavorite(!favorite);
  }

  const [good, setGood] = useState();
  const [bad, setBad] = useState();

  const countGood = () => {
    let good = 0;
    team.forEach(hero => {
      if (hero.biography.alignment === 'good') {
        good += 1;
      }
    })
    return good;
  }

  const countBad = () => {
    let bad = 0;
    team.forEach(hero => {
      if (hero.biography.alignment === 'bad') {
        bad += 1;
      }
    })
    return bad;
  }

  useEffect(() => {
    setGood(countGood());
    setBad(countBad());
  }, [team]);

  return (
    !favorite ?
      <button
        className="btn btn-primary my-3"
        onClick={handleFavorite}
      >
        Add Hero
      </button>
      :
      <button className="btn btn-danger my-3"
        onClick={handleRemove}
      >
        Remove Hero
      </button>
  )
}
