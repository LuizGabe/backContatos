import fs from "node:fs/promises";

const databasePath = new URL("./src/data/db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2));
  }

  select(table, id) {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
    let data = this.#database[table] ?? [];

    if (id) {
      data = data.find((row) => {
        return row.id === id;
      });
    }

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      // Se sim entra aqui
      this.#database[table].push(data);
      this.#persist();
      this.#database[table] = [...this.#database[table]];

      fs.readFile(databasePath, "utf8")
        .then((data) => {
          this.#database = JSON.parse(data);
        })
        .catch(() => {
          this.#persist();
        });
    } else {
      // Se não entra aqui
      this.#database[table] = [data];
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(
      (row) => row.id === id
    );

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(
      (row) => row.id === id
    );

    if (rowIndex > -1) {
      const dados = this.#database[table][rowIndex]
      this.#database[table][rowIndex] = { id, ...dados, ...data };
      this.#persist();
    }
  }
}