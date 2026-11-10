// A new session never has an active organization (Better Auth leaves it unset), so a fresh
// sign-in goes straight to the picker. Sending it to "/" would render the console shell first
// and then redirect back, which flashes the console and remounts the auth background.
export const AFTER_SIGN_IN_PATH = "/organizations";
