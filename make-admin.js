const mongoose = require("mongoose");
const fs = require("fs");

const envPath = ".env.local";

if (!fs.existsSync(envPath)) {
  throw new Error(".env.local file not found");
}

const envFile = fs.readFileSync(envPath, "utf8");

for (const line of envFile.split(/\r?\n/)) {
  const trimmed = line.trim();

  if (!trimmed || trimmed.startsWith("#")) continue;

  const equalIndex = trimmed.indexOf("=");

  if (equalIndex === -1) continue;

  const key = trimmed.slice(0, equalIndex).trim();
  let value = trimmed.slice(equalIndex + 1).trim();

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  process.env[key] = value;
}

const email = "saroyaralice287@gmail.com";

async function makeAdmin() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in .env.local");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    const db = mongoose.connection.db;

    const result = await db.collection("users").updateOne(
      {
        email: email.toLowerCase().trim(),
      },
      {
        $set: {
          role: "admin",
        },
      }
    );

    if (result.matchedCount === 0) {
      console.log("❌ User not found:", email);
    } else if (result.modifiedCount === 0) {
      console.log("ℹ️ Account is already admin:", email);
    } else {
      console.log("✅ Admin created successfully:", email);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

makeAdmin();