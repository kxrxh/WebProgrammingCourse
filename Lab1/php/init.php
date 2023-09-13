<?php
$tableData = isset($_COOKIE['table_data']) ? json_decode($_COOKIE['table_data'], true) : [];

foreach ($tableData as $row) {
    echo '<tr>';
    echo '<td>' . $row['x'] . '</td>';
    echo '<td>' . $row['y'] . '</td>';
    echo '<td>' . $row['r'] . '</td>';
    echo '<td>' . $row['time'] . '</td>';
    echo '<td>' . $row['exec_time'] . '</td>';
    echo '<td class="' . $row['result'] . '">' . $row['result'] . '</td>';
    echo '</tr>';
}

echo '</table>';
?>