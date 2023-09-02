import { View, Text } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SafeViewProps = {
  children: React.ReactNode;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  safeClassName?: string;
  flex?: number;
};

const SafeView = ({
  children,
  top,
  bottom,
  left,
  right,
  safeClassName,
  flex = 1,
}: SafeViewProps) => {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={{
        flex,
        paddingTop: top ? inset.top : 0,
        paddingBottom: bottom ? inset.bottom : 0,
        paddingLeft: left ? inset.left : 0,
        paddingRight: right ? inset.right : 0,
      }}
      className={safeClassName}
    >
      {children}
    </View>
  );
};

export default SafeView;
