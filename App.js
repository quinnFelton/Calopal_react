/**
 * Calopal React Native App
 * Main application component with SQLite database integration
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import DatabaseService from './src/services/DatabaseService';

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    initializeDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeDatabase = async () => {
    try {
      await DatabaseService.initDatabase();
      setDbReady(true);
      loadItems();
    } catch (error) {
      console.error('Database initialization error:', error);
      Alert.alert('Error', 'Failed to initialize database');
    }
  };

  const loadItems = async () => {
    try {
      const allItems = await DatabaseService.getAllItems();
      setItems(allItems);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const addItem = async () => {
    if (!name.trim() || !calories.trim()) {
      Alert.alert('Error', 'Please enter both name and calories');
      return;
    }

    try {
      await DatabaseService.addItem(name.trim(), parseInt(calories, 10));
      setName('');
      setCalories('');
      loadItems();
      Alert.alert('Success', 'Item added successfully');
    } catch (error) {
      console.error('Error adding item:', error);
      Alert.alert('Error', 'Failed to add item');
    }
  };

  const deleteItem = async id => {
    try {
      await DatabaseService.deleteItem(id);
      loadItems();
      Alert.alert('Success', 'Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  if (!dbReady) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Initializing Database...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <Text style={styles.title}>Calopal - Calorie Tracker</Text>
          <Text style={styles.subtitle}>SQLite Storage Demo</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Food name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Calories"
              value={calories}
              onChangeText={setCalories}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.addButton} onPress={addItem}>
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.itemsContainer}>
            <Text style={styles.itemsTitle}>Stored Items ({items.length})</Text>
            {items.length === 0 ? (
              <Text style={styles.emptyText}>No items stored yet</Text>
            ) : (
              items.map(item => (
                <View key={item.id} style={styles.itemCard}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCalories}>
                      {item.calories} calories
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteItem(item.id)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  body: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemsContainer: {
    marginTop: 10,
  },
  itemsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  itemCalories: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
});

export default App;
