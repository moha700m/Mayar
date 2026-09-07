import { Feather } from '@expo/vector-icons';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandMark } from '@/src/components/BrandMark';
import { sampleConversations } from '@/src/data/chat';
import { colors, radii, spacing } from '@/src/theme/tokens';

type ConversationDrawerProps = {
  visible: boolean;
  onClose: () => void;
  onNewConversation: () => void;
};

export function ConversationDrawer({ visible, onClose, onNewConversation }: ConversationDrawerProps) {
  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.overlay}>
        <Pressable accessibilityLabel="إغلاق قائمة المحادثات" onPress={onClose} style={styles.backdrop} />
        <SafeAreaView edges={['top', 'bottom']} style={styles.drawer}>
          <View style={styles.header}>
            <View style={styles.headerIdentity}>
              <BrandMark small />
              <Text style={styles.heading}>المحادثات</Text>
            </View>
            <Pressable accessibilityLabel="إغلاق" onPress={onClose} style={styles.iconButton}>
              <Feather color={colors.textMuted} name="x" size={20} />
            </Pressable>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={onNewConversation}
            style={({ pressed }) => [styles.newConversation, pressed && styles.pressed]}
          >
            <Feather color={colors.ink} name="plus" size={18} />
            <Text style={styles.newConversationLabel}>محادثة جديدة</Text>
          </Pressable>

          <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionLabel}>الأحدث</Text>
            {sampleConversations.map((conversation) => (
              <Pressable key={conversation.id} onPress={onClose} style={styles.conversation}>
                <View style={styles.conversationIcon}>
                  <Feather color={colors.textMuted} name="message-square" size={16} />
                </View>
                <View style={styles.conversationCopy}>
                  <Text numberOfLines={1} style={styles.conversationTitle}>{conversation.title}</Text>
                  <Text numberOfLines={1} style={styles.conversationPreview}>{conversation.preview}</Text>
                </View>
                <Text style={styles.updatedAt}>{conversation.updatedAt}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.footerRow}>
              <View style={styles.avatar}><Text style={styles.avatarText}>م</Text></View>
              <Text style={styles.footerName}>محمد</Text>
              <Feather color={colors.textDim} name="more-horizontal" size={19} />
            </View>
            <Text style={styles.footerNote}>نسخة تدريبية — الحسابات والحفظ السحابي قريبًا</Text>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.52)',
  },
  backdrop: {
    flex: 1,
  },
  drawer: {
    width: '88%',
    maxWidth: 390,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.lg,
    borderBottomLeftRadius: radii.lg,
    overflow: 'hidden',
  },
  header: {
    minHeight: 74,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  heading: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    writingDirection: 'rtl',
  },
  iconButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.sm,
  },
  newConversation: {
    minHeight: 48,
    margin: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.gold,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  newConversationLabel: {
    color: colors.ink,
    fontWeight: '800',
    fontSize: 14,
    writingDirection: 'rtl',
  },
  pressed: {
    opacity: 0.8,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  sectionLabel: {
    color: colors.textDim,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: spacing.xs,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  conversation: {
    minHeight: 64,
    paddingVertical: spacing.sm,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  conversationIcon: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conversationCopy: {
    flex: 1,
    alignItems: 'flex-end',
  },
  conversationTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    writingDirection: 'rtl',
  },
  conversationPreview: {
    color: colors.textDim,
    fontSize: 11,
    marginTop: 4,
    writingDirection: 'rtl',
  },
  updatedAt: {
    color: colors.textDim,
    fontSize: 10,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
  },
  footerRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.blue,
    fontWeight: '800',
  },
  footerName: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  footerNote: {
    color: colors.textDim,
    fontSize: 10,
    textAlign: 'right',
    lineHeight: 16,
    marginTop: spacing.xs,
    writingDirection: 'rtl',
  },
});
