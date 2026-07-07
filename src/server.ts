import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { seedDatabase } from "./app/seed/seed";
import { syncPermissions } from "./app/registry/accessPlicy.sync";



async function bootstrap() {
  try {
    console.log("Connecting to MongoDB...", config.database_url);
    await mongoose.connect(config.database_url! as string);

    console.log("MongoDB Connected");
    await seedDatabase();

    // Automatically sync all registered policies
    await syncPermissions()

    const port = config.port || 3000;
    console.log(`Starting server on port ======>>> ${port}...`);

    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

bootstrap();
