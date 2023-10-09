package com.github.kxrxh.web.lab2.beans;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import com.github.kxrxh.web.lab2.interfaces.JsonSerializable;
import com.google.gson.Gson;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class Storage implements JsonSerializable {
    private List<TableRow> table = Collections.synchronizedList(new ArrayList<>());

    public List<TableRow> getTable() {
        return table;
    }

    /**
     * Retrieves the TableRow at the specified index if it exists.
     *
     * @param index the index of the TableRow to retrieve
     * @return an Optional containing the TableRow at the specified index,
     *         or an empty Optional if the index is out of range
     */
    public Optional<TableRow> getTableRow(int index) {
        if (index < 0 || index >= table.size()) {
            return Optional.empty();
        }
        return Optional.of(table.get(index));
    }

    /**
     * Adds a new table row to the existing table.
     *
     * @param row the table row to be added
     */
    public void addTableRow(TableRow row) {
        table.add(row);
    }

    @Override
    public String toJsonString() {
        ArrayList<String> rows = new ArrayList<>();
        for (TableRow row : table) {
            rows.add(row.toJsonString());
        }
        return new Gson().toJson(rows);
    }

    /**
     * Generates an HTML table representation of the data in the table.
     *
     * @return a string containing the HTML representation of the table
     */
    public String toHtmlTable() {
        StringBuilder sb = new StringBuilder();
        for (TableRow row : table) {
            sb.append(row.toHtmlTable());
        }
        return sb.toString();
    }

    public void clean() {
        table.clear();
    }
}
