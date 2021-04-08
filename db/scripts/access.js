db = db.getSiblingDB('core');
db.createUser({ user: "api", pwd: "password", roles: [] })
