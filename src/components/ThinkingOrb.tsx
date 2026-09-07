import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { colors, motion } from '@/src/theme/tokens';

type ThinkingOrbProps = {
  size?: number;
  active?: boolean;
};

export function ThinkingOrb({ size = 22, active = true }: ThinkingOrbProps) {
  const reduced = useReducedMotion();
  const pulse = useRef(new Animated.Value(0)).current;
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active || reduced) {
      pulse.stopAnimation();
      spin.stopAnimation();
      pulse.setValue(0);
      spin.setValue(0);
      return;
    }

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );

    const spinLoop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 4200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    pulseLoop.start();
    spinLoop.start();

    return () => {
      pulseLoop.stop();
      spinLoop.stop();
    };
  }, [active, pulse, reduced, spin]);

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.7] });
  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={[styles.frame, { width: size + 10, height: size + 10 }]} accessibilityLabel="مِعيار يفكر">
      <Animated.View
        style={[
          styles.ring,
          {
            width: size + 8,
            height: size + 8,
            borderRadius: (size + 8) / 2,
            opacity: reduced ? 0.4 : ringOpacity,
            transform: reduced ? undefined : [{ rotate }, { scale }],
          },
        ]}
      />
      <View
        style={[
          styles.core,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        <View style={styles.highlight} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: colors.gold,
    borderTopColor: colors.mint,
    borderLeftColor: 'transparent',
  },
  core: {
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlight: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.mint,
    opacity: 0.9,
    transform: [{ translateX: 2 }, { translateY: -2 }],
  },
});

export const orbMotionDuration = motion.base;
