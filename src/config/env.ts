import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value)
    throw new Error(`Missing required env var: ${name}. Check your .env file`);
  return value;
}

export const env = {
  baseUrl: required("BASE_URL"),
  username: required("HUDL_USERNAME"),
  password: required("HUDL_PASSWORD"),
};
