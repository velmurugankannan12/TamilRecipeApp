import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../theme/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = { navigation: HomeScreenNav };

const RECIPE_OF_DAY = {
  title: 'Classic Masala Dosa',
  subtitle: 'Fermented rice crepes filled with a spiced potato masala, served with coconut chutney and sambar.',
  time: '25 Mins',
  tag: 'Trending',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbQd1e0HX0DfIzkDlOGCd72mVDrInt8YSKp7QOP68jRZyR91aaqKDdFosRQbebUEjOPIjNVb2721zyudGgVCwWQS0-qN3dthyNiNpwwUpVdqeqGNLWms7WF_vSgTr6EKkAFbQew8ViKS5VOxhMLu12XS8WzKMhpaxvav5KH7analmNXD8OSwMofndHDBWpRJbj05EQGkzU6nXxRotRnzZ7TCTkVTogc4TP-h_KqtqUaRAUAOdqVhDrDbzZB9VJm2KH34vhNtO0Nu4',
  calories: 380,
  protein: 12,
  fat: 14,
};

const SPECIALS = [
  { title: 'Temple Sambar', meta: 'Lunch • 40 mins', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpec6cCEP0KdR9PJlDeNuHWjcOC8yRukQPBmhiyDRVxbYGE1rQVjuIxUMGvIxfpbNTvds4R67Z-awsvAWPEHN9-xGO-VaK6yx5zYUvXRV9CUijwhSol1VD--GyPtvQcKzx5WZhn7m0IZjxm6vjfUo42BwrGcPWUBTChyZbDLCBUvknP7_DyCYqSUi_Fjh9ApT-iVuFxFsYT5hJfE4tr6ZHTbxXsYKXKlrvRtnBEJfo2ngNt_YBF34Y_jfBrXOQI7_-bGEgiv_Z8q8' },
  { title: 'Soft Kanchipuram Idli', meta: 'Breakfast • 20 mins', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpfULrqPIyuKtveA9-QCg97fIKHXLDIhzAT8aSdLwDNWf-ers2xoDFWDTtKPrASWFYhkR6Ay1WPiPX74dgLDpgGDShHQGqbAhE-2klawGVVPAoX_i5BUdwssap-PwBl3Fpyf33gtF_gqfdo-tvgiHfdKVV0BjRUDW40rFvJOvyMEuFwYMFfQ02U9VFkxaLGj8Evo1DsI_vigwkHVDDvAoG0wJguDsVpE6GKJalASOBkSqIVc6ZEAoIa5J7N2pvJDHEQ3h-23gDots' },
  { title: 'Crispy Medu Vada', meta: 'Quick Bite • 30 mins', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5dkrRm-4KBwSdspETEi2IGpVj4qeRgeH2es2tkxg4CWDLRBc0-GvmgppUZAIVLnKBGWheJJ4b8Xs11Nh47Ham8AuqbmXj2l2evinfVaWJRwy6xbgNvkZPBW5D4DUB3wmcbNFgbYGL47Wxxkun_COXMQFUXT89U2eib0NDVYkloL5NzZkX_PIrhtvg3rgsHGhY-AVvpHWay5P_vBBhK5IeE3oPSvwVPZZGuwctXTKUThVnVlr3U2Qq9vocZ5FSXqa4iJurNhhyiSk' },
];

export function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <View style={styles.avatarWrap}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4OlslgHXHGOtZeZ9xBhjfEOqVroocIHsodj4vcDNX7JlHOJXaFcEdMUlWDE7yvUjY6JGfiOJiNKQSrD65OjpnnjqFtUCWvgKYCXV-OUvxNgn7zC85_IbC6SXn8CPc83x9s0E2QuLtO6igAxo9Necez_FnUfFVM01LHqSqGeF5juaWbiPAkSGi93CPAz6y4O2liNeRLED5ze3iVcdE1GBGHlyvCfMNSl5OZdr-kR09Qu8Gy6sjivikXaY59N54GdWtrUrUpPuOre8' }}
              style={styles.avatar}
            />
            <View style={styles.onlineDot} />
          </View>
          <View>
            <Text style={styles.greeting}>Vanakkam</Text>
            <Text style={styles.userName}>Priya Mani</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtn}><Text style={styles.iconText}>⌕</Text></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Text style={styles.iconText}>🔔</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recipe of the Day</Text>
        <Text style={styles.primaryLabel}>Fresh Daily</Text>
      </View>
      <View style={styles.heroCard}>
        <Image source={{ uri: RECIPE_OF_DAY.image }} style={styles.heroImage} />
        <View style={styles.heroOverlay} />
        <View style={styles.heroBottom}>
          <View style={styles.heroTags}>
            <View style={styles.tagPrimary}><Text style={styles.tagPrimaryText}>{RECIPE_OF_DAY.tag}</Text></View>
            <Text style={styles.heroTime}>⏱ {RECIPE_OF_DAY.time}</Text>
          </View>
          <Text style={styles.heroTitle}>{RECIPE_OF_DAY.title}</Text>
          <Text style={styles.heroSubtitle} numberOfLines={2}>{RECIPE_OF_DAY.subtitle}</Text>
          <View style={styles.heroActions}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => (navigation.getParent() as any)?.navigate('RecipeDetails', { recipeId: 'masala-dosa' })}
            >
              <Text style={styles.primaryButtonText}>📖 View Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}><Text style={styles.iconButtonText}>🔖</Text></TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nutritional Summary</Text>
        <Text style={styles.mutedSmall}>Per Serving</Text>
      </View>
      <View style={styles.nutritionRow}>
        <View style={styles.nutritionCard}>
          <Text style={styles.nutritionLabel}>Calories</Text>
          <Text style={styles.nutritionValue}>{RECIPE_OF_DAY.calories}</Text>
          <Text style={styles.nutritionUnit}>kcal</Text>
        </View>
        <View style={styles.nutritionCard}>
          <Text style={styles.nutritionLabel}>Protein</Text>
          <Text style={styles.nutritionValue}>{RECIPE_OF_DAY.protein}</Text>
          <Text style={styles.nutritionUnit}>grams</Text>
        </View>
        <View style={styles.nutritionCard}>
          <Text style={styles.nutritionLabel}>Fat</Text>
          <Text style={styles.nutritionValue}>{RECIPE_OF_DAY.fat}</Text>
          <Text style={styles.nutritionUnit}>grams</Text>
        </View>
      </View>

      <View style={styles.reminderCard}>
        <View style={styles.reminderContent}>
          <View style={styles.reminderText}>
            <Text style={styles.reminderTitle}>Missing Ingredients?</Text>
            <Text style={styles.reminderSubtitle}>Set a reminder for curry leaves and mustard seeds before you start.</Text>
          </View>
          <TouchableOpacity
            style={styles.reminderButton}
            onPress={() => (navigation.getParent() as any)?.navigate('IngredientChecklist', { recipeId: 'chettinad-chicken' })}
          >
            <Text style={styles.reminderButtonIcon}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Tamil Specials</Text>
        <Text style={styles.primaryLabel}>See All</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.specialsScroll}>
        {SPECIALS.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.specialCard}
            onPress={() => (navigation.getParent() as any)?.navigate('RecipeDetails', { recipeId: item.title.toLowerCase().replace(/\s+/g, '-') })}
          >
            <Image source={{ uri: item.image }} style={styles.specialImage} />
            <View style={styles.specialHeart}><Text style={styles.specialHeartText}>♥</Text></View>
            <Text style={styles.specialTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.specialMeta}>{item.meta}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundDark },
  content: { paddingHorizontal: spacing.xxl, paddingTop: spacing.xxl, paddingBottom: 120 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xxl },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatarWrap: { position: 'relative' },
  avatar: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: colors.primary },
  onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderRadius: 7, backgroundColor: '#22c55e', borderWidth: 2, borderColor: colors.backgroundDark },
  greeting: { fontSize: 11, color: colors.textMuted, fontWeight: '500', letterSpacing: 1 },
  userName: { fontSize: 20, fontWeight: '700', color: colors.text },
  headerActions: { flexDirection: 'row', gap: spacing.sm },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' },
  iconText: { fontSize: 18, color: colors.text },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  primaryLabel: { fontSize: 14, fontWeight: '600', color: colors.primary },
  mutedSmall: { fontSize: 12, color: colors.textMuted },
  heroCard: { height: 380, borderRadius: 24, overflow: 'hidden', marginBottom: spacing.xxl },
  heroImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(26,24,20,0.75)' },
  heroBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.xxl },
  heroTags: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  tagPrimary: { backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: borderRadius.full },
  tagPrimaryText: { fontSize: 10, fontWeight: '700', color: colors.backgroundDark, letterSpacing: 1 },
  heroTime: { fontSize: 12, color: colors.primary, fontWeight: '500' },
  heroTitle: { fontSize: 24, fontWeight: '700', color: colors.text, marginBottom: spacing.sm },
  heroSubtitle: { fontSize: 14, color: colors.textMuted, fontStyle: 'italic', marginBottom: spacing.lg },
  heroActions: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  primaryButton: { flex: 1, backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  primaryButtonText: { fontSize: 15, fontWeight: '700', color: colors.backgroundDark },
  iconButton: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.12)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  iconButtonText: { fontSize: 20 },
  nutritionRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xxl },
  nutritionCard: { flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: colors.borderPrimary, borderRadius: 20, padding: spacing.lg, alignItems: 'center' },
  nutritionLabel: { fontSize: 11, fontWeight: '700', color: colors.primary, letterSpacing: 0.5, marginBottom: 4 },
  nutritionValue: { fontSize: 20, fontWeight: '700', color: colors.text },
  nutritionUnit: { fontSize: 10, color: colors.textDim },
  reminderCard: { backgroundColor: 'rgba(244,192,37,0.1)', borderWidth: 1, borderColor: colors.borderPrimary, borderRadius: 24, padding: spacing.xxl, marginBottom: spacing.xxl },
  reminderContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  reminderText: { flex: 1, marginRight: spacing.lg },
  reminderTitle: { fontSize: 18, fontWeight: '700', color: colors.primary, marginBottom: 4 },
  reminderSubtitle: { fontSize: 14, color: colors.textMuted },
  reminderButton: { width: 56, height: 56, backgroundColor: colors.primary, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  reminderButtonIcon: { fontSize: 28 },
  specialsScroll: { gap: spacing.lg, paddingBottom: spacing.lg },
  specialCard: { width: 160, position: 'relative' },
  specialImage: { width: 160, height: 160, borderRadius: 20, marginBottom: spacing.sm },
  specialHeart: { position: 'absolute', top: spacing.sm, right: spacing.sm, width: 28, height: 28, borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  specialHeartText: { color: colors.white, fontSize: 12 },
  specialTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  specialMeta: { fontSize: 12, color: colors.textDim },
  bottomSpacer: { height: 24 },
});
