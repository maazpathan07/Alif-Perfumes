/**
 * Admin Claim Provisioning Script (ALIF PERFUMES)
 * 
 * Instructions:
 * 1. Download Firebase Admin Service Account Key JSON from Firebase Console:
 *    Project Settings -> Service Accounts -> Generate New Private Key
 * 2. Place key file as `serviceAccountKey.json` in root directory.
 * 3. Run: node scripts/setAdminClaim.js <ADMIN_EMAIL_OR_UID>
 */

const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const identifier = process.argv[2];

if (!identifier) {
  console.error("Usage: node scripts/setAdminClaim.js <email_or_uid>");
  process.exit(1);
}

async function grantAdminClaim(target) {
  try {
    let user;
    if (target.includes("@")) {
      user = await admin.auth().getUserByEmail(target);
    } else {
      user = await admin.auth().getUser(target);
    }

    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`✅ Success! Custom claim { admin: true } granted to user: ${user.email} (UID: ${user.uid})`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to set admin claim:", error);
    process.exit(1);
  }
}

grantAdminClaim(identifier);
