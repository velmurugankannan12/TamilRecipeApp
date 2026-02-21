import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'IngredientChecklist'>;

function getRecipeId(route: Props['route']): string {
  return route.params?.recipeId ?? 'chettinad-chicken';
}

const RECIPE = {
  title: 'Chettinad Chicken Curry',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF0-djC43zHIT50cHsQE8WSricAF8K1b4l5Cx_wERdoVjfhytBQFRGBal603wrsoUKi8A8QlKHOK91kwMf6JDT3kXXjDF4anuOGQeRM6wSPSwO-2Pksd6WNt-zdbiZgpYCc7_5AtRyRyw4S-6Ak6SfmdMDxmLjvemfIQe3rwrabRCgwYR1kD_n9R1HzTuZzsJteGp6oBmVLQvTHZrZgoMiS7DO8ztpQTXXhhwJLcKgsFyvbdxTtGoybBVb0Fqhbuq8lz8-mMb0S-A',
  tag: 'Tamil Nadu Special',
  time: '45 Mins',
  nutrition: { protein: '32g', carbs: '12g', fiber: '4g' },
};

const MAIN_INGREDIENTS = [
  '500g Fresh Chicken (Bone-in)',
  '200g Shallots (Small Onions)',
  '2 tbsp Ginger-Garlic Paste',
];

const SPICES = [
  { name: 'Kalpasi (Stone Flower)', rare: true, note: 'Essential for authentic aroma' },
  { name: 'Marathi Moggu (Kapok Buds)', rare: true },
  { name: 'Gingelly Oil (Sesame Oil)', rare: false },
];

