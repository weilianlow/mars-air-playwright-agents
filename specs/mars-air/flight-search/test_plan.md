# Flight Search – Test Plan

**Application:** MarsAir  
**Feature:** Flight Search  
**Entry Point:** https://marsair.recruiting.thoughtworks.net/WeiLianLow  
**Story Reference:** MA-2 – Implement basic flight search flow and availability check  
**Date:** 2026-04-20

---

## Story Summary

> **As a** MarsAir Sales Director (Mark),  
> **I want** potential customers to be able to search for flights to Mars,  
> **So that** they see what trips are available.

Flights to Mars depart every six months in **July** and **December**, both ways. The search covers the next **two years** from the current date.

### Acceptance Criteria

| ID  | Criterion |
|-----|-----------|
| AC1 | The search form has `Departure` and `Return` fields populated with July and December options for the next two years. |
| AC2 | When a valid search is submitted and seats are available, the system displays **"Seats available! Call 0800 MARSAIR to book!"** |
| AC3 | When a valid search is submitted and no seats are available, the system displays **"Sorry, there are no more seats available."** |

---

## Application Behaviour Notes (observed during exploration)

- The departure and return dropdowns each list **7 items**: a "Select…" placeholder plus 6 flight dates (July / December × 3 years).
- A search is considered **schedule-valid** when the return date is **at least 12 months** after the departure date.
- Schedule-invalid searches display: **"Unfortunately, this schedule is not possible. Please try again."**
- The search form does **not** perform client-side validation; submitting with unselected fields navigates to the Search Results page.

---

## Date Reference (April 2026)

| Display label              | Actual date      | Months from "July" |
|---------------------------|------------------|--------------------|
| July                      | July 2026        | 0                  |
| December                  | December 2026    | +5                 |
| July (next year)          | July 2027        | +12                |
| December (next year)      | December 2027    | +17                |
| July (two years from now) | July 2028        | +24                |
| December (two years from now) | December 2028 | +29               |

---

## Test Suites

---

### Test Suite FS-1 – Search Form Structure (AC1)

