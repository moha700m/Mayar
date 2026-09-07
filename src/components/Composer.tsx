import { Feather } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useKeyboardVisible } from '@/src/hooks/useKeyboardVisible';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { colors, motion, radii, rtlText, shadows, spacing, typography } from '@/src/theme/tokens';

type ComposerProps = {
  draft: string;
  toolsOpen: boolean;
  disabled?: boolean;
  onChangeDraft: (value: string) => void;
  onToggleTools: () => void;
  onSend: () => void;
  onVoice: () => void;
};

export function Composer({
  draft,
  toolsOpen,
  disabled = false,
  onChangeDraft,
  onToggleTools,
  onSend,
  onVoice,
}: ComposerProps) {
  const insets = useSafeAreaInsets();
  const keyboardVisible = useKeyboardVisible();
  const reduced = useReducedMotion();
  const canSend = draft.trim().length > 0 && !disabled;
  const plusSpin = useRef(new Animated.Value(0)).current;
  const sendBlend = useRef(new Animated.Value(canSend ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(plusSpin, {
      toValue: toolsOpen ? 1 : 0,
      duration: reduced ? 0 : motion.swap,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [plusSpin, reduced, toolsOpen]);

  useEffect(() => {
    Animated.timing(sendBlend, {
      toValue: canSend ? 1 : 0,
      duration: reduced ? 0 : motion.swap,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [canSend, reduced, sendBlend]);

  const plusRotate = plusSpin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] });
  const sendScale = sendBlend.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] });

  return (
    <View style={[styles.wrapper, { paddingBottom: keyboardVisible ? spacing.sm : Math.max(insets.bottom, spacing.sm) }]}>
      <View style={styles.composer}>
        <Pressable
          accessibilityLabel={toolsOpen ? 'إغلاق الأدوات' : 'إضافة صورة أو أداة'}
          accessibilityRole="button"
          disabled={disabled}
          onPress={onToggleTools}
          style={({ pressed }) => [styles.plusButton, pressed && styles.pressed]}
        >
          <Animated.View style={{ transform: [{ rotate: plusRotate }] }}>
            <Feather color={toolsOpen ? colors.gold : colors.muted} name="plus" size={22} />
          </Animated.View>
        </Pressable>

        <TextInput
          accessibilityLabel="اكتب رسالتك"
          editable={!disabled}
          multiline
          onChangeText={onChangeDraft}
          placeholder="اسأل عن القدرات..."
          placeholderTextColor={colors.dim}
          style={styles.input}
          textAlign="right"
          textAlignVertical="center"
          value={draft}
        />

        <Pressable
          accessibilityLabel={canSend ? 'إرسال الرسالة' : 'الإملاء الصوتي'}
          accessibilityRole="button"
          disabled={disabled}
          onPress={canSend ? onSend : onVoice}
          style={({ pressed }) => [styles.sendButton, canSend && styles.sendButtonActive, pressed && styles.pressed]}
        >
          <Animated.View style={[styles.sendInner, { transform: [{ scale: sendScale }] }]}>
            <Feather color={canSend ? colors.ink : colors.muted} name={canSend ? 'arrow-up' : 'mic'} size={18} />
          </Animated.View>
        </Pressable>
      </View>
      <Text style={styles.disclaimer}>قد يخطئ مِعيار؛ راجع خطوات الحل ولا تحفظ الإجابة فقط.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    backgroundColor: colors.ink,
  },
  composer: {
    minHeight: 56,
    padding: spacing.xs,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.xs,
    ...shadows.composer,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: spacing.xs,
    paddingVertical: 10,
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
    writingDirection: 'rtl',
  },
  plusButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.elevated,
  },
  sendButtonActive: {
    backgroundColor: colors.gold,
  },
  sendInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.82,
  },
  disclaimer: {
    ...typography.micro,
    ...rtlText,
    color: colors.dim,
    textAlign: 'center',
    paddingTop: spacing.xs,
  },
});
