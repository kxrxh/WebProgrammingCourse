package com.github.kxrxh.web.lab2;

import java.io.IOException;

import com.github.kxrxh.web.lab2.beans.Coordinates;
import com.github.kxrxh.web.lab2.beans.Storage;
import com.github.kxrxh.web.lab2.beans.TableRow;
import com.github.kxrxh.web.lab2.dto.AreaCheckRequest;
import com.github.kxrxh.web.lab2.utils.HttpActions;
import com.google.gson.Gson;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "AreaCheckServlet", value = "/area_check")
public class AreaCheckServlet extends HttpServlet {

    /**
     * This method is called when a GET request is received. It handles the request
     * by checking the validity
     * of the coordinates and the current time provided in the request body. If the
     * coordinates or the current
     * time is invalid, a bad request response is sent back. If the coordinates and
     * the current time are valid,
     * a new table row is created with the coordinates, current time, and the result
     * of the isHit() method. The
     * new table row is then added to the storage. Finally, a JSON response
     * containing the new table row is
     * sent back to the client.
     *
     * @param req  the HttpServletRequest object representing the incoming request
     * @param resp the HttpServletResponse object representing the outgoing response
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        AreaCheckRequest body = (AreaCheckRequest) req.getAttribute("ac_request");
        if (body.getCoordinates() == null) {
            HttpActions.badRequest(this, req, resp, "Invalid coordinates.");
            return;
        }

        if (body.getCurrentTime() == null) {
            HttpActions.badRequest(this, req, resp, "Invalid current time.");
            return;
        }
        Coordinates coordinates = body.getCoordinates();

        long startTime = Long.parseLong(body.getCurrentTime());
        double executionTime = (System.currentTimeMillis() - startTime) / 1000000.;

        Storage storage = (Storage) getServletContext().getAttribute("storage");
        if (storage == null)
            storage = new Storage();

        TableRow row = new TableRow(coordinates, body.getCurrentTime(), executionTime, isHit(coordinates));
        storage.addTableRow(row);
        
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        try {
            resp.getWriter().write(new Gson().toJson(row));
        } catch (IOException e) {
            // Hope this won't happen
            e.printStackTrace();
        }
    }

    /**
     * Determines whether the given coordinates are a hit in any of the quadrants.
     *
     * @param coords the coordinates to check
     * @return true if the coordinates are a hit, false otherwise
     */
    private boolean isHit(Coordinates coords) {
        return hitFirstQuadrant(coords) || hitSecondQuadrant(coords) || hitFourthQuadrant(coords);
    }

    /**
     * Determines if the given coordinates fall within the first quadrant.
     *
     * @param coordinates the coordinates to check
     * @return true if the coordinates fall within the first quadrant, false
     *         otherwise
     */
    private boolean hitFirstQuadrant(Coordinates coordinates) {
        boolean isFirstQuarter = coordinates.getX() >= 0 && coordinates.getY() >= 0;
        return isFirstQuarter && (coordinates.getX() * coordinates.getX()
                + coordinates.getY() * coordinates.getY() <= coordinates.getR() * coordinates.getR() / 4);
    }

    /**
     * Determines whether the given coordinates fall within the second quadrant of a
     * Cartesian plane.
     *
     * @param coordinates the coordinates to be checked
     * @return true if the coordinates are in the second quadrant, false otherwise
     */
    private boolean hitSecondQuadrant(Coordinates coordinates) {
        var x = coordinates.getX();
        var y = coordinates.getY();
        var R = coordinates.getR();
        boolean isSecondQuadrant = x >= 0 && y <= 0;
        return isSecondQuadrant && x <= R && y >= -R / 2 && (-x + R >= 0) && (2 * x + y >= 0) && (-2 * x - y >= 0);
    }

    /**
     * Determines if the given coordinates are in the fourth quadrant.
     *
     * @param coordinates the coordinates to check
     * @return true if the coordinates are in the fourth quadrant, false otherwise
     */
    private boolean hitFourthQuadrant(Coordinates coordinates) {
        boolean isFourthQuadrant = coordinates.getX() <= 0 && coordinates.getY() >= 0;
        return isFourthQuadrant && coordinates.getX() <= -coordinates.getR()
                && coordinates.getY() <= (coordinates.getR() / 2);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        resp.setContentType("text/html");
        HttpActions.error(this, req, resp, HttpServletResponse.SC_NOT_FOUND, "<h1>Not found!</h1>");
    }
}
