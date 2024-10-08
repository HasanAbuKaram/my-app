CREATE TABLE pr_header (
  id SERIAL PRIMARY KEY,
  pr_number VARCHAR(20) UNIQUE NOT NULL,
  pr_type VARCHAR(20) CHECK (pr_type IN ('Material', 'Service', 'Budgetary')),
  creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  required_date DATE NOT NULL,
  documents JSONB
);

CREATE TABLE pr_lines (
  id SERIAL PRIMARY KEY,
  pr_header_id INTEGER REFERENCES pr_header(id) NOT NULL,
  line_number INTEGER NOT NULL,
  item TEXT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  uom VARCHAR(10), -- Unit of Measure
  description TEXT,
  required_date DATE NOT NULL
);
