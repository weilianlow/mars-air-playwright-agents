# Flight Promo Code – Test Plan

**Application:** MarsAir  
**Feature:** Flight Promotional Code  
**Entry Point:** https://marsair.recruiting.thoughtworks.net/WeiLianLow  
**Story Reference:** MA-3 – Support promotional code validation and discount calculation  
**Date:** 2026-04-20

---

## Story Summary

> **As a** MarsAir Sales Director (Mark),  
> **I want** to distribute promotional codes to customers,  
> **So that** they get discounts and are more tempted to purchase tickets.

### Acceptance Criteria

| ID  | Criterion |
|-----|-----------|
| AC1 | Given a customer enters a **valid** promotional code (e.g., `AF3-FJK-418`, where 3+4+1=8), when they search for flights, then the result page should display **"Promotional code [code] used: [discount]% discount!"** |
| AC2 | Given a customer enters an **invalid** promotional code, when they search for flights, then the result page should display **"Sorry, code [invalid promo code] is not valid"** |
| AC3 | The checksum logic must verify that the final digit equals the sum of all other numeric digits in the code **modulo 10** (e.g., `JJ5-OPQ-320` where 5+3+2=10 → 0). |

---

## Promo Code Format Reference

| Attribute         | Detail |
|-------------------|--------|
| Pattern           | `XX9-XXX-999` |
| Total length      | 11 characters |
| Pos 0–1           | Alphabetic characters (A–Z) |
| Pos 2             | Numeric digit — **discount percentage** digit (e.g., `3` = 30%) |
| Pos 3             | Hyphen (`-`) separator |
| Pos 4–6           | Alphabetic characters (A–Z) |
| Pos 7             | Hyphen (`-`) separator |
| Pos 8–9           | Numeric digits (part of checksum inputs) |
| Pos 10            | Numeric digit — **checksum** = `(digit[2] + digit[8] + digit[9]) % 10` |

**Example codes:**
- `AF3-FJK-418` — discount=30%, checksum=3+4+1=8 ✓ (valid)
- `AB2-CDE-123` — discount=20%, checksum=2+1+2=5 ✓ (invalid: check digit should be 5, but is 3)
- `JJ5-OPQ-320` — discount=50%, checksum=5+3+2=10 mod 10=0 ✓ (valid, edge case)

---

## Application Behaviour Notes (observed during exploration)

- The **Promotional Code** field is a free-text input on the home page search form.
- When a valid promo code is entered with a seats-available search, the results page displays:
  - `"Seats available!"`
  - `"Promotional code [code] used: [discount]% discount!"`
  - `"Call now on 0800 MARSAIR to book!"`
- When an invalid promo code is entered (any search returning actual results), the results page displays:
  - `"Seats available!"` (or no-seats message if applicable)
  - `"Sorry, code [code] is not valid"`
- When the promo code field is left empty, no discount-related message appears.
- **Dates used for promo code testing:** `Departing: July` / `Returning: December (two years from now)` — this combination reliably returns **"Seats available!"** results.

---

## Known Bugs (observed during exploration)

| Bug ID | Description |
|--------|-------------|
| BUG-1  | A code with discount digit `0` (e.g., `AB0-CDE-000`) is accepted and shows `"00% discount!"` instead of being rejected as invalid. |
| BUG-2  | A valid code where the checksum computes to `0` (e.g., `JJ5-OPQ-320`) is rejected with `"Sorry, code … is not valid"` instead of being accepted. |
| BUG-3  | A valid code padded with leading/trailing whitespace (e.g., `" AF3-FJK-418 "`) is rejected instead of being trimmed and validated. |

---

## Test Suites

---

### Test Suite FPC-1 – Valid Promotional Code (AC1)

> **Equivalence Class:** Format correct, checksum correct, discount digit ≥ 1.

#### TC-FPC-1.1 – Valid promo code applies the correct discount percentage

**Assumption:** Fresh browser session; departing and returning dates produce a seats-available result.

