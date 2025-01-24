import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);

  const handleSaveSettings = () => {
    // Implement save settings functionality
    Alert.alert('Settings Saved', 'Your settings have been saved successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            thumbColor={notificationsEnabled ? '#FFD700' : '#ccc'}
            trackColor={{ false: '#767577', true: '#FFD700' }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Theme</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Enable Dark Theme</Text>
          <Switch
            value={darkThemeEnabled}
            onValueChange={setDarkThemeEnabled}
            thumbColor={darkThemeEnabled ? '#FFD700' : '#ccc'}
            trackColor={{ false: '#767577', true: '#FFD700' }}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FFF5E1', // Creamy Vanilla background
    paddingBottom: 100, // Add padding to ensure the bottom area is free
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: 'center',
    color: '#8B0000', // Rich Burgundy color
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#8B0000', // Rustic Orange color
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderColor: '#FFD700', // Gold border color
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#8B0000', // Dark Chocolate background for input
    color: '#FFF5E1', // Creamy Vanilla text color
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#8B0000', // Rich Burgundy text color
  },
  saveButton: {
    backgroundColor: '#556B2F', // Deep Olive Green background color
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFD700', // Creamy Vanilla text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Settings;