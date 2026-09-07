import { Animated, StyleSheet, Text } from 'react-native';

import { colors, radii, rtlText, spacing, typography } from '@/src/theme/tokens';

type ToastProps = {
  message: string;
  visible: boolean;
};

export function Toast({ message, visible }: ToastProps) {
  if (!visible) return null;

  return (
    <Animated.View pointerEvents="none" style={styles.toast}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 118,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  text: {
    ...typography.caption,
    ...rtlText,
    color: colors.text,
    textAlign: 'center',
  },
});
