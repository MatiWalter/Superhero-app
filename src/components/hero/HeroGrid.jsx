import React, { useState } from 'react'
import { Pagination } from '../ui/Pagination';
import { HeroCard } from './HeroCard';

export const HeroGrid = ({ heroes }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [heroesPerPage] = useState(9);

  const indexOfLastHero = currentPage * heroesPerPage;
  const indexOfFirstHero = indexOfLastHero - heroesPerPage;

  const paginate = pageNumber => setCurrentPage(pageNumber);
  let currentHeroes = heroes.slice(indexOfFirstHero, indexOfLastHero);

  return (
    <div className="row mt-5 flex-column align-items-center">
      <div className="d-flex justify-content-center flex-wrap">
        {currentHeroes.map(hero => {
          return (
            <HeroCard
              key={hero.id}
              {...hero}
            />
          )
        })}
      </div>
      <Pagination
        heroesPerPage={heroesPerPage}
        totalHeroes={heroes.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  )
}
