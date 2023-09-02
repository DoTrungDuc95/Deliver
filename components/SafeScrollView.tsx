import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SafeScrollViewProps = {
  children: React.ReactNode;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  safeClassName?: string;
  contentStyle?: StyleProp<ViewStyle>;
};

const SafeScrollView = ({
  children,
  top,
  bottom,
  left,
  right,
  safeClassName,
  contentStyle,
}: SafeScrollViewProps) => {
  const inset = useSafeAreaInsets();
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        paddingTop: top ? inset.top : 0,
        paddingBottom: bottom ? inset.bottom : 0,
        paddingLeft: left ? inset.left : 0,
        paddingRight: right ? inset.right : 0,
      }}
      contentContainerStyle={contentStyle}
      className={safeClassName}
    >
      {children}
    </ScrollView>
  );
};

export default SafeScrollView;
