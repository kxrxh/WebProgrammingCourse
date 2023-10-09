package com.github.kxrxh.web.lab2.beans;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

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
    private Long time;
    private double executionTime;
    private String hitStatus;

    public TableRow(Coordinates coords, Long time, boolean isHit) {
        this.x = coords.getX();
        this.y = coords.getY();
        this.r = coords.getR();
        this.time = time;
        this.executionTime = (System.currentTimeMillis() - time) / 1000000.;
        this.hitStatus = isHit ? "Hit" : "Miss";
    }

    public String toHtmlTable() {
        LocalDateTime dateTime = Instant.ofEpochMilli(time).atZone(ZoneId.systemDefault()).toLocalDateTime();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedTime = dateTime.format(formatter);
        String executionTimeString = String.format("%.6f", executionTime) + " ms ";

        StringBuilder htmlTableRow = new StringBuilder();
        htmlTableRow.append("<tr>")
                .append("<td>").append(x).append("</td>")
                .append("<td>").append(y).append("</td>")
                .append("<td>").append(r).append("</td>")
                .append("<td>").append(formattedTime).append("</td>")
                .append("<td>").append(executionTimeString).append("</td>")
                .append("<td>").append(hitStatus).append("</td>")
                .append("</tr>");

        return htmlTableRow.toString();
    }
}
