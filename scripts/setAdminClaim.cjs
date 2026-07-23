const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = require("../serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount)
});

const auth = getAuth();
const identifier = process.argv[2];

if (!identifier) {
  console.error("Usage: node scripts/setAdminClaim.cjs <email_or_uid>");
  process.exit(1);
}

async function grantAdminClaim(target) {
  try {
    let user;
    if (target.includes("@")) {
      user = await auth.getUserByEmail(target);
    } else {
      user = await auth.getUser(target);
    }

    await auth.setCustomUserClaims(user.uid, { admin: true });
    console.log(`✅ Success! Custom claim { admin: true } granted to user: ${user.email} (UID: ${user.uid})`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to set admin claim:", error);
    process.exit(1);
  }
}

grantAdminClaim(identifier);
