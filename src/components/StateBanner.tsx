import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, rtlText, spacing, typography } from '@/src/theme/tokens';
import type { AppNotice } from '@/src/types';

type StateBannerProps = {
  notice: AppNotice;
  onRetry?: () => void;
};

const copy: Record<Exclude<AppNotice, null>, { icon: keyof typeof Feather.glyphMap; title: string; body: string }> = {
  offline: {
    icon: 'wifi-off',
    title: 'ما في اتصال',
    body: 'تحقق من الشبكة ثم أعد المحاولة. محادثتك محفوظة هنا.',
  },
  error: {
    icon: 'alert-circle',
    title: 'تعذر إكمال الرد',
    body: 'صار خلل بسيط في الجلسة. أعد المحاولة بدون ما تفقد رسائلك.',
  },
};

export function StateBanner({ notice, onRetry }: StateBannerProps) {
  if (!notice) return null;
  const item = copy[notice];

  return (
    <View style={[styles.banner, notice === 'error' ? styles.error : styles.offline]}>
      <Feather color={notice === 'error' ? colors.danger : colors.gold} name={item.icon} size={16} />
      <View style={styles.copy}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
      {onRetry ? (
        <Pressable accessibilityRole="button" onPress={onRetry} style={styles.retry}>
          <Text style={styles.retryLabel}>إعادة</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    padding: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  offline: {
    backgroundColor: colors.goldMuted,
    borderColor: colors.goldBorder,
  },
  error: {
    backgroundColor: colors.dangerMuted,
    borderColor: 'rgba(232, 164, 162, 0.28)',
  },
  copy: {
    flex: 1,
  },
  title: {
    ...typography.callout,
    ...rtlText,
    color: colors.text,
  },
  body: {
    ...typography.micro,
    ...rtlText,
    color: colors.muted,
    marginTop: 2,
  },
  retry: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
    backgroundColor: colors.elevated,
  },
  retryLabel: {
    ...typography.caption,
    color: colors.text,
  },
});
