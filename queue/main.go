package main

import (
	"log"
	"rabbitmq"
)

func main() {
	conn, err := rabbitmq.ConnectRabbitMQ()
	if err != nil {
		log.Fatalf("Failed to connect: %s", err)
	}
	defer conn.Close()

	// Load configuration
	// config, err := rabbitmq.LoadConfig() // Update the import path
	// if err != nil {
	// 	log.Fatalf("Failed to load config: %s", err)
	// }

	// // Initialize queues
	// rabbitmq.InitQueues(config)

	queueName := "my_queue"
	rabbitmq.ConsumeMessages(queueName)
}