#### TC-FS-1.1 – Home page displays all required search form elements

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`

**Expected outcome:**
- Page title is **"Mars Airlines: Home"**
- The heading **"Book a ticket to the red planet now!"** is visible on the page
- A **"Departing"** dropdown field is present
- A **"Returning"** dropdown field is present
- A **"Promotional Code"** text input field is present
- A **"Search"** button is present

---

#### TC-FS-1.2 – Departing dropdown contains the correct flight date options

**Assumption:** Fresh browser session.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Inspect the "Departing" dropdown

**Expected outcome:**
- The dropdown contains exactly **7 items** in the following order:
  1. "Select…" (default placeholder, selected by default)
  2. "July"
  3. "December"
  4. "July (next year)"
  5. "December (next year)"
  6. "July (two years from now)"
  7. "December (two years from now)"

---

#### TC-FS-1.3 – Returning dropdown contains the correct flight date options

**Assumption:** Fresh browser session.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Inspect the "Returning" dropdown

**Expected outcome:**
- The dropdown contains exactly the same **7 items** as the "Departing" dropdown, in the same order
- "Select…" is selected by default

---

### Test Suite FS-2 – Valid Search: Seats Available (AC2)

#### TC-FS-2.1 – Search with seats available displays correct availability message

**Assumption:** Fresh browser session.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December (two years from now)"** from the "Returning" dropdown
4. Click the **"Search"** button

**Expected outcome:**
- Page navigates to the Search Results page
- Page title is **"Mars Airlines: Search Results"**
- The message **"Seats available!"** is displayed
- The message **"Call now on 0800 MARSAIR to book!"** is displayed
- A **"Back"** link is visible

---

### Test Suite FS-3 – Valid Search: No Seats Available (AC3)

#### TC-FS-3.1 – Valid date range with no available seats displays correct message (boundary: 12 months gap)

**Assumption:** Fresh browser session.

> **Boundary Value:** Exactly 12 months — the minimum valid gap between departure and return.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"July (next year)"** from the "Returning" dropdown *(12-month gap — minimum valid)*
4. Click the **"Search"** button

**Expected outcome:**
- Page navigates to the Search Results page
- The message **"Sorry, there are no more seats available."** is displayed
- The schedule-invalid message **"Unfortunately, this schedule is not possible."** is **not** displayed
- A **"Back"** link is visible

---

#### TC-FS-3.2 – Valid date range with no seats displays correct message (17-month gap)

**Assumption:** Fresh browser session.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December (next year)"** from the "Returning" dropdown *(17-month gap)*
4. Click the **"Search"** button

**Expected outcome:**
- Page navigates to the Search Results page
- The message **"Sorry, there are no more seats available."** is displayed
- The schedule-invalid message is **not** displayed
- A **"Back"** link is visible

---

### Test Suite FS-4 – Invalid Date Combinations: Schedule Not Possible

> Applying boundary value analysis (BVA): the boundary between valid and invalid is a **12-month gap**. Any gap below 12 months is invalid.

#### TC-FS-4.1 – Return date 5 months after departure shows schedule-invalid message (EP: invalid class representative)

**Assumption:** Fresh browser session.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December"** from the "Returning" dropdown *(5-month gap)*
4. Click the **"Search"** button

**Expected outcome:**
- Page navigates to the Search Results page
- The message **"Unfortunately, this schedule is not possible. Please try again."** is displayed
- No seat availability message is shown

---

#### TC-FS-4.2 – Return date 7 months after departure shows schedule-invalid message (BVA: just below 12-month boundary)

**Assumption:** Fresh browser session.

> **Boundary Value:** 7 months — the largest gap that is still below the 12-month minimum.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"December"** from the "Departing" dropdown
3. Select **"July (next year)"** from the "Returning" dropdown *(7-month gap)*
4. Click the **"Search"** button

**Expected outcome:**
- The message **"Unfortunately, this schedule is not possible. Please try again."** is displayed
- No seat availability message is shown

---

#### TC-FS-4.3 – Return date same as departure date is treated as invalid (EP: zero-gap boundary)

**Assumption:** Fresh browser session.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July (next year)"** from the "Departing" dropdown
3. Select **"July (next year)"** from the "Returning" dropdown *(0-month gap)*
4. Click the **"Search"** button

**Expected outcome:**
- The message **"Unfortunately, this schedule is not possible. Please try again."** is displayed

> **Known Bug:** The application currently displays **"Sorry, there are no more seats available."** for same-date selections instead of the schedule-invalid message.

---

#### TC-FS-4.4 – Return date before departure date is treated as invalid (EP: negative gap)

**Assumption:** Fresh browser session.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"December"** from the "Departing" dropdown
3. Select **"July"** from the "Returning" dropdown *(return is 5 months before departure)*
4. Click the **"Search"** button

**Expected outcome:**
- The message **"Unfortunately, this schedule is not possible. Please try again."** is displayed

> **Known Bug:** The application currently displays **"Sorry, there are no more seats available."** instead of the schedule-invalid message when the return date precedes the departure date.

---

### Test Suite FS-5 – Incomplete Form Submission

#### TC-FS-5.1 – Submitting search with no dates selected

**Assumption:** Fresh browser session.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Leave both the "Departing" and "Returning" dropdowns at the default **"Select…"** placeholder
3. Click the **"Search"** button

**Expected outcome:**
- The form does **not** submit to the Search Results page
- A validation error or inline message is displayed prompting the user to select both departure and return dates

> **Known Bug:** The application currently accepts the empty form, navigates to the Search Results page, and displays **"Seats available! Call now on 0800 MARSAIR to book!"** — treating unselected options as a matching flight.

---

#### TC-FS-5.2 – Submitting search with departure selected but no return date

**Assumption:** Fresh browser session.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Leave the "Returning" dropdown at the default **"Select…"** placeholder
4. Click the **"Search"** button

**Expected outcome:**
- A validation error or inline message is displayed prompting the user to select a return date

> **Known Bug:** The application currently submits and displays **"Sorry, there are no more seats available."** without validating that a return date was chosen.

---

#### TC-FS-5.3 – Submitting search with return selected but no departure date

**Assumption:** Fresh browser session.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Leave the "Departing" dropdown at the default **"Select…"** placeholder
3. Select **"December (two years from now)"** from the "Returning" dropdown
4. Click the **"Search"** button

**Expected outcome:**
- A validation error or inline message is displayed prompting the user to select a departure date

> **Known Bug:** The application currently submits and displays **"Sorry, there are no more seats available."** without validating that a departure date was chosen.

---

### Test Suite FS-6 – Search Results Page Navigation

#### TC-FS-6.1 – "Back" link on the Search Results page navigates back to the home page

**Assumption:** Fresh browser session.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December (two years from now)"** from the "Returning" dropdown
4. Click the **"Search"** button
5. On the Search Results page, click the **"Back"** link

**Expected outcome:**
- The user is returned to the home page with the search form visible

---

#### TC-FS-6.2 – MarsAir logo on the Search Results page navigates back to the home page

**Assumption:** Fresh browser session.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December (two years from now)"** from the "Returning" dropdown
4. Click the **"Search"** button
5. On the Search Results page, click the **"MarsAir"** logo/heading in the top-left corner

**Expected outcome:**
- The user is navigated to the home page at `/WeiLianLow`
- The search form is displayed

---

## Summary of Known Bugs / Suspected Defects

| # | Test Case | Description | Severity |
|---|-----------|-------------|----------|
| 1 | TC-FS-5.1 | Submitting with no dates selected navigates to Search Results and shows **"Seats available!"** instead of a validation error | High |
| 2 | TC-FS-5.2 | Submitting with only the departure date selected navigates to Search Results without validation | High |
| 3 | TC-FS-5.3 | Submitting with only the return date selected navigates to Search Results without validation | High |
| 4 | TC-FS-4.3 | Same departure and return date shows **"Sorry, there are no more seats available."** instead of the schedule-invalid message | High |
| 5 | TC-FS-4.4 | Return date before departure shows **"Sorry, there are no more seats available."** instead of the schedule-invalid message | High |

---

## Test Coverage Matrix

| Scenario                                   | Gap (months) | EP Class    | Expected Result                          | Test Case  |
|--------------------------------------------|:------------:|-------------|------------------------------------------|------------|
| No dates selected                          | N/A          | Invalid     | Validation error (Bug: seats available!) | TC-FS-5.1  |
| Only departure selected                    | N/A          | Invalid     | Validation error (Bug: no seats msg)     | TC-FS-5.2  |
| Only return selected                       | N/A          | Invalid     | Validation error (Bug: no seats msg)     | TC-FS-5.3  |
| Return before departure (Jul → Dec, -5 mo) | −5           | Invalid     | "Unfortunately, this schedule…" (Bug)    | TC-FS-4.4  |
| Same departure and return date (0 mo)      | 0            | Invalid     | "Unfortunately, this schedule…" (Bug)    | TC-FS-4.3  |
| Return 5 months after departure            | +5           | Invalid     | "Unfortunately, this schedule…"          | TC-FS-4.1  |
| Return 7 months after departure (BVA low)  | +7           | Invalid     | "Unfortunately, this schedule…"          | TC-FS-4.2  |
| Return 12 months after departure (BVA min) | +12          | Valid       | Seat availability message                | TC-FS-3.1  |
| Return 17 months after departure           | +17          | Valid       | "Sorry, there are no more seats…"        | TC-FS-3.2  |
| Return 29 months after departure           | +29          | Valid       | "Seats available! Call now…"             | TC-FS-2.1  |
