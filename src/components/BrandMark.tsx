import { StyleSheet, Text, View } from 'react-native';

import { colors, radii } from '@/src/theme/tokens';

type BrandMarkProps = {
  size?: 'sm' | 'md' | 'lg';
};

const sizes = {
  sm: { box: 32, font: 17, radius: radii.sm },
  md: { box: 44, font: 23, radius: radii.md },
  lg: { box: 64, font: 32, radius: radii.lg },
} as const;

export function BrandMark({ size = 'md' }: BrandMarkProps) {
  const metric = sizes[size];

  return (
    <View
      accessibilityLabel="شعار مِعيار"
      style={[
        styles.mark,
        {
          width: metric.box,
          height: metric.box,
          borderRadius: metric.radius,
        },
      ]}
    >
      <Text style={[styles.glyph, { fontSize: metric.font, lineHeight: metric.font + 4 }]}>م</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mark: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gold,
  },
  glyph: {
    color: colors.ink,
    fontWeight: '800',
  },
});
