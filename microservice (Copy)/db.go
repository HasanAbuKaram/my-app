package main

import (
	"database/sql"

	_ "github.com/lib/pq" // PostgreSQL driver
)

// Define the structure of the PR header
type PRHeader struct {
	Department     string   `json:"department"`
	RequestType    string   `json:"requestType"`
	RequestDate    string   `json:"requestDate"`
	Justification  string   `json:"justification"`
	ApprovedBudget float64  `json:"approvedBudget"`
	LineItems      []PRLine `json:"lineItems"`
}

// Define the structure of the PR lines
type PRLine struct {
	Item       string  `json:"item"`
	Qty        int     `json:"qty"`
	UoM        string  `json:"uom"`
	Budget     float64 `json:"budget"`
	RequiredBy string  `json:"rdd"`
	Scope      string  `json:"scope"`
	Resource   string  `json:"resource"`
}

// Define the structure for attachments
type Attachment struct {
	PRNumber int    `json:"pr_number"`
	FileName string `json:"file_name"`
	FilePath string `json:"file_path"`
}

// Insert PR header into the database
func insertPRHeader(tx *sql.Tx, header PRHeader) (int, error) {
	query := `
        INSERT INTO pr_headers (department, request_type, request_date, justification, approved_budget)
        VALUES ($1, $2, $3, $4, $5) RETURNING pr_number
    `
	var prNumber int
	err := tx.QueryRow(query, header.Department, header.RequestType, header.RequestDate, header.Justification, header.ApprovedBudget).Scan(&prNumber)
	if err != nil {
		return 0, err
	}
	return prNumber, nil
}

// Insert PR lines into the database
func insertPRLines(tx *sql.Tx, prNumber int, lineItems []PRLine) error {
	for _, line := range lineItems {
		query := `
            INSERT INTO pr_lines (pr_number, item, qty, uom, budget, required_by, scope, resource)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `
		_, err := tx.Exec(query, prNumber, line.Item, line.Qty, line.UoM, line.Budget, line.RequiredBy, line.Scope, line.Resource)
		if err != nil {
			return err
		}
	}
	return nil
}

// Insert attachment metadata into the database
func insertAttachment(tx *sql.Tx, attachment Attachment) error {
	query := `
        INSERT INTO attachments (pr_number, file_name, file_path)
        VALUES ($1, $2, $3)
    `
	_, err := tx.Exec(query, attachment.PRNumber, attachment.FileName, attachment.FilePath)
	return err
}
