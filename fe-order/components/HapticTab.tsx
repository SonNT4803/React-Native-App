import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export function HapticTab(props: BottomTabBarButtonProps) {
  const scale = useSharedValue(1);

  // Xác định xem tab có đang được chọn hay không
  const isSelected = props.accessibilityState?.selected;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        scale.value = withSpring(0.9, { damping: 10, stiffness: 200 });
        if (process.env.EXPO_OS === "ios") {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
      onPressOut={(ev) => {
        scale.value = withSpring(1, { damping: 10, stiffness: 200 });
        props.onPressOut?.(ev);
      }}
      style={styles.tabButton}
    >
      <Animated.View
        style={[
          styles.tabButtonContent,
          animatedStyle,
          isSelected ? styles.selectedTab : styles.unselectedTab,
        ]}
      >
        {props.children}
      </Animated.View>
    </PlatformPressable>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabButtonContent: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  selectedTab: {
    backgroundColor: "#FFF5F5",
    borderWidth: 1,
    borderColor: "#FF6B6B",
    shadowColor: "#FF6B6B",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  unselectedTab: {
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
});
