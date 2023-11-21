package com.github.kxrxh.web.Beans;

import java.io.Serializable;
import java.util.Date;

import org.primefaces.PrimeFaces;

import com.github.kxrxh.web.DBManager;
import com.github.kxrxh.web.validators.Validator;

import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.ExternalContext;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;
import jakarta.servlet.http.HttpSession;

@Named
@SessionScoped
public class InputBean implements Serializable {
    // Properties for X, Y, and R values
    private Double valueOfX = 0.0;
    private Double valueOfY;
    private Integer valueOfR;

    public InputBean() {
        valueOfR = 1;
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

    private String getSessionID() {
        // Get the current FacesContext
        FacesContext facesContext = FacesContext.getCurrentInstance();

        // Get the ExternalContext
        ExternalContext externalContext = facesContext.getExternalContext();

        // Get the HttpSession
        HttpSession session = (HttpSession) externalContext.getSession(false);

        // Get the session ID
        return session.getId();
    }

    // Method for the "Submit" button action
    public void send() {
        Boolean result = Validator.validateInput(valueOfX, valueOfY, valueOfR);
        if (!result) {
            if (valueOfX < -5.0 || valueOfX > 5.0) {
                FacesContext.getCurrentInstance().addMessage("formId:xInput",
                        new FacesMessage(FacesMessage.SEVERITY_ERROR, "X Value must be between -5 and 5", null));
            }

            // Add a validation message for Y value if needed
            if (valueOfY < -5.0 || valueOfY > 5.0) {
                FacesContext.getCurrentInstance().addMessage("formId:yInput",
                        new FacesMessage(FacesMessage.SEVERITY_ERROR, "Y Value must be between -5 and 5", null));
            }
            System.err.println("Invalid input");
            System.err.println(valueOfX + " " + valueOfY + " " + valueOfR);
            return;
        }
        DBManager.insertPoint(valueOfX, valueOfY, valueOfR, Validator.isHit(valueOfX, valueOfY, valueOfR),
                new Date().toString(), getSessionID());
    }

    public void getCurrentRExecute() {
        PrimeFaces.current().ajax().addCallbackParam("r", getValueOfR());
    }

    // Method for the "Clear" button action
    public void clear() {
        DBManager.clearTable(valueOfR, getSessionID());
    }
}
