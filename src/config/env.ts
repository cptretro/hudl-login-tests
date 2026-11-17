import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value)
    throw new Error(`Missing required env var: ${name}. Check your .env file`);
  return value;
}

export const env = {
  get baseUrl() {
    return required("BASE_URL");
  },
  get username() {
    return required("HUDL_USERNAME");
  },
  get password() {
    return required("HUDL_PASSWORD");
  },
};
