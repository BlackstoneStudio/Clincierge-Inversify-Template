import convict from "convict";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "build", "development", "test"],
    default: "development",
    env: "NODE_ENV",
    arg: "NODE_ENV",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
  },
  db: {
    host: {
      doc: "Database host name/IP",
      format: String,
      default: "127.0.0.1",
      env: "DB_HOST",
    },
    name: {
      doc: "Database name",
      format: String,
      default: "inversify",
      env: "DB_NAME",
    },
    user: {
      doc: "Database user",
      format: String,
      default: "postgres",
      env: "DB_USER",
    },
    port: {
      doc: "database port",
      format: "port",
      // note that this can be overriden depending on what environment you run on
      // please check out development.json and test.json and production.json
      default: 5432,
      env: "DB_PORT",
    },
    password: {
      doc: "database password",
      format: "*",
      default: "password",
      env: "DB_PASSWORD",
      sensitive: true,
    },
  },
});

const env = config.get("env");
try {
  config.loadFile(path.join(__dirname, `${env}.json`));
} catch (error) {
  console.error("Could not load env file", error);
}
config.validate({ allowed: "strict" });

export default {
  ...config.getProperties(),
};
