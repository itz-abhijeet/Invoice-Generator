# Design Document

## Overview

The Invoice Generator is a client-side single-page application built with vanilla HTML, CSS, and JavaScript. The application follows a simple Model-View pattern where form inputs drive both the live preview display and PDF generation. The system uses event-driven updates to maintain synchronization between user input and visual output, ensuring real-time feedback as users create invoices.

The application consists of three main components: a data entry form, a live preview display, and a PDF generation module. All calculations and rendering occur in the browser without server communication.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Browser Environment                   │
│                                                          │
│  ┌────────────────┐         ┌──────────────────────┐   │
│  │   HTML Form    │────────▶│   Event Handlers     │   │
│  │   (Input)      │         │                      │   │
│  └────────────────┘         └──────────┬───────────┘   │
│                                        │               │
│                                        ▼               │
│  ┌────────────────┐         ┌──────────────────────┐   │
│  │ Live Preview   │◀────────│  Calculation Engine  │   │
│  │   (Display)    │         │                      │   │
│  └────────────────┘         └──────────┬───────────┘   │
│                                        │               │
│                                        ▼               │
│  ┌────────────────┐         ┌──────────────────────┐   │
│  │  PDF Output    │◀────────│   PDF Generator      │   │
│  │                │         │   (jsPDF)            │   │
│  └────────────────┘         └──────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Component Interaction Flow

1. User enters data into form fields
2. Input event triggers event handlers
3. Event handlers call calculation engine
4. Calculation engine updates totals
5. Preview display updates with new data
6. User clicks Download PDF button
7. PDF generator reads current form state
8. PDF generator creates and downloads PDF file

## Components and Interfaces

### HTML Structure (index.html)

**Purpose:** Provides the document structure and semantic markup for the application.

**Key Elements:**
- Form container with input fields for client information
- Items table with dynamic rows
- Add item button
- Live preview section
- Download PDF button
- CDN script tags for jsPDF and jspdf-autotable

### Styling Layer (style.css)

**Purpose:** Defines visual presentation and responsive layout.

**Key Responsibilities:**
- Two-column layout for desktop (form left, preview right)
- Single-column stacked layout for mobile
- Table styling for items and preview
- Form input styling
- Button styling with hover states
- Responsive breakpoints using media queries

**Responsive Breakpoint:**
- Desktop: > 768px (two-column layout)
- Mobile: ≤ 768px (stacked layout)

### Application Logic (script.js)

**Purpose:** Implements all interactive behavior, calculations, and PDF generation.

**Core Functions:**

#### `addItemRow()`
- Creates a new table row element
- Adds input fields for item name, quantity, and price
- Attaches event listeners for calculation updates
- Appends row to items table

#### `calculateTotals()`
- Iterates through all item rows
- Calculates line total for each item (quantity × price)
- Sums all line totals to get subtotal
- Calculates tax amount (subtotal × tax rate)
- Calculates final total (subtotal + tax)
- Updates preview display with calculated values

#### `generatePDF()`
- Reads current form values
- Creates new jsPDF document
- Adds header with invoice title
- Adds client details section
- Creates items table using jspdf-autotable
- Adds totals section
- Adds footer
- Triggers PDF download

#### `updatePreview()`
- Reads all form field values
- Updates preview section with current data
- Formats currency values
- Displays calculated totals

#### Event Listeners
- Input events on quantity and price fields trigger `calculateTotals()`
- Input events on all form fields trigger `updatePreview()`
- Click event on add item button triggers `addItemRow()`
- Click event on download button triggers `generatePDF()`

## Data Models

### Invoice Data Structure

The application works with a simple data structure represented by form values:

```javascript
{
  clientName: string,
  address: string,
  invoiceNumber: string,
  invoiceDate: string,
  items: [
    {
      name: string,
      quantity: number,
      price: number,
      lineTotal: number  // calculated
    }
  ],
  taxRate: number,      // percentage (e.g., 10 for 10%)
  subtotal: number,     // calculated
  taxAmount: number,    // calculated
  finalTotal: number    // calculated
}
```

