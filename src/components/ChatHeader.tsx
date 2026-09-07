import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandMark } from '@/src/components/BrandMark';
import { colors, radii, spacing } from '@/src/theme/tokens';

type ChatHeaderProps = {
  onOpenDrawer: () => void;
  onNewConversation: () => void;
};

export function ChatHeader({ onOpenDrawer, onNewConversation }: ChatHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityLabel="فتح المحادثات"
        accessibilityRole="button"
        hitSlop={10}
        onPress={onOpenDrawer}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
      >
        <Feather color={colors.text} name="menu" size={21} />
      </Pressable>

      <View style={styles.identity}>
        <BrandMark small />
        <View style={styles.identityCopy}>
          <Text style={styles.title}>مِعيار</Text>
          <Text style={styles.subtitle}>مدرب القدرات</Text>
        </View>
      </View>

      <Pressable
        accessibilityLabel="محادثة جديدة"
        accessibilityRole="button"
        hitSlop={10}
        onPress={onNewConversation}
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
      >
        <Feather color={colors.text} name="edit-3" size={19} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 68,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.canvas,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  identityCopy: {
    alignItems: 'flex-end',
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    writingDirection: 'rtl',
  },
  subtitle: {
    color: colors.textDim,
    fontSize: 11,
    marginTop: 2,
    writingDirection: 'rtl',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: colors.surfacePressed,
  },
});
