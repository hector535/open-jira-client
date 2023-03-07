import { z } from "zod";

const emailSchema = z
  .string()
  .min(1, { message: "Email is required" })
  .email({ message: "Must be valid email" });

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be atleast 6 characters" });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });
