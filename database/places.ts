import * as SQLite from "expo-sqlite";
import { Place, PlaceCreate } from "../models";

const db = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
          )
          `,
        [],
        (_, result) => {
          res(result);
        },
        (_, error) => {
          rej(error);
          return true;
        }
      );
    });
  });
  return promise;
};

export const insert = ({ title, imageUri, address, location }: PlaceCreate) =>
  new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)
        `,
        [title, imageUri, address, location.lat, location.lng],
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
    db.transaction((tx) => {
      tx.executeSql(
        `
        SELECT * FROM places 
        `,
        [],
        (_, { rows: { _array } }) => {
          const places: Place[] = [];

          for (const dp of _array) {
            places.push(
              new Place(dp.title, dp.imageUri, dp.address, dp.location, dp.id)
            );
          }

          res(places);
        },
        (_, error) => {
          rej(error);
          return true;
        }
      );
    });
  });

export const fetchOne = (id: string): Promise<Place> =>
  new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        SELECT * 
        FROM places 
        WHERE id = ?
        `,
        [id],
        (_, { rows: { _array } }) => {
          const places: Place[] = [];

          for (const dp of _array) {
            places.push(
              new Place(dp.title, dp.imageUri, dp.address, dp.location, dp.id)
            );
          }

          res(places[0]);
        },
        (_, error) => {
          rej(error);
          return true;
        }
      );
    });
  });
