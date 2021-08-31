import { db } from "../firebase/firebase-config";

export const loadHeroes = async (uid) => {
  const heroesSnap = await db.collection(`${uid}/team/heroes`).get();
  const heroes = [];

  heroesSnap.forEach(childrenSnap => {
    heroes.push({
      id: childrenSnap.id,
      ...childrenSnap.data()
    })
  });
  
  return heroes;
}
