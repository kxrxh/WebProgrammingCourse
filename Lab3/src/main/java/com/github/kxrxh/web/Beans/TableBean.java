package com.github.kxrxh.web.Beans;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.primefaces.PrimeFaces;

import com.github.kxrxh.web.DBManager;
import com.github.kxrxh.web.types.Point;
import com.github.kxrxh.web.validators.Validator;
import com.google.gson.Gson;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.inject.Named;

@Named
@SessionScoped
public class TableBean implements Serializable {
    @Inject
    private InputBean inputBean;

    private List<Point> points;

    @PostConstruct
    public void init() {
        updatePoints(inputBean.getValueOfR());
    }

    public void handleRadioChange() {
        updatePoints(inputBean.getValueOfR());
    }

    public List<Point> getPoints() {
        updatePoints(inputBean.getValueOfR());
        return points;
    }

    public void executeAddPoint() {
        Double x = Double
                .parseDouble(FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get("x"));
        Double y = Double
                .parseDouble(FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get("y"));
        addPoint(x, y);
    }

    public void getPointDataExecute() {
        Integer r = Integer
                .parseInt(FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get("r"));
        PrimeFaces.current().ajax().addCallbackParam("dots", new Gson().toJson(DBManager.getAllPoints(r)));
    }

    public void addPoint(Double x, Double y) {
        DBManager.insertPoint(x, y, inputBean.getValueOfR(), Validator.isHit(x, y, inputBean.getValueOfR()),
                new Date().toString());
        updatePoints(inputBean.getValueOfR());
    }

    private void updatePoints(Integer rValue) {
        points = DBManager.getAllPoints(rValue);
    }
}
