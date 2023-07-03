import * as SQLite from "expo-sqlite";
import { Place, PlaceCreate } from "../models";

const db = SQLite.openDatabase("places.db");

const parseData = (_array: any[]) => {
  console.log(_array)
  const data: Place[] = [];
  for (const dp of _array) {
    data.push(
      new Place(dp.title, dp.imageUri, dp.address, dp.lat, dp.lng, dp.id)
    );
  }

  return data;
};

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

export const insert = ({ title, imageUri, address, lat, lng }: PlaceCreate) =>
  new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)
        `,
        [title, imageUri, address, lat, lng],
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
          const results = parseData(_array);
          res(results);
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
          const results = parseData(_array);
          res(results[0]);
        },
        (_, error) => {
          rej(error);
          return true;
        }
      );
    });
  });
