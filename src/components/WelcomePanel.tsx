import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandMark } from '@/src/components/BrandMark';
import { starterPrompts } from '@/src/data/chat';
import { colors, radii, rtlText, spacing, typography } from '@/src/theme/tokens';

type WelcomePanelProps = {
  onPrompt: (value: string) => void;
};

export function WelcomePanel({ onPrompt }: WelcomePanelProps) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.logoRing}>
          <BrandMark size="lg" />
        </View>
        <Text style={styles.heading}>وش نبدأ فيه؟</Text>
        <Text style={styles.description}>
          أنا مِعيار، مدربك للكمي واللفظي. أشرح، أختبرك، وأبني خطوتك الجاية بدون تشتيت.
        </Text>
      </View>

      <View style={styles.promptGrid}>
        {starterPrompts.map((prompt) => (
          <Pressable
            key={prompt.label}
            accessibilityRole="button"
            accessibilityLabel={prompt.label}
            onPress={() => onPrompt(prompt.value)}
            style={({ pressed }) => [styles.prompt, pressed && styles.promptPressed]}
          >
            <View style={styles.promptIcon}>
              <Feather color={colors.gold} name={prompt.icon} size={16} />
            </View>
            <Text style={styles.promptLabel}>{prompt.label}</Text>
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.md,
    justifyContent: 'center',
  },
  hero: {
    alignItems: 'center',
  },
  logoRing: {
    padding: 7,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.goldBorder,
    backgroundColor: colors.goldMuted,
  },
  heading: {
    ...typography.display,
    ...rtlText,
    color: colors.text,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    ...rtlText,
    color: colors.muted,
    textAlign: 'center',
    marginTop: spacing.sm,
    maxWidth: 340,
    alignSelf: 'center',
  },
  promptGrid: {
    marginTop: spacing.xxl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  prompt: {
    width: '48%',
    flexGrow: 1,
    minWidth: 148,
    minHeight: 72,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  promptPressed: {
    borderColor: colors.goldBorder,
    backgroundColor: colors.elevated,
  },
  promptIcon: {
    width: 28,
    height: 28,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.goldMuted,
  },
  promptLabel: {
    ...typography.callout,
    ...rtlText,
    color: colors.text,
  },
  note: {
    ...typography.micro,
    ...rtlText,
    color: colors.dim,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
