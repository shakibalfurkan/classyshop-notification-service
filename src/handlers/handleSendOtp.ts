import type { TSendOtpPayload } from "../types/index.js";
import logger from "../utils/logger.js";
import { sendEmail } from "../utils/sendMail.js";

export const handleSendOtp = async (payload: TSendOtpPayload) => {
  const { email, userName, otp, reason } = payload;
  const templateName =
    reason === "email-verification"
      ? "email-verification"
      : "account-verification";

  await sendEmail(email, "Your One Time Password (OTP)", templateName, {
    userName,
    otp,
  });
  logger.info(`OTP email sent to ${email} for reason: ${reason}`);
};
