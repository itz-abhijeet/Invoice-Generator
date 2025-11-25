/**
 * Invoice Generator - Core JavaScript Functionality
 * 
 * This application provides a client-side invoice generator with live preview
 * and PDF export capabilities. All calculations and rendering occur in the browser.
 * 
 * Requirements Coverage: All requirements from 1.1 through 8.7
 */

/**
 * Adds a new item row to the items table
 * Creates input fields for item name, quantity, and price with event listeners
 * for real-time calculation updates.
 * 
 * Requirements: 2.3, 8.3, 8.4
 */
function addItemRow() {
    const tbody = document.getElementById('items-tbody');
    
    // Create new table row
    const row = document.createElement('tr');
    
    // Create item name cell with input
    const nameCell = document.createElement('td');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'item-name';
    nameInput.placeholder = 'Item name';
    nameCell.appendChild(nameInput);
    
    // Create quantity cell with input
    const quantityCell = document.createElement('td');
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.className = 'item-quantity';
    quantityInput.placeholder = '0';
    quantityInput.min = '0';
    quantityInput.step = '1';
    quantityCell.appendChild(quantityInput);
    
    // Create price cell with input
    const priceCell = document.createElement('td');
    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.className = 'item-price';
    priceInput.placeholder = '0.00';
    priceInput.min = '0';
    priceInput.step = '0.01';
    priceCell.appendChild(priceInput);
    
    // Create line total cell with span for display
    const lineTotalCell = document.createElement('td');
    lineTotalCell.className = 'line-total';
    const lineTotalSpan = document.createElement('span');
    lineTotalSpan.className = 'line-total-value';
    lineTotalSpan.textContent = '$0.00';
    lineTotalCell.appendChild(lineTotalSpan);
    
    // Attach event listeners to quantity and price inputs
    quantityInput.addEventListener('input', updatePreview);
    priceInput.addEventListener('input', updatePreview);
    nameInput.addEventListener('input', updatePreview);
    
    // Append all cells to the row
    row.appendChild(nameCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(lineTotalCell);
    
    // Append row to table body
    tbody.appendChild(row);
}

/**
 * Calculates all totals including line totals, subtotal, tax, and final total
 * Iterates through all item rows, calculates line totals (quantity × price),
 * sums to get subtotal, applies tax rate, and updates the preview display.
 * Empty values are treated as zero per Requirement 3.5.
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 8.5
 */
function calculateTotals() {
    const tbody = document.getElementById('items-tbody');
    const rows = tbody.getElementsByTagName('tr');
    let subtotal = 0;
    
    // Iterate through all item rows
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        
        // Get quantity and price inputs
        const quantityInput = row.querySelector('.item-quantity');
        const priceInput = row.querySelector('.item-price');
        const lineTotalSpan = row.querySelector('.line-total-value');
        
        // Get values, treating empty as zero (Requirement 3.5)
        const quantity = parseFloat(quantityInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        
        // Calculate line total (Requirement 3.2)
        const lineTotal = quantity * price;
        
        // Update line total display
        lineTotalSpan.textContent = '$' + lineTotal.toFixed(2);
        
        // Add to subtotal
        subtotal += lineTotal;
    }
    
    // Get tax rate from input field (Requirement 3.3)
    const taxRateInput = document.getElementById('tax-rate');
    const taxRate = parseFloat(taxRateInput.value) || 0;
    
    // Calculate tax amount (Requirement 3.3)
    const taxAmount = subtotal * (taxRate / 100);
    
    // Calculate final total (Requirement 3.4)
    const finalTotal = subtotal + taxAmount;
    
    // Update preview section with calculated values (format to 2 decimal places)
    document.getElementById('preview-subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('preview-tax').textContent = '$' + taxAmount.toFixed(2);
    document.getElementById('preview-total').textContent = '$' + finalTotal.toFixed(2);
}

/**
 * Updates the live preview section with current form data
 * Reads all form values and updates the preview display to show a formatted
 * invoice with client details, items table, and calculated totals.
 * Called automatically on any form input change.
 * 
 * Requirements: 4.2, 4.3, 4.4, 4.5
 */
function updatePreview() {
    // Read all form field values
    const clientName = document.getElementById('client-name').value || '-';
    const address = document.getElementById('address').value || '-';
    const invoiceNumber = document.getElementById('invoice-number').value || '-';
    const invoiceDate = document.getElementById('invoice-date').value || '-';
    
    // Update preview section with client name, address, invoice number, and date (Requirement 4.3)
    document.getElementById('preview-client-name').textContent = clientName;
    document.getElementById('preview-address').textContent = address;
    document.getElementById('preview-invoice-number').textContent = invoiceNumber;
    document.getElementById('preview-invoice-date').textContent = invoiceDate;
    
    // Update preview items table with all item rows and their line totals (Requirement 4.4)
    const itemsTbody = document.getElementById('items-tbody');
    const previewTbody = document.getElementById('preview-items-tbody');
    const itemRows = itemsTbody.getElementsByTagName('tr');
    
    // Clear existing preview items
    previewTbody.innerHTML = '';
    
    // Check if there are any items
    if (itemRows.length === 0) {
        const noItemsRow = document.createElement('tr');
        const noItemsCell = document.createElement('td');
        noItemsCell.colSpan = 4;
        noItemsCell.className = 'no-items';
        noItemsCell.textContent = 'No items added';
        noItemsRow.appendChild(noItemsCell);
        previewTbody.appendChild(noItemsRow);
    } else {
        // Add each item to preview
        for (let i = 0; i < itemRows.length; i++) {
            const row = itemRows[i];
            
            // Get values from form inputs
            const itemName = row.querySelector('.item-name').value || '-';
            const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
            const price = parseFloat(row.querySelector('.item-price').value) || 0;
            const lineTotal = quantity * price;
            
            // Create preview row
            const previewRow = document.createElement('tr');
            
            // Item name cell
            const nameCell = document.createElement('td');
            nameCell.textContent = itemName;
            previewRow.appendChild(nameCell);
            
            // Quantity cell
            const quantityCell = document.createElement('td');
            quantityCell.textContent = quantity.toString();
            previewRow.appendChild(quantityCell);
            
            // Price cell
            const priceCell = document.createElement('td');
            priceCell.textContent = '$' + price.toFixed(2);
            previewRow.appendChild(priceCell);
            
            // Line total cell
            const lineTotalCell = document.createElement('td');
            lineTotalCell.textContent = '$' + lineTotal.toFixed(2);
            previewRow.appendChild(lineTotalCell);
            
            previewTbody.appendChild(previewRow);
        }
    }
    
    // Calculate and display subtotal, tax amount, and final total in preview (Requirement 4.5)
    calculateTotals();
}

/**
 * Generates and downloads a PDF invoice
 * Creates a PDF document using jsPDF library with header, client details,
 * items table (using jspdf-autotable), totals section, and footer.
 * Automatically triggers browser download with filename based on invoice number.
 * 
 * Requirements: 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 8.6
 */
function generatePDF() {
    // Access jsPDF from the global window object
    const { jsPDF } = window.jspdf;
    
    // Create a new jsPDF document (Requirement 5.2)
    const doc = new jsPDF();
    
    // Read current form values
    const clientName = document.getElementById('client-name').value || 'N/A';
    const address = document.getElementById('address').value || 'N/A';
    const invoiceNumber = document.getElementById('invoice-number').value || 'N/A';
    const invoiceDate = document.getElementById('invoice-date').value || 'N/A';
    const taxRate = parseFloat(document.getElementById('tax-rate').value) || 0;
    
    // Add header section with "INVOICE" title (Requirement 5.3)
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('INVOICE', 105, 20, { align: 'center' });
    
    // Add client details section (Requirement 5.4)
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Bill To:', 20, 40);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(11);
    doc.text(clientName, 20, 47);
    
    // Handle multi-line address
    const addressLines = address.split('\n');
    let addressY = 54;
    addressLines.forEach(line => {
        doc.text(line, 20, addressY);
        addressY += 7;
    });
    
    // Add invoice metadata section (Requirement 5.4)
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Invoice #:', 140, 40);
    doc.setFont(undefined, 'normal');
    doc.text(invoiceNumber, 165, 40);
    
    doc.setFont(undefined, 'bold');
    doc.text('Date:', 140, 47);
    doc.setFont(undefined, 'normal');
    doc.text(invoiceDate, 165, 47);
    
    // Collect items data for the table
    const itemsTbody = document.getElementById('items-tbody');
    const itemRows = itemsTbody.getElementsByTagName('tr');
    const itemsData = [];
    let subtotal = 0;
    
    for (let i = 0; i < itemRows.length; i++) {
        const row = itemRows[i];
        const itemName = row.querySelector('.item-name').value || '-';
        const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
        const price = parseFloat(row.querySelector('.item-price').value) || 0;
        const lineTotal = quantity * price;
        
        itemsData.push([
            itemName,
            quantity.toString(),
            '$' + price.toFixed(2),
            '$' + lineTotal.toFixed(2)
        ]);
        
        subtotal += lineTotal;
    }
    
    // Calculate tax and total
    const taxAmount = subtotal * (taxRate / 100);
    const finalTotal = subtotal + taxAmount;
    
    // Create items table using jspdf-autotable (Requirement 5.5)
    doc.autoTable({
        startY: Math.max(70, addressY + 10),
        head: [['Item Name', 'Quantity', 'Price', 'Line Total']],
        body: itemsData,
        theme: 'grid',
        headStyles: {
            fillColor: [52, 152, 219],
            textColor: 255,
            fontStyle: 'bold',
            halign: 'left'
        },
        columnStyles: {
            0: { halign: 'left' },
            1: { halign: 'right' },
            2: { halign: 'right' },
            3: { halign: 'right' }
        },
        styles: {
            fontSize: 10,
            cellPadding: 5
        }
    });
    
    // Add totals section (Requirement 5.6)
    const finalY = doc.lastAutoTable.finalY + 10;
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.text('Subtotal:', 140, finalY);
    doc.text('$' + subtotal.toFixed(2), 185, finalY, { align: 'right' });
    
    doc.text('Tax (' + taxRate.toFixed(2) + '%):',140, finalY + 7);
    doc.text('$' + taxAmount.toFixed(2), 185, finalY + 7, { align: 'right' });
    
    // Draw line above total
    doc.setLineWidth(0.5);
    doc.line(140, finalY + 11, 185, finalY + 11);
    
    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.text('Total:', 140, finalY + 18);
    doc.text('$' + finalTotal.toFixed(2), 185, finalY + 18, { align: 'right' });
    
    // Add footer section (Requirement 5.7)
    doc.setFontSize(10);
    doc.setFont(undefined, 'italic');
    doc.setTextColor(100);
    doc.text('Thank you for your business!', 105, finalY + 35, { align: 'center' });
    doc.text('Payment is due within 30 days.', 105, finalY + 42, { align: 'center' });
    
    // Trigger PDF download with appropriate filename (Requirement 5.8)
    const filename = 'invoice_' + (invoiceNumber || 'draft') + '.pdf';
    doc.save(filename);
}

/**
 * Initialize the application on page load
 * Sets up all event listeners for form inputs and buttons, adds the initial
 * item row, and displays the initial preview state.
 * 
 * Requirements: 2.2, 2.3, 4.2, 4.5, 5.2
 */
document.addEventListener('DOMContentLoaded', function() {
    // Attach input event listeners to all form fields
    document.getElementById('client-name').addEventListener('input', updatePreview);
    document.getElementById('address').addEventListener('input', updatePreview);
    document.getElementById('invoice-number').addEventListener('input', updatePreview);
    document.getElementById('invoice-date').addEventListener('input', updatePreview);
    document.getElementById('tax-rate').addEventListener('input', updatePreview);
    
    // Attach click event listener to Add Item button
    document.getElementById('add-item-btn').addEventListener('click', function() {
        addItemRow();
        updatePreview();
    });
    
    // Attach click event listener to Download PDF button (Requirement 5.2)
    document.getElementById('download-pdf-btn').addEventListener('click', generatePDF);
    
    // Add initial item row
    addItemRow();
    
    // Initialize preview
    updatePreview();
});
