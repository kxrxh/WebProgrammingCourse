<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <jsp:useBean id="storage" scope="application" class="com.github.kxrxh.web.lab2.beans.Storage" />
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Laboratory work #2</title>
        <link rel="stylesheet" type="text/css" href="./styles/input.css" />
        <link rel="stylesheet" type="text/css" href="./styles/app.css" />
        <link rel="icon" type="image/png" href="./assets/favicon.png" />
    </head>

    <body>
        <table>
            <tr>
                <header id="appbar">
                    <h2 id="app-name" onclick="playTheme()">Sponge work #2</h2>
                    <div>
                        <h2>Parkhomenko Kirill P3212</h2>
                        <h2>2242</h2>
                    </div>
                </header>
            </tr>
            <tr>
                <td>
                    <div class="app-body">
                        <h1 class="sub-title">Value X</h1>
                        <form class="form_group">
                            <div class="form_radio_group">
                                <div class="form_radio_group-item">
                                    <input type="radio" name="x" id="xr1" value="-2" />
                                    <label for="xr1" class="material-label">-2</label>
                                </div>
                                <div class="form_radio_group-item">
                                    <input type="radio" name="x" id="xr2" value="-1.5" />
                                    <label for="xr2" class="material-label">-1.5</label>
                                </div>
                                <div class="form_radio_group-item">
                                    <input type="radio" name="x" id="xr3" value="-1" />
                                    <label for="xr3" class="material-label">-1</label>
                                </div>
                                <div class="form_radio_group-item">
                                    <input type="radio" name="x" id="xr4" value="-0.5" />
                                    <label for="xr4" class="material-label">-0.5</label>
                                </div>
                                <div class="form_radio_group-item">
                                    <input type="radio" name="x" id="xr5" value="0" />
                                    <label for="xr5" class="material-label">0</label>
                                </div>
                                <div class="form_radio_group-item">
                                    <input type="radio" name="x" id="xr6" value="0.5" />
                                    <label for="xr6" class="material-label">0.5</label>
                                </div>
                                <div class="form_radio_group-item">
                                    <input type="radio" name="x" id="xr7" value="1" />
                                    <label for="xr7" class="material-label">1</label>
                                </div>
                                <div class="form_radio_group-item">
                                    <input type="radio" name="x" id="xr8" value="1.5" />
                                    <label for="xr8" class="material-label">1.5</label>
                                </div>
                                <div class="form_radio_group-item">
                                    <input type="radio" name="x" id="xr9" value="2" />
                                    <label for="xr9" class="material-label">2</label>
                                </div>
                            </div>
                            <h1 class="sub-title">Value Y</h1>
                            <div style="margin-bottom: 20px">
                                <input type="text" value="0" name="y" class="text-input" required min="-5" max="3"
                                    placeholder="-5...3" />
                            </div>
                            <h1 class="sub-title">Value R</h1>
                            <div class="form_radio_group" id="r-value-picker">
                                <div class="form_radio_group-item">
                                    <input type="radio" name="r" id="rr1" value="1" />
                                    <label for="rr1" class="material-label">1</label>
                                </div>
                                <div class="form_radio_group-item">
                                    <input type="radio" name="r" id="rr2" value="1.5" />
                                    <label for="rr2" class="material-label">1.5</label>
                                </div>
                                <div class="form_radio_group-item">
                                    <input type="radio" name="r" id="rr3" value="2" />
                                    <label for="rr3" class="material-label">2</label>
                                </div>
                                <div class="form_radio_group-item">
                                    <input type="radio" name="r" id="rr4" value="2.5" />
                                    <label for="rr4" class="material-label">2.5</label>
                                </div>
                                <div class="form_radio_group-item">
                                    <input type="radio" name="r" id="rr5" value="3" />
                                    <label for="rr5" class="material-label">3</label>
                                </div>
                            </div>
                            <div>
                                <button class="spongebob-button" type="submit">Krusty Krab time!</button>
                                <button id="clear-table-button" onclick="clearTable()" class="spongebob-button"
                                    style="margin: 30px" type="button">
                                    Yeet the Table!
                                </button>
                            </div>
                        </form>
                    </div>
                </td>
                <td class="td-left">
                    <canvas id="graph"></canvas>
                    <div class="result-table">
                        <table class="custom-table">
                            <thead>
                                <tr>
                                    <th class="td-left">X</th>
                                    <th>Y</th>
                                    <th>R</th>
                                    <th>Time</th>
                                    <th>Exec</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                <%=storage.toHtmlTable()%>
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </body>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="js/graph.js"></script>

    </html>