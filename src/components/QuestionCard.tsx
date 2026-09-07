import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { expandLayout } from '@/src/theme/motion';
import { colors, radii, rtlText, spacing, typography } from '@/src/theme/tokens';
import type { MessageBlock } from '@/src/types';

type QuestionBlock = Extract<MessageBlock, { type: 'question' }>;

type QuestionCardProps = {
  question: QuestionBlock;
};

export function QuestionCard({ question }: QuestionCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const revealed = selected !== null;
  const correct = selected === question.correctKey;

  function choose(key: string) {
    if (revealed) return;
    expandLayout();
    setSelected(key);
  }

  return (
    <View style={styles.card}>
      <View style={styles.meta}>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{question.subject}</Text>
        </View>
      </View>

      <Text style={styles.stem}>{question.stem}</Text>

      <View style={styles.options}>
        {question.options.map((option) => {
          const isSelected = selected === option.key;
          const isCorrect = option.key === question.correctKey;
          const stateStyle =
            revealed && isCorrect ? styles.optionCorrect : revealed && isSelected ? styles.optionWrong : isSelected ? styles.optionSelected : null;

          return (
            <Pressable
              key={option.key}
              accessibilityRole="button"
              accessibilityLabel={`الخيار ${option.key}: ${option.text}`}
              onPress={() => choose(option.key)}
              style={({ pressed }) => [styles.option, stateStyle, pressed && !revealed && styles.pressed]}
            >
              <View style={[styles.key, revealed && isCorrect && styles.keyCorrect, revealed && isSelected && !isCorrect && styles.keyWrong]}>
                <Text style={styles.keyText}>{option.key}</Text>
              </View>
              <Text style={styles.optionText}>{option.text}</Text>
            </Pressable>
          );
        })}
      </View>

      {revealed && (
        <View style={styles.reveal}>
          <Text style={[styles.result, correct ? styles.resultOk : styles.resultBad]}>
            {correct ? 'إجابة صحيحة' : `الإجابة الصحيحة: ${question.correctKey}`}
          </Text>
          {question.steps.map((step, index) => (
            <View key={step} style={styles.stepRow}>
              <Text style={styles.stepIndex}>{index + 1}</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
          {question.tip ? <Text style={styles.tip}>{question.tip}</Text> : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: spacing.sm,
  },
  pill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radii.pill,
    backgroundColor: colors.goldMuted,
    borderWidth: 1,
    borderColor: colors.goldBorder,
  },
  pillText: {
    ...typography.micro,
    color: colors.gold,
    ...rtlText,
  },
  stem: {
    ...typography.body,
    ...rtlText,
    color: colors.text,
    fontWeight: '600',
  },
  options: {
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  option: {
    minHeight: 44,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.elevated,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  optionSelected: {
    borderColor: colors.goldBorder,
  },
  optionCorrect: {
    borderColor: colors.mintBorder,
    backgroundColor: colors.mintMuted,
  },
  optionWrong: {
    borderColor: 'rgba(232, 164, 162, 0.35)',
    backgroundColor: colors.dangerMuted,
  },
  pressed: {
    backgroundColor: colors.pressed,
  },
  key: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ink,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  keyCorrect: {
    borderColor: colors.mint,
  },
  keyWrong: {
    borderColor: colors.danger,
  },
  keyText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  optionText: {
    flex: 1,
    ...typography.callout,
    ...rtlText,
    color: colors.text,
  },
  reveal: {
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  result: {
    ...typography.callout,
    ...rtlText,
  },
  resultOk: {
    color: colors.mint,
  },
  resultBad: {
    color: colors.danger,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  stepIndex: {
    width: 18,
    color: colors.gold,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
    textAlign: 'center',
  },
  stepText: {
    flex: 1,
    ...typography.callout,
    ...rtlText,
    color: colors.text,
    fontWeight: '400',
  },
  tip: {
    ...typography.caption,
    ...rtlText,
    color: colors.muted,
  },
});
