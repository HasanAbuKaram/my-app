package main

type Config struct {
	RabbitMQ RabbitMQConfig `json:"rabbitmq"`
	Services ServiceConfig  `json:"services"`
}

type RabbitMQConfig struct {
	URL      string  `json:"url"`
	User     string  `json:"user"`
	Password string  `json:"password"`
	Queues   []Queue `json:"queues"`
}

type Queue struct {
	Name        string `json:"name"`
	Priority    int    `json:"priority"`
	Description string `json:"description"`
}

type ServiceConfig struct {
	Proxy       ProxyConfig `json:"proxy"`
	Procurement []Service   `json:"procurement"`
	Maintenance Service     `json:"maintenance"`
}

type ProxyConfig struct {
	ListenPort int `json:"listen_port"`
}

type Service struct {
	Name string `json:"name"`
	URL  string `json:"url"`
}
