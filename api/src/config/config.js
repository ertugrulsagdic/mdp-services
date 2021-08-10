module.exports = {
  "development": {
    "username": "postgres",
    "password": 'Ertugrul.135',
    "database": "mdp_services_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": 'Ertugrul.135',
    "database": "mdp_services_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  docker: {
    "username": "postgres",
    "password": 'postgres_123456',
    "database": "mdp_services_development",
    "host": "postgres",
    "dialect": 'postgres'
  },
  production: {
    use_env_variable: "DATABASE_URL",
    database: "d6gml09d079t",
    username: "idlgdtxgdzdtap",
    password:
        "04a567039b08fe902ae82b99c2c8c832de936efdc29b1c65d9bb1784b6d11bcc",
    host: "ec2-54-196-65-186.compute-1.amazonaws.com",
    dialect: "postgres",
    ssl: true,
    protocol: "postgres",
    logging: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // <<<<<< YOU NEED THIS
        },
    },
},
}
