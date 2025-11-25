# Testing the Invoice Generator

## Running Property-Based Tests

The invoice generator includes property-based tests using fast-check to verify correctness properties.

### How to Run Tests

1. Open `script.test.html` in your web browser
2. Click the "Run All Tests" button
3. View the test results on the page

### Current Tests

- **Property 1: Item row addition increases count** - Verifies that clicking the add item button increases the number of item rows by exactly one (100 iterations)

### Test Results

- ✅ Green = Test passed
- ❌ Red = Test failed
- ℹ️ Blue = Information

Each property test runs 100 iterations with randomly generated inputs to ensure the properties hold across a wide range of scenarios.
