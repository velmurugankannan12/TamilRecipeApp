import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, borderRadius } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'RecipeDetails'>;

const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU6kzl978JfL_tx8i774OBuuZImMahBqsuFM-x2y5GFAecN04Qf_4eVioJMoO4UdCOpa2Of0vHenrcIumFM_8tPXTvql83T_UcE0cr_J-FbNZsaU2lYgd7LbGjtQwnSgCPmurCkyBP2wAol93sboqrt-2LOBnSrtBJYF1fshU4gtuzEPAZ8lga94VB0TIwlRZAwOWUBm-93ijWYvpXTnQtKqZlQEUvX6XHQegKubwYRCooTHFioZtkANcRGLZ512NFCnNZK3oXrtU';

const NUTRITION = [
  { label: 'kcal', value: '520', icon: '🔥' },
  { label: 'Protein', value: '28g', icon: '💪' },
  { label: 'Carbs', value: '42g', icon: '🍞' },
  { label: 'Fat', value: '22g', icon: '💧' },
  { label: 'Fiber', value: '6g', icon: '🌿' },
];

const INGREDIENTS_INITIAL = [
  { name: '2 cups Dosa Batter (fermented)', done: true },
  { name: '250g Minced Mutton (Kari)', done: false },
  { name: '2 Large Eggs', done: false },
  { name: '1 tsp Turmeric Powder', done: false },
  { name: 'Fresh Curry Leaves', done: false },
];

const STEPS = [
  { title: 'Pre-cook the Kari', body: 'Sauté the minced mutton with ginger-garlic paste, turmeric, and secret Madurai spice mix until fully cooked and dry.' },
  { title: 'The Base Layer', body: 'Spread a thick circle of dosa batter on a hot iron tawa. Do not spread it too thin; Kari Dosai should be fluffy.' },
  { title: 'The Egg & Meat Mix', body: 'Whisk an egg with salt and pour it over the batter. Generously spread the cooked Kari over the egg layer and press gently.' },
];

const TABS = ['Ingredients', 'Instructions', 'Heritage Tips'];

