import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { styles } from "./styles";

import { Recipe } from "@/components/Recipe";

import { services } from "@/services";
import Ingredients from "@/components/Ingredients";

const Recipes = () => {
  const params = useLocalSearchParams<{ ingredientsIds: string }>();
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);
  const ingredientsIds = params.ingredientsIds.split(",");
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);

  useEffect(() => {
    services.ingredients
      .findByIds(ingredientsIds)
      .then((data) => setIngredients(data));
  }, []);

  useEffect(() => {
    services.recipes
      .findByIngredientsIds(ingredientsIds)
      .then((data) => setRecipes(data));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back"
          size={32}
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Ingredientes</Text>
      </View>
      <Ingredients ingredients={ingredients} />
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Recipe
            recipe={item}
            onPress={() => router.navigate(`/recipe/${item.id}`)}
          />
        )}
        style={styles.recipes}
        contentContainerStyle={styles.recipesContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 16 }}
        numColumns={2}
      />
    </View>
  );
};

export default Recipes;
