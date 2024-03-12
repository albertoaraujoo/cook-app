import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { styles } from "./styles";
import Ingredient from "@/components/Ingredient";
import Selected from "@/components/Selected";
import { services } from "@/services";

const Index = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);

  const handleToggleSelected = (value: string) => {
    if (selected.includes(value)) {
      return setSelected((state) => state.filter((item) => item !== value));
    }
    setSelected((state) => [...state, value]);
  };

  const handleClearSelected = () => {
    Alert.alert("Limpar", "Deseja limpar tudo?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => setSelected([]) },
    ]);
  };

  const handleSearch = () => {
    router.navigate("/recipes/" + selected);
  };

  useEffect(() => {
    services.ingredients.findAll().then((data) => setIngredients(data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha {"\n"}
        <Text style={styles.subtitle}>os produtos</Text>
      </Text>
      <Text style={styles.message}>
        Descubra as receitas baseadas nos produtos que você escolheu
      </Text>
      <ScrollView
        contentContainerStyle={styles.ingredients}
        showsVerticalScrollIndicator={false}
      >
        {ingredients.map((item, index) => (
          <Ingredient
            name={item.name}
            image={`${services.storage.imagePath}/${item.image}`}
            selected={selected.includes(String(item.id))}
            key={item.id}
            onPress={() => handleToggleSelected(String(item.id))}
          />
        ))}
      </ScrollView>
      {selected.length > 0 && (
        <Selected
          quantity={selected.length}
          onClear={handleClearSelected}
          onSearch={handleSearch}
        />
      )}
    </View>
  );
};

export default Index;
