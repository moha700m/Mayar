import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandMark } from '@/src/components/BrandMark';
import { starterPrompts } from '@/src/data/chat';
import { colors, radii, spacing } from '@/src/theme/tokens';

type WelcomePanelProps = {
  onPrompt: (value: string) => void;
};

export function WelcomePanel({ onPrompt }: WelcomePanelProps) {
  return (
    <View style={styles.container}>
      <BrandMark />
      <Text style={styles.heading}>وش نبدأ فيه؟</Text>
      <Text style={styles.description}>
        أنا مِعيار، مدربك الذكي للقدرات. أشرح لك الفكرة، أختبرك عليها، وأبني لك الخطوة التالية.
      </Text>

      <View style={styles.promptList}>
        {starterPrompts.map((prompt) => (
          <Pressable
            key={prompt.label}
            accessibilityRole="button"
            onPress={() => onPrompt(prompt.value)}
            style={({ pressed }) => [styles.prompt, pressed && styles.promptPressed]}
          >
            <Text style={styles.promptLabel}>{prompt.label}</Text>
            <Feather color={colors.textDim} name="arrow-up-left" size={16} />
          </Pressable>
        ))}
      </View>

      <Text style={styles.note}>المحتوى تدريبي أصلي وليس أسئلة رسمية أو مسرّبة.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl * 1.7,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  heading: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '800',
    marginTop: spacing.lg,
    writingDirection: 'rtl',
  },
  description: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 25,
    maxWidth: 330,
    textAlign: 'center',
    writingDirection: 'rtl',
    marginTop: spacing.sm,
  },
  promptList: {
    width: '100%',
    gap: spacing.sm,
    marginTop: spacing.xxl,
  },
  prompt: {
    minHeight: 52,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promptPressed: {
    borderColor: colors.gold,
    backgroundColor: colors.surfacePressed,
  },
  promptLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
  note: {
    color: colors.textDim,
    fontSize: 11,
    textAlign: 'center',
    marginTop: spacing.xl,
    writingDirection: 'rtl',
  },
});
