const functions = require("firebase-functions");

const gqlServer = require("./server/index");

var server = gqlServer();

exports.graphqldemo = functions.https.onRequest(server);