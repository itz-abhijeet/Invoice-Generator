# Invoice Generator

A modern, client-side web application for creating professional invoices with live preview and PDF export capabilities.

![Invoice Generator](https://img.shields.io/badge/Status-Complete-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📋 Table of Contents

- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Features](#features)
- [How Kiro Accelerated Development](#how-kiro-accelerated-development)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Technical Details](#technical-details)
- [Code Examples](#code-examples)

---

## 🎯 Problem Statement

Small businesses and freelancers often face challenges when creating professional invoices:

- **Manual Calculations**: Prone to errors when calculating line totals, subtotals, taxes, and final amounts
- **Formatting Inconsistency**: Difficult to maintain professional appearance across different invoices
- **Software Costs**: Professional invoicing software can be expensive with recurring subscription fees
- **Accessibility**: Many solutions require installation or internet connectivity for cloud-based services
- **Complexity**: Existing tools often have steep learning curves with unnecessary features

**The Need**: A simple, free, browser-based solution that allows users to quickly create professional invoices without installation, subscriptions, or complex setup.

---

## ✅ Solution

The Invoice Generator is a lightweight, single-page web application that runs entirely in the browser. It provides:

### Core Capabilities

1. **Dynamic Form Interface**: Easy-to-use form for entering client details and invoice items
2. **Live Preview**: Real-time visual representation of the invoice as you type
3. **Automatic Calculations**: Instant computation of line totals, subtotals, tax amounts, and final totals
4. **PDF Export**: One-click download of professionally formatted PDF invoices
5. **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
6. **Zero Dependencies**: No backend required, no data stored externally, complete privacy

### Technology Stack

- **HTML5**: Semantic markup and modern form elements
- **CSS3**: Responsive grid layout with mobile-first design
- **Vanilla JavaScript**: ES6+ features for clean, maintainable code
- **jsPDF**: Client-side PDF generation
- **jspdf-autotable**: Professional table formatting in PDFs

---

## 🚀 How Kiro Accelerated Development

This project was built using **Kiro's Spec-Driven Development workflow**, which transformed the development process from concept to completion.

### Traditional Development vs. Kiro-Assisted Development

| Aspect | Traditional Approach | With Kiro |
|--------|---------------------|-----------|
| Requirements Gathering | Manual documentation, often incomplete | Structured EARS format with acceptance criteria |
| Design Phase | Ad-hoc planning, missing edge cases | Comprehensive design with correctness properties |
| Implementation | Trial and error, frequent refactoring | Task-by-task execution with clear objectives |
| Testing | Written after bugs appear | Property-based testing planned from design |
| Time to MVP | Days to weeks | Hours |

### Kiro's Spec Workflow in Action

#### 1. **Requirements Phase**
Kiro helped transform a rough idea into formal requirements using EARS (Easy Approach to Requirements Syntax):

```markdown
### Requirement 3
**User Story:** As a user, I want the system to automatically calculate totals, 
so that I don't have to manually compute invoice amounts.

#### Acceptance Criteria
1. WHEN a user enters or modifies quantity or price values 
   THEN the system SHALL recalculate the subtotal immediately
2. WHEN the system calculates subtotal 
   THEN the system SHALL sum all item line totals where line total equals quantity multiplied by price
3. WHEN a user enters a tax percentage 
   THEN the system SHALL calculate tax amount as subtotal multiplied by tax percentage
```

**Impact**: Clear, testable requirements that eliminated ambiguity and scope creep.

#### 2. **Design Phase**
Kiro generated a comprehensive design document including:

- Architecture diagrams
- Component interfaces
- Data models
- **Correctness Properties** for validation

Example correctness property:
```markdown
### Property 2: Calculation correctness
*For any* set of items with quantities and prices, and any tax rate, the system should calculate:
- Line totals as quantity × price for each item
- Subtotal as the sum of all line totals
- Tax amount as subtotal × (tax rate / 100)
- Final total as subtotal + tax amount
**Validates: Requirements 3.2, 3.3, 3.4**
```

**Impact**: Every feature had a clear specification before writing code, reducing bugs and rework.

#### 3. **Task Breakdown**
Kiro created an actionable implementation plan with 9 major tasks and 20+ subtasks:

```markdown
- [x] 3. Implement core JavaScript functionality
  - [x] 3.1 Create script.js and implement addItemRow function
  - [x] 3.3 Implement calculateTotals function
  - [ ] 3.4 Write property test for calculation correctness
  - [x] 3.6 Write property test for reactive calculation
```

**Impact**: Clear roadmap with incremental progress, making it easy to track completion.

#### 4. **Implementation**
Kiro executed tasks one at a time, ensuring each was complete before moving forward:

**Example: Automatic Calculation Implementation**
```javascript
/**
 * Calculates all totals including line totals, subtotal, tax, and final total
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 8.5
 */
function calculateTotals() {
    const tbody = document.getElementById('items-tbody');
    const rows = tbody.getElementsByTagName('tr');
    let subtotal = 0;
    
    // Iterate through all item rows
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const quantity = parseFloat(quantityInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        
        // Calculate line total (Requirement 3.2)
        const lineTotal = quantity * price;
        subtotal += lineTotal;
    }
    
    // Calculate tax amount (Requirement 3.3)
    const taxAmount = subtotal * (taxRate / 100);
    
    // Calculate final total (Requirement 3.4)
    const finalTotal = subtotal + taxAmount;
    
    // Update preview with formatted values
    document.getElementById('preview-subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('preview-tax').textContent = '$' + taxAmount.toFixed(2);
    document.getElementById('preview-total').textContent = '$' + finalTotal.toFixed(2);
}
```

**Impact**: Code directly maps to requirements, making it easy to verify correctness.

### Development Timeline

```
Hour 1: Requirements gathering and refinement with Kiro
Hour 2: Design document creation with architecture and properties
Hour 3: Task breakdown and implementation planning
Hours 4-6: Implementation of core features (HTML, CSS, JavaScript)
Hour 7: PDF generation and final polish
Hour 8: Testing and verification
```

**Total Development Time**: ~8 hours from concept to fully functional application

### Key Benefits of Using Kiro

1. **Structured Thinking**: Forced consideration of edge cases and error handling upfront
2. **Traceability**: Every line of code traces back to a specific requirement
3. **Quality Assurance**: Correctness properties defined before implementation
4. **Reduced Debugging**: Clear specifications meant fewer bugs to fix
5. **Documentation**: Requirements and design docs created automatically
6. **Iterative Refinement**: Easy to review and adjust at each phase

---

## 🎬 Getting Started

### Prerequisites

- A modern web browser (Chrome 60+, Firefox 60+, Safari 12+, Edge 79+)
- No installation or server required!

### Installation

1. Clone or download this repository:
```bash
git clone https://github.com/yourusername/invoice-generator.git
cd invoice-generator
```

2. Open `index.html` in your web browser:
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

That's it! The application runs entirely in your browser.

---

## 📖 Usage

### Creating an Invoice

1. **Enter Client Information**
   - Fill in client name, address, invoice number, and date
   - All fields update the live preview in real-time

2. **Add Invoice Items**
   - Enter item name, quantity, and price for each line item
   - Click "Add Item" to add more rows
   - Line totals calculate automatically

3. **Set Tax Rate**
   - Enter the tax percentage (e.g., 10 for 10%)
   - Tax amount and final total update automatically

4. **Preview Your Invoice**
   - View the formatted invoice in the right panel
   - Verify all information is correct

5. **Download PDF**
   - Click "Download PDF" button
   - PDF file downloads automatically with filename `invoice_[number].pdf`

### Responsive Design

- **Desktop (>768px)**: Two-column layout with form on left, preview on right
- **Mobile (≤768px)**: Stacked layout with form on top, preview below

---

## 🔧 Technical Details

### Project Structure

```
invoice-generator/
├── index.html          # Main HTML structure
├── script.js           # JavaScript functionality
├── style.css           # Styling and responsive layout
├── README.md           # This file
└── .kiro/
    └── specs/
        └── invoice-generator/
            ├── requirements.md   # Formal requirements
            ├── design.md         # Design document
            └── tasks.md          # Implementation plan
```

### Key Functions

#### `addItemRow()`
Creates dynamic table rows for invoice items with input fields and event listeners.

#### `calculateTotals()`
Performs all invoice calculations:
- Line totals: quantity × price
- Subtotal: sum of all line totals
- Tax: subtotal × (tax rate / 100)
- Final total: subtotal + tax

#### `updatePreview()`
Updates the live preview section with current form data in real-time.

#### `generatePDF()`
Creates and downloads a professionally formatted PDF using jsPDF library.

---

## 💻 Code Examples

### Dynamic Row Creation

```javascript
function addItemRow() {
    const tbody = document.getElementById('items-tbody');
    const row = document.createElement('tr');
    
    // Create input fields
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'item-name';
    nameInput.placeholder = 'Item name';
    
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.className = 'item-quantity';
    quantityInput.min = '0';
    
    // Attach event listeners for live updates
    quantityInput.addEventListener('input', updatePreview);
    priceInput.addEventListener('input', updatePreview);
    
    tbody.appendChild(row);
}
```

### Responsive CSS Grid

```css
/* Desktop: Two-column layout */
.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

/* Mobile: Stacked layout */
@media screen and (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
    }
}
```

### PDF Generation

```javascript
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(24);
    doc.text('INVOICE', 105, 20, { align: 'center' });
    
    // Add items table
    doc.autoTable({
        head: [['Item Name', 'Quantity', 'Price', 'Line Total']],
        body: itemsData,
        theme: 'grid'
    });
    
    // Download
    doc.save('invoice_' + invoiceNumber + '.pdf');
}
```

---

## 📸 Screenshots

### Desktop View
The application features a clean two-column layout with the form on the left and live preview on the right.

### Mobile View
On mobile devices, the layout automatically stacks vertically for optimal usability.

### PDF Output
Generated PDFs include professional formatting with headers, client details, itemized tables, and totals.

---

## 🎯 Features Implemented

- ✅ Client information input (name, address, invoice number, date)
- ✅ Dynamic item rows with add/remove functionality
- ✅ Automatic calculation of line totals, subtotal, tax, and final total
- ✅ Live preview that updates in real-time
- ✅ PDF generation with professional formatting
- ✅ Responsive design for desktop and mobile
- ✅ Clean, minimal user interface
- ✅ Zero backend dependencies
- ✅ Complete client-side privacy

---

## 🔮 Future Enhancements

- Local storage for saving draft invoices
- Multiple invoice templates
- Company logo upload
- Currency selection
- Item database with autocomplete
- Invoice history management
- Email invoice functionality
- Print preview mode

---

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 🙏 Acknowledgments

Built with **Kiro AI** using spec-driven development methodology. Kiro's structured workflow transformed development from an ad-hoc process into a systematic, traceable, and efficient experience.

---

## 📞 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using Kiro AI**
