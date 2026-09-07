import { Text, type TextStyle } from 'react-native';

import { colors, rtlText, typography } from '@/src/theme/tokens';

type StreamingTextProps = {
  text: string;
  style?: TextStyle;
};

export function StreamingText({ text, style }: StreamingTextProps) {
  const content = text.length > 0 ? text : ' ';

  return (
    <Text selectable style={[typography.body, rtlText, { color: colors.text }, style]}>
      {content}
    </Text>
  );
}
