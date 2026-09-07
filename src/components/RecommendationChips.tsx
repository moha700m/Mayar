import { Pressable, StyleSheet, Text, View } from 'react-native';

import { layout } from '@/src/theme/layout';
import { colors, radii, rtlText, spacing, typography } from '@/src/theme/tokens';

type RecommendationChipsProps = {
  items: string[];
  onSelect: (value: string) => void;
};

export function RecommendationChips({ items, onSelect }: RecommendationChipsProps) {
  if (items.length === 0) return null;

  return (
    <View style={styles.row}>
      {items.map((item) => (
        <Pressable
          key={item}
          accessibilityRole="button"
          onPress={() => onSelect(item)}
          style={({ pressed }) => [styles.chip, pressed && styles.pressed]}
        >
          <Text style={styles.label}>{item}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    flexDirection: layout.row,
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    minHeight: 34,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: 'center',
  },
  pressed: {
    borderColor: colors.goldBorder,
  },
  label: {
    ...typography.caption,
    ...rtlText,
    color: colors.text,
    textAlign: 'center',
  },
});
