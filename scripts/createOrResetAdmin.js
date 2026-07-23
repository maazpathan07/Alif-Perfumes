const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const email = process.argv[2] || "pathanmaaz142@gmail.com";
const password = process.argv[3] || "Admin@123456";

async function run() {
  try {
    let user;
    try {
      user = await admin.auth().getUserByEmail(email);
      console.log(`Found existing user: ${user.email} (UID: ${user.uid})`);
      await admin.auth().updateUser(user.uid, { password: password });
      console.log(`Password successfully updated to: ${password}`);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        user = await admin.auth().createUser({
          email: email,
          password: password,
          displayName: "Admin",
          emailVerified: true
        });
        console.log(`Created new admin user: ${user.email} (UID: ${user.uid})`);
      } else {
        throw err;
      }
    }

    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Granted Custom Claim { admin: true } to ${user.email}`);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

run();
