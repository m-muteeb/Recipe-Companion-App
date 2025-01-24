import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image, Alert, FlatList } from 'react-native';

const Home = () => {
  // State variables for user inputs
  const [recipeName, setRecipeName] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [recipes, setRecipes] = useState([]); // Store added recipes

  // Function to handle recipe submission
  const handleAddRecipe = () => {
    if (!recipeName || !category || !ingredients || !instructions) {
      Alert.alert('Error', 'Please fill all the fields before adding a recipe.');
      return;
    }

    const newRecipe = {
      id: Math.random().toString(),
      name: recipeName,
      category: category,
      ingredients: ingredients,
      instructions: instructions,
    };

    setRecipes([...recipes, newRecipe]);

    Alert.alert('Success', `Recipe "${recipeName}" added successfully!`);

    // Clear input fields after submission
    setRecipeName('');
    setCategory('');
    setIngredients('');
    setInstructions('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header Image */}
      <Image
        source={{
          uri: 'https://thumbs.dreamstime.com/b/italian-food-table-image-shows-full-delicious-theres-pizza-pasta-bread-more-all-arranged-beautiful-appetizing-323626017.jpg',
        }}
        style={styles.headerImage}
      />

      <Text style={styles.title}>Recipe Companion App</Text>

      {/* Recipe Name Input */}
      <Text style={styles.label}>Recipe Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter recipe name"
        placeholderTextColor="#FFF5E1"
        value={recipeName}
        onChangeText={setRecipeName}
      />

      {/* Recipe Category Input */}
      <Text style={styles.label}>Category:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter recipe category"
        placeholderTextColor="#FFF5E1"
        value={category}
        onChangeText={setCategory}
      />

      {/* Ingredients Input */}
      <Text style={styles.label}>Ingredients:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="List ingredients..."
        placeholderTextColor="#FFF5E1"
        value={ingredients}
        onChangeText={setIngredients}
        multiline
      />

      {/* Instructions Input */}
      <Text style={styles.label}>Instructions:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Write cooking instructions..."
        placeholderTextColor="#FFF5E1"
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />

      {/* Add Recipe Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddRecipe}>
        <Text style={styles.addButtonText}>Add Recipe</Text>
      </TouchableOpacity>

      {/* Display added recipes */}
      <Text style={styles.sectionTitle}>Added Recipes</Text>
      {recipes.length === 0 ? (
        <Text style={styles.noRecipesText}>No recipes added yet.</Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.recipeCard}>
              <Text style={styles.recipeTitle}>{item.name}</Text>
              <Text style={styles.recipeCategory}>Category: {item.category}</Text>
              <Text style={styles.recipeDetails}>Ingredients: {item.ingredients}</Text>
              <Text style={styles.recipeDetails}>Instructions: {item.instructions}</Text>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E1', // Creamy Vanilla background
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80, // Extra padding at the bottom for better scrollability
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B0000', // Rich Burgundy
    textAlign: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E342E', // Dark Chocolate
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#8B0000', // Rich Burgundy input background
    color: '#FFF5E1', // Creamy Vanilla text
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 100, // Larger height for multiline inputs
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#556B2F', // Deep Olive Green
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    fontSize: 20,
    color: '#FFD700', // Gold text color
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4E342E', // Dark Chocolate
    marginTop: 30,
  },
  noRecipesText: {
    fontSize: 18,
    color: '#4E342E',
    textAlign: 'center',
    marginTop: 10,
  },
  recipeCard: {
    backgroundColor: '#D2691E', // Rustic Orange
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF5E1', // Creamy Vanilla
  },
  recipeCategory: {
    fontSize: 18,
    color: '#FFD700', // Gold
    marginTop: 5,
  },
  recipeDetails: {
    fontSize: 16,
    color: '#FFF5E1',
    marginTop: 5,
  },
});

export default Home;