**Promo code under test:** `AF3-FJK-418` — digits: 3, 4, 1 → checksum = 3+4+1 = 8 ✓ → 30% discount

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December (two years from now)"** from the "Returning" dropdown
4. Enter `AF3-FJK-418` in the "Promotional Code" field
5. Click the **"Search"** button

**Expected outcome:**
- Page navigates to the Search Results page (title: **"Mars Airlines: Search Results"**)
- **"Seats available!"** is displayed
- **"Promotional code AF3-FJK-418 used: 30% discount!"** is displayed
- **"Call now on 0800 MARSAIR to book!"** is displayed
- No "Sorry, code … is not valid" message appears

---

#### TC-FPC-1.2 – Valid promo code with different discount percentage (20%)

**Assumption:** Fresh browser session; seats-available date combination used.

**Promo code under test:** `AB2-XYZ-315` — digits: 2, 3, 1 → checksum = 2+3+1 = 6, but check digit is 5 → **this is invalid**. Let me use `ZZ2-KLM-314` — digits: 2, 3, 1 → checksum = 2+3+1 = 6 → need check digit 6. Use `ZZ2-KLM-316` — digits: 2, 3, 1 → 2+3+1=6 ✓ → 20% discount

**Promo code:** `ZZ2-KLM-316` — digits: 2, 3, 1 → checksum = 2+3+1 = 6 ✓ → 20% discount

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December (two years from now)"** from the "Returning" dropdown
4. Enter `ZZ2-KLM-316` in the "Promotional Code" field
5. Click the **"Search"** button

**Expected outcome:**
- **"Seats available!"** is displayed
- **"Promotional code ZZ2-KLM-316 used: 20% discount!"** is displayed

---

### Test Suite FPC-2 – Invalid Promotional Code Format (AC2)

> **Equivalence Class:** Format does not match the `XX9-XXX-999` pattern.  
> Using one representative per invalid equivalence class (EP).

#### TC-FPC-2.1 – Completely malformed code is rejected (EP: wrong format representative)

**Assumption:** Fresh browser session; seats-available date combination used.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December (two years from now)"** from the "Returning" dropdown
4. Enter `INVALID-CODE` in the "Promotional Code" field
5. Click the **"Search"** button

**Expected outcome:**
- **"Sorry, code INVALID-CODE is not valid"** is displayed
- No discount message appears

---

#### TC-FPC-2.2 – Code that is too short is rejected (EP: wrong length)

**Assumption:** Fresh browser session; seats-available date combination used.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December (two years from now)"** from the "Returning" dropdown
4. Enter `AF3-FJK-41` in the "Promotional Code" field *(10 characters, missing checksum digit)*
5. Click the **"Search"** button

**Expected outcome:**
- **"Sorry, code AF3-FJK-41 is not valid"** is displayed
- No discount message appears

---

#### TC-FPC-2.3 – Code using wrong separator characters is rejected (EP: wrong separator)

**Assumption:** Fresh browser session; seats-available date combination used.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December (two years from now)"** from the "Returning" dropdown
4. Enter `AF3 FJK 418` in the "Promotional Code" field *(spaces instead of hyphens)*
5. Click the **"Search"** button

**Expected outcome:**
- **"Sorry, code AF3 FJK 418 is not valid"** is displayed
- No discount message appears

---

#### TC-FPC-2.4 – Code with numeric characters in alpha positions is rejected (EP: type mismatch)

**Assumption:** Fresh browser session; seats-available date combination used.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December (two years from now)"** from the "Returning" dropdown
4. Enter `993-FJK-418` in the "Promotional Code" field *(digits in positions 0–1 that should be alpha)*
5. Click the **"Search"** button

**Expected outcome:**
- **"Sorry, code 993-FJK-418 is not valid"** is displayed
- No discount message appears

---

### Test Suite FPC-3 – Checksum Validation (AC3)

> Applying BVA to the checksum digit: correct value, one above, one below.

#### TC-FPC-3.1 – Code with correct checksum is accepted (BVA: valid boundary)

This scenario is covered by TC-FPC-1.1 (`AF3-FJK-418`, checksum=8).

