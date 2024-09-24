package rabbitmq

import (
	"log"

	"github.com/rabbitmq/amqp091-go"
)

// DeclareQueue declares a queue and returns it
func DeclareQueue(queueName string) amqp091.Queue {
	q, err := Channel.QueueDeclare(
		queueName, // Queue name
		true,      // Durable
		false,     // Delete when unused
		false,     // Exclusive
		false,     // No-wait
		nil,       // Arguments
	)
	if err != nil {
		log.Fatalf("Failed to declare queue %s: %s", queueName, err)
	}
	return q
}
