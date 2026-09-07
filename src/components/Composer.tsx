import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, radii, spacing } from '@/src/theme/tokens';

type ComposerProps = {
  draft: string;
  toolsOpen: boolean;
  onChangeDraft: (value: string) => void;
  onToggleTools: () => void;
  onSend: () => void;
  onVoice: () => void;
};

export function Composer({ draft, toolsOpen, onChangeDraft, onToggleTools, onSend, onVoice }: ComposerProps) {
  const canSend = draft.trim().length > 0;

  return (
    <View style={styles.wrapper}>
      <View style={styles.composer}>
        <Pressable
          accessibilityLabel="إضافة صورة أو أداة"
          accessibilityRole="button"
          onPress={onToggleTools}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        >
          <Feather color={toolsOpen ? colors.gold : colors.textMuted} name={toolsOpen ? 'x' : 'plus'} size={21} />
        </Pressable>

        <TextInput
          accessibilityLabel="اكتب رسالتك"
          multiline
          onChangeText={onChangeDraft}
          onSubmitEditing={canSend ? onSend : undefined}
          placeholder="اسأل عن القدرات..."
          placeholderTextColor={colors.textDim}
          returnKeyType="send"
          style={styles.input}
          textAlign="right"
          textAlignVertical="center"
          value={draft}
        />

        <Pressable
          accessibilityLabel={canSend ? 'إرسال الرسالة' : 'الإملاء الصوتي'}
          accessibilityRole="button"
          onPress={canSend ? onSend : onVoice}
          style={({ pressed }) => [styles.sendButton, canSend && styles.sendButtonActive, pressed && styles.pressed]}
        >
          <Feather color={canSend ? colors.ink : colors.textMuted} name={canSend ? 'arrow-up' : 'mic'} size={19} />
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
    backgroundColor: colors.canvas,
  },
  composer: {
    minHeight: 54,
    padding: spacing.xs,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  input: {
    flex: 1,
    minHeight: 38,
    maxHeight: 100,
    paddingHorizontal: spacing.xs,
    paddingVertical: 8,
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
    writingDirection: 'rtl',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: colors.gold,
  },
  pressed: {
    backgroundColor: colors.surfacePressed,
  },
  disclaimer: {
    color: colors.textDim,
    fontSize: 10,
    textAlign: 'center',
    paddingVertical: spacing.xs,
    writingDirection: 'rtl',
  },
});
