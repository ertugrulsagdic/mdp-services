module.exports = {
    'development': {
        host: "localhost:8000/",
        address: "http",
    },
    'test': {
        host: "localhost:8000/",
        address: "http",
    },
    'production': {
        host: "mdp-services.herokuapp.com",
        address: "https",
    },
    'docker': {
        host: "localhost:8000/",
        address: "https",
    },
}