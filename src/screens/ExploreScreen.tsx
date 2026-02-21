import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, borderRadius } from '../theme/theme';

type ExploreNav = CompositeNavigationProp<
  BottomTabNavigationProp<RootStackParamList, 'MainTabs'>,
  NativeStackNavigationProp<RootStackParamList, 'RecipeDetails'>
>;

type Props = { navigation: ExploreNav };

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PAD = spacing.xxl;
const GAP = spacing.md;
const CARD_WIDTH = (SCREEN_WIDTH - PAD * 2 - GAP) / 2;

const CATEGORIES = [
  { id: 'all', label: 'All South Indian' },
  { id: 'chettinad', label: 'Chettinad' },
  { id: 'madurai', label: 'Madurai' },
  { id: 'kongunadu', label: 'Kongunadu' },
  { id: 'tanjore', label: 'Tanjore' },
];

const DISCOVERIES = [
  {
    id: '1',
    title: 'Madurai Mutton Chukka',
    time: '35m',
    cal: '420 Cal',
    nutrition: 'Protein 28g',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF0-djC43zHIT50cHsQE8WSricAF8K1b4l5Cx_wERdoVjfhytBQFRGBal603wrsoUKi8A8QlKHOK91kwMf6JDT3kXXjDF4anuOGQeRM6wSPSwO-2Pksd6WNt-zdbiZgpYCc7_5AtRyRyw4S-6Ak6SfmdMDxmLjvemfIQe3rwrabRCgwYR1kD_n9R1HzTuZzsJteGp6oBmVLQvTHZrZgoMiS7DO8ztpQTXXhhwJLcKgsFyvbdxTtGoybBVb0Fqhbuq8lz8-mMb0S-A',
    newToday: true,
    aspect: 3 / 4,
  },
  {
    id: '2',
    title: 'Ghee Podi Roast',
    time: '15m',
    cal: '310 Cal',
    nutrition: 'Carbs 45g',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgJqeW0S1I1eoCj-3tgyVCG3pwNDeouW1FTA1TuclVPSsrx-m2xsJX9w_-S-LRWqIY6OwHEHkCUNc3XIAXSecuaxtlre1s9D4-vu6tif5fqdKPTtjeIXTc8rJ1jec86PHjzQRRZcliisNo2Z7XnoCqwc5DijSxp5qoGE9E_5USyjDc6jvpFnWWjjTJ2DVNVPlIwjac8mkT8Sd7cfsFxc2Tj5UK-wDJYQuSt5MFSrMz2fi4cGyPMhPUrRMZPop14g48r7ExTLCXchw',
    newToday: false,
    aspect: 1,
  },
  {
    id: '3',
    title: 'Kongunadu Veg Kurma',
    time: '25m',
    cal: '280 Cal',
    nutrition: 'Fiber 12g',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAiymWWRvaW_5Kg4Rl9YV7RyLLgJ6l63tlAXSNMdHY_4lnFLhSttJavksF0CnpA4N5B9lycBs3_othzfXXcta_geWIS31HrOp9bB-l9JO92F1syrO9HMsQqI0JQABm1rvKQn_-cTfCQX2rBl867IFJHBtmzmPcEaKyThppgN3hf1a6QJmpx066OSsZVYUi4-YQveR0NR96An0f_T0JgGt3QPj3il2jLGHH1RXM8gXPbdrwtR5gmmtnRQlmBVD99QqbKklfEHAGQ9w',
    newToday: true,
    aspect: 16 / 9,
  },
  {
    id: '4',
    title: 'Ambur Seeraga Samba Biryani',
    time: '50m',
    cal: '580 Cal',
    nutrition: 'Protein 32g',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXWd5heaRlDcUHPsyIfZVxk0KJyn4DmY8yjbjXij7X3vUqP3OalDYcP20bbCYrsMk6FlqLp85GwUHiERIboUZJtQQlmnJaxnvSombFySTutJ8R6BJR6mmW3yKT4cHnl1cIVvQazjvDfQxSeGh-xEPgK5amCMns_deSTce-6RvnBP4ypRxLRWFHqmqw6odaYco4fDgOZq3PjKpYd633UHnLYfWzRT67zHzzgcA6xeUxDt9lEn7FCpuItf4tq4zjsZkgsqQXAaZMKw4',
    newToday: false,
    aspect: 4 / 5,
  },
];

