import { Text, Pressable, PressableProps, Image } from "react-native";
import React from "react";
import { styles } from "./styles";

export type IngredientsProps = {
  name: string;
  image: string;
  selected?: boolean;
};

const Ingredient = ({
  name,
  image,
  selected = false,
  ...rest
}: IngredientsProps & PressableProps) => {
  return (
    <Pressable
      style={[styles.container, selected && styles.selected]}
      {...rest}
    >
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.title}>{name}</Text>
    </Pressable>
  );
};

export default Ingredient;
