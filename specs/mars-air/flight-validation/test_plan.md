# Flight Validation – Test Plan

**Application:** MarsAir  
**Feature:** Flight Validation  
**Entry Point:** https://marsair.recruiting.thoughtworks.net/WeiLianLow  
**Story Reference:** MA-5 – Add schedule validation to prevent return dates under 1 year  
**Date:** 2026-04-20

---

## Story Summary

> **As a** MarsAir Sales Director (Mark),  
> **I want** to prevent potential customers from searching for invalid trips,  
> **So that** they don't waste time, and book valid ones.

Due to orbital mechanics between Earth and Mars, a return date cannot be less than 1 year from the departure date.

### Acceptance Criteria

| ID  | Criterion |
|-----|-----------|
| AC1 | Given a customer selects a return date that is **less than 1 year** from departure and submits, the system displays **"Unfortunately, this schedule is not possible. Please try again."** |
| AC2 | Given a customer selects a return date that is **1 year or more** from departure and submits, the search proceeds successfully. |
| AC3 | Verify date validation correctly handles the transition between different years and months. |

### In-Scope

- Business logic calculating the duration between departure and return selections.
- Error messaging for invalid scheduling.

### Out-of-Scope

- Dynamically hiding or disabling invalid dates in the dropdowns (validation occurs upon search submission only).

---

## Application Behaviour Notes (observed during exploration)

- Flights depart in **July** and **December** each year. The dropdown covers the next two years from the current date.
- The page does **not** perform client-side validation; all validation occurs after the Search button is clicked.
- The two possible gap values **below** the 12-month threshold are **+5 months** (July → December) and **+7 months** (December → July next year).
- At exactly **+12 months**, the schedule is treated as valid (e.g. July → July next year, December → December next year).
- When the schedule is valid the results page shows either **"Seats available!"** or **"Sorry, there are no more seats available."**
- Known bugs (already documented as `test.fixme`):
  - Selecting the **same date** for departure and return (0-month gap) incorrectly shows "Sorry, there are no more seats available." instead of the invalid schedule message.
  - Selecting a **return date before** the departure date (negative gap) incorrectly shows "Sorry, there are no more seats available." instead of the invalid schedule message.
  - Submitting with **no dates selected** ("Select…") incorrectly shows "Sorry, there are no more seats available." instead of a validation error.

---

## Date Reference (April 2026)

| Dropdown label                   | Actual date      |
|----------------------------------|------------------|
| July                             | July 2026        |
| December                         | December 2026    |
| July (next year)                 | July 2027        |
| December (next year)             | December 2027    |
| July (two years from now)        | July 2028        |
| December (two years from now)    | December 2028    |

## Gap Reference (all possible non-same departure → return pairs)

| Departure                     | Return                           | Gap (months) | Valid? |
|-------------------------------|----------------------------------|--------------|--------|
| July                          | December                         | +5           | No     |
| July                          | July (next year)                 | +12          | Yes    |
| July                          | December (next year)             | +17          | Yes    |
| July                          | July (two years from now)        | +24          | Yes    |
| July                          | December (two years from now)    | +29          | Yes    |
| December                      | July (next year)                 | +7           | No     |
| December                      | December (next year)             | +12          | Yes    |
| December                      | July (two years from now)        | +19          | Yes    |
| December                      | December (two years from now)    | +24          | Yes    |

---

## Test Suites

---

### Test Suite FV-1 – Invalid Schedules: Return Less Than 1 Year from Departure (AC1)

**Equivalence class:** Return date < 12 months after departure  
**Representatives tested:** +5 months (July → December) and +7 months (December → July next year)

---

#### TC-FV-1.1 – Return date 5 months after departure shows invalid schedule message

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
2. Select **"July"** from the **"Departing"** dropdown.
3. Select **"December"** from the **"Returning"** dropdown (5-month gap, same calendar year).
4. Click the **"Search"** button.

**Expected outcome:**
- Page title is **"Mars Airlines: Search Results"**.
- The message **"Unfortunately, this schedule is not possible. Please try again."** is displayed.
- The messages "Seats available!" and "Sorry, there are no more seats available." are **not** displayed.

---

#### TC-FV-1.2 – Return date 7 months after departure shows invalid schedule message (cross-year)

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
2. Select **"December"** from the **"Departing"** dropdown.
3. Select **"July (next year)"** from the **"Returning"** dropdown (7-month gap, crosses a calendar year boundary).
4. Click the **"Search"** button.

**Expected outcome:**
- Page title is **"Mars Airlines: Search Results"**.
- The message **"Unfortunately, this schedule is not possible. Please try again."** is displayed.
- The messages "Seats available!" and "Sorry, there are no more seats available." are **not** displayed.

---

### Test Suite FV-2 – Valid Schedules: Return 1 Year or More from Departure (AC2)

**Equivalence class:** Return date ≥ 12 months after departure  
**BVA:** At the boundary (+12 months) and above the boundary (+17 months)

---

#### TC-FV-2.1 – Return date exactly 12 months after departure is treated as valid (same month, next year)

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
2. Select **"July"** from the **"Departing"** dropdown.
3. Select **"July (next year)"** from the **"Returning"** dropdown (exactly 12 months).
4. Click the **"Search"** button.

**Expected outcome:**
- Page title is **"Mars Airlines: Search Results"**.
- The message **"Unfortunately, this schedule is not possible. Please try again."** is **not** displayed.
- Either **"Seats available!"** or **"Sorry, there are no more seats available."** is displayed.

---

#### TC-FV-2.2 – Return date 17 months after departure is treated as valid (above boundary)

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
2. Select **"July"** from the **"Departing"** dropdown.
3. Select **"December (next year)"** from the **"Returning"** dropdown (17-month gap).
4. Click the **"Search"** button.

