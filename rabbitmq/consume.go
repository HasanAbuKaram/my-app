package rabbitmq

import (
	"log"
)

// ConsumeMessages sets up a consumer for a specific queue
func ConsumeMessages(queueName string) {
	msgs, err := Channel.Consume(
		queueName, // Queue
		"",        // Consumer name (empty for auto-generated)
		true,      // Auto-acknowledge
		false,     // Exclusive
		false,     // No-local
		false,     // No-wait
		nil,       // Arguments
	)
	if err != nil {
		log.Fatalf("Failed to register a consumer: %s", err)
	}

	// Channel to block main thread from exiting
	forever := make(chan bool)

	go func() {
		for d := range msgs {
			log.Printf("Received a message: %s", d.Body)
		}
	}()

	log.Println("Waiting for messages. To exit press CTRL+C")
	<-forever
}
