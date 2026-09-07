import { StyleSheet, Text, View } from 'react-native';

import { MessageActions } from '@/src/components/MessageActions';
import { PlanCard } from '@/src/components/PlanCard';
import { QuestionCard } from '@/src/components/QuestionCard';
import { StreamingText } from '@/src/components/StreamingText';
import { TypingIndicator } from '@/src/components/TypingIndicator';
import { colors, radii, rtlText, spacing, typography } from '@/src/theme/tokens';
import type { ChatMessage } from '@/src/types';

type MessageBubbleProps = {
  message: ChatMessage;
  isLastAssistant?: boolean;
  onCopy: () => void;
  onShare: () => void;
  onRetry?: () => void;
};

export function MessageBubble({ message, isLastAssistant, onCopy, onShare, onRetry }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isThinking = message.status === 'thinking';
  const isError = message.status === 'error';
  const hasContent = message.displayedText.trim().length > 0;
  const showBlocks = message.status === 'complete' && message.blocks.length > 0;

  if (isUser) {
    return (
      <View style={styles.userRow}>
        <View style={styles.userBubble}>
          <Text selectable style={styles.userText}>
            {message.text}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.assistantRow}>
      {isThinking ? (
        <TypingIndicator />
      ) : (
        <View style={styles.assistantBody}>
          {isError || !hasContent ? (
            <Text style={styles.emptyText}>ما قدرت أكمل الرد. أعد المحاولة.</Text>
          ) : (
            <StreamingText text={message.displayedText} />
          )}

          {showBlocks &&
            message.blocks.map((block, index) => {
              if (block.type === 'text') {
                return (
                  <Text key={`text-${index}`} style={styles.blockText}>
                    {block.content}
                  </Text>
                );
              }
              if (block.type === 'context') {
                return (
                  <View key={`ctx-${index}`} style={styles.context}>
                    <Text style={styles.contextLabel}>{block.label}</Text>
                    <Text style={styles.contextValue}>{block.value}</Text>
                  </View>
                );
              }
              if (block.type === 'steps') {
                return (
                  <View key={`steps-${index}`} style={styles.steps}>
                    <Text style={styles.stepsTitle}>{block.title}</Text>
                    {block.items.map((item, itemIndex) => (
                      <View key={item} style={styles.stepRow}>
                        <Text style={styles.stepIndex}>{itemIndex + 1}</Text>
                        <Text style={styles.stepText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                );
              }
              if (block.type === 'question') {
                return <QuestionCard key={`q-${index}`} question={block} />;
              }
              if (block.type === 'plan') {
                return <PlanCard key={`plan-${index}`} days={block.days} title={block.title} />;
              }
              return null;
            })}

          {(message.status === 'complete' || isError) && (
            <MessageActions onCopy={onCopy} onRetry={isLastAssistant ? onRetry : undefined} onShare={onShare} />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  userRow: {
    width: '100%',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
    alignItems: 'flex-start',
  },
  userBubble: {
    maxWidth: '82%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.lg,
    borderEndStartRadius: radii.sm,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userText: {
    ...typography.body,
    ...rtlText,
    color: colors.text,
  },
  assistantRow: {
    width: '100%',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
    alignItems: 'flex-end',
  },
  assistantBody: {
    width: '92%',
    maxWidth: 560,
  },
  emptyText: {
    ...typography.body,
    ...rtlText,
    color: colors.muted,
  },
  blockText: {
    ...typography.body,
    ...rtlText,
    color: colors.text,
    marginTop: spacing.sm,
  },
  context: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contextLabel: {
    ...typography.micro,
    color: colors.gold,
  },
  contextValue: {
    ...typography.micro,
    ...rtlText,
    color: colors.muted,
    textAlign: 'left',
  },
  steps: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  stepsTitle: {
    ...typography.callout,
    ...rtlText,
    color: colors.text,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  stepIndex: {
    width: 18,
    marginTop: 2,
    color: colors.gold,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  stepText: {
    flex: 1,
    ...typography.callout,
    ...rtlText,
    color: colors.muted,
    fontWeight: '400',
  },
});
