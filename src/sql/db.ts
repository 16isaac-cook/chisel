import { open } from "@tauri-apps/plugin-sql";

const db = open("chisel.db");
await db.execute(`
    CREATE TABLE IF NOT EXISTS Worlds (
        ID TEXT PRIMARY KEY,
        Name TEXT NOT NULL,
        Description TEXT,
        CreatedOn TEXT NOT NULL,
        UpdatedOn TEXT NOT NULL,
        CreatedBy TEXT NOT NULL,
    );

    CREATE TABLE IF NOT EXISTS Buildings (
        ID TEXT PRIMARY KEY,
        WorldId TEXT NOT NULL REFERENCES Worlds(ID) ON DELETE CASCADE,
        Name TEXT NOT NULL,
        Description TEXT,
        CreatedOn TEXT NOT NULL,
        UpdatedOn TEXT NOT NULL,
        CreatedBy TEXT NOT NULL,
    );

    CREATE TABLE IF NOT EXISTS CelestialBodies (
        ID TEXT PRIMARY KEY,
        WorldId TEXT NOT NULL REFERENCES Worlds(ID) ON DELETE CASCADE,
        Name TEXT NOT NULL,
        Description TEXT,
        CreatedOn TEXT NOT NULL,
        UpdatedOn TEXT NOT NULL,
        CreatedBy TEXT NOT NULL,
    );

    CREATE TABLE IF NOT EXISTS Buildings (
        ID TEXT PRIMARY KEY,
        WorldId TEXT NOT NULL REFERENCES Worlds(ID) ON DELETE CASCADE,
        Name TEXT NOT NULL,
        Description TEXT,
        CreatedOn TEXT NOT NULL,
        UpdatedOn TEXT NOT NULL,
        CreatedBy TEXT NOT NULL,
    );

    CREATE TABLE IF NOT EXISTS Buildings (
        ID TEXT PRIMARY KEY,
        WorldId TEXT NOT NULL REFERENCES Worlds(ID) ON DELETE CASCADE,
        Name TEXT NOT NULL,
        Description TEXT,
        CreatedOn TEXT NOT NULL,
        UpdatedOn TEXT NOT NULL,
        CreatedBy TEXT NOT NULL,
    );
`);
