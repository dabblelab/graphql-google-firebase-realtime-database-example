const functions = require("firebase-functions");

const gqlServer=require("./server/index1");



var server=gqlServer();

exports.graphqldemo=functions.https.onRequest(server);