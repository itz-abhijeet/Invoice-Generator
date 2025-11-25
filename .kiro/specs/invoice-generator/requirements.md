# Requirements Document

## Introduction

The Invoice Generator is a single-page web application that enables users to create, preview, and download professional invoices directly in their browser. The system provides a form-based interface for entering client information and invoice items, displays a live preview of the invoice, and generates downloadable PDF documents. The application runs entirely client-side without requiring backend infrastructure.

## Glossary

- **Invoice Generator**: The web application system that creates and manages invoices
- **User**: The person creating an invoice using the application
- **Client**: The recipient of the invoice (customer/business being billed)
- **Item Row**: A single line entry in the invoice containing item name, quantity, and price
- **Live Preview**: Real-time visual representation of the invoice that updates as the user enters data
- **PDF Document**: Portable Document Format file generated from the invoice data

## Requirements

### Requirement 1

**User Story:** As a user, I want to enter basic client and invoice information, so that I can identify the invoice recipient and transaction details.

#### Acceptance Criteria

1. WHEN the Invoice Generator loads THEN the system SHALL display input fields for Client Name, Address, Invoice Number, and Invoice Date
2. WHEN a user enters text into the Client Name field THEN the system SHALL accept alphanumeric characters and special characters
3. WHEN a user enters text into the Address field THEN the system SHALL accept multi-line text input
4. WHEN a user enters an Invoice Number THEN the system SHALL accept alphanumeric characters
5. WHEN a user selects or enters an Invoice Date THEN the system SHALL accept valid date formats

### Requirement 2

**User Story:** As a user, I want to add multiple items to an invoice with quantities and prices, so that I can bill for multiple products or services.

#### Acceptance Criteria

1. WHEN the Invoice Generator loads THEN the system SHALL display an items table with columns for Item Name, Quantity, and Price
2. WHEN the Invoice Generator loads THEN the system SHALL provide at least one empty item row
3. WHEN a user clicks the add item button THEN the system SHALL create a new item row in the table
4. WHEN a user enters an item name THEN the system SHALL accept alphanumeric characters and special characters
5. WHEN a user enters a quantity THEN the system SHALL accept positive numeric values
6. WHEN a user enters a price THEN the system SHALL accept positive numeric values with up to two decimal places

### Requirement 3

**User Story:** As a user, I want the system to automatically calculate totals, so that I don't have to manually compute invoice amounts.

#### Acceptance Criteria

1. WHEN a user enters or modifies quantity or price values THEN the system SHALL recalculate the subtotal immediately
2. WHEN the system calculates subtotal THEN the system SHALL sum all item line totals where line total equals quantity multiplied by price
3. WHEN a user enters a tax percentage THEN the system SHALL calculate tax amount as subtotal multiplied by tax percentage
4. WHEN the system calculates tax THEN the system SHALL compute the final total as subtotal plus tax amount
5. WHEN quantity or price fields are empty THEN the system SHALL treat empty values as zero for calculation purposes

### Requirement 4

**User Story:** As a user, I want to see a live preview of my invoice, so that I can verify the invoice appearance before downloading.

#### Acceptance Criteria

1. WHEN the Invoice Generator loads THEN the system SHALL display a live preview section showing invoice format
2. WHEN a user enters or modifies any form data THEN the system SHALL update the preview immediately
3. WHEN displaying the preview THEN the system SHALL show client details, invoice metadata, items table, and totals in a formatted layout
4. WHEN displaying item rows in preview THEN the system SHALL show Item Name, Quantity, Price, and calculated Line Total for each item
5. WHEN displaying totals in preview THEN the system SHALL show Subtotal, Tax amount, and Final Total

### Requirement 5

**User Story:** As a user, I want to download my invoice as a PDF, so that I can save, print, or email it to clients.

#### Acceptance Criteria

1. WHEN the Invoice Generator loads THEN the system SHALL display a Download PDF button
2. WHEN a user clicks the Download PDF button THEN the system SHALL generate a PDF document containing the invoice data
3. WHEN the system generates a PDF THEN the PDF SHALL include a header section with invoice title
4. WHEN the system generates a PDF THEN the PDF SHALL include client details and invoice metadata
5. WHEN the system generates a PDF THEN the PDF SHALL include an items table with all entered items and their line totals
6. WHEN the system generates a PDF THEN the PDF SHALL include subtotal, tax, and final total amounts
7. WHEN the system generates a PDF THEN the PDF SHALL include a footer section
8. WHEN the PDF is generated THEN the system SHALL trigger a browser download of the PDF file

### Requirement 6

**User Story:** As a user, I want the application to work on different screen sizes, so that I can create invoices on desktop or mobile devices.

#### Acceptance Criteria

1. WHEN the Invoice Generator loads on a desktop screen THEN the system SHALL display the form on the left side and preview on the right side in a two-column layout
2. WHEN the Invoice Generator loads on a mobile screen THEN the system SHALL stack the form and preview vertically
3. WHEN the viewport width changes THEN the system SHALL adjust the layout responsively
4. WHEN displayed on any screen size THEN the system SHALL maintain readability of all text and form elements
5. WHEN displayed on mobile screens THEN the system SHALL ensure all interactive elements remain accessible and usable

### Requirement 7

**User Story:** As a user, I want a clean and minimal interface, so that I can focus on entering invoice data without distraction.

#### Acceptance Criteria

1. WHEN the Invoice Generator loads THEN the system SHALL apply consistent typography and spacing throughout the interface
2. WHEN displaying form elements THEN the system SHALL use clear labels and appropriate input field sizes
3. WHEN displaying the invoice preview THEN the system SHALL use table formatting with clear borders and alignment
4. WHEN displaying buttons THEN the system SHALL provide clear visual affordances for interactive elements
5. WHEN the user interacts with form elements THEN the system SHALL provide appropriate visual feedback

### Requirement 8

**User Story:** As a developer, I want the code organized into clear functions and separate files, so that the application is maintainable and easy to understand.

#### Acceptance Criteria

1. WHEN the application is structured THEN the system SHALL separate HTML markup into index.html
2. WHEN the application is structured THEN the system SHALL separate CSS styles into style.css
3. WHEN the application is structured THEN the system SHALL separate JavaScript logic into script.js
4. WHEN the JavaScript code is organized THEN the system SHALL include a dedicated addItemRow function for adding item rows
5. WHEN the JavaScript code is organized THEN the system SHALL include a dedicated calculateTotals function for computing invoice amounts
6. WHEN the JavaScript code is organized THEN the system SHALL include a dedicated generatePDF function for creating PDF documents
7. WHEN the application loads THEN the system SHALL include jsPDF and jspdf-autotable libraries via CDN links