---

#### TC-FPC-3.2 – Code with checksum one above the expected value is rejected (BVA: above boundary)

**Assumption:** Fresh browser session; seats-available date combination used.

**Promo code under test:** `AF3-FJK-419` — digits: 3, 4, 1 → expected checksum = 8, but code has `9` (one above).

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December (two years from now)"** from the "Returning" dropdown
4. Enter `AF3-FJK-419` in the "Promotional Code" field
5. Click the **"Search"** button

**Expected outcome:**
- **"Sorry, code AF3-FJK-419 is not valid"** is displayed
- No discount message appears

---

#### TC-FPC-3.3 – Code with checksum one below the expected value is rejected (BVA: below boundary)

**Assumption:** Fresh browser session; seats-available date combination used.

**Promo code under test:** `AF3-FJK-417` — digits: 3, 4, 1 → expected checksum = 8, but code has `7` (one below).

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December (two years from now)"** from the "Returning" dropdown
4. Enter `AF3-FJK-417` in the "Promotional Code" field
5. Click the **"Search"** button

**Expected outcome:**
- **"Sorry, code AF3-FJK-417 is not valid"** is displayed
- No discount message appears

---

#### TC-FPC-3.4 – Code where checksum computes to zero is accepted (AC3 edge case — BUG-2)

> **Boundary Value:** Modulo wraps around to 0 when the digit sum is a multiple of 10.

**Assumption:** Fresh browser session; seats-available date combination used.

**Promo code under test:** `JJ5-OPQ-320` — digits: 5, 3, 2 → 5+3+2=10 → 10 mod 10 = **0** ✓ (check digit = 0) → 50% discount.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December (two years from now)"** from the "Returning" dropdown
4. Enter `JJ5-OPQ-320` in the "Promotional Code" field
5. Click the **"Search"** button

**Expected outcome:**
- **"Seats available!"** is displayed
- **"Promotional code JJ5-OPQ-320 used: 50% discount!"** is displayed

> ⚠️ **Known Bug (BUG-2):** The application currently rejects this code with `"Sorry, code JJ5-OPQ-320 is not valid"` instead of accepting it. The checksum algorithm fails when the digit sum is divisible by 10.

---

### Test Suite FPC-4 – Discount Digit Boundary (AC2)

> **BVA applied to the discount digit:** `0` (boundary minimum) should be invalid; `1` (just above) should be valid.

#### TC-FPC-4.1 – Code with discount digit zero is rejected (BVA: lower boundary — BUG-1)

**Assumption:** Fresh browser session; seats-available date combination used.

**Promo code under test:** `AB0-CDE-000` — discount digit = `0`, digits: 0, 0, 0 → checksum = 0+0+0 = 0, check digit = `0` ✓ (format valid, checksum valid, but 0% discount is not meaningful).

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December (two years from now)"** from the "Returning" dropdown
4. Enter `AB0-CDE-000` in the "Promotional Code" field
5. Click the **"Search"** button

**Expected outcome:**
- **"Sorry, code AB0-CDE-000 is not valid"** is displayed
- No discount message appears (a 0% discount code provides no benefit and should be rejected)

> ⚠️ **Known Bug (BUG-1):** The application currently accepts this code and displays `"Promotional code AB0-CDE-000 used: 00% discount!"` instead of rejecting it.

---

#### TC-FPC-4.2 – Code with discount digit one is accepted (BVA: just above lower boundary)

**Assumption:** Fresh browser session; seats-available date combination used.

**Promo code under test:** `AB1-CDE-011` — discount digit = `1`, digits: 1, 0, 1 → 1+0+1 = 2, check digit = `1` → **invalid** (checksum mismatch). Use `AB1-CDE-001`: digits: 1, 0, 0 → 1+0+0=1, check digit=`1` ✓ → 10% discount.

**Promo code:** `AB1-CDE-001` — digits: 1, 0, 0 → checksum = 1+0+0 = 1 ✓ → 10% discount

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December (two years from now)"** from the "Returning" dropdown
4. Enter `AB1-CDE-001` in the "Promotional Code" field
5. Click the **"Search"** button

