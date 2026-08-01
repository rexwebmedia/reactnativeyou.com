---
title: Ripple
description: Custom Android-style ripple effect for all platforms using Reanimated and Gesture Handler
---

`Ripple` is a highly-performant and customizable ripple effect built using [Reanimated 3](https://docs.swmansion.com/react-native-reanimated/) and [Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/). It works consistently across **iOS and Android**, without relying on platform-specific APIs.

Ideal for buttons, cards, pressable containers — or anywhere you want visual feedback on touch.

## ✅ Features

* Android-style ripple, custom-built for **cross-platform support**
* Fully animated using **Reanimated 3**
* Works with any child component
* Automatic sizing and scaling based on layout
* Non-blocking — overlays child views cleanly
* `pointerEvents="none"` for seamless touch passthrough

---

## 📱 Usage Examples

### Basic Usage

```tsx
<Ripple onPress={() => console.log('Tapped')}>
  <View style={{ padding: 16, backgroundColor: '#eee', borderRadius: 8 }}>
    <Text>Tap Me</Text>
  </View>
</Ripple>
```

### Custom Ripple Color

```tsx
<Ripple rippleColor="rgba(0, 150, 136, 0.3)" onPress={handlePress}>
  <Row justify="center" p={12} backgroundColor="#f5f5f5">
    <Text>Button</Text>
  </Row>
</Ripple>
```

### Disabled State

```tsx
<Ripple disabled onPress={() => console.log('Won’t fire')}>
  <View style={{ padding: 12, backgroundColor: '#ccc' }}>
    <Text>Disabled</Text>
  </View>
</Ripple>
```

---

## 📦 Installation

### Using CLI

```sh
npx react-native-you add ripple
```

### Manual Setup

Copy the file to your project:

```tsx title="src/components/ui/ripple.tsx"
import * as React from 'react';
import { StyleSheet } from 'react-native';
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

export type RippleProps = {
  disabled?: boolean;
  onPress?: () => void;
  rippleColor?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Ripple = ({ children, onPress, disabled, style, rippleColor = 'rgba(0,0,0,0.2)' }: RippleProps) => {
  const scale = useSharedValue(0);
  const radius = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const duration = 750;

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    // compute max diagonal distance for full coverage
    radius.value = Math.sqrt(width ** 2 + height ** 2);
  };

  const tapGesture = Gesture.Tap()
    .enabled(!disabled)
    .onStart((e) => {
      scale.value = 0;
      opacity.value = 1;
      translateX.value = e.x;
      translateY.value = e.y;
      scale.value = withTiming(1, { duration });
    })
    .onEnd(() => {
      opacity.value = withTiming(0, { duration });
      if (onPress && !disabled) {
        runOnJS(onPress)();
      }
    });

  const animatedCircle = useAnimatedStyle(() => {
    const width = radius.value * 2;
    const height = radius.value * 2;
    return {
      width, height, borderRadius: radius.value,
      opacity: opacity.value, backgroundColor: rippleColor,
      transform: [
        { translateX: translateX.value - radius.value },
        { translateY: translateY.value - radius.value },
        { scale: scale.value }, // place it last, so scale after placed at center
      ],
    };
  });

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View onLayout={onLayout} style={[styles.container, style]}>
        {children}
        <Animated.View pointerEvents="none" style={[styles.circle, animatedCircle]} />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  circle: {
    top: 0,
    left: 0,
    position: 'absolute',
  },
});

```

---

## 🎥 How It Works

* When tapped, the component captures the touch location (`x`, `y`) via Gesture Handler.
* A circle with `opacity` and `scale` animation expands from the touch point.
* The maximum ripple radius is calculated based on container size (`width`, `height`) on layout.
* The animated ripple fades out after the press completes.
* The `onPress` callback runs **after** the animation starts (non-blocking UX).

---

## 💡 Tips

* Add `borderRadius` or `overflow: 'hidden'` to parent views for clipped ripple boundaries.
* If wrapping a `Row`, `Column`, or `Card`, you don’t need to manage `Touchable` behavior separately.
* Use this instead of `TouchableOpacity` or `Pressable` for **better animation control** and **cross-platform parity**.

---

## ⚙️ Styling Notes

* The wrapper `View` uses `overflow: 'hidden'` to ensure ripple doesn’t leak.
* The ripple circle is `position: absolute`, and centered based on gesture point.
* `pointerEvents="none"` on the ripple ensures no interaction blockage for child components.

---

## 🧰 Props

| Prop          | Type                   | Description                                      |
| ------------- | ---------------------- | ------------------------------------------------ |
| `onPress`     | `() => void`           | Called when tap is completed                     |
| `disabled`    | `boolean`              | Disables ripple and interaction                  |
| `rippleColor` | `string`               | Color of the ripple (default: `rgba(0,0,0,0.2)`) |
| `style`       | `StyleProp<ViewStyle>` | Optional outer wrapper style                     |
| `children`    | `React.ReactNode`      | The element(s) to wrap with ripple effect        |

