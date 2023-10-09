package com.github.kxrxh.web.lab2;

import java.io.IOException;

import com.github.kxrxh.web.lab2.dto.HttpResponse;
import com.google.gson.Gson;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "ErrorServlet", urlPatterns = "/error")
public class ErrorServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        doPost(req, resp);
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        HttpResponse httpResponse = (HttpResponse) req.getAttribute("ERROR");
        resp.setStatus(httpResponse.getStatusCode());
        try {
            resp.getWriter().write(new Gson().toJson(httpResponse));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
