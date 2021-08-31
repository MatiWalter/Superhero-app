import React from 'react';
import { useSelector } from 'react-redux';
import { HeroGrid } from '../hero/HeroGrid';
import { Navbar } from '../ui/Navbar';
import { Powerstats } from './Powerstats';

export const TeamScreen = () => {

  const { team } = useSelector(state => state.team);

  const stats = {
    height: 0,
    weight: 0
  }

  team.map(hero => {
    stats.height += parseInt(hero.appearance.height[1])
    stats.weight += parseInt(hero.appearance.weight[1])
  })

  return (
    <>
      <Navbar />
      <div className="team d-flex flex-column align-items-center mt-3">
        <div className="d-flex col-12 flex-column flex-md-row align-items-center justify-content-center flex-wrap gap-4">
          <Powerstats />
          <div className="d-flex flex-column align-items-center">
            <h2>Average Height</h2>
            <h4>{team.length ? Math.round(stats.height / team.length) : 0} Cms</h4>
          </div>
          <div className="d-flex flex-column align-items-center">
            <h2>Average Weight</h2>
            <h4>{team.length ? Math.round(stats.weight / team.length) : 0} Kgs</h4>
          </div>
        </div>
        <div className="bg-dark w-100 mt-5">
          <h2 className="text-center text-white mt-3">Your team</h2>

          <div className="d-flex col-12 justify-content-center flex-wrap gap-2 mt-3">
            {
              <HeroGrid heroes={team} />
            }
          </div>
        </div>
      </div>
    </>
  )
}
