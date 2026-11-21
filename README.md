# The Detailing Lab

A React Native (Expo) app for a car detailing business, with:

- **Registration / Login** — staff account creation and sign-in (form validation included)
- **Dashboard** — quick stats (customers, vehicles, jobs in progress/completed) + recent jobs + quick actions
- **Customers** — searchable list, profile detail view (call/email shortcuts, linked vehicles), add-new form
- **Vehicles** — filterable list by status, detail view with an in-place status updater, add-new form linked to a customer

## Tech stack

- Expo SDK 51 / React Native 0.74
- React Navigation (native-stack + bottom-tabs)
- Plain `StyleSheet` styling with a shared theme (`src/theme/theme.js`) — dark garage aesthetic, orange accent
- In-memory mock data store (`src/data/store.js`) standing in for a backend

## Getting started

```bash
npm install
npx expo start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with the Expo Go app on your phone.

## Project structure

```
App.js
src/
  navigation/AppNavigator.js   # Auth stack + bottom tabs + nested stacks
  screens/
    RegistrationScreen.js
    LoginScreen.js
    DashboardScreen.js
    CustomerListScreen.js
    CustomerDetailsScreen.js
    AddCustomerScreen.js
    VehicleListScreen.js
    VehicleDetailsScreen.js
    AddVehicleScreen.js
  components/UI.js             # TextField, PrimaryButton, Card, ScreenHeader, StatusPill
  theme/theme.js                # colors, spacing, radii, typography
  data/store.js                 # mock customers/vehicles + helper functions
```

## Next steps to make this production-ready

1. **Auth backend** — wire `RegistrationScreen` / `LoginScreen` to Firebase Auth, Supabase, or your own REST API instead of the simulated `setTimeout`.
2. **Persistent data** — replace `src/data/store.js` with real API calls (or at minimum `AsyncStorage`, already included as a dependency) so data survives app restarts.
3. **Validation & error handling** — expand form validation and add network error states/toasts.
4. **Roles & permissions** — if multiple staff roles exist (owner, detailer, front-desk), add role-based navigation.
5. **Push notifications** — notify customers when their vehicle status changes to "Completed".
6. **Payments/invoicing** — add a billing screen if you want to track payments per job.
