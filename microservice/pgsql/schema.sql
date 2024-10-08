-- PR Headers Table
CREATE TABLE pr_headers (
    pr_number SERIAL PRIMARY KEY,          -- Auto-incremented PR number
    department VARCHAR(255),               -- Department making the request
    request_type VARCHAR(255),             -- Type of the request
    request_date DATE,                     -- Date of the request
    justification TEXT,                    -- Justification for the request
    approved_budget NUMERIC(12, 2)         -- Approved budget in SAR
);

-- PR Lines Table
CREATE TABLE pr_lines (
    line_id SERIAL PRIMARY KEY,            -- Auto-incremented line ID
    pr_number INT REFERENCES pr_headers(pr_number) ON DELETE CASCADE,  -- Foreign key to pr_headers
    item VARCHAR(255),                     -- Item description
    qty INT,                               -- Quantity requested
    uom VARCHAR(50),                       -- Unit of Measure (UoM)
    budget NUMERIC(12, 2),                 -- Budget for the line item
    required_by DATE,                      -- Required Delivery Date
    scope TEXT,                            -- Scope of work
    resource VARCHAR(255)                  -- Recommended source or resource
);

-- Attachments Table
CREATE TABLE pr_attachments (
    attachment_id SERIAL PRIMARY KEY,       -- Auto-incremented attachment ID
    pr_number INT REFERENCES pr_headers(pr_number) ON DELETE CASCADE, -- Foreign key to pr_headers
    file_path VARCHAR(255),                 -- Path to the uploaded file
    uploaded_at TIMESTAMP DEFAULT NOW()     -- Timestamp of when the file was uploaded
);