export function RecipeDetailsScreen({ navigation, route }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [ingredients, setIngredients] = useState(INGREDIENTS_INITIAL);
  const { width } = Dimensions.get('window');

  const toggleIngredient = (index: number) => {
    setIngredients((prev) =>
      prev.map((item, i) => (i === index ? { ...item, done: !item.done } : item))
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={[styles.hero, { width }]}>
          <Image source={{ uri: HERO_IMAGE }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.headerBtnText}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerBtn}><Text style={styles.headerBtnText}>↗</Text></TouchableOpacity>
              <TouchableOpacity style={styles.headerBtn}><Text style={styles.headerBtnText}>♥</Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.heroBottom}>
            <View style={styles.heroTags}>
              <View style={styles.tagRed}><Text style={styles.tagRedText}>Heritage Special</Text></View>
              <View style={styles.tagPrimary}><Text style={styles.tagPrimaryText}>Madurai</Text></View>
            </View>
            <Text style={styles.heroTitle}>Madurai Kari Dosai</Text>
            <View style={styles.heroMeta}>
              <Text style={styles.heroMetaText}>⏱ 45 mins</Text>
              <Text style={styles.heroMetaText}>🍽 Medium</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Nutritional Facts</Text>
            <Text style={styles.primarySmall}>Per Serving</Text>
          </View>
          <FlatList
            horizontal
            data={NUTRITION}
            keyExtractor={(_, i) => `nutrition-${i}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.nutritionScroll}
            renderItem={({ item: n }) => (
              <View style={styles.nutritionCard}>
                <Text style={styles.nutritionIcon}>{n.icon}</Text>
                <Text style={styles.nutritionValue}>{n.value}</Text>
                <Text style={styles.nutritionLabel}>{n.label}</Text>
              </View>
            )}
          />
        </View>

        <FlatList
          horizontal
          data={TABS}
          keyExtractor={(_, i) => `tab-${i}`}
          scrollEnabled={false}
          contentContainerStyle={[styles.tabs, { width: width - spacing.xxl * 2 }]}
          renderItem={({ item: t, index: i }) => (
            <TouchableOpacity
              style={[styles.tab, activeTab === i && styles.tabActive]}
              onPress={() => setActiveTab(i)}
            >
              <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{t}</Text>
            </TouchableOpacity>
          )}
        />

        {activeTab === 0 && (
          <View style={styles.section}>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              <Text style={styles.primarySmall}>🛒 Add all</Text>
            </View>
            <FlatList
              data={ingredients}
              scrollEnabled={false}
              keyExtractor={(_, i) => `ingredient-${i}`}
              renderItem={({ item, index: i }) => (
                <TouchableOpacity
                  style={styles.ingredientRow}
                  onPress={() => toggleIngredient(i)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, item.done && styles.checkboxDone]}>
                    {item.done && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={[styles.ingredientText, item.done && styles.ingredientDone]}>{item.name}</Text>
                  {i === 1 && <View pointerEvents="none"><Text style={styles.notifIcon}>🔔</Text></View>}
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {activeTab === 1 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preparation</Text>
            <FlatList
              data={STEPS}
              scrollEnabled={false}
              keyExtractor={(_, i) => `step-${i}`}
              renderItem={({ item: step, index: i }) => (
                <View style={styles.step}>
                  <View style={[styles.stepNum, i === 0 && styles.stepNumActive]}><Text style={[styles.stepNumText, i === 0 && styles.stepNumTextActive]}>{i + 1}</Text></View>
                  <View>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepBody}>{step.body}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}

        {activeTab === 2 && (
          <View style={styles.section}>
            <View style={styles.heritageBox}>
              <Text style={styles.heritageTitle}>✨ The Heritage Touch</Text>
              <Text style={styles.heritageBody}>
                For the authentic Madurai street-style flavor, use a seasoned heavy-duty cast iron tawa. Traditional chefs swear by the "Double Tawa" method where the mutton is pre-cooked separately with gingelly oil and shallots before being added to the egg layer.
              </Text>
            </View>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.fabBar}>
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabIcon}>▶</Text>
          <Text style={styles.fabLabel}>Start Cooking Guide</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundDark },
  content: { paddingBottom: 100 },
  hero: { height: 280 },
  heroImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  headerRow: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', padding: spacing.lg },
  headerBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  headerBtnText: { color: colors.text, fontSize: 18 },
  headerRight: { flexDirection: 'row', gap: 8 },
  heroBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.xxl },
  heroTags: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  tagRed: { backgroundColor: colors.accentRed, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  tagRedText: { fontSize: 10, fontWeight: '700', color: colors.white },
  tagPrimary: { backgroundColor: colors.primary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  tagPrimaryText: { fontSize: 10, fontWeight: '700', color: colors.backgroundDark },
  heroTitle: { fontSize: 28, fontWeight: '700', color: colors.text },
  heroMeta: { flexDirection: 'row', gap: 16, marginTop: 8 },
  heroMetaText: { fontSize: 14, color: colors.textMuted },
  section: { paddingHorizontal: spacing.xxl, marginTop: spacing.xxl },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: colors.text },
  primarySmall: { fontSize: 12, fontWeight: '600', color: colors.primary },
  nutritionScroll: { flexDirection: 'row', gap: 12, paddingBottom: 8 },
  nutritionCard: { minWidth: 100, backgroundColor: colors.surfaceDark, padding: 12, borderRadius: 14, borderWidth: 1, borderColor: colors.borderPrimary, alignItems: 'center' },
  nutritionIcon: { fontSize: 20 },
  nutritionValue: { fontSize: 18, fontWeight: '700', color: colors.text, marginTop: 4 },
  nutritionLabel: { fontSize: 10, color: colors.textMuted, fontWeight: '700' },
  tabs: { flexDirection: 'row', marginTop: 8, paddingHorizontal: spacing.xxl, borderBottomWidth: 1, borderBottomColor: colors.border },
  tab: { flex: 1, paddingVertical: 16, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: colors.primary },
  tabText: { fontSize: 14, fontWeight: '700', color: colors.textMuted },
  tabTextActive: { color: colors.primary },
  ingredientRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, backgroundColor: 'rgba(42,38,31,0.5)', borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: colors.borderPrimary, marginRight: 12, alignItems: 'center', justifyContent: 'center' },
  checkboxDone: { backgroundColor: colors.primary },
  checkmark: { color: colors.backgroundDark, fontSize: 12, fontWeight: '700' },
  ingredientText: { flex: 1, fontSize: 15, color: colors.text },
  ingredientDone: { textDecorationLine: 'line-through', color: colors.textMuted },
  notifIcon: { fontSize: 18 },
  step: { flexDirection: 'row', marginBottom: 24 },
  stepNum: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surfaceDark, alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 4, borderColor: colors.backgroundDark },
  stepNumActive: { backgroundColor: colors.primary },
  stepNumText: { fontSize: 14, fontWeight: '700', color: colors.textMuted },
  stepNumTextActive: { color: colors.backgroundDark },
  stepTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 4 },
  stepBody: { fontSize: 14, color: colors.textMuted, lineHeight: 22 },
  heritageBox: { backgroundColor: 'rgba(244,192,37,0.08)', borderWidth: 2, borderColor: colors.borderPrimary, borderRadius: 14, padding: spacing.xl },
  heritageTitle: { fontSize: 16, fontWeight: '700', color: colors.primary, marginBottom: 8 },
  heritageBody: { fontSize: 14, color: colors.textMuted, lineHeight: 22 },
  bottomSpacer: { height: 24 },
  fabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.lg, backgroundColor: colors.backgroundDark },
  fab: { backgroundColor: colors.primary, height: 56, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  fabIcon: { fontSize: 20 },
  fabLabel: { fontSize: 18, fontWeight: '700', color: colors.backgroundDark },
});
