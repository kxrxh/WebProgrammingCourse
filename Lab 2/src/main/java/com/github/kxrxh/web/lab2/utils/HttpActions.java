package com.github.kxrxh.web.lab2.utils;

import java.io.IOException;

import com.github.kxrxh.web.lab2.dto.HttpResponse;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class HttpActions {
    /**
     * A method for handling bad requests.
     *
     * @param servlet the HTTP servlet object
     * @param req     the HTTP servlet request object
     * @param resp    the HTTP servlet response object
     * @param message the error message to be sent along with the response
     */
    public static void badRequest(HttpServlet servlet, HttpServletRequest req, HttpServletResponse resp,
            String message) {
        resp.setContentType("application/json");
        error(servlet, req, resp, HttpServletResponse.SC_BAD_REQUEST, message);
    }

    /**
     * A method that handles and displays an error message in the web application.
     *
     * @param servlet    the HttpServlet object representing the servlet handling
     *                   the request
     * @param req        the HttpServletRequest object representing the client's
     *                   request
     * @param resp       the HttpServletResponse object representing the server's
     *                   response
     * @param statusCode an integer representing the status code of the error
     * @param message    a string representing the error message to be displayed
     */
    public static void error(HttpServlet servlet, HttpServletRequest req, HttpServletResponse resp, int statusCode,
            String message) {
        req.setAttribute("ERROR", new HttpResponse(statusCode, message));
        try {
            servlet.getServletContext().getRequestDispatcher("/error").forward(req, resp);
        } catch (ServletException | IOException never) {
            // Hope this won't happen
            never.printStackTrace();
        }
    }
}
