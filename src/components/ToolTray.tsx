import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { toolPrompts } from '@/src/data/chat';
import { colors, radii, spacing } from '@/src/theme/tokens';

type ToolTrayProps = {
  onTool: (value: string) => void;
};

export function ToolTray({ onTool }: ToolTrayProps) {
  return (
    <View style={styles.tray}>
      {toolPrompts.map((tool, index) => (
        <Pressable
          key={tool.label}
          accessibilityRole="button"
          onPress={() => onTool(tool.value)}
          style={({ pressed }) => [styles.tool, pressed && styles.pressed]}
        >
          <Feather color={index === 0 ? colors.gold : colors.textMuted} name={index === 0 ? 'image' : index === 1 ? 'zap' : 'book-open'} size={16} />
          <Text style={styles.label}>{tool.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tray: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    flexDirection: 'row',
    gap: spacing.xs,
  },
  tool: {
    flex: 1,
    minHeight: 42,
    paddingHorizontal: spacing.xs,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  pressed: {
    backgroundColor: colors.surfacePressed,
  },
  label: {
    color: colors.textMuted,
    fontSize: 10,
    writingDirection: 'rtl',
  },
});
