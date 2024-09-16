const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true, // no discrepancy errors
    });
  } catch (error) {
    console.log(error);
  }
}
