package com.github.kxrxh.web;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.Instant;

public class DBManager {
    private static String JDBC_URL = "jdbc:postgresql://localhost:5432/lab3";
    private static String JDBC_USERNAME = "kxrxh";
    private static String JDBC_PASSWORD = "0228";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD);
    }

    public static void init() {
        try {
            Connection connection = getConnection();
            String sql = "CREATE TABLE IF NOT EXISTS points (x double precision, y double precision, r integer, result boolean, time varchar(255));";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.executeUpdate();
            preparedStatement.close();
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void close(Connection connection, PreparedStatement preparedStatement, ResultSet resultSet) {
        try {
            if (resultSet != null)
                resultSet.close();
            if (preparedStatement != null)
                preparedStatement.close();
            if (connection != null)
                connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void clearTable() {
        try {
            Connection connection = getConnection();
            String sql = "DELETE FROM points WHERE EXISTS (SELECT * FROM points)";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.executeUpdate();
            preparedStatement.close();
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void insertPoint(Double x, Double y, Integer r, Boolean result, String time) {
        try {
            Connection connection = getConnection();
            String sql = "INSERT INTO points (x, y, r, result, time) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setDouble(1, x);
            preparedStatement.setDouble(2, y);
            preparedStatement.setInt(3, r);
            preparedStatement.setBoolean(4, result);
            preparedStatement.setString(5, time);
            preparedStatement.executeUpdate();
            preparedStatement.close();
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Example method to execute a SELECT query
    // public static ResultSet executeQuery(String sql, Object... params) {
    // Connection connection = null;
    // PreparedStatement preparedStatement = null;
    // ResultSet resultSet = null;

    // try {
    // connection = getConnection();
    // preparedStatement = connection.prepareStatement(sql);

    // // Set parameters for the prepared statement (if any)
    // for (int i = 0; i < params.length; i++) {
    // preparedStatement.setObject(i + 1, params[i]);
    // }

    // resultSet = preparedStatement.executeQuery();
    // return resultSet;
    // } catch (SQLException e) {
    // e.printStackTrace();
    // } finally {
    // close(connection, preparedStatement, null);
    // }
    // return null;
    // }
}