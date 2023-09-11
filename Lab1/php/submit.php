<?php

$inputX = isset($_GET['x']) ? floatval($_GET['x']) : null;
$inputY = isset($_GET['y']) ? floatval($_GET['y']) : null;
$inputR = isset($_GET['r']) ? intval($_GET['r']) : null;

date_default_timezone_set('Europe/Moscow');

$current_time = date("H:i:s");

if (!isValidInput($inputX, $inputY, $inputR)) {
    http_response_code(412);
    echo json_encode("{\"time\": $current_time, result\": \"invalid input\"}");
    return;
}

function isInsideShape(float $x, float $y, int $r): bool
{
    return ($x <= 0 && $y <= 0 && $y * 2 >= $x - $r) ||
        ($x <= 0 && $x <= -($r / 2) && $y <= 0 && $y >= -$r) ||
        ($x >= 0 && $y >= 0 && (pow($x, 2) + pow($y, 2) <= pow($r, 2)));
}

function isValidInput($x, $y, $r): bool
{
    return in_array($x, [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2])
        and (is_numeric($y) and $y >= -3 and $y <= 3)
        and in_array($r, [1, 2, 3, 4, 5]);
}

echo json_encode(["time" => $current_time, "result" => isInsideShape($inputX, $inputY, $inputR) ? "hit" : "miss"]);