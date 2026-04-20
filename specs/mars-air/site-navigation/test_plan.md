# Site Navigation – Test Plan

**Application:** MarsAir  
**Feature:** Site Navigation  
**Entry Point:** https://marsair.recruiting.thoughtworks.net/WeiLianLow  
**Story Reference:** MA-4 – Implement global navigation links back to the home page  
**Date:** 2026-04-20

---

## Story Summary

> **As a** MarsAir Sales Director (Mark),  
> **I want** to allow potential customers to be able to go back to the flight search from anywhere on the site,  
> **So that** they are guided towards booking trips.

### Acceptance Criteria

| ID  | Criterion |
|-----|-----------|
| AC1 | Given a user is navigating the website, when they look at any page, then the text **"Book a ticket to the red planet now!"** should appear prominently. |
| AC2 | Given a user is on any page, when they click **"Book a ticket to the red planet now!"**, then they are redirected to the home (search) page. |
| AC3 | Given a user is on any page, when they click the **MarsAir logo** in the top left corner, then they are redirected to the home (search) page. |

### In-Scope

- Clickable **"Book a ticket to the red planet now!"** promotional text on all pages.
- Clickable **MarsAir logo** linked to the root/home page.

### Out-of-Scope

- Complex global navigation bars or breadcrumbs.

---

## Application Behaviour Notes (observed during exploration)

- **Three distinct pages** exist in the application:
  - **Home page** (`/WeiLianLow`) – Flight search form.
  - **Search Results page** (`/WeiLianLow` after form submission) – Displays flight availability outcome.
  - **Report page** (`/WeiLianLow/report`) – Issue reporting form.
- The **MarsAir logo** (top-left heading link) is present on all three pages and links to `/WeiLianLow`.
- **"Book a ticket to the red planet now!"** currently appears only on the home page as an `<h3>` heading and is **not** a clickable link. It does **not** appear on the Search Results or Report pages. This is the gap the story addresses.
- The Search Results page also has a **"Back"** link that navigates to the previous page via browser history.

---

## Test Suites

---

### Test Suite SN-1 – "Book a ticket to the red planet now!" Visibility (AC1)

#### TC-SN-1.1 – Promo text is visible on the home page

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.

**Expected outcome:**
- The text **"Book a ticket to the red planet now!"** is visible on the page.

---

#### TC-SN-1.2 – Promo text is visible on the search results page (seats available)

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
2. Select **"July"** from the **"Departing"** dropdown.
3. Select **"December (two years from now)"** from the **"Returning"** dropdown.
4. Click the **"Search"** button.

**Expected outcome:**
- Page title is **"Mars Airlines: Search Results"**.
- The text **"Book a ticket to the red planet now!"** is visible on the page.

---

#### TC-SN-1.3 – Promo text is visible on the search results page (no seats available)

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
2. Select **"July"** from the **"Departing"** dropdown.
3. Select **"July (next year)"** from the **"Returning"** dropdown.
4. Click the **"Search"** button.

**Expected outcome:**
- Page title is **"Mars Airlines: Search Results"**.
- The text **"Book a ticket to the red planet now!"** is visible on the page.

---

#### TC-SN-1.4 – Promo text is visible on the report page

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow/report`.

**Expected outcome:**
- Page title is **"Mars Airlines:"** (report page).
- The text **"Book a ticket to the red planet now!"** is visible on the page.

---

### Test Suite SN-2 – "Book a ticket to the red planet now!" Links to Home Page (AC2)

#### TC-SN-2.1 – Clicking promo text on the home page navigates to the home page

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
2. Click the **"Book a ticket to the red planet now!"** link.

**Expected outcome:**
- The user is redirected to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
- Page title is **"Mars Airlines: Home"**.
- The flight search form is visible.

---

#### TC-SN-2.2 – Clicking promo text on the search results page navigates to the home page

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
2. Select **"July"** from the **"Departing"** dropdown.
3. Select **"December (two years from now)"** from the **"Returning"** dropdown.
4. Click the **"Search"** button.
5. Click the **"Book a ticket to the red planet now!"** link.

**Expected outcome:**
- The user is redirected to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
- Page title is **"Mars Airlines: Home"**.
- The flight search form is visible.

---

#### TC-SN-2.3 – Clicking promo text on the report page navigates to the home page

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow/report`.
2. Click the **"Book a ticket to the red planet now!"** link.

**Expected outcome:**
- The user is redirected to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
- Page title is **"Mars Airlines: Home"**.
- The flight search form is visible.

---

### Test Suite SN-3 – MarsAir Logo Links to Home Page (AC3)

#### TC-SN-3.1 – Clicking the MarsAir logo on the home page navigates to the home page

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
2. Click the **"MarsAir"** logo link in the top-left corner.

**Expected outcome:**
- The user remains on (or is redirected to) `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
- Page title is **"Mars Airlines: Home"**.
- The flight search form is visible.

---

#### TC-SN-3.2 – Clicking the MarsAir logo on the search results page navigates to the home page

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
2. Select **"July"** from the **"Departing"** dropdown.
3. Select **"December (two years from now)"** from the **"Returning"** dropdown.
4. Click the **"Search"** button.
5. Click the **"MarsAir"** logo link in the top-left corner.

**Expected outcome:**
- The user is redirected to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
- Page title is **"Mars Airlines: Home"**.
- The flight search form is visible.

---

#### TC-SN-3.3 – Clicking the MarsAir logo on the report page navigates to the home page

**Assumption:** Fresh browser session; no prior navigation.

**Steps:**
1. Navigate to `https://marsair.recruiting.thoughtworks.net/WeiLianLow/report`.
2. Click the **"MarsAir"** logo link in the top-left corner.

**Expected outcome:**
- The user is redirected to `https://marsair.recruiting.thoughtworks.net/WeiLianLow`.
- Page title is **"Mars Airlines: Home"**.
- The flight search form is visible.

---

## Test Coverage Summary

| Test Case | Acceptance Criteria | Page Under Test          |
|-----------|---------------------|--------------------------|
| TC-SN-1.1 | AC1                 | Home page                |
| TC-SN-1.2 | AC1                 | Search Results (seats available) |
| TC-SN-1.3 | AC1                 | Search Results (no seats) |
| TC-SN-1.4 | AC1                 | Report page              |
| TC-SN-2.1 | AC2                 | Home page                |
| TC-SN-2.2 | AC2                 | Search Results page      |
| TC-SN-2.3 | AC2                 | Report page              |
| TC-SN-3.1 | AC3                 | Home page                |
| TC-SN-3.2 | AC3                 | Search Results page      |
| TC-SN-3.3 | AC3                 | Report page              |