**Expected outcome:**
- Page title is **"Mars Airlines: Search Results"**.
- The message **"Unfortunately, this schedule is not possible. Please try again."** is **not** displayed.
- Either **"Seats available!"** or **"Sorry, there are no more seats available."** is displayed.

---

#### TC-FV-2.3 – Return date 29 months after departure shows seats available

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
2. Select **"July"** from the **"Departing"** dropdown.
3. Select **"December (two years from now)"** from the **"Returning"** dropdown (29-month gap).
4. Click the **"Search"** button.

**Expected outcome:**
- Page title is **"Mars Airlines: Search Results"**.
- The message **"Unfortunately, this schedule is not possible. Please try again."** is **not** displayed.
- The message **"Seats available!"** is displayed.
- The message **"Call now on 0800 MARSAIR to book!"** is displayed.

---

### Test Suite FV-3 – Cross-Year Boundary Transition (AC3)

These tests specifically verify that the validation logic correctly calculates durations when the departure and return dates span a calendar year boundary, covering the unique case where year-over-year month subtraction could cause off-by-one errors.

---

#### TC-FV-3.1 – December departure with July return (next year) is correctly identified as invalid

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
2. Select **"December"** from the **"Departing"** dropdown (December 2026).
3. Select **"July (next year)"** from the **"Returning"** dropdown (July 2027, +7 months).
4. Click the **"Search"** button.

**Expected outcome:**
- The message **"Unfortunately, this schedule is not possible. Please try again."** is displayed.

---

#### TC-FV-3.2 – December departure with December return (next year) is correctly identified as valid

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
2. Select **"December"** from the **"Departing"** dropdown (December 2026).
3. Select **"December (next year)"** from the **"Returning"** dropdown (December 2027, exactly +12 months).
4. Click the **"Search"** button.

**Expected outcome:**
- The message **"Unfortunately, this schedule is not possible. Please try again."** is **not** displayed.
- Either **"Seats available!"** or **"Sorry, there are no more seats available."** is displayed.

---

#### TC-FV-3.3 – December departure with July return (two years from now) is correctly identified as valid

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
2. Select **"December"** from the **"Departing"** dropdown (December 2026).
3. Select **"July (two years from now)"** from the **"Returning"** dropdown (July 2028, +19 months).
4. Click the **"Search"** button.

**Expected outcome:**
- The message **"Unfortunately, this schedule is not possible. Please try again."** is **not** displayed.
- Either **"Seats available!"** or **"Sorry, there are no more seats available."** is displayed.

---

### Test Suite FV-4 – Edge Cases (Known Bugs)

> **Note:** The following test cases expose known defects in the current implementation. The system shows "Sorry, there are no more seats available." for these inputs instead of the expected schedule validation error.

---

#### TC-FV-4.1 – Return date same as departure date is treated as invalid ⚠️ Known Bug

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
2. Select **"July (next year)"** from the **"Departing"** dropdown.
3. Select **"July (next year)"** from the **"Returning"** dropdown (0-month gap, same date).
4. Click the **"Search"** button.

**Expected outcome:**
- The message **"Unfortunately, this schedule is not possible. Please try again."** is displayed.

**Actual outcome (bug):** The app shows **"Sorry, there are no more seats available."** instead.

---

#### TC-FV-4.2 – Return date before departure date is treated as invalid ⚠️ Known Bug

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
2. Select **"December"** from the **"Departing"** dropdown (December 2026).
3. Select **"July"** from the **"Returning"** dropdown (July 2026, 5 months *before* departure).
4. Click the **"Search"** button.

**Expected outcome:**
- The message **"Unfortunately, this schedule is not possible. Please try again."** is displayed.

**Actual outcome (bug):** The app shows **"Sorry, there are no more seats available."** instead.

---

#### TC-FV-4.3 – Submitting search with no dates selected shows a validation error ⚠️ Known Bug

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
2. Leave the **"Departing"** dropdown at the default **"Select…"** placeholder.
3. Leave the **"Returning"** dropdown at the default **"Select…"** placeholder.
4. Click the **"Search"** button.

**Expected outcome:**
- The user remains on the home page (`Mars Airlines: Home`), and a validation error is displayed prompting them to select dates.

**Actual outcome (bug):** The app navigates to the Search Results page and shows **"Sorry, there are no more seats available."** instead.

---

## Test Coverage Summary

| Test Case  | AC Coverage | Gap (months) | Expected Result        |
|------------|-------------|--------------|------------------------|
| TC-FV-1.1  | AC1         | +5           | Invalid schedule msg   |
| TC-FV-1.2  | AC1, AC3    | +7 (cross-year) | Invalid schedule msg |
| TC-FV-2.1  | AC2 (boundary) | +12       | Schedule valid         |
| TC-FV-2.2  | AC2         | +17          | Schedule valid         |
| TC-FV-2.3  | AC2         | +29          | Seats available        |
| TC-FV-3.1  | AC3         | +7 (Dec→Jul) | Invalid schedule msg   |
| TC-FV-3.2  | AC3         | +12 (Dec→Dec)| Schedule valid         |
| TC-FV-3.3  | AC3         | +19 (Dec→Jul)| Schedule valid         |
| TC-FV-4.1  | AC1 (bug)   | 0            | Invalid schedule msg (bug: no seats msg) |
| TC-FV-4.2  | AC1 (bug)   | -5           | Invalid schedule msg (bug: no seats msg) |
| TC-FV-4.3  | AC1 (bug)   | N/A          | Form validation error (bug: no seats msg) |
