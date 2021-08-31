import { types } from "../types/types";
import { loadHeroes } from "../helpers/loadHeroes";
import { db } from "../firebase/firebase-config";

export const startNewHeroe = (hero) => {
  return async (dispatch, getState) => {

    const { uid } = getState().user;

    await db.collection(`${uid}/team/heroes`).add(hero);

    dispatch(addHero(hero));
  }
}

export const addHero = (hero) => ({
  type: types.addHero,
  payload: hero
});

export const startDeletingHero = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().user;
    const query = db.collection(`${uid}/team/heroes`).where('id', '==', id);
    query.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      })
    })
    dispatch(removeHero(id));
  }
}



export const removeHero = (id) => ({
  type: types.removeHero,
  payload: id
});

export const startLoadingHeroes = (uid) => {
  return async (dispatch) => {
    const heroes = await loadHeroes(uid);
    dispatch(setHeroes(heroes));
  }
};

export const setHeroes = (heroes) => ({
  type: types.setHeroes,
  payload: heroes
});

export const teamLogout = () => ({
  type: types.logoutCleaning
});
