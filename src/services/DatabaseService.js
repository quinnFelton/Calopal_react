/**
 * Database Service for SQLite operations
 * Handles all database interactions for the Calopal app
 */

import SQLite from 'react-native-sqlite-storage';

// Enable promise API
SQLite.enablePromise(true);

const DATABASE_NAME = 'calopal.db';
const DATABASE_VERSION = '1.0';
const DATABASE_DISPLAY_NAME = 'Calopal Database';
const DATABASE_SIZE = 200000;

class DatabaseService {
  constructor() {
    this.db = null;
  }

  /**
   * Initialize database and create tables if they don't exist
   */
  async initDatabase() {
    try {
      console.log('Opening database...');
      this.db = await SQLite.openDatabase(
        DATABASE_NAME,
        DATABASE_VERSION,
        DATABASE_DISPLAY_NAME,
        DATABASE_SIZE,
      );

      console.log('Database opened successfully');

      // Create tables
      await this.createTables();

      console.log('Database initialization complete');
      return this.db;
    } catch (error) {
      console.error('Database initialization failed:', error);
      throw error;
    }
  }

  /**
   * Create required tables
   */
  async createTables() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS food_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        calories INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;

    try {
      await this.db.executeSql(createTableQuery);
      console.log('Tables created successfully');
    } catch (error) {
      console.error('Error creating tables:', error);
      throw error;
    }
  }

  /**
   * Add a new food item
   */
  async addItem(name, calories) {
    const insertQuery = `
      INSERT INTO food_items (name, calories)
      VALUES (?, ?);
    `;

    try {
      const result = await this.db.executeSql(insertQuery, [name, calories]);
      console.log('Item added successfully:', result);
      return result[0].insertId;
    } catch (error) {
      console.error('Error adding item:', error);
      throw error;
    }
  }

  /**
   * Get all food items
   */
  async getAllItems() {
    const selectQuery = `
      SELECT * FROM food_items
      ORDER BY created_at DESC;
    `;

    try {
      const results = await this.db.executeSql(selectQuery);
      const items = [];

      if (results[0].rows.length > 0) {
        for (let i = 0; i < results[0].rows.length; i++) {
          items.push(results[0].rows.item(i));
        }
      }

      console.log('Retrieved items:', items.length);
      return items;
    } catch (error) {
      console.error('Error getting items:', error);
      throw error;
    }
  }

  /**
   * Get a single item by ID
   */
  async getItemById(id) {
    const selectQuery = `
      SELECT * FROM food_items
      WHERE id = ?;
    `;

    try {
      const results = await this.db.executeSql(selectQuery, [id]);
      if (results[0].rows.length > 0) {
        return results[0].rows.item(0);
      }
      return null;
    } catch (error) {
      console.error('Error getting item by ID:', error);
      throw error;
    }
  }

  /**
   * Update a food item
   */
  async updateItem(id, name, calories) {
    const updateQuery = `
      UPDATE food_items
      SET name = ?, calories = ?
      WHERE id = ?;
    `;

    try {
      const result = await this.db.executeSql(updateQuery, [
        name,
        calories,
        id,
      ]);
      console.log('Item updated successfully');
      return result;
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  }

  /**
   * Delete a food item
   */
  async deleteItem(id) {
    const deleteQuery = `
      DELETE FROM food_items
      WHERE id = ?;
    `;

    try {
      const result = await this.db.executeSql(deleteQuery, [id]);
      console.log('Item deleted successfully');
      return result;
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  }

  /**
   * Delete all items
   */
  async deleteAllItems() {
    const deleteQuery = 'DELETE FROM food_items;';

    try {
      const result = await this.db.executeSql(deleteQuery);
      console.log('All items deleted successfully');
      return result;
    } catch (error) {
      console.error('Error deleting all items:', error);
      throw error;
    }
  }

  /**
   * Get total calories
   */
  async getTotalCalories() {
    const selectQuery = `
      SELECT SUM(calories) as total
      FROM food_items;
    `;

    try {
      const results = await this.db.executeSql(selectQuery);
      if (results[0].rows.length > 0) {
        return results[0].rows.item(0).total || 0;
      }
      return 0;
    } catch (error) {
      console.error('Error calculating total calories:', error);
      throw error;
    }
  }

  /**
   * Close database connection
   */
  async closeDatabase() {
    if (this.db) {
      try {
        await this.db.close();
        console.log('Database closed successfully');
        this.db = null;
      } catch (error) {
        console.error('Error closing database:', error);
        throw error;
      }
    }
  }
}

// Export singleton instance
export default new DatabaseService();
