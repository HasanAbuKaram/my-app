package main

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
