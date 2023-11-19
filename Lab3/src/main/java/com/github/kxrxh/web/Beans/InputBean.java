package com.github.kxrxh.web.Beans;

import java.io.Console;
import java.io.Serializable;
import java.util.Date;

import com.github.kxrxh.web.DBManager;
import com.github.kxrxh.web.validators.Validator;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

@Named
@SessionScoped
public class InputBean implements Serializable {

    private static final long serialVersionUID = 1L;

    // Properties for X, Y, and R values
    private Double valueOfX;
    private Double valueOfY;
    private Integer valueOfR;

    public InputBean() {
        valueOfX = 0.0;
        DBManager.init();
    }

    public Double getValueOfX() {
        return valueOfX;
    }

    public void setValueOfX(Double valueOfX) {
        this.valueOfX = valueOfX;
    }

    public Double getValueOfY() {
        return valueOfY;
    }

    public void setValueOfY(Double valueOfY) {
        this.valueOfY = valueOfY;
    }

    public Integer getValueOfR() {
        return valueOfR;
    }

    public void setValueOfR(Integer valueOfR) {
        this.valueOfR = valueOfR;
    }

    // Method for the "Submit" button action
    public void send() {
        Boolean result = Validator.validateInput(valueOfX, valueOfY, valueOfR);
        if (!result) {
            System.err.println("Invalid input");
            System.err.println(valueOfX + " " + valueOfY + " " + valueOfR);
            return;
        }
        DBManager.insertPoint(valueOfX, valueOfY, valueOfR, Validator.isHit(valueOfX, valueOfY, valueOfR),
                new Date().toString());
    }

    // Method for the "Clear" button action
    public void clear() {
        // Clear input values
        valueOfX = null;
        valueOfY = null;
        valueOfR = null;
        DBManager.clearTable();
    }
}