export function ExploreScreen({ navigation }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');

  const openRecipe = (id: string, title: string) => {
    (navigation.getParent() as any)?.navigate('RecipeDetails', {
      recipeId: title.toLowerCase().replace(/\s+/g, '-'),
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIUdLULKgdOM_RkpZ9jAjmIZXEbX5p5XraT8x0efUcZ0KSkqx6jOdQRlMHFsa3RNtIuXF6XbP_BM-hZU3gjmpTHbYvnTrlyo0S-VA-Qjw-trUksnPWrrQzLQOgzR3YrMTMb3zzAUchTiYeUkjPcez6usI65JOkq9MBG5vqbpt3J-BslKpFmAI_7__OcyyyfgqlC3EqFp46ZOp9U5rqmFcUdz4Nn7rxyAeM4ixhvNxy59XgDEu-3lLoWUCU80exgSYMsL3yqx_BaJA' }}
              style={styles.avatar}
            />
          </View>
        </View>

        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Tamil recipes..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsWrap}
          style={styles.chipsScroll}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.chip, selectedCategory === cat.id && styles.chipActive]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text style={[styles.chipText, selectedCategory === cat.id && styles.chipTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Daily New Discoveries</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.masonry}>
          {DISCOVERIES.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => openRecipe(item.id, item.title)}
              activeOpacity={0.9}
            >
              <View style={[styles.cardImageWrap, { height: CARD_WIDTH / item.aspect }]}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                {item.newToday && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>New Today</Text>
                  </View>
                )}
                <TouchableOpacity style={styles.favBtn} onPress={() => {}}>
                  <Text style={styles.favBtnText}>♥</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardMetaText}>⏱ {item.time}</Text>
                  <Text style={styles.cardMetaText}>🔥 {item.cal}</Text>
                </View>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardNutrition}>{item.nutrition}</Text>
                  <Text style={styles.cardArrow}>→</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundDark },
  scroll: { flex: 1 },
  content: { paddingHorizontal: PAD, paddingBottom: 120 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.text },
  avatarWrap: { width: 40, height: 40, borderRadius: 20, overflow: 'hidden', borderWidth: 2, borderColor: colors.borderPrimary },
  avatar: { width: '100%', height: '100%' },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceDark,
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: { fontSize: 18, marginRight: 8 },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    color: colors.text,
  },
  chipsScroll: { marginHorizontal: -PAD },
  chipsWrap: { paddingHorizontal: PAD, gap: 8, paddingBottom: spacing.lg },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceDark,
  },
  chipActive: { backgroundColor: colors.primary },
  chipText: { fontSize: 12, fontWeight: '700', color: colors.textMuted },
  chipTextActive: { color: colors.backgroundDark },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  viewAll: { fontSize: 12, fontWeight: '700', color: colors.primary },
  masonry: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -GAP / 2,
  },
  card: {
    width: CARD_WIDTH,
    marginHorizontal: GAP / 2,
    marginBottom: GAP,
    backgroundColor: colors.surfaceDark,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardImageWrap: { width: '100%', position: 'relative' },
  cardImage: { width: '100%', height: '100%' },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newBadgeText: { fontSize: 9, fontWeight: '800', color: colors.backgroundDark },
  favBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBtnText: { color: colors.text, fontSize: 14 },
  cardBody: { padding: spacing.md },
  cardTitle: { fontSize: 14, fontWeight: '700', color: colors.text, marginBottom: 8 },
  cardMeta: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  cardMetaText: { fontSize: 10, color: colors.textMuted },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cardNutrition: { fontSize: 9, fontWeight: '700', color: colors.primary },
  cardArrow: { fontSize: 14, color: colors.textMuted },
  bottomSpacer: { height: 24 },
});
