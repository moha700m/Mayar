import { AccessibilityInfo, LayoutAnimation, Platform, UIManager } from 'react-native';

import { motion } from '@/src/theme/tokens';

let reduceMotionEnabled = false;
let initialized = false;

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function initMotionPreference() {
  if (initialized) return;
  initialized = true;
  AccessibilityInfo.isReduceMotionEnabled()
    .then((value) => {
      reduceMotionEnabled = value;
    })
    .catch(() => {
      reduceMotionEnabled = false;
    });
  AccessibilityInfo.addEventListener('reduceMotionChanged', (value) => {
    reduceMotionEnabled = value;
  });
}

export function prefersReducedMotion() {
  return reduceMotionEnabled;
}

export function duration(ms: number) {
  return reduceMotionEnabled ? motion.instant : ms;
}

export function expandLayout() {
  if (reduceMotionEnabled) return;
  LayoutAnimation.configureNext({
    duration: motion.base,
    create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
    update: { type: LayoutAnimation.Types.easeInEaseOut },
    delete: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
  });
}
