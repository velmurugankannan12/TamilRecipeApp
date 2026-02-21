# Tamil Recipe App (React Native)

Modern React Native app for Tamil recipes, ingredient reminders, and recipe details. Built with the React Native CLI.

## Features

- **Home** – Recipe of the day (Masala Dosa), nutritional summary, “Missing ingredients?” reminder, Tamil Specials carousel
- **Recipe Details** – Madurai Kari Dosai with hero image, nutrition carousel, Ingredients / Instructions / Heritage Tips tabs, preparation steps
- **Ingredient Checklist** – Chettinad Chicken reminder, main ingredients and hard-to-find spices with checkboxes, “Add Missing” / “All Set” actions
- **Bottom tabs** – Home, Explore, center FAB, Reminders, Profile
- Dark theme with primary gold (`#f4c025`)

## Run

```bash
# Install dependencies (if not already)
npm install

# Start Metro
npm start

# iOS (from project root, after pod install)
cd ios && bundle exec pod install && cd ..
npm run ios

# Android
npm run android
```

## Project structure

- `App.tsx` – Entry, SafeAreaProvider + AppNavigator
- `src/theme/` – colors, spacing, typography
- `src/navigation/AppNavigator.tsx` – Stack (MainTabs, RecipeDetails, IngredientChecklist) + Bottom Tabs
- `src/screens/HomeScreen.tsx` – Home with recipe of the day and Tamil Specials
- `src/screens/RecipeDetailsScreen.tsx` – Recipe detail with tabs and steps
- `src/screens/IngredientChecklistScreen.tsx` – Ingredient reminder checklist

Navigation from Home: “View Recipe” and Tamil Specials → Recipe Details (stack). “Missing Ingredients?” → Ingredient Checklist (stack). Reminders tab also shows the checklist.
