ARCCO – Aztec Recreational Center Crowd Optimizer
📌 Project Overview

ARCCO is a mobile application built using React Native and FastAPI that helps SDSU students identify the least crowded times to visit the Aztec Recreation Center (ARC).

The app analyzes historical crowd data and recommends the top 3 least crowded time slots based on user-selected days and time windows.

🏗 Architecture Overview
Mobile App

Built with React Native (Expo)

Collects user input (days + time range)

Sends request to backend API

Displays recommended time slots

Backend API

Built with FastAPI (Python)

Processes crowd dataset

Filters by selected time window

Returns top 3 least crowded time slots

Data Layer

CSV dataset (Sprint 1)

May transition to SQLite later

🛠 Tech Stack

React Native (Expo)

FastAPI

Python 3

## Verification and Testing

### Unit Testing ✓
We tested individual functions and components separately to ensure correctness:

**Backend Testing:**
- Login validation functions
- Task creation and deletion functions
- Input validation and error handling

**Frontend Testing:**
- React components (login form, task list, etc.)
- Component rendering
- User interactions and state updates

Unit tests are written using Jest for React Native components and pytest for the Python backend.

```bash
# Frontend unit tests
npm test

# Backend unit tests
npm run test:backend
```

### Integration Testing ✓
We tested the connection between the frontend and backend API. For example:
- User creates a task in the React interface
- Request is sent to the backend
- Database is updated
- New task appears immediately on the screen
- Login requests and error handling verified when server returns invalid credentials

End-to-end tests are performed using Playwright for the web version.

```bash
npm run test:e2e
```

### Static Analysis ✓
We use ESLint to automatically check the code for problems such as:
- Unused variables
- Missing dependencies
- Inconsistent formatting
- Possible logic mistakes

Issues found and fixed included unused state variables and missing semicolons.

```bash
npm run lint
```

### Code Review ✓
All pull requests are reviewed by team members to ensure:
- Code follows project requirements
- Consistent naming conventions
- Proper error handling
- Example: Login form error message display was added after review

### Manual Testing ✓
Important user flows are manually tested to confirm correct behavior:
- Signing in with valid credentials
- Creating, editing tasks
- Logging out
- Error handling for invalid inputs

### Test Cases

| Test ID | Feature Tested | Expected Result | Status |
|---------|---|---|---|
| TC-01 | User Login with Valid Credentials | User is authenticated and redirected to dashboard | ✓ Passed |
| TC-02 | Create New Task | New task is saved and appears in task list immediately | ✓ Passed |

### CI/CD
GitHub Actions runs automated tests on every push and pull request, including linting, unit tests, and e2e tests with coverage reporting.