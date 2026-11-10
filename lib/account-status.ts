// Shared by the auth config (server) and the auth forms (client), so keep it free of server imports.

/** `banReason` of accounts that signed up and wait for an administrator to activate them. */
export const PENDING_ACTIVATION = "pending_activation";

/** Sign-in error for pending accounts. The login form matches on it to show a notice instead of an error. */
export const PENDING_ACTIVATION_MESSAGE =
    "Your account is pending activation. An administrator needs to approve it before you can sign in.";
