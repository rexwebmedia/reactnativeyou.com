---
title: Row and Column
description: Build layouts with a powerful and composable View component.
---

`Row` and `Column` are layout primitives built on top of React Native’s `View`, with enhanced support for **spacing**, **borders**, **radius**, **positioning**, and **pressability**.

They are flexible, typed, and composable — perfect for building consistent layouts with less boilerplate.

## ✅ Features

* `Row` = `View` with `flexDirection: "row"`
* `Column` = `View` with `flexDirection: "column"`
* Supports spacing: `m`, `p`, `mx`, `py`, etc.
* Gap system: `gap`, `gapX`, `gapY`
* Border width and color on each side
* Border radius shortcuts
* Pressable when any `onPress`, `onLongPress`, etc. are passed
* Works with `flex`, `grow`, `shrink`, `justify`, `align`, `wrap`, etc.

---

## 📱 Usage Examples

### Horizontal Row Layout

```tsx
<Row gap={8} p={12} backgroundColor="#f0f0f0" align="center">
  <Text>Left</Text>
  <Text>Right</Text>
</Row>
```

### Vertical Column with Gaps and Padding

```tsx
<Column gapY={16} px={20} py={10}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
</Column>
```

### Pressable Row with Border

```tsx
<Row
  onPress={() => alert('Pressed!')}
  borderWidth={1}
  borderColor="gray"
  borderRadius={12}
  p={10}
  gap={10}
>
  <Text>Tap Me</Text>
</Row>
```

### Complex Layout Example

```tsx
<Column gapY={20} mx={16}>
  <Row justify="space-between" align="center" gap={12}>
    <Text style={{ fontWeight: 'bold' }}>Title</Text>
    <Text>Status</Text>
  </Row>

  <Row gapX={10} wrap="wrap">
    {[...Array(4)].map((_, i) => (
      <View
        key={i}
        style={{ width: 80, height: 40, backgroundColor: '#ddd', borderRadius: 6 }}
      />
    ))}
  </Row>
</Column>
```

---

## 📦 Installation

### Using CLI

```bash
npx react-native-you add view
```

### Manual Setup

Copy the file to your project:

```tsx title="src/components/ui/view.tsx"
import * as React from 'react';
import { Pressable, View } from 'react-native';
import type { ViewStyle, StyleProp, PressableProps, DimensionValue, AnimatableNumericValue } from 'react-native';

type FlexWrap = ViewStyle['flexWrap'];
type FlexAlign = ViewStyle['alignItems'];
type FlexPosition = ViewStyle['position'];
type FlexJustify = ViewStyle['justifyContent'];

type Spacing = DimensionValue | undefined;
type Radius = AnimatableNumericValue | undefined;

interface SpacingProps {
  m?: Spacing;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
  mx?: Spacing;
  my?: Spacing;
  p?: Spacing;
  pt?: Spacing;
  pb?: Spacing;
  pl?: Spacing;
  pr?: Spacing;
  px?: Spacing;
  py?: Spacing;
}

interface BorderRadiusProps {
  borderRadius?: Radius;
  borderTopLeftRadius?: Radius;
  borderTopRightRadius?: Radius;
  borderBottomLeftRadius?: Radius;
  borderBottomRightRadius?: Radius;
}

interface BorderProps {
  borderWidth?: number;
  borderTopWidth?: number;
  borderRightWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderColor?: string;
  borderTopColor?: string;
  borderRightColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
}

type FlexViewProps = SpacingProps & BorderRadiusProps & BorderProps & PressableProps & {
  children?: React.ReactNode;
  direction: 'row' | 'column';
  gap?: string | number;
  gapX?: string | number;
  gapY?: string | number;
  grow?: number;
  shrink?: number;
  justify?: FlexJustify;
  align?: FlexAlign;
  wrap?: FlexWrap;
  flex?: number;
  backgroundColor?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  position?: FlexPosition;
  top?: DimensionValue;
  right?: DimensionValue;
  bottom?: DimensionValue;
  left?: DimensionValue;
  z?: number;
  overflow?: ViewStyle['overflow'];
  style?: StyleProp<ViewStyle>;
};

const resolveSpacing = (props: SpacingProps): ViewStyle => {
  return {
    margin: props.m,
    marginTop: props.mt ?? props.my,
    marginBottom: props.mb ?? props.my,
    marginLeft: props.ml ?? props.mx,
    marginRight: props.mr ?? props.mx,
    padding: props.p,
    paddingTop: props.pt ?? props.py,
    paddingBottom: props.pb ?? props.py,
    paddingLeft: props.pl ?? props.px,
    paddingRight: props.pr ?? props.px,
  };
};

const resolveRadius = (props: BorderRadiusProps): ViewStyle => ({
  borderRadius: props.borderRadius,
  borderTopLeftRadius: props.borderTopLeftRadius,
  borderTopRightRadius: props.borderTopRightRadius,
  borderBottomLeftRadius: props.borderBottomLeftRadius,
  borderBottomRightRadius: props.borderBottomRightRadius,
});

const resolveBorder = (props: BorderProps): ViewStyle => ({
  borderWidth: props.borderWidth,
  borderTopWidth: props.borderTopWidth,
  borderRightWidth: props.borderRightWidth,
  borderBottomWidth: props.borderBottomWidth,
  borderLeftWidth: props.borderLeftWidth,
  borderColor: props.borderColor,
  borderTopColor: props.borderTopColor,
  borderRightColor: props.borderRightColor,
  borderBottomColor: props.borderBottomColor,
  borderLeftColor: props.borderLeftColor,
});

const FlexViewComponent = ({
  children, direction, gap, gapX, gapY, grow, shrink, flex,
  justify, align, wrap, backgroundColor,
  width, height, position, top, right, bottom, left,
  z, overflow, style, ...rest
}: FlexViewProps) => {
  const gapStyle: ViewStyle = {};
  // Only apply `gap` if both X and Y are not explicitly set
  if (gap != null && gapX == null && gapY == null) {
    gapStyle.gap = gap;
  }
  if (gapX != null) {
    gapStyle.columnGap = gapX;
  }
  if (gapY != null) {
    gapStyle.rowGap = gapY;
  }

  const baseStyle: ViewStyle = {
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap,
    backgroundColor,
    width,
    height,
    position,
    top,
    right,
    bottom,
    left,
    zIndex: z,
    overflow,
    ...(flex !== undefined
      ? { flex }
      : {
        flexGrow: grow,
        flexShrink: shrink,
      }),
    ...gapStyle,
    ...resolveSpacing(rest),
    ...resolveRadius(rest),
    ...resolveBorder(rest),
  };

  const pressableProps = Object.keys(rest).some(key =>
    key.startsWith('on') && typeof (rest as any)[key] === 'function'
  );

  return pressableProps ? (
    <Pressable style={[baseStyle, style]} {...rest}>{children}</Pressable>
  ) : (
    <View style={[baseStyle, style]}>{children}</View>
  );
};

const FlexView = React.memo(FlexViewComponent);

type RowProps = Omit<FlexViewProps, 'direction'>;
export const Row = React.memo((props: RowProps) => <FlexView {...props} direction="row" />);

type ColumnProps = Omit<FlexViewProps, 'direction'>;
export const Column = React.memo((props: ColumnProps) => <FlexView {...props} direction="column" />);
```

