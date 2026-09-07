import { Platform, type TextStyle, type ViewStyle } from 'react-native';

export const colors = {
  ink: '#0D0F12',
  surface: '#171A1F',
  elevated: '#20252B',
  gold: '#D7B674',
  mint: '#8AD6B5',
  text: '#F5F6F7',
  muted: '#9CA3AF',
  dim: '#6B7280',
  border: 'rgba(245, 246, 247, 0.08)',
  borderStrong: 'rgba(245, 246, 247, 0.14)',
  goldMuted: 'rgba(215, 182, 116, 0.14)',
  goldBorder: 'rgba(215, 182, 116, 0.32)',
  mintMuted: 'rgba(138, 214, 181, 0.12)',
  mintBorder: 'rgba(138, 214, 181, 0.28)',
  danger: '#E8A4A2',
  dangerMuted: 'rgba(232, 164, 162, 0.12)',
  overlay: 'rgba(13, 15, 18, 0.62)',
  pressed: 'rgba(245, 246, 247, 0.06)',
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
} as const;

export const radii = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
} as const;

export const typography = {
  display: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '700',
  },
  body: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '400',
  },
  callout: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
  },
  caption: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  micro: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
  },
} as const satisfies Record<string, TextStyle>;

export const motion = {
  instant: 0,
  swap: 180,
  base: 280,
  sheet: 340,
  stream: 22,
} as const;

export const shadows = {
  quiet: Platform.select<ViewStyle>({
    web: {
      boxShadow: '0 8px 18px rgba(0,0,0,0.22)',
    },
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.22,
      shadowRadius: 18,
    },
    android: {
      elevation: 6,
    },
    default: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.18,
      shadowRadius: 16,
    },
  }) ?? {},
  composer: Platform.select<ViewStyle>({
    web: {
      boxShadow: '0 4px 12px rgba(0,0,0,0.16)',
    },
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.16,
      shadowRadius: 12,
    },
    android: {
      elevation: 3,
    },
    default: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 10,
    },
  }) ?? {},
} as const;

export const rtlText: TextStyle = {
  writingDirection: 'rtl',
  textAlign: 'right',
};

export const screenMax = {
  compact: 375,
  common: 390,
} as const;
