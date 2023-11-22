package com.github.kxrxh.web;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.github.kxrxh.web.types.Point;

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
            String sql = "CREATE TABLE IF NOT EXISTS points (x double precision, y double precision, r integer, result boolean, time varchar(255), session_id varchar(255));";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.executeUpdate();
            preparedStatement.close();
            connection.close();
        } catch (SQLException e) {
            System.err.println(e.getMessage());
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

    public static void clearTable(Integer rValue, String sessionID) {
        try {
            Connection connection = getConnection();
            String sql = "DELETE FROM points WHERE r = ? AND session_id = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1, rValue);
            preparedStatement.setString(2, sessionID);

            preparedStatement.executeUpdate();

            preparedStatement.close();
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void insertPoint(Double x, Double y, Integer r, Boolean result, String time, String sessionID) {
        try {
            Connection connection = getConnection();
            String sql = "INSERT INTO points (x, y, r, result, time, session_id) VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setDouble(1, x);
            preparedStatement.setDouble(2, y);
            preparedStatement.setInt(3, r);
            preparedStatement.setBoolean(4, result);
            preparedStatement.setString(5, time);
            preparedStatement.setString(6, sessionID);
            preparedStatement.executeUpdate();
            preparedStatement.close();
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static List<Point> getAllPoints(Integer rValue, String sessionID) {
        try {
            Connection connection = getConnection();
            String sql = "SELECT * FROM points WHERE r = ? AND session_id = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, rValue);
            preparedStatement.setString(2, sessionID);
            ResultSet resultSet = preparedStatement.executeQuery();
            List<Point> points = new ArrayList<>();
            while (resultSet.next()) {
                Point point = new Point();
                point.setX(resultSet.getDouble("x"));
                point.setY(resultSet.getDouble("y"));
                point.setR(resultSet.getInt("r"));
                point.setResult(resultSet.getBoolean("result"));
                point.setTime(resultSet.getString("time"));
                points.add(point);
            }
            preparedStatement.close();
            connection.close();
            return points;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}