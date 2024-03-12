import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, { SlideInDown, BounceOutDown } from "react-native-reanimated";
import { styles } from "./styles";
import { theme } from "@/theme";
import { Button } from "../Button";

type SelectedProps = {
  quantity: number;
  onClear: () => void;
  onSearch: () => void;
};

const Selected = ({ quantity, onClear, onSearch }: SelectedProps) => {
  return (
    <Animated.View
      style={styles.container}
      entering={SlideInDown.duration(500)}
      exiting={BounceOutDown}
    >
      <View style={styles.header}>
        <Text style={styles.label}>{quantity} ingredientes selecionados</Text>
        <MaterialIcons
          name="close"
          size={24}
          onPress={onClear}
          color={theme.colors.gray_400}
        />
      </View>
      <Button title="Encontrar" onPress={onSearch} />
    </Animated.View>
  );
};

export default Selected;