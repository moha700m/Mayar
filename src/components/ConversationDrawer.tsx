import { Feather } from '@expo/vector-icons';
import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandMark } from '@/src/components/BrandMark';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { layout } from '@/src/theme/layout';
import { nativeDriver } from '@/src/theme/motion';
import { colors, motion, radii, rtlText, spacing, typography } from '@/src/theme/tokens';
import type { Conversation } from '@/src/types';

type ConversationDrawerProps = {
  visible: boolean;
  conversations: Conversation[];
  onClose: () => void;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
};

export function ConversationDrawer({
  visible,
  conversations,
  onClose,
  onNewConversation,
  onSelectConversation,
}: ConversationDrawerProps) {
  const reduced = useReducedMotion();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      progress.setValue(reduced ? 1 : 0);
    }
    Animated.timing(progress, {
      toValue: visible ? 1 : 0,
      duration: reduced ? 0 : motion.sheet,
      easing: visible ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
      useNativeDriver: nativeDriver,
    }).start();
  }, [progress, reduced, visible]);

  const current = conversations.find((item) => item.current);
  const previous = conversations.filter((item) => !item.current);
  const translateX = progress.interpolate({ inputRange: [0, 1], outputRange: [24, 0] });
  const overlayOpacity = progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  const grouped = useMemo(
    () => [
      { title: 'المحادثة الحالية', items: current ? [current] : [] },
      { title: 'محادثات سابقة', items: previous },
    ],
    [current, previous],
  );

  return (
    <Modal animationType="none" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.backdropWrap, { opacity: overlayOpacity }]}>
          <Pressable accessibilityLabel="إغلاق قائمة المحادثات" onPress={onClose} style={styles.backdrop} />
        </Animated.View>

        <Animated.View style={[styles.sheet, { transform: [{ translateX }] }]}>
          <SafeAreaView edges={['top', 'bottom']} style={styles.drawer}>
            <View style={styles.header}>
              <View style={styles.headerIdentity}>
                <BrandMark size="sm" />
                <Text style={styles.heading}>المحادثات</Text>
              </View>
              <Pressable accessibilityLabel="إغلاق" onPress={onClose} style={styles.iconButton}>
                <Feather color={colors.muted} name="x" size={20} />
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
              {grouped.map((group) =>
                group.items.length === 0 ? null : (
                  <View key={group.title} style={styles.group}>
                    <Text style={styles.sectionLabel}>{group.title}</Text>
                    {group.items.map((conversation) => (
                      <Pressable
                        key={conversation.id}
                        onPress={() => onSelectConversation(conversation.id)}
                        style={({ pressed }) => [
                          styles.conversation,
                          conversation.current && styles.conversationCurrent,
                          pressed && styles.pressed,
                        ]}
                      >
                        <View style={styles.conversationIcon}>
                          <Feather color={conversation.current ? colors.gold : colors.muted} name="message-square" size={16} />
                        </View>
                        <View style={styles.conversationCopy}>
                          <Text numberOfLines={1} style={styles.conversationTitle}>
                            {conversation.title}
                          </Text>
                          <Text numberOfLines={1} style={styles.conversationPreview}>
                            {conversation.preview}
                          </Text>
                        </View>
                        <Text style={styles.updatedAt}>{conversation.updatedAt}</Text>
                      </Pressable>
                    ))}
                  </View>
                ),
              )}
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: layout.rowPhysical,
  },
  backdropWrap: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
  backdrop: {
    flex: 1,
  },
  sheet: {
    width: '86%',
    maxWidth: 360,
  },
  drawer: {
    flex: 1,
    backgroundColor: colors.surface,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  header: {
    minHeight: 64,
    paddingHorizontal: spacing.md,
    flexDirection: layout.row,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIdentity: {
    flexDirection: layout.row,
    alignItems: 'center',
    gap: spacing.sm,
  },
  heading: {
    ...typography.title,
    ...rtlText,
    color: colors.text,
    textAlign: 'left',
  },
  iconButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.sm,
  },
  newConversation: {
    minHeight: 46,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.gold,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  newConversationLabel: {
    color: colors.ink,
    fontWeight: '700',
    fontSize: 14,
    writingDirection: 'rtl',
  },
  pressed: {
    opacity: 0.84,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  group: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    ...typography.caption,
    ...rtlText,
    color: colors.dim,
    marginBottom: spacing.xs,
  },
  conversation: {
    minHeight: 62,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.md,
    flexDirection: layout.row,
    alignItems: 'center',
    gap: spacing.sm,
  },
  conversationCurrent: {
    backgroundColor: colors.goldMuted,
    borderWidth: 1,
    borderColor: colors.goldBorder,
  },
  conversationIcon: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
    backgroundColor: colors.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conversationCopy: {
    flex: 1,
    alignItems: layout.start,
  },
  conversationTitle: {
    ...typography.callout,
    ...rtlText,
    color: colors.text,
  },
  conversationPreview: {
    ...typography.micro,
    ...rtlText,
    color: colors.dim,
    marginTop: 3,
  },
  updatedAt: {
    ...typography.micro,
    color: colors.dim,
  },
});
