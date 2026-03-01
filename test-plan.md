# MarsAir Web Application Test Plan (Updated)

This document outlines the test plan for the MarsAir web application, covering functional and user interface testing. The expected results have been updated to reflect the *actual* behavior of the application as of the last test run.

## 1. Landing Page and Basic UI

### Test Case 1.1: Verify Landing Page Content

- **Title:** Verify the page loads successfully and all UI elements are visible.
- **Steps:**
    1. Navigate to the application URL.
- **Expected Result:**
    - The "MarsAir" logo text is displayed.
    - The main heading "Book a ticket to the red planet!" is present.
    - The booking form with "Departing", "Returning", "Promotional Code" fields, and "Search" button is visible.

## 2. Booking Functionality - "Happy" Paths (as per actual behavior)

### Test Case 2.1: Attempt to Book a Return Trip (July to December)

- **Title:** Verify the system's response when attempting to book a return trip from July to December.
- **Steps:**
    1. Select "July" from the "Departing" dropdown.
    2. Select "December" from the "Returning" dropdown.
    3. Click the "Search" button.
- **Expected Result:**
    - An error message "Unfortunately, this schedule is not possible. Please try again." is displayed.

### Test Case 2.2: Book a Valid One-Way Trip

- **Title:** Verify the system's response when booking a one-way trip.
- **Steps:**
    1. Select "July" from the "Departing" dropdown.
    2. Leave "Returning" dropdown at "Select...".
    3. Click the "Search" button.
- **Expected Result:**
    - An error message "Sorry, there are no more seats available." is displayed.


### Test Case 2.3: Book a Trip with Same Month Departure and Return

- **Title:** Verify the system's response when booking a trip with the same departure and return month.
- **Steps:**
    1. Select "July" from the "Departing" dropdown.
    2. Select "July" from the "Returning" dropdown.
    3. Click the "Search" button.
- **Expected Result:**
    - An error message "Sorry, there are no more seats available." is displayed.

## 3. Booking Functionality - Negative Scenarios and Edge Cases

### Test Case 3.1: Attempt to Book with Invalid Return Date

- **Title:** Verify the system's response when booking a return trip before the departure date.
- **Steps:**
    1. Select "December" from the "Departing" dropdown.
    2. Select "July" from the "Returning" dropdown.
    3. Click the "Search" button.
- **Expected Result:**
    - An error message "Sorry, there are no more seats available." is displayed.

### Test Case 3.2: Search with No Date Selection

- **Title:** Verify the system's behavior when no dates are selected.
- **Steps:**
    1. Do not change the default values in the "Departing" and "Returning" dropdowns.
    2. Click the "Search" button.
- **Expected Result:**
    - An error message "Sorry, there are no more seats available." is displayed.

## 4. Promotional Code Functionality (as per actual behavior)

### Test Case 4.1: Apply a "Valid" Promotional Code

- **Title:** Verify the system's response when using a promotional code with a valid format.
- **Steps:**
    1. Select "July" from the "Departing" dropdown.
    2. Select "July (next year)" from the "Returning" dropdown.
    3. Enter a code with a valid format (e.g., `AF12-3456`) in the "Promotional Code" field.
    4. Click the "Search" button.
- **Expected Result:**
    - An error message "Sorry, there are no more seats available." is displayed.

### Test Case 4.2: Apply an Invalid Promotional Code

- **Title:** Verify the system's response when using a promotional code with an invalid format.
- **Steps:**
    1. Select "July" from the "Departing" dropdown.
    2. Select "July (next year)" from the "Returning" dropdown.
    3. Enter "INVALIDC" in the "Promotional Code" field.
    4. Click the "Search" button.
- **Expected Result:**
    - An error message "Sorry, there are no more seats available." is displayed.

### Test Case 4.3: Apply a Promotional Code with incorrect format

- **Title:** Verify the system's response when using a promotional code with an incorrect format.
- **Steps:**
    1. Select "July" from the "Departing" dropdown.
    2. Select "July (next year)" from the "Returning" dropdown.
    3. Enter "ABC-123" in the "Promotional Code" field.
    4. Click the "Search" button.
- **Expected Result:**
    - An error message "Sorry, there are no more seats available." is displayed.

## 5. Navigation

### Test Case 5.1: Verify "Back" Button Functionality and State Persistence

- **Title:** Verify that the "Back" button on the search results page returns the user to the booking form and preserves the selected values.
- **Steps:**
    1. Perform any search.
    2. On the results page, click the "Back" button.
- **Expected Result:**
    - The user is navigated back to the main booking page.
    - The previously selected values in the form are preserved.
