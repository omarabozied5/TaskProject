// utils/validation.ts
import { validUsers } from './validUsers';

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 6;
}

export function userExists(email: string, password: string): boolean {
  return validUsers.some(
    (user) => user.email === email && user.password === password,
  );
}
