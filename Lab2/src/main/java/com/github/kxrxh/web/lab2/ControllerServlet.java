package com.github.kxrxh.web.lab2;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Optional;
import java.util.stream.Collectors;

import com.github.kxrxh.web.lab2.beans.Coordinates;
import com.github.kxrxh.web.lab2.beans.Storage;
import com.github.kxrxh.web.lab2.dto.AreaCheckRequest;
import com.github.kxrxh.web.lab2.dto.ControllerRequest;
import com.github.kxrxh.web.lab2.utils.HttpActions;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "ControllerServlet", value = "/controller")
public class ControllerServlet extends HttpServlet {
    /**
     * This function handles the POST request and performs different actions based
     * on
     * the "action" parameter.
     *
     * @param req  the HttpServletRequest object containing the request information
     * @param resp the HttpServletResponse object used to send the response
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        ControllerRequest body;
        try {
            body = ControllerRequest.parse(getBody(req));
        } catch (Exception e) {
            HttpActions.badRequest(this, req, resp, "Invalid request body.");
            return;
        }
        System.out.println(body);
        switch (body.getAction()) {
            case "insert" -> insertAction(req, resp, body);
            case "clean" -> cleanAction(req, resp);
            default -> HttpActions.badRequest(this, req, resp, "Invalid parameter \"action\".");
        }
    }

    /**
     * Inserts the given coordinates and current time into the request attributes
     * and redirects to the area check.
     *
     * @param req  the HttpServletRequest object
     * @param resp the HttpServletResponse object
     */
    private void insertAction(HttpServletRequest req, HttpServletResponse resp, ControllerRequest body) {
        // Parse the coordinates
        Optional<Coordinates> coordinates = Coordinates.parse(body.getX(), body.getY(), body.getR());
        if (coordinates.isEmpty()) {
            HttpActions.badRequest(this, req, resp, "Some of the coordinates parameters are invalid.");
            return;
        }
        // Parse the current time
        if (body.getCurrentTime() == null) {
            HttpActions.badRequest(this, req, resp, "Invalid parameter \"current_time\".");
            return;
        }
        // Redirect to the area check
        req.setAttribute("ac_request", new AreaCheckRequest(coordinates.get(), body.getCurrentTime()));
        try {
            getServletContext().getRequestDispatcher("/area_check").forward(req, resp);
        } catch (ServletException | IOException never) {
            // Hope this won't happen
            never.printStackTrace();
        }
    }

    /**
     * This function cleans the action by setting the "storage" attribute in the
     * servlet context to a new instance of the Storage class.
     *
     * @param req  the HttpServletRequest object
     * @param resp the HttpServletResponse object
     */
    private void cleanAction(HttpServletRequest req, HttpServletResponse resp) {
        getServletContext().setAttribute("storage", new Storage());
    }

    /**
     * Retrieves the body of the HTTP request.
     *
     * @param req the HttpServletRequest object representing the incoming request
     * @return a string containing the body of the request
     * @throws IOException if an I/O error occurs while reading the request body
     */
    private String getBody(HttpServletRequest req) throws IOException {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(req.getInputStream()))) {
            return reader.lines().collect(Collectors.joining());
        }
    }
}