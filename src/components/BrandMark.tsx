import { StyleSheet, Text, View } from 'react-native';

import { colors, radii } from '@/src/theme/tokens';

export function BrandMark({ small = false }: { small?: boolean }) {
  return (
    <View style={[styles.mark, small && styles.smallMark]}>
      <Text style={[styles.glyph, small && styles.smallGlyph]}>م</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mark: {
    width: 46,
    height: 46,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gold,
  },
  smallMark: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
  },
  glyph: {
    color: colors.ink,
    fontSize: 25,
    fontWeight: '800',
    lineHeight: 30,
  },
  smallGlyph: {
    fontSize: 18,
    lineHeight: 22,
  },
});
