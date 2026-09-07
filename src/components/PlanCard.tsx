import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, rtlText, spacing, typography } from '@/src/theme/tokens';
import type { PlanDay } from '@/src/types';

type PlanCardProps = {
  title: string;
  days: PlanDay[];
};

export function PlanCard({ title, days }: PlanCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {days.map((day) => (
        <View key={day.range} style={styles.row}>
          <View style={styles.range}>
            <Text style={styles.rangeText}>{day.range}</Text>
          </View>
          <Text style={styles.focus}>{day.focus}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.sm,
  },
  title: {
    ...typography.callout,
    ...rtlText,
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  range: {
    minWidth: 46,
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
    borderRadius: radii.sm,
    backgroundColor: colors.goldMuted,
    alignItems: 'center',
  },
  rangeText: {
    ...typography.micro,
    color: colors.gold,
    fontWeight: '700',
  },
  focus: {
    flex: 1,
    ...typography.callout,
    ...rtlText,
    color: colors.muted,
    fontWeight: '400',
  },
});
