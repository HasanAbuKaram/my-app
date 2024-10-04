package middleware

import (
	"bytes"
	"fmt"
	"log"
)

var (
	buf        bytes.Buffer
	loggerInfo = log.New(&buf, "INFO: ", log.Lshortfile)
	loggerErr  = log.New(&buf, "ERR: ", log.Lshortfile)

	infOf = func(info string) {
		loggerInfo.Output(2, info)
		fmt.Print(&buf)
	}

	erroOf = func(info string) {
		loggerErr.Output(2, info)
		fmt.Print(&buf)
	}
)
