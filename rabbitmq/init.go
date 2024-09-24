// init.go
package rabbitmq

import (
	"encoding/json"
	"log"
	"os"
	"path/filepath"
)

// Config holds the configuration for queues
type Config struct {
	Queues []string `json:"queues"`
}

func init() {
	conn, err := ConnectRabbitMQ()
	if err != nil {
		log.Fatalf("Failed to connect: %s", err)
	}
	defer conn.Close()

	// Load configuration
	config, err := LoadConfig() // Update the import path
	if err != nil {
		log.Fatalf("Failed to load config: %s", err)
	}

	// Initialize queues
	InitQueues(config)
}

// LoadConfig reads the configuration from a file
func LoadConfig() (*Config, error) {
	// Print the current working directory
	wd, err := os.Getwd()
	if err != nil {
		return nil, err
	}
	// fmt.Println("Current working directory:", wd)

	var relPath = "config/config.json"
	// Set the path to the config file based on the current working directory
	// var relPath string
	// if wd == "/home/abukaram/my-app" {
	// relPath = "config/config.json" // when run from the workspace
	// } else {
	// 	relPath = "../config/config.json" // when run from the queue directory
	// }

	// Construct the absolute path
	absPath := filepath.Join(wd, relPath)
	data, err := os.ReadFile(absPath)
	if err != nil {
		return nil, err
	}

	var config Config
	if err := json.Unmarshal(data, &config); err != nil {
		return nil, err
	}

	return &config, nil
}

// InitQueues initializes the queues based on the configuration
func InitQueues(config *Config) {
	for _, queueName := range config.Queues {
		DeclareQueue(queueName)
	}
}
