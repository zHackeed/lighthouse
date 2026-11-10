import { z } from "zod";

const email = z.email("Enter a valid email address.");

export const signInSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password."),
});

export const signUpSchema = z
  .object({
    name: z.string().trim().min(1, "Enter your name."),
    email,
    password: z.string().min(8, "Use at least 8 characters.").max(128, "Use at most 128 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const totpSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "Enter the 6-digit code."),
});

export const recoveryCodeSchema = z.object({
  code: z.string().trim().min(1, "Enter a recovery code."),
});

export const passwordSchema = z.object({
  password: z.string().min(1, "Enter your password."),
});
