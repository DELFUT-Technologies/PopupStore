// Create serverless functions to run on firebase
import functions = require("firebase-functions");
require("firebase-functions");
// Create a server instance to handle the requests
import express = require("express");
require("express");
// Makes the content returend by endpoints accessible to external sites
import cors = require("cors");
require("cors");

// Instance an express router to handle the routes of endpoints
const app = express();
// Set CORS policies so that the content of endpoins is available to DCL
app.use(cors({origin: true}));


// === Handle Permissions === //
import admin = require("firebase-admin");
require("firebase-admin");
// Load credentials file
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require("../adminCredentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lovehoney-popup-shop-e66b2.firebaseio.com",
});
// initiate an authenticated 'db' object to interface with firestore
const db = admin.firestore();


// === Call Database === //
// retrieve object that represents BlockedUsers collection in firebase
const blockedUsers = db.collection("BlockedUsers");


// First Endpoint - listen for GET request on 'get-blocked_users
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.get("/get-blocked_users", async (req: any, res: any) =>{
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await blockedUsers.get().then((queryResult: { docs: any }) => {
      for (const doc of queryResult.docs) {
        response.push(doc.data());
      }
    });
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// Second Endpoint - listen for POST request on '/add-blocked_users'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post("/add-blocked_user", async (req: any, res: any) => {
  const newBlockedUser = req.body;
  try {
    await blockedUsers
        .doc("/" + Math.floor(Math.random() * 100000) + "/")
        .create({
          id: newBlockedUser.id,
        });
    return res.status(200).send("Signed book!");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// exposes the express application to Firebase functions
exports.app = functions.https.onRequest(app);
