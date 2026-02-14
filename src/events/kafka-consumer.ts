import { handleSendOtp } from "../handlers/handleSendOtp.js";
import type { TSendOtpPayload } from "../types/index.js";
import logger from "../utils/logger.js";
import { EventBus } from "./event-bus.js";
import { KafkaTopics, NotificationEventTypes } from "./event-types.js";

export const startKafkaConsumer = async () => {
  logger.info("Starting Kafka Consumer...");

  await EventBus.subscribe(
    KafkaTopics.NOTIFICATIONS,
    "notification-service-group",
    async (event: Record<string, any>) => {
      switch (event.eventType) {
        case NotificationEventTypes.AUTH_REGISTERED:
          // Await is crucial here! We want to finish processing before taking the next message
          //   await handleUserWelcome(event.payload);
          break;
        case NotificationEventTypes.AUTH_OTP:
          console.log(
            "auth-verification-otp and the reason is:",
            event.payload.reason,
          );
          await handleSendOtp(event.payload as TSendOtpPayload);
          break;

        default:
          break;
      }
    },
  );
};
