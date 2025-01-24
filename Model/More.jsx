import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import axios from 'axios';

const App = () => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeInfo, setRecipeInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const spoonacularAPIKey = ''; // Add your API key here

  // Function to search for recipes by name
  const searchRecipe = async () => {
    if (!recipeName) {
      setError('Please enter a valid recipe name.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${recipeName}&apiKey=${spoonacularAPIKey}`
      );
      if (response.data.results.length > 0) {
        setSearchResults(response.data.results);
      } else {
        setError('No recipes found with the provided name.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while searching for recipes.');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch recipe details by ID
  const fetchRecipeInfo = async (id) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacularAPIKey}`
      );
      setRecipeInfo(response.data);
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching recipe details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header Image */}
          <Image
            source={{
              uri: 'https://media.istockphoto.com/id/1215178290/photo/stir-fry-noodles-with-vegetables-and-beef-in-black-bowl-slate-background-close-up.jpg?s=612x612&w=0&k=20&c=_svdOGLzJ52q1Mf_k6v5u5Xc5iRkH0DIYrwmrfKTaJ4=',
            }}
            style={styles.headerImage}
          />

          <View style={styles.header}>
            <Text style={styles.headerText}>Recipe Companion App</Text>
          </View>

          <View style={styles.content}>
            {/* Recipe Name Input - Positioned Higher */}
            <TextInput
              style={styles.input}
              placeholder="Enter Recipe Name"
              placeholderTextColor="#FFF5E1"
              value={recipeName}
              onChangeText={setRecipeName}
            />
            <Button title="Search Recipe" onPress={searchRecipe} color="#5B913B" />

            {loading && <ActivityIndicator size="large" color="#5B913B" />}

            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <View style={styles.recipeContainer}>
                <Text style={styles.title}>Search Results:</Text>
                {searchResults.map((recipe, index) => (
                  <View key={index} style={styles.recipeResult}>
                    <Text style={styles.recipeText}>{recipe.title}</Text>
                    <Button title="Get Recipe Info" onPress={() => fetchRecipeInfo(recipe.id)} color="#8B0000" />
                  </View>
                ))}
              </View>
            )}

            {recipeInfo && (
              <View style={styles.recipeContainer}>
                <Text style={styles.title}>Recipe Details:</Text>
                <Text style={styles.recipeText}>Title: {recipeInfo.title}</Text>
                <Text style={styles.recipeText}>Summary: {recipeInfo.summary}</Text>
                <Text style={styles.recipeText}>
                  Ingredients: {recipeInfo.extendedIngredients.map((ingredient) => ingredient.original).join(', ')}
                </Text>
                <Text style={styles.recipeText}>Instructions: {recipeInfo.instructions}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// Styles
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#1c1c1c', // Blackish background
    paddingBottom: 100, // Extra padding to ensure bottom is scrollable
  },
  headerImage: {
    width: '100%',
    height: 250,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  header: {
    marginVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color
  },
  content: {
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    borderColor: '#FFD700', // Gold border color
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#333', // Dark input background
    color: '#FFF5E1', // Creamy vanilla text
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  recipeContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#8B0000', // Rich Burgundy
    borderRadius: 15,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    color: '#FFF5E1', // Creamy vanilla text
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recipeResult: {
    marginBottom: 16,
  },
  recipeText: {
    fontSize: 16,
    color: '#FFF5E1', // Creamy vanilla text
    marginBottom: 5,
  },
});

export default App;