### Calculation Formulas

- **Line Total** = Quantity × Price
- **Subtotal** = Σ(Line Totals)
- **Tax Amount** = Subtotal × (Tax Rate / 100)
- **Final Total** = Subtotal + Tax Amount

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Item row addition increases count
*For any* initial item row count, clicking the add item button should increase the number of item rows by exactly one.
**Validates: Requirements 2.3**

### Property 2: Calculation correctness
*For any* set of items with quantities and prices, and any tax rate, the system should calculate:
- Line totals as quantity × price for each item
- Subtotal as the sum of all line totals
- Tax amount as subtotal × (tax rate / 100)
- Final total as subtotal + tax amount
**Validates: Requirements 3.2, 3.3, 3.4**

### Property 3: Empty values treated as zero
*For any* item row where quantity or price is empty, the line total calculation should treat the empty value as zero.
**Validates: Requirements 3.5**

### Property 4: Preview updates on input change
*For any* form field modification, the preview section should update to reflect the new value immediately.
**Validates: Requirements 4.2**

### Property 5: Preview contains all invoice data
*For any* invoice state, the preview should display all entered client details, invoice metadata, all item rows with their line totals, and all calculated totals (subtotal, tax, final total).
**Validates: Requirements 4.3, 4.4**

### Property 6: PDF contains complete invoice data
*For any* invoice state, the generated PDF should include a header, all client details, all invoice metadata, all items with line totals, all calculated totals, and a footer.
**Validates: Requirements 5.3, 5.4, 5.5, 5.6, 5.7**

### Property 7: PDF generation triggers download
*For any* invoice state, clicking the Download PDF button should result in a browser download action being triggered.
**Validates: Requirements 5.8**

### Property 8: Responsive layout adaptation
*For any* viewport width change that crosses the mobile/desktop breakpoint (768px), the layout should switch between two-column and stacked configurations.
**Validates: Requirements 6.3**

### Property 9: Calculation updates on input change
*For any* modification to quantity or price fields, the subtotal, tax amount, and final total should recalculate immediately.
**Validates: Requirements 3.1**

## Error Handling

### Input Validation

**Invalid Numeric Inputs:**
- Non-numeric values in quantity or price fields should be handled gracefully
- Negative values should be prevented or converted to positive
- Empty fields should be treated as zero in calculations

**Date Input:**
- Invalid date formats should be handled by the HTML5 date input type
- Fallback to text input for browsers without date support

**Missing Data:**
- PDF generation should proceed even with incomplete data
- Empty fields should display as blank in the PDF
- At least one item row should always be present

### PDF Generation Errors

**Library Loading Failures:**
- Check for jsPDF availability before attempting PDF generation
- Display user-friendly error message if libraries fail to load
- Provide fallback message to check internet connection

**PDF Creation Failures:**
- Wrap PDF generation in try-catch block
- Log errors to console for debugging
- Display user-friendly error message if PDF generation fails

### Browser Compatibility

**Feature Detection:**
- Check for required browser APIs before use
- Provide graceful degradation for older browsers
- Test in major browsers (Chrome, Firefox, Safari, Edge)

## Testing Strategy

### Unit Testing

The application will use browser-based testing with a simple test framework or manual testing for core functionality:

**Calculation Functions:**
- Test `calculateTotals()` with various item combinations
- Test edge cases: empty items, zero quantities, zero prices
- Test decimal precision in price calculations
- Test tax calculation with various rates

**DOM Manipulation:**
- Test `addItemRow()` creates proper HTML structure
- Test event listeners are properly attached to new rows
- Test `updatePreview()` correctly updates preview elements

**PDF Generation:**
- Test `generatePDF()` creates valid PDF structure
- Test PDF includes all required sections
- Test PDF formatting and layout

