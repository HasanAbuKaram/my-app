package main

import (
	"fmt"
	"net/http"
	"sync"
	"time"
)

func main() {
	var wg sync.WaitGroup
	numRequests := 10 // Number of concurrent requests

	for i := 0; i < numRequests; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			resp, err := http.Get("http://localhost:8080/procurement")
			if err != nil {
				fmt.Printf("Error making request %d: %s\n", i, err)
				return
			}
			defer resp.Body.Close()
			fmt.Printf("Request %d: Response status %s\n", i, resp.Status)
		}(i)
		time.Sleep(100 * time.Millisecond) // Slight delay to space out requests
	}

	wg.Wait()
}
