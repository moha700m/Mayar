import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { layout } from '@/src/theme/layout';
import { colors, radii, rtlText, spacing, typography } from '@/src/theme/tokens';

type MessageActionsProps = {
  onCopy: () => void;
  onShare: () => void;
  onRetry?: () => void;
};

export function MessageActions({ onCopy, onShare, onRetry }: MessageActionsProps) {
  return (
    <View style={styles.row}>
      <Action icon="copy" label="نسخ" onPress={onCopy} />
      <Action icon="share" label="مشاركة" onPress={onShare} />
      {onRetry ? <Action icon="refresh-cw" label="إعادة" onPress={onRetry} /> : null}
    </View>
  );
}

function Action({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      hitSlop={6}
      onPress={onPress}
      style={({ pressed }) => [styles.action, pressed && styles.pressed]}
    >
      <Feather color={colors.dim} name={icon} size={14} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: layout.row,
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  action: {
    flexDirection: layout.row,
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: radii.sm,
  },
  pressed: {
    backgroundColor: colors.pressed,
  },
  label: {
    ...typography.micro,
    ...rtlText,
    color: colors.dim,
    textAlign: 'left',
  },
});
