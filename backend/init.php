<?php
    $host = "sql30.cpt3.host-h.net";
    $user = "tectobhjww_22";
    $pass = "f4J1N69PCU59zRaASFB8";
    $DB = "sudocode";

    $conn = new mysqli($host, $user, $pass, $DB);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>