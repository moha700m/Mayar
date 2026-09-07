import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandMark } from '@/src/components/BrandMark';
import { colors, radii, spacing } from '@/src/theme/tokens';
import type { ChatMessage } from '@/src/types';

type MessageBubbleProps = {
  message: ChatMessage;
  onCopied: () => void;
  onVoice: () => void;
};

export function MessageBubble({ message, onCopied, onVoice }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  async function copyMessage() {
    await Clipboard.setStringAsync(message.text);
    onCopied();
  }

  return (
    <View style={[styles.row, isUser ? styles.userRow : styles.assistantRow]}>
      {!isUser && <BrandMark small />}
      <View style={[styles.content, isUser ? styles.userContent : styles.assistantContent]}>
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
          <Text selectable style={[styles.text, isUser && styles.userText]}>
            {message.text}
          </Text>
        </View>
        {!isUser && (
          <View style={styles.actions}>
            <Pressable
              accessibilityLabel="نسخ الرد"
              accessibilityRole="button"
              hitSlop={8}
              onPress={copyMessage}
              style={styles.action}
            >
              <Feather color={colors.textDim} name="copy" size={14} />
            </Pressable>
            <Pressable
              accessibilityLabel="تشغيل الرد صوتيًا"
              accessibilityRole="button"
              hitSlop={8}
              onPress={onVoice}
              style={styles.action}
            >
              <Feather color={colors.textDim} name="volume-2" size={14} />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  userRow: {
    justifyContent: 'flex-start',
    flexDirection: 'row-reverse',
  },
  assistantRow: {
    justifyContent: 'flex-start',
  },
  content: {
    maxWidth: '86%',
  },
  userContent: {
    alignItems: 'flex-end',
  },
  assistantContent: {
    alignItems: 'flex-start',
    flexShrink: 1,
  },
  bubble: {
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  userBubble: {
    backgroundColor: colors.surfaceRaised,
    borderTopRightRadius: radii.sm,
  },
  assistantBubble: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  text: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  userText: {
    color: colors.text,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  action: {
    padding: spacing.xxs,
  },
});
