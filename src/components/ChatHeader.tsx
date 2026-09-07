import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { BrandMark } from '@/src/components/BrandMark';
import { IconButton } from '@/src/components/IconButton';
import { colors, rtlText, spacing, typography } from '@/src/theme/tokens';

type ChatHeaderProps = {
  onOpenDrawer: () => void;
  onNewConversation: () => void;
};

export function ChatHeader({ onOpenDrawer, onNewConversation }: ChatHeaderProps) {
  return (
    <View style={styles.header}>
      <IconButton accessibilityLabel="فتح المحادثات" onPress={onOpenDrawer}>
        <Feather color={colors.text} name="menu" size={20} />
      </IconButton>

      <View style={styles.identity}>
        <BrandMark size="sm" />
        <Text style={styles.title}>مِعيار</Text>
      </View>

      <IconButton accessibilityLabel="محادثة جديدة" onPress={onNewConversation}>
        <Feather color={colors.text} name="edit-3" size={18} />
      </IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 56,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.ink,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    ...typography.title,
    ...rtlText,
    color: colors.text,
    textAlign: 'left',
  },
});
