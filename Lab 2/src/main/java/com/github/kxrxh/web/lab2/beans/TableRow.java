package com.github.kxrxh.web.lab2.beans;

import com.github.kxrxh.web.lab2.interfaces.JsonSerializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class TableRow implements JsonSerializable {
    private float x;
    private double y;
    private float r;
    private String time;
    private double executionTime;
    private boolean isHit;

    public TableRow(Coordinates coords, String time, double executionTime, boolean isHit) {
        this.x = coords.getX();
        this.y = coords.getY();
        this.r = coords.getR();
        this.time = time;
        this.executionTime = executionTime;
        this.isHit = isHit;
    }

    /**
     * Converts the values of x, y, r, time, executionTime, and isHit into an HTML
     * table row.
     *
     * @return the HTML table row as a string
     */
    public String toHtmlTable() {
        return "<tr><td>" + x + "</td><td>" + y + "</td><td>" + r + "</td><td>" + time + "</td><td>" + executionTime
                + "</td><td>" + (isHit ? "Hit" : "Miss") + "</td></tr>";
    }
}
