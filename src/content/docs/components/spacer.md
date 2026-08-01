---
title: Spacer
description: Flexible spacing component
---

The `Spacer` component helps you insert flexible or fixed spacing between elements in your layout. It replaces repetitive empty `View` blocks and gives you a more semantic, consistent way to handle layout spacing.

## ✅ Features

* Supports fixed size using `size`, `width`, or `height`
* Automatically adapts to layout direction via `orientation`
* Can grow using `flex: 1`
* Can shrink to `0px` using `shrink`
* Fully typed and memoized for performance

---

## 📱 Usage Examples

### Fixed Vertical Space (16px)

```tsx
<>
  <Text>Above</Text>
  <Spacer size={16} orientation="vertical" />
  <Text>Below</Text>
</>
```

### Fixed Horizontal Space (8px)

```tsx
<Row align="center">
  <Icon />
  <Spacer size={8} orientation="horizontal" />
  <Text>Label</Text>
</Row>
```

### Auto-Shrinking Spacer

```tsx
<Row>
  <Text>Left</Text>
  <Spacer shrink />
  <Text>Right</Text>
</Row>
```

### Spacer That Fills Space

```tsx
<Row>
  <Text>Left</Text>
  <Spacer grow />
  <Text>Right</Text>
</Row>
```

### Between Buttons

```tsx
<Row gap={0}>
  <Button title="Accept" />
  <Spacer size={12} orientation="horizontal" />
  <Button title="Decline" />
</Row>
```

### Between Cards (Vertical List)

```tsx
<Column>
  <Card />
  <Spacer size={24} />
  <Card />
  <Spacer size={24} />
  <Card />
</Column>
```

---

## 📦 Installation

### Using CLI

```bash
npx react-native-you add spacer
```

### Manual Setup

Copy the file to your project:

```tsx title="src/components/ui/spacer.tsx"
import * as React from 'react';
import { View } from 'react-native';
import type { ViewStyle, StyleProp, DimensionValue } from 'react-native';

type Orientation = 'horizontal' | 'vertical';

export type SpacerProps = {
  /** Sets the spacer's size in both width & height if `orientation` is not set */
  size?: number;

  /** Set explicit width */
  width?: DimensionValue;

  /** Set explicit height */
  height?: DimensionValue;

  /** Controls the primary axis in flex containers */
  orientation?: Orientation;

  /** If true, spacer will grow using flex: 1 */
  grow?: boolean;

  /** Shrinks to 0px instead of applying default height/width */
  shrink?: boolean;

  /** Optional custom style */
  style?: StyleProp<ViewStyle>;
};

export const Spacer = React.memo(
  ({
    size,
    width,
    height,
    orientation,
    grow = false,
    shrink = false,
    style,
  }: SpacerProps) => {
    const finalStyle: ViewStyle = {
      ...(grow ? { flex: 1 } : {}),
      ...(shrink
        ? { width: 0, height: 0 }
        : size !== undefined
          ? orientation === 'vertical'
            ? { height: size }
            : orientation === 'horizontal'
              ? { width: size }
              : { width: size, height: size }
          : {
            width: width ?? (orientation === 'horizontal' ? 8 : undefined),
            height: height ?? (orientation === 'vertical' ? 8 : undefined),
          }),
    };

    return <View style={[finalStyle, style]} />;
  }
);
```

---

## 💡 Notes

* `size` works best for fixed gaps. Use `grow` for auto-fill.
* If no `orientation`, it assumes a square: `width = height = size`
* If you pass `shrink`, size is ignored and the spacer collapses
* Use `style` prop to apply things like backgroundColor if needed for debugging

---

## 📚 Related Utilities

* [→ Row and Column](/components/view/)
* [→ useBottomSheetBack Hook](/hooks/use-bottom-sheet-back/)

