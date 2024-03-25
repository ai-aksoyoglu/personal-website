import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getConfig = (key, defaultValue = undefined) => {
  if (process.env[key] === undefined && defaultValue === undefined) {
    throw new Error(
      `Essential environment variable is missing: ${key}. Check your .env file and ensure it contains the necessary variables.`
    );
  }
  return process.env[key] || defaultValue;
};

const PORT = getConfig('PORT', 3000);
const MAILCHIMP_SERVER = getConfig('MAILCHIMP_SERVER', 'us20');
const MAILCHIMP_LISTID = getConfig('MAILCHIMP_LISTID');
const MAILCHIMP_APIKEY = getConfig('MAILCHIMP_APIKEY');
const MONGODB_PROTOCOL = getConfig('MONGODB_PROTOCOL');
const MONGODB_USERNAME = getConfig('MONGODB_USERNAME');
const MONGODB_PASSWORD = getConfig('MONGODB_PASSWORD');
const MONGODB_HOST = getConfig('MONGODB_HOST');
const MONGODB_TODO_DB = getConfig('MONGODB_TODO_DB');
const MONGODB_BLOG_DB = getConfig('MONGODB_BLOG_DB');
const PUBLIC_DIRECTORY = path.join(__dirname, 'public');

export default {
  PORT,
  MAILCHIMP_SERVER,
  MAILCHIMP_LISTID,
  MAILCHIMP_APIKEY,
  MONGODB_PROTOCOL,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_TODO_DB,
  MONGODB_BLOG_DB,
  PUBLIC_DIRECTORY,
};
