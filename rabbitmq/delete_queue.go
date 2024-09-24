// rabbitmq/delete_queue.go
package rabbitmq

import (
	"log"

	"github.com/rabbitmq/amqp091-go"
)

// DeleteQueue deletes a RabbitMQ queue with the given name
func DeleteQueue(ch *amqp091.Channel, queueName string) error {
	_, err := ch.QueueDelete(
		queueName, // Queue name
		false,     // IfUnused - only delete if the queue is unused
		false,     // IfEmpty - only delete if the queue is empty
		false,     // NoWait - do not wait for a server response
	)
	if err != nil {
		log.Printf("Failed to delete the queue: %s", err)
		return err
	}

	log.Printf("Queue %s deleted successfully", queueName)
	return nil
}
