package com.github.kxrxh.web.lab2.interfaces;

import java.io.Serializable;

import com.google.gson.Gson;

public interface JsonSerializable extends Serializable {
    /**
     * Converts the object to a JSON string using the Gson library.
     *
     * @return the JSON string representation of the object.
     */
    default String toJsonString() {
        return new Gson().toJson(this);
    }
}
