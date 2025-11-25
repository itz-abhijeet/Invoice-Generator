# Implementation Plan

- [x] 1. Create HTML structure with form and preview layout





  - Create index.html with semantic HTML5 structure
  - Add form section with input fields for client name, address, invoice number, and invoice date
  - Add items table with header row (Item Name, Quantity, Price, Line Total)
  - Add initial empty item row to the table
  - Add "Add Item" button below the items table
  - Add tax rate input field
  - Add live preview section with invoice display structure
  - Add "Download PDF" button
  - Include jsPDF and jspdf-autotable CDN script links in the head
  - Link style.css and script.js files
  - _Requirements: 1.1, 2.1, 2.2, 4.1, 5.1, 8.1, 8.7_

- [x] 2. Implement CSS styling and responsive layout





  - Create style.css file
  - Style the overall page layout with clean, minimal design
  - Implement two-column layout for desktop (form left, preview right) using flexbox or grid
  - Style form elements with clear labels and appropriate spacing
  - Style the items table with borders and proper alignment
  - Style buttons with hover effects
  - Style the preview section to look like a formatted invoice
  - Add media query for mobile screens (≤768px) to stack form and preview vertically
  - Ensure all text remains readable at different screen sizes
  - _Requirements: 6.1, 6.2, 6.3, 7.1, 7.2, 7.3, 7.4, 8.2_

- [x] 3. Implement core JavaScript functionality





  - [x] 3.1 Create script.js and implement addItemRow function


    - Write addItemRow() function that creates a new table row
    - Add input fields for item name, quantity, and price to the new row
    - Add a span or div element to display calculated line total
    - Attach input event listeners to quantity and price fields
    - Append the new row to the items table body
    - _Requirements: 2.3, 8.3, 8.4_
  
  - [-] 3.2 Write property test for item row addition






    - **Property 1: Item row addition increases count**
    - **Validates: Requirements 2.3**
  
  - [x] 3.3 Implement calculateTotals function

    - Write calculateTotals() function that iterates through all item rows
    - Calculate line total for each item (quantity × price)
    - Handle empty quantity or price values by treating them as zero
    - Sum all line totals to compute subtotal
    - Get tax rate from input field
    - Calculate tax amount (subtotal × tax rate / 100)
    - Calculate final total (subtotal + tax amount)
    - Update the preview section with calculated values
    - Format currency values to 2 decimal places
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 8.5_
  
  - [ ] 3.4 Write property test for calculation correctness



    - **Property 2: Calculation correctness**
    - **Validates: Requirements 3.2, 3.3, 3.4**
  
  - [ ]* 3.5 Write property test for empty value handling
    - **Property 3: Empty values treated as zero**
    - **Validates: Requirements 3.5**
  
  - [ ] 3.6 Write property test for reactive calculation

    - **Property 9: Calculation updates on input change**
    - **Validates: Requirements 3.1**

- [-] 4. Implement live preview functionality 



  - [x] 4.1 Create updatePreview function



    - Write updatePreview() function that reads all form field values
    - Update preview section with client name, address, invoice number, and date
    - Update preview items table with all item rows and their line totals
    - Display subtotal, tax amount, and final total in preview
    - Ensure preview updates immediately when any form field changes
    - Attach input event listeners to all form fields to trigger updatePreview()
    - _Requirements: 4.2, 4.3, 4.4, 4.5_
  
  - [ ] 4.2 Write property test for preview updates

    - **Property 4: Preview updates on input change**
    - **Validates: Requirements 4.2**
  
  - [ ] 4.3 Write property test for preview completeness

    - **Property 5: Preview contains all invoice data**
    - **Validates: Requirements 4.3, 4.4**

- [-] 5. Implement PDF generation functionality 



  - [x] 5.1 Create generatePDF function



    - Write generatePDF() function that creates a new jsPDF document
    - Add header section with "INVOICE" title
    - Add client details section (name, address)
    - Add invoice metadata section (invoice number, date)
    - Create items table using jspdf-autotable with all items and line totals
    - Add totals section with subtotal, tax, and final total
    - Add footer section with thank you message or payment terms
    - Trigger PDF download with appropriate filename
    - Attach click event listener to Download PDF button
    - _Requirements: 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 8.6_
  
  - [ ]* 5.2 Write property test for PDF completeness
    - **Property 6: PDF contains complete invoice data**
    - **Validates: Requirements 5.3, 5.4, 5.5, 5.6, 5.7**
  
  - [ ]* 5.3 Write property test for PDF download trigger
    - **Property 7: PDF generation triggers download**
    - **Validates: Requirements 5.8**

- [x] 6. Add initialization and event wiring  






  - Add DOMContentLoaded event listener to initialize the application
  - Call addItemRow() once on page load to create the initial item row
  - Attach click event listener to "Add Item" button
  - Attach click event listener to "Download PDF" button
  - Attach input event listeners to tax rate field
  - Call updatePreview() once on page load to initialize preview
  - _Requirements: 2.2, 2.3, 5.2_

- [-] 7. Test and refine responsive behavior 



  - [x] 7.1 Test layout at various viewport widths


    - Verify two-column layout appears on desktop screens (>768px)
    - Verify stacked layout appears on mobile screens (≤768px)
    - Test layout transitions when resizing browser window
    - Ensure all form elements remain usable on mobile
    - _Requirements: 6.1, 6.2, 6.3, 6.5_
  
  - [ ]* 7.2 Write property test for responsive layout
    - **Property 8: Responsive layout adaptation**
    - **Validates: Requirements 6.3**

- [x] 8. Final testing and polish 




  - Test complete invoice creation workflow in browser
  - Verify all calculations are accurate with various inputs
  - Test PDF generation with different invoice data
  - Verify PDF downloads correctly and opens in PDF readers
  - Test in multiple browsers (Chrome, Firefox, Safari, Edge)
  - Fix any visual or functional issues discovered during testing
  - Ensure code is clean and well-commented
  - _Requirements: All_

- [x] 9. Checkpoint - Ensure all tests pass




  - Ensure all tests pass, ask the user if questions arise.
