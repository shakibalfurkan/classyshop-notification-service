import type { TSendOtpPayload } from "../types/index.js";
import logger from "../utils/logger.js";
import { sendEmail } from "../utils/sendMail.js";

export const handleSendOtp = async (payload: TSendOtpPayload) => {
  const { email, firstName, otp, reason } = payload;
  const templateName =
    reason === "email-verification"
      ? "email-verification"
      : "auth-verification";

  await sendEmail(email, "Your One Time Password (OTP)", templateName, {
    userName: firstName,
    otp,
  });
  logger.info(`OTP email sent to ${email} for reason: ${reason}`);
};
