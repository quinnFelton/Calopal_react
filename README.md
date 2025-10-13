# Calopal - React Native Android App with SQLite

A React Native Android application that uses SQLite for persistent local storage. This app demonstrates a complete calorie tracking solution where all data is stored on the device using SQLite database.

## Features

- ✅ React Native Android application
- ✅ SQLite database for persistent storage
- ✅ All data stored locally on device
- ✅ Add, view, and delete food items with calorie information
- ✅ Clean and intuitive UI
- ✅ No internet connection required

## Technology Stack

- **React Native 0.73.0** - Mobile application framework
- **react-native-sqlite-storage** - SQLite database integration
- **SQLite** - Local persistent storage

## Project Structure

```
Calopal_react/
├── android/                 # Android native code and configuration
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   ├── java/com/calopal/
│   │   │   │   ├── MainActivity.java
│   │   │   │   └── MainApplication.java
│   │   │   └── res/         # Android resources
│   │   ├── build.gradle
│   │   └── proguard-rules.pro
│   ├── build.gradle
│   ├── settings.gradle
│   └── gradle.properties
├── src/
│   └── services/
│       └── DatabaseService.js  # SQLite database operations
├── App.js                   # Main application component
├── index.js                 # Application entry point
├── package.json             # Dependencies and scripts
├── babel.config.js          # Babel configuration
├── metro.config.js          # Metro bundler configuration
└── README.md               # This file
```

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v18 or higher)
2. **npm** or **yarn**
3. **React Native development environment**:
   - Java Development Kit (JDK 11 or higher)
   - Android Studio
   - Android SDK
   - Android SDK Platform 34
   - Android SDK Build-Tools
   - Android Emulator or physical Android device

For detailed setup instructions, visit:
https://reactnative.dev/docs/environment-setup

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/quinnFelton/Calopal_react.git
   cd Calopal_react
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **For Android development**, ensure you have:
   - Android Studio installed
   - Android SDK configured
   - An Android emulator running or a device connected via USB

## Running the Application

### Start Metro Bundler

First, start the Metro bundler:

```bash
npm start
```

### Run on Android

In a new terminal window:

```bash
npm run android
```

This will:
1. Build the Android application
2. Install it on your emulator/device
3. Launch the app

## Database Schema

The application uses a SQLite database (`calopal.db`) with the following schema:

### Table: food_items

| Column      | Type    | Description                    |
|-------------|---------|--------------------------------|
| id          | INTEGER | Primary key (auto-increment)   |
| name        | TEXT    | Name of the food item          |
| calories    | INTEGER | Calorie count                  |
| created_at  | DATETIME| Timestamp (default: current)   |

## Database Operations

The `DatabaseService` provides the following methods:

- `initDatabase()` - Initialize database and create tables
- `addItem(name, calories)` - Add a new food item
- `getAllItems()` - Retrieve all food items
- `getItemById(id)` - Get a specific item
- `updateItem(id, name, calories)` - Update an existing item
- `deleteItem(id)` - Delete a specific item
- `deleteAllItems()` - Clear all items
- `getTotalCalories()` - Calculate total calories
- `closeDatabase()` - Close database connection

## Usage

1. **Adding Items**: 
   - Enter the food name in the first input field
   - Enter the calorie count in the second input field
   - Tap "Add Item" button

2. **Viewing Items**:
   - All stored items are displayed below the input form
   - Items show name and calorie count
   - Items are sorted by creation date (newest first)

3. **Deleting Items**:
   - Tap the "Delete" button on any item card to remove it
   - Confirmation alert will appear before deletion

## Development

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

### Testing

Run tests (when implemented):

```bash
npm test
```

## Troubleshooting

### Metro bundler issues
```bash
# Clear Metro cache
npx react-native start --reset-cache
```

### Android build issues
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Database issues
- The database file is stored in the app's internal storage
- Uninstalling the app will remove all stored data
- Check Android logs for database errors: `adb logcat | grep -i database`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Contact

Quinn Felton - GitHub: [@quinnFelton](https://github.com/quinnFelton)

Project Link: [https://github.com/quinnFelton/Calopal_react](https://github.com/quinnFelton/Calopal_react)