### Property-Based Testing

The application will use fast-check (JavaScript property-based testing library) to verify universal properties:

**Property Test Configuration:**
- Each property test should run a minimum of 100 iterations
- Use appropriate generators for different data types (strings, numbers, arrays)

**Test Tagging:**
- Each property-based test must include a comment tag in this format:
  - `// Feature: invoice-generator, Property {number}: {property_text}`
  - Example: `// Feature: invoice-generator, Property 2: Calculation correctness`

**Property Tests to Implement:**

1. **Item Row Addition Property** (Property 1)
   - Generate random initial row counts
   - Verify clicking add button increases count by one
   - Validates: Requirements 2.3

2. **Calculation Correctness Property** (Property 2)
   - Generate random arrays of items with quantities and prices
   - Generate random tax rates
   - Verify all calculations are mathematically correct
   - Validates: Requirements 3.2, 3.3, 3.4

3. **Empty Value Handling Property** (Property 3)
   - Generate items with some empty quantity or price values
   - Verify calculations treat empty as zero
   - Validates: Requirements 3.5

4. **Preview Update Property** (Property 4)
   - Generate random form field changes
   - Verify preview updates after each change
   - Validates: Requirements 4.2

5. **Preview Completeness Property** (Property 5)
   - Generate random invoice data
   - Verify preview contains all data elements
   - Validates: Requirements 4.3, 4.4

6. **PDF Completeness Property** (Property 6)
   - Generate random invoice data
   - Verify generated PDF contains all required sections
   - Validates: Requirements 5.3, 5.4, 5.5, 5.6, 5.7

7. **PDF Download Property** (Property 7)
   - Verify PDF generation triggers download
   - Validates: Requirements 5.8

8. **Responsive Layout Property** (Property 8)
   - Test layout changes at various viewport widths
   - Verify layout switches at breakpoint
   - Validates: Requirements 6.3

9. **Reactive Calculation Property** (Property 9)
   - Generate random quantity/price changes
   - Verify totals recalculate immediately
   - Validates: Requirements 3.1

### Integration Testing

**End-to-End Workflows:**
- Complete invoice creation flow: enter data → preview → download PDF
- Multiple item addition and calculation flow
- Responsive layout changes across viewport sizes

**Browser Testing:**
- Test in Chrome, Firefox, Safari, and Edge
- Test on mobile devices (iOS Safari, Chrome Mobile)
- Verify PDF downloads work in all browsers

### Manual Testing

**Visual Quality:**
- Verify clean, minimal styling (Requirements 7.1-7.5)
- Verify readability on all screen sizes (Requirements 6.4)
- Verify interactive element accessibility (Requirements 6.5)

**PDF Output:**
- Verify PDF formatting and appearance
- Verify PDF prints correctly
- Verify PDF opens in various PDF readers

## Implementation Notes

### Technology Stack

- **HTML5:** Semantic markup, form elements, date input
- **CSS3:** Flexbox/Grid for layout, media queries for responsiveness
- **Vanilla JavaScript:** ES6+ features, DOM manipulation, event handling
- **jsPDF:** PDF generation library (via CDN)
- **jspdf-autotable:** Table plugin for jsPDF (via CDN)

### Browser Support

- Modern browsers with ES6 support
- Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- Mobile browsers: iOS Safari 12+, Chrome Mobile 60+

### Performance Considerations

- Debounce calculation updates if performance issues arise
- Limit maximum number of item rows if needed
- Optimize DOM updates in preview section

### Accessibility Considerations

- Use semantic HTML elements
- Provide proper labels for all form inputs
- Ensure keyboard navigation works for all interactive elements
- Maintain sufficient color contrast
- Test with screen readers if possible

### Future Enhancements

- Local storage persistence of invoice data
- Multiple invoice templates
- Company logo upload
- Currency selection
- Item database with autocomplete
- Invoice history and management
- Email invoice functionality
- Print preview mode
