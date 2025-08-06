# Currency Converter App

A React Native currency converter app built with Expo and TypeScript.

## Features

- Currency conversion with real-time exchange rates
- Search and filter currencies
- Custom number pad
- Offline support with caching
- Dark mode support
- Favorites and conversion history
- Flag icons for currencies

## Setup

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Start the development server:
   ```bash
   yarn start
   ```

3. Run on a device:
   - Install Expo Go on your device
   - Scan the QR code from the terminal
   - Or press 'a' for Android or 'i' for iOS simulator

## Building

This project uses EAS Build for creating iOS and Android builds:

```bash
# Configure EAS
eas login
eas build:configure

# Create a development build
eas build --profile development --platform ios
eas build --profile development --platform android

# Create a production build
eas build --platform ios
eas build --platform android
```

## Project Structure

```
currency-converter/
├─ assets/flags/      # Currency flag images
├─ src/
│   ├─ components/    # Reusable UI components
│   ├─ screens/       # App screens
│   ├─ services/      # API services
│   ├─ context/       # React Context
│   └─ utils/         # Helper functions
├─ app.json          # Expo configuration
├─ eas.json         # EAS Build configuration
└─ package.json
```

## Development

- Uses TypeScript for type safety
- Follows MVVM-like pattern with React Context
- Implements proper error handling
- Includes performance optimizations
- Supports both light and dark themes

## API

Uses [exchangerate.host](https://exchangerate.host) API for currency rates.

## License

MIT
