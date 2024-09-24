package rabbitmq

import (
	"fmt"
	"log"

	"github.com/rabbitmq/amqp091-go"
)

// PublishMessage publishes a message to the specified queue
func PublishMessage(queueName, message string) {
	err := Channel.Publish(
		"",        // Exchange
		queueName, // Routing key (queue name)
		false,     // Mandatory
		false,     // Immediate
		amqp091.Publishing{
			ContentType: "text/plain",
			Body:        []byte(message),
		})
	if err != nil {
		log.Fatalf("Failed to publish to queue %s: %s", queueName, err)
	}
	fmt.Printf("Message sent to %s!\n", queueName)
}
