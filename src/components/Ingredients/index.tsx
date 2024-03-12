import { ScrollView } from "react-native";

import { services } from "@/services";

import { styles } from "./styles";
import Ingredient, { IngredientsProps } from "../Ingredient";

type Props = {
  ingredients: IngredientsProps[];
};

const Ingredients = ({ ingredients }: Props) => {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      contentContainerStyle={styles.ingredientsContent}
      showsHorizontalScrollIndicator={false}
    >
      {ingredients.map((ingredient) => (
        <Ingredient
          key={ingredient.name}
          name={ingredient.name}
          image={`${services.storage.imagePath}/${ingredient.image}`}
        />
      ))}
    </ScrollView>
  );
};

export default Ingredients;
