import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { RecipeDetailsScreen } from '../screens/RecipeDetailsScreen';
import { IngredientChecklistScreen } from '../screens/IngredientChecklistScreen';
import { colors } from '../theme/theme';

export type RootStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  RecipeDetails: { recipeId: string };
  IngredientChecklist: { recipeId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function TabIcon({ label, active }: { label: string; active: boolean }) {
  return (
    <View style={styles.tabIconWrap}>
      <Text style={[styles.tabIcon, active && styles.tabIconActive]}>{label}</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon label="🏠" active={focused} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ focused }) => <TabIcon label="◇" active={focused} />,
        }}
      />
      <Tab.Screen
        name="Add"
        component={PlaceholderScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <View style={styles.centerFab}>
              <Text style={styles.centerFabText}>+</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Reminders"
        component={IngredientChecklistScreen as React.ComponentType<any>}
        initialParams={{ recipeId: 'chettinad-chicken' }}
        options={{
          tabBarLabel: 'Reminders',
          tabBarIcon: ({ focused }) => <TabIcon label="✓" active={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={PlaceholderScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon label="👤" active={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

function PlaceholderScreen() {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>Coming soon</Text>
    </View>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.backgroundDark },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
        <Stack.Screen name="IngredientChecklist" component={IngredientChecklistScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.backgroundDark,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingTop: 8,
    height: 64,
  },
  tabLabel: { fontSize: 10, fontWeight: '600' },
  tabItem: {},
  tabIconWrap: { alignItems: 'center', justifyContent: 'center' },
  tabIcon: { fontSize: 20, color: colors.textMuted },
  tabIconActive: { color: colors.primary },
  centerFab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  centerFabText: { fontSize: 28, fontWeight: '700', color: colors.backgroundDark },
  placeholder: { flex: 1, backgroundColor: colors.backgroundDark, alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: colors.textMuted, fontSize: 16 },
});
