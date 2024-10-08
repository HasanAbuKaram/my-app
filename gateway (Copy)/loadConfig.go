package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
)

// Global variable to hold the configuration data
var AppConfig Config

// LoadConfig function loads the configuration from the specified JSON file
func LoadConfig(filePath string) error {
	// Open the config file
	configFile, err := os.Open(filePath)
	if err != nil {
		return fmt.Errorf("failed to open config file: %v", err)
	}
	defer configFile.Close()

	// Read the file's contents
	byteValue, err := io.ReadAll(configFile)
	if err != nil {
		return fmt.Errorf("failed to read config file: %v", err)
	}

	// Unmarshal the JSON data into the AppConfig struct
	err = json.Unmarshal(byteValue, &AppConfig)
	if err != nil {
		return fmt.Errorf("failed to unmarshal config JSON: %v", err)
	}

	fmt.Println("Configuration loaded successfully.")
	return nil
}
