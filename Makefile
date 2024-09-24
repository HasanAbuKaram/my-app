.PHONY: run-all gateway procurement_8081 procurement_8082 maintenance

run-all: gateway procurement_8081 procurement_8082 maintenance

gateway:
	go run ./gateway &

procurement_8081:
	go run ./services/procurement_8081 &

procurement_8082:
	go run ./services/procurement_8082 &

maintenance:
	go run ./services/maintenance &
