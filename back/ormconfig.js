module.exports = {
   "type": process.env.DB_TYPE,
   "database": process.env.DB_PATH,
   "synchronize": false,
   "logging": false,
   "entities": [
      process.env.ENTITIES_PATH
   ],
   "migrations": [
      process.env.MIGRATIONS_PATH
   ],
   "cli": {
      "entitiesDir": process.env.ENTITIES_DIR,
      "migrationsDir": process.env.MIGRATIONS_DIR
   }
}