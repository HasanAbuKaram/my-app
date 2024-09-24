package rabbitmq

import (
	"log"

	"github.com/rabbitmq/amqp091-go"
)

// Global variable to hold the channel
var Channel *amqp091.Channel

// ConnectRabbitMQ establishes a connection and channel with RabbitMQ
func ConnectRabbitMQ() (*amqp091.Connection, error) {
	conn, err := amqp091.Dial("amqp://user:password@localhost:5672/")
	if err != nil {
		log.Fatalf("Failed to connect to RabbitMQ: %s", err)
	}

	Channel, err = conn.Channel()
	if err != nil {
		log.Fatalf("Failed to open a channel: %s", err)
	}

	log.Println("Successfully connected to RabbitMQ")
	return conn, nil
}