---

## 💡 Notes

* Automatically switches between `View` and `Pressable` if any press-related prop (like `onPress`, `onLongPress`) is present.
* If `gap` is provided, and `gapX`/`gapY` are **not**, it applies uniform spacing.
* Uses `React.memo` for optimized rendering.

---

## 📎 Tips for Customization

* You can wrap `Row` or `Column` and create your own `Card`, `Container`, or `Section` components.
* Combine `gap`, `padding`, and `borderRadius` to quickly build common UI blocks.

---

## 🛠 Related Utilities

* [`Spacer`](/components/spacer/) – Insert fixed or flexible space between elements

---

## 🧰 Props

### Common Props

| Prop                                         | Type                                | Description                              |
| -------------------------------------------- | ----------------------------------- | ---------------------------------------- |
| `gap`                                        | `number \| string`                  | Gap between children, applied both X & Y |
| `gapX`, `gapY`                               | `number \| string`                  | Horizontal / vertical gap override       |
| `justify`                                    | `FlexJustify`                       | `justifyContent` shortcut                |
| `align`                                      | `FlexAlign`                         | `alignItems` shortcut                    |
| `wrap`                                       | `FlexWrap`                          | Whether items should wrap                |
| `flex`, `grow`, `shrink`                     | `number`                            | Flex layout options                      |
| `backgroundColor`                            | `string`                            | Background color                         |
| `width`, `height`                            | `DimensionValue`                    | Width and height                         |
| `position`, `top`, `left`, `right`, `bottom` | `DimensionValue`                    | Absolute/relative positioning            |
| `z`                                          | `number`                            | z-index shortcut                         |
| `overflow`                                   | `'visible' \| 'hidden' \| 'scroll'` | Overflow behavior                        |

### Spacing Props

Shorthand margin/padding props:

* `m`, `mt`, `mb`, `ml`, `mr`, `mx`, `my`
* `p`, `pt`, `pb`, `pl`, `pr`, `px`, `py`

### Border Props

* `borderWidth`, `borderColor`
* Side-specific: `borderTopWidth`, `borderLeftColor`, etc.

### Border Radius Props

* `borderRadius`, or side-specific versions like `borderTopLeftRadius`
