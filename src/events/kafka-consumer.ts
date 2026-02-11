import logger from "../utils/logger.js";
import { EventBus } from "./event-bus.js";
import { KafkaTopics, NotificationEventTypes } from "./event-types.js";

export const startKafkaConsumer = async () => {
  logger.info("Starting Kafka Consumer...");

  await EventBus.subscribe(
    KafkaTopics.NOTIFICATIONS,
    "notification-service-group",
    async (msg: any) => {
      const event = JSON.parse(msg.value);

      switch (event.eventType) {
        case NotificationEventTypes.AUTH_REGISTERED:
          // Await is crucial here! We want to finish processing before taking the next message
          //   await handleUserWelcome(event.payload);
          break;

        default:
          break;
      }
    },
  );
};
