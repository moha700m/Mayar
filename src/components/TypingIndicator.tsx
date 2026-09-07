import { StyleSheet, Text, View } from 'react-native';

import { BrandMark } from '@/src/components/BrandMark';
import { colors, spacing } from '@/src/theme/tokens';

export function TypingIndicator() {
  return (
    <View style={styles.row}>
      <BrandMark small />
      <View style={styles.copy}>
        <Text style={styles.label}>مِعيار يفكر...</Text>
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  copy: {
    alignItems: 'flex-start',
    gap: spacing.xs,
  },
  label: {
    color: colors.textDim,
    fontSize: 12,
    writingDirection: 'rtl',
  },
  dots: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: colors.gold,
  },
});