**Expected outcome:**
- **"Seats available!"** is displayed
- **"Promotional code AB1-CDE-001 used: 10% discount!"** is displayed

---

### Test Suite FPC-5 – Empty and Whitespace Inputs

#### TC-FPC-5.1 – Empty promotional code field produces no discount message

**Assumption:** Fresh browser session; seats-available date combination used.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December (two years from now)"** from the "Returning" dropdown
4. Leave the "Promotional Code" field **empty**
5. Click the **"Search"** button

**Expected outcome:**
- **"Seats available!"** is displayed
- No discount message (neither `"Promotional code … used"` nor `"Sorry, code … is not valid"`) appears
- **"Call now on 0800 MARSAIR to book!"** is displayed

---

#### TC-FPC-5.2 – Valid code with leading and trailing whitespace is accepted after trimming (BUG-3)

**Assumption:** Fresh browser session; seats-available date combination used.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"December (two years from now)"** from the "Returning" dropdown
4. Enter `·AF3-FJK-418·` in the "Promotional Code" field *(where `·` represents a space character — i.e., one leading and one trailing space)*
5. Click the **"Search"** button

**Expected outcome:**
- **"Seats available!"** is displayed
- **"Promotional code AF3-FJK-418 used: 30% discount!"** is displayed (trimmed and validated)

> ⚠️ **Known Bug (BUG-3):** The application currently does not trim whitespace and displays `"Sorry, code AF3-FJK-418 is not valid"` for the padded input.

---

### Test Suite FPC-6 – Promo Code with No Seats Available

> Verifies that the invalid code message still appears even when the flight itself has no seats.

#### TC-FPC-6.1 – Invalid promo code on a no-seats-available search still shows rejection message

**Assumption:** Fresh browser session; date combination with no available seats used.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`
2. Select **"July"** from the "Departing" dropdown
3. Select **"July (next year)"** from the "Returning" dropdown *(12-month gap — no seats available)*
4. Enter `AF3-FJK-419` in the "Promotional Code" field *(wrong checksum)*
5. Click the **"Search"** button

**Expected outcome:**
- **"Sorry, there are no more seats available."** is displayed
- **"Sorry, code AF3-FJK-419 is not valid"** is displayed

---

## Test Case Summary

| Test Case   | Scenario                                              | Technique   | AC   | Pass/Fail |
|-------------|-------------------------------------------------------|-------------|------|-----------|
| TC-FPC-1.1  | Valid code → 30% discount applied                     | EP (valid)  | AC1  |           |
| TC-FPC-1.2  | Valid code → 20% discount applied                     | EP (valid)  | AC1  |           |
| TC-FPC-2.1  | Completely malformed code rejected                    | EP          | AC2  |           |
| TC-FPC-2.2  | Code too short rejected                               | EP          | AC2  |           |
| TC-FPC-2.3  | Wrong separators rejected                             | EP          | AC2  |           |
| TC-FPC-2.4  | Numbers in alpha positions rejected                   | EP          | AC2  |           |
| TC-FPC-3.2  | Checksum one above expected → rejected                | BVA         | AC3  |           |
| TC-FPC-3.3  | Checksum one below expected → rejected                | BVA         | AC3  |           |
| TC-FPC-3.4  | Checksum = 0 (sum mod 10 = 0) → accepted *(BUG-2)*   | BVA         | AC3  |           |
| TC-FPC-4.1  | Discount digit = 0 → rejected *(BUG-1)*               | BVA         | AC2  |           |
| TC-FPC-4.2  | Discount digit = 1 → 10% discount applied             | BVA         | AC1  |           |
| TC-FPC-5.1  | Empty code → no discount message                      | EP          | AC2  |           |
| TC-FPC-5.2  | Whitespace-padded valid code → trimmed *(BUG-3)*      | EP (edge)   | AC1  |           |
| TC-FPC-6.1  | Invalid code on no-seats search → both errors shown   | EP          | AC2  |           |
