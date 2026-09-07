import { StyleSheet, Text, View } from 'react-native';

import { ThinkingOrb } from '@/src/components/ThinkingOrb';
import { colors, rtlText, spacing, typography } from '@/src/theme/tokens';

export function TypingIndicator() {
  return (
    <View accessibilityLabel="مِعيار يفكر" style={styles.row}>
      <ThinkingOrb active />
      <Text style={styles.label}>مِعيار يفكر...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 36,
  },
  label: {
    ...typography.caption,
    ...rtlText,
    color: colors.muted,
    textAlign: 'left',
  },
});
