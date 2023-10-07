package com.github.kxrxh.web.lab2;

import java.io.IOException;
import java.util.Optional;

import com.github.kxrxh.web.lab2.beans.Coordinates;
import com.github.kxrxh.web.lab2.beans.Storage;
import com.github.kxrxh.web.lab2.dto.AreaCheckRequest;
import com.github.kxrxh.web.lab2.utils.HttpActions;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "ControllerServlet", value = "/controller")
public class ControllerServlet extends HttpServlet {
    /**
     * This function handles the POST request and performs different actions based on
     * the "action" parameter.
     *
     * @param req  the HttpServletRequest object containing the request information
     * @param resp the HttpServletResponse object used to send the response
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        switch (req.getParameter("action")) {
            case "insert" -> insertAction(req, resp);
            case "clean" -> cleanAction(req, resp);
            default -> HttpActions.badRequest(this, req, resp, "Invalid action.");
        }
    }

    /**
     * Inserts the given coordinates and current time into the request attributes
     * and redirects to the area check.
     *
     * @param req  the HttpServletRequest object
     * @param resp the HttpServletResponse object
     */
    private void insertAction(HttpServletRequest req, HttpServletResponse resp) {
        // Parse the coordinates
        Optional<Coordinates> coordinates = Coordinates.parse(req.getParameter("x"), req.getParameter("y"),
                req.getParameter("r"));
        if (coordinates.isEmpty()) {
            HttpActions.badRequest(this, req, resp, "Invalid coordinates.");
            return;
        }
        // Parse the current time
        String currentTime = req.getParameter("currentTime");
        if (currentTime == null) {
            HttpActions.badRequest(this, req, resp, "Invalid current time.");
            return;
        }
        // Redirect to the area check
        req.setAttribute("ac_request", new AreaCheckRequest(coordinates.get(), currentTime));
        try {
            getServletContext().getRequestDispatcher("/areaCheck").forward(req, resp);
        } catch (ServletException | IOException never) {
            // Hope this won't happen
            never.printStackTrace();
        }
    }

    private void cleanAction(HttpServletRequest req, HttpServletResponse resp) {
        getServletContext().setAttribute("storage", new Storage());
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        resp.setContentType("text/html");
        HttpActions.error(this, req, resp, HttpServletResponse.SC_NOT_FOUND, "<h1>Not found!</h1>");
    }
}