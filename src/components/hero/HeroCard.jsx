import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetHeroId } from '../../hooks/useGetHeroId';
import { ButtonAdd } from './ButtonAdd';
import './HeroCard.css';

export const HeroCard = ({ id, name, image: { url }, biography: { alignment } }) => {

  const [flipped, setFlipped] = useState(false);
  const flip = () => {
    setFlipped(!flipped)
  }

  return (
    <div className="hero-card">
      <div onClick={flip} className={(flipped ? "flipped" : "")}>
        <Front name={name} url={url} alignment={alignment} />
        <Back id={id} url={url} name={name} />
      </div>
    </div>
  )
}

const Front = ({ name, url, alignment }) => {
  const alig = alignment.charAt(0).toUpperCase() + alignment.slice(1);
  return (
    <div className="front">
      <img src={url} className="img img-responsive" alt={name} />
      <div className="profile-name">{name}</div>
      <div className={`profile-alignment ${alig === 'Good' ? 'bg-success' : 'bg-danger'}` } >{alig}</div>
    </div>
  )
}

const Back = ({ id, url, name }) => {

  const { data: { powerstats }, loading } = useGetHeroId(id);

  return (
    <div className="back">
      <img src={url} className="img img-responsive" alt={name} />
      <div className="d-flex flex-column align-items-center mt-3 gap-4">
        <h2 className="text-primary mt-3">Powerstats</h2>
        {
          !loading &&
          <div className="d-flex flex-column gap-3">
            <div className="progress" style={{width: '200px'}}>
              <div className="progress-bar bg-secondary" style={{ width: powerstats.intelligence + '%'}}>
                {powerstats.intelligence !== 'null' ? powerstats.intelligence : 0}
              </div>
            </div>
            <div className="progress" style={{width: '200px'}}>
              <div className="progress-bar bg-secondary" style={{ width: powerstats.strength + '%' }}>
                {powerstats.strength !== 'null' ? powerstats.strength : 0}
              </div>
            </div>
            <div className="progress" style={{width: '200px'}}>
              <div className="progress-bar bg-secondary" style={{ width: powerstats.speed + '%' }}>
                {powerstats.speed !== 'null' ? powerstats.speed : 0}
              </div>
            </div>
            <div className="progress" style={{width: '200px'}}>
              <div className="progress-bar bg-secondary" style={{ width: powerstats.durability + '%' }}>
                {powerstats.durability !== 'null' ? powerstats.durability : 0}
              </div>
            </div>
            <div className="progress" style={{width: '200px'}}>
              <div className="progress-bar bg-secondary" style={{ width: powerstats.power + '%' }}>
                {powerstats.power !== 'null' ? powerstats.power : 0}
              </div>
            </div>
            <div className="progress" style={{width: '200px'}}>
              <div className="progress-bar bg-secondary" style={{ width: powerstats.combat + '%' }}>
                {powerstats.combat !== 'null' ? powerstats.combat : 0}
              </div>
            </div>
          </div>
        }
        <div className="d-flex align-items-end mt-3 gap-2">
          <Link to={`./hero/${id}`}>
            <button className="btn btn-secondary my-3">Details</button>
          </Link>
          <ButtonAdd id={id} />
        </div>
      </div>
    </div>
  )
}
