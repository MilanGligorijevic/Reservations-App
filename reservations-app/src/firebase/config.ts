import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import Local from "../types/local";
import Reservation from "../types/reservation";
import UserReservation from "../types/UsersReservation";

const firebaseConfig = {
  apiKey: "AIzaSyDvCqcct6QlKM5o9JuRoMhY94mf40CQQIc",
  authDomain: "reservations-app-dad90.firebaseapp.com",
  projectId: "reservations-app-dad90",
  storageBucket: "reservations-app-dad90.appspot.com",
  messagingSenderId: "22675986332",
  appId: "1:22675986332:web:15cab8b28e394e9da49a59",
};

const app = initializeApp(firebaseConfig);

//funkcije vezane za rad sa korisnikom

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

async function addUserToFirebase(
  userId: string,
  firstName: string | undefined,
  lastName: string | undefined,
  email: string,
  phoneNumber: string | undefined
) {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    favoriteLocals: [],
    reservations: [],
  });
}

async function getSingleUser(userId: string) {
  if (userId) {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const user = {
        userId: userId,
        firstName: docSnap.data().firstName,
        lastName: docSnap.data().lastName,
        email: docSnap.data().email,
        phoneNumber: docSnap.data().phoneNumber,
        favoriteLocals: docSnap.data().favoriteLocals,
        reservations: docSnap.data().reservations,
      };

      return user;
    } else {
      throw new Error("User does not exist in database");
    }
  } else {
    throw new Error("Looking for invalid user!");
  }
}

//funkcije vezanje za rad sa bazom

const db = getFirestore(app);

const colRef = collection(db, "locals");

//funkcija za dopremanje svih lokala iz baze
async function getAllLocals() {
  const localsData = await getDocs(colRef);
  const locals: Array<Local> = [];
  localsData.forEach((doc) => {
    locals.push({
      id: doc.id,
      name: doc.data().name,
      about: doc.data().about,
      address: doc.data().address,
      city: doc.data().city,
      images: doc.data().images,
      tags: doc.data().tags,
      openingHours: doc.data().openingHours,
      closingHours: doc.data().closingHours,
      website: doc.data().website,
      email: doc.data().email,
      phoneNumber: doc.data().phoneNumber,
    });
  });
  return locals;
}

async function getSingleLocalData(localId: string | undefined) {
  if (localId) {
    const docRef = doc(colRef, localId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const localData: Local = {
        id: docSnap.data().id,
        name: docSnap.data().name,
        about: docSnap.data().about,
        address: docSnap.data().address,
        city: docSnap.data().city,
        images: docSnap.data().images,
        tags: docSnap.data().tags,
        openingHours: docSnap.data().openingHours,
        closingHours: docSnap.data().closingHours,
        website: docSnap.data().website,
        email: docSnap.data().email,
        phoneNumber: docSnap.data().phoneNumber,
        facebook: docSnap.data().facebook,
        instagram: docSnap.data().instagram,
      };

      return localData;
    } else {
      throw new Error("Local does not exist in database");
    }
  } else {
    throw new Error("Looking for invalid local!");
  }
}

//ADMIN funkcija za dodavanje novog lokala u bazu
async function addNewLocalToFirebase(newLocal: Local) {
  const localsRef = doc(db, "locals", newLocal.id);
  await setDoc(localsRef, {
    ...newLocal,
  });
}

// upisati prave podatke i dodeliti unikatni ID rezervaciji
async function makeLocalReservation(
  localId: string | undefined,
  reservation: Reservation
) {
  if (localId) {
    const reservationRef = doc(
      db,
      "locals",
      localId,
      "reservations",
      reservation.id
    );
    await setDoc(reservationRef, {
      numberOfGuests: reservation.numberOfGuests,
      reservationDate: reservation.reservationDate,
      reservationTime: reservation.reservationTime,
      guestName: reservation.guestName,
      guestEmail: reservation.guestEmail,
      guestPhoneNumber: reservation.guestPhoneNumber,
    });
  } else {
    throw new Error("Looking for invalid local!");
  }
}
//funkcija za dodavanje rezervacije u user document
async function addUsersReservation(
  userId: string,
  reservation: UserReservation
) {
  const reservationRef = doc(
    db,
    "users",
    userId,
    "reservations",
    reservation.localId
  );
  await setDoc(reservationRef, {
    localId: reservation.localId,
    localName: reservation.localName,
    numberOfGuests: reservation.numberOfGuests,
    reservationDate: reservation.reservationDate,
    reservationTime: reservation.reservationTime,
  });
}
//funkcija za preuzimanje svih rezervacija usera iz user documenta
async function getUsersReservations(userId: string) {
  const collRef = collection(db, "users", userId, "reservations");
  try {
    const querySnapshot = await getDocs(collRef);
    const reservations: Object[] = [];
    querySnapshot.forEach((doc) => {
      reservations.push(doc.data());
    });
    return reservations;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

//funkcija za preuzimanje rezervisanih sati u datom lokalu
async function getReservedHours(
  localId: string | undefined,
  reservationDate: string | undefined
) {
  if (localId) {
    const hoursQuery = query(
      collection(db, "locals", localId, "reservations"),
      where("reservationDate", "==", reservationDate)
    );
    const querySnapshot = await getDocs(hoursQuery);
    const reservedHours: Array<string> = [];
    querySnapshot.forEach((doc) => {
      reservedHours.push(doc.data().reservationTime);
    });
    return reservedHours;
  } else {
    throw new Error("Looking for invalid local!");
  }
}

//funkcija za preuzimanje favorites locala korisnika
async function getUsersFavorites(userId: string) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return await docSnap.data().favoriteLocals;
  } else {
    await setDoc(docRef, {
      favoriteLocals: [],
    });
    console.log("No such document!");
    return;
  }
}

//funkcija za dodavanje lokala u favorites
async function addToFavorites(userId: string, localData: Local) {
  const favoritesRef = doc(db, "users", userId);
  console.log(userId, localData);
  await updateDoc(favoritesRef, {
    favoriteLocals: arrayUnion(localData),
  });
}

//funkcija za uklanjanje lokala iz favorites
async function removeFromFavorites(userId: string, localData: Local) {
  const favoritesRef = doc(db, "users", userId);
  await updateDoc(favoritesRef, {
    favoriteLocals: arrayRemove(localData),
  });
}

export {
  getAllLocals,
  getSingleLocalData,
  makeLocalReservation,
  getReservedHours,
  getUsersFavorites,
  addToFavorites,
  removeFromFavorites,
  addUserToFirebase,
  getSingleUser,
  addUsersReservation,
  getUsersReservations,
  addNewLocalToFirebase,
};
