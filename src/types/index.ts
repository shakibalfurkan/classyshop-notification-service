export type TSendOtpPayload = {
  reason: "email-verification" | "auth-verification";
  email: string;
  firstName: string;
  otp: string;
};
