import { types } from "../types/types";

const team = {
  team: []
}

export const heroReducer = (state = team, action) => {
  switch (action.type) {
    case types.addHero:
      return {
        ...state,
        team: [...state.team, action.payload],
      }
    case types.removeHero:
      return {
        ...state,
        team: state.team.filter(
          hero => (hero.id !== action.payload)
        )
      }
    case types.setHeroes:
      return {
        ...state,
        team: [...action.payload]
      }
    case types.logoutCleaning:
      return {
        ...state,
        team: []
      }
    default:
      return state;
  }
}