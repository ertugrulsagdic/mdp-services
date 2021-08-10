import swaggerEnv from "./swaggerEnv";

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
console.log("swagger env", env);
module.exports = {
  title: "News API",

  swaggerOptions: {
    swaggerDefinition: {
      info: {
        description: "MDP API",
        title: "MDP API",
        version: "1.0.0",
      },
      host: swaggerEnv[env]["host"],
      basePath: "",
      produces: ["application/json", "application/xml"],
      schemes: swaggerEnv[env]["address"],
      security: [
        {
          JWT: []
        }
      ],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: ''
        },
      }
    },
    basedir: __dirname, // app absolute path
    files: [
      "../../account/controller/**/*.js",
      "../../private/controller/**/*.js"
    ],
  },
  login_secret: 'ertugrul-login-secret-key',
  forgot_password_secret: "ertugrul-forgot-secret-key",

};
