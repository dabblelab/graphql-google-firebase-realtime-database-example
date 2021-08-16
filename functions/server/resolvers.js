const fetch = require("node-fetch");
const profile = require("./profile");

const resolvers = {
  Query: {
    users: async () => {
            const data = await fetch(`${process.env['DATABASE_URL']}/.json`);
            const dataJson = await data.json();
            console.log(dataJson);
            const keys = Object.keys(dataJson);
            console.log(dataJson);
            const mapsKeys = keys.map(function (item) {
                const userData = dataJson[item];
                console.log(userData);
                const graphqlUser = profile(userData);
                return graphqlUser;
            });
            return mapsKeys;
        }
  }
};

module.exports = resolvers;