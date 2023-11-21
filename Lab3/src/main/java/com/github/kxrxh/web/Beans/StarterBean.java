package com.github.kxrxh.web.Beans;

import java.io.Serializable;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import jakarta.ws.rs.Path;

@Named
@ApplicationScoped
@Path("/time")
public class StarterBean implements Serializable {

    public String redirectToIndex() {
        return "index.xhtml?faces-redirect=true";
    }
}