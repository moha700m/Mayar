import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { toolPrompts } from '@/src/data/chat';
import { layout } from '@/src/theme/layout';
import { colors, radii, rtlText, spacing, typography } from '@/src/theme/tokens';

type ToolTrayProps = {
  onTool: (value: string) => void;
};

export function ToolTray({ onTool }: ToolTrayProps) {
  return (
    <View style={styles.tray}>
      {toolPrompts.map((tool) => (
        <Pressable
          key={tool.label}
          accessibilityRole="button"
          accessibilityLabel={tool.label}
          onPress={() => onTool(tool.value)}
          style={({ pressed }) => [styles.tool, pressed && styles.pressed]}
        >
          <Feather color={colors.gold} name={tool.icon} size={14} />
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
    flexDirection: layout.row,
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tool: {
    flexDirection: layout.row,
    alignItems: 'center',
    gap: 6,
    minHeight: 36,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  pressed: {
    borderColor: colors.goldBorder,
    backgroundColor: colors.elevated,
  },
  label: {
    ...typography.caption,
    ...rtlText,
    color: colors.text,
    textAlign: 'left',
  },
});
