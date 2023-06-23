import * as SQLite from "expo-sqlite";
import { Place, PlaceCreate } from "../models";

const db = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      console.log("creo la tabella palces --->");
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL,
          )
          `,
        [],
        (_, result) => {
          console.log("ce l'ha fatta!");
          res(result);
        },
        (_, error) => {
          console.log("errore nel creare", error);
          rej(error);
          return true;
        }
      );
    });
  });
  return promise;
};

export const insert = (place: PlaceCreate) =>
  new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        INSERTO INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)
        `,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {},
        (_, error) => {
          rej(error);
          return true;
        }
      );
    });
  });

export const fetchAll = (): Promise<Place[]> =>
  new Promise((res, rej) => {
    console.log("database", db);
    db.transaction((tx) => {
      console.log("execute ", tx);
      tx.executeSql(
        `
        SELECT * FROM places 
        `,
        [],
        (_, { rows: { _array } }) => {
          console.log("results ---->", _array);
          const places: Place[] = [];

          for (const dp of _array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                dp.address,
                dp.location.lat,
                dp.location.lng
              )
            );
          }

          res(places);
        },
        (_, error) => {
          console.log("error ---->", error);
          rej(error);
          return true;
        }
      );
      console.log("end");
    });
  });
