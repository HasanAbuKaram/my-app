package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"rabbitmq"
)

func main() {
	conn, err := rabbitmq.ConnectRabbitMQ()
	if err != nil {
		log.Fatalf("Failed to connect: %s", err)
	}
	defer conn.Close()

	queueName := "my_queue"
	reader := bufio.NewReader(os.Stdin)

	for {
		fmt.Printf("Enter a message to send to %s (Ctrl+C to quit): ", queueName)
		message, _ := reader.ReadString('\n')
		rabbitmq.PublishMessage(queueName, message)
	}
}