export function IngredientChecklistScreen({ navigation, route }: Props) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [spiceChecked, setSpiceChecked] = useState<Record<number, boolean>>({});
  const recipeId = getRecipeId(route);

  const toggle = (key: number, isSpice: boolean) => {
    if (isSpice) setSpiceChecked((p) => ({ ...p, [key]: !p[key] }));
    else setChecked((p) => ({ ...p, [key]: !p[key] }));
  };

  const goBack = () => {
    if ('goBack' in navigation) navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={goBack}>
          <Text style={styles.headerBtnText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ingredient Reminder</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Text style={styles.headerBtnText}>📅</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>Do you have everything for tomorrow?</Text>
            <Text style={styles.bannerSubtitle}>You have <Text style={styles.bannerHighlight}>Chettinad Chicken</Text> planned for lunch.</Text>
          </View>
          <TouchableOpacity style={styles.bannerBtn}>
            <Text style={styles.bannerBtnText}>View Recipe</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recipeRow}>
          <Image source={{ uri: RECIPE.image }} style={styles.recipeImage} />
          <View style={styles.recipeInfo}>
            <View style={styles.recipeTags}>
              <View style={styles.recipeTag}><Text style={styles.recipeTagText}>{RECIPE.tag}</Text></View>
              <View style={styles.recipeTagMuted}><Text style={styles.recipeTagMutedText}>{RECIPE.time}</Text></View>
            </View>
            <Text style={styles.recipeTitle}>{RECIPE.title}</Text>
          </View>
        </View>

        <View style={styles.nutritionRow}>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>Protein</Text>
            <Text style={styles.nutritionValue}>{RECIPE.nutrition.protein}</Text>
          </View>
          <View style={[styles.nutritionItem, styles.nutritionItemBorder]}>
            <Text style={styles.nutritionLabel}>Carbs</Text>
            <Text style={styles.nutritionValue}>{RECIPE.nutrition.carbs}</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>Fiber</Text>
            <Text style={styles.nutritionValue}>{RECIPE.nutrition.fiber}</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Main Ingredients</Text>
        {MAIN_INGREDIENTS.map((name, i) => (
          <TouchableOpacity
            key={i}
            style={styles.checkRow}
            onPress={() => toggle(i, false)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, checked[i] && styles.checkboxChecked]}>
              {checked[i] && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={[styles.checkLabel, checked[i] && styles.checkLabelDone]}>{name}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Hard-to-Find Spices</Text>
          <Text style={styles.infoIcon}>ℹ</Text>
        </View>
        {SPICES.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.checkRow, item.rare && styles.checkRowRare]}
            onPress={() => toggle(i, true)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, spiceChecked[i] && styles.checkboxChecked]}>
              {spiceChecked[i] && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.spiceContent}>
              <View style={styles.spiceRow}>
                <Text style={[styles.checkLabel, spiceChecked[i] && styles.checkLabelDone]}>{item.name}</Text>
                {item.rare && (
                  <View style={styles.rareBadge}><Text style={styles.rareBadgeText}>Rare</Text></View>
                )}
              </View>
              {item.note && <Text style={styles.spiceNote}>{item.note}</Text>}
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionSecondary}>
          <Text style={styles.actionSecondaryIcon}>🛒</Text>
          <Text style={styles.actionSecondaryText}>Add Missing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionPrimary}>
          <Text style={styles.actionPrimaryIcon}>✓</Text>
          <Text style={styles.actionPrimaryText}>All Set</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundDark },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderPrimary,
    backgroundColor: 'rgba(26,24,20,0.9)',
  },
  headerBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerBtnText: { fontSize: 20, color: colors.text },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  scroll: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: 120 },
  banner: {
    backgroundColor: 'rgba(244,192,37,0.1)',
    borderWidth: 1,
    borderColor: colors.borderPrimary,
    borderRadius: 14,
    padding: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  bannerText: { flex: 1, marginRight: 12 },
  bannerTitle: { fontSize: 18, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  bannerSubtitle: { fontSize: 14, color: colors.textMuted },
  bannerHighlight: { color: colors.text, fontWeight: '600' },
  bannerBtn: { backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  bannerBtnText: { fontSize: 14, fontWeight: '700', color: colors.backgroundDark },
  recipeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, marginBottom: spacing.lg },
  recipeImage: { width: 64, height: 64, borderRadius: 10, borderWidth: 1, borderColor: colors.borderPrimary },
  recipeInfo: { flex: 1 },
  recipeTags: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  recipeTag: { backgroundColor: 'rgba(244,192,37,0.2)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  recipeTagText: { fontSize: 10, fontWeight: '700', color: colors.primary, letterSpacing: 1 },
  recipeTagMuted: { backgroundColor: colors.surfaceDark, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  recipeTagMutedText: { fontSize: 10, fontWeight: '700', color: colors.textMuted },
  recipeTitle: { fontSize: 20, fontWeight: '700', color: colors.text },
  nutritionRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceDark,
    borderRadius: 14,
    padding: 12,
    marginBottom: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nutritionItem: { flex: 1, alignItems: 'center' },
  nutritionItemBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: colors.border },
  nutritionLabel: { fontSize: 10, fontWeight: '700', color: colors.textMuted },
  nutritionValue: { fontSize: 14, fontWeight: '700', color: colors.primary },
  sectionLabel: { fontSize: 12, fontWeight: '700', color: colors.textMuted, letterSpacing: 1, marginBottom: 12, marginTop: 8 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, marginTop: 16 },
  infoIcon: { fontSize: 14, color: colors.primary },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    marginBottom: 4,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  checkRowRare: { backgroundColor: 'rgba(244,192,37,0.06)', borderWidth: 1, borderColor: colors.borderPrimary },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.borderPrimary,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkmark: { color: colors.backgroundDark, fontSize: 14, fontWeight: '700' },
  checkLabel: { flex: 1, fontSize: 15, color: colors.text },
  checkLabelDone: { textDecorationLine: 'line-through', color: colors.textMuted },
  spiceContent: { flex: 1 },
  spiceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' },
  spiceNote: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  rareBadge: { backgroundColor: colors.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  rareBadgeText: { fontSize: 9, fontWeight: '800', color: colors.backgroundDark },
  bottomSpacer: { height: 24 },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    padding: spacing.lg,
    backgroundColor: colors.backgroundDark,
  },
  actionSecondary: {
    flex: 1,
    backgroundColor: colors.surfaceLight,
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionSecondaryIcon: { fontSize: 20 },
  actionSecondaryText: { fontSize: 16, fontWeight: '700', color: colors.text },
  actionPrimary: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionPrimaryIcon: { fontSize: 20, color: colors.backgroundDark },
  actionPrimaryText: { fontSize: 16, fontWeight: '700', color: colors.backgroundDark },
});
