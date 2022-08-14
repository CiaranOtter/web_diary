<?php
    include("init.php");

    $checked = $_REQUEST["checked"];
    $id = $_REQUEST["id"];

    $query = "UPDATE checklist_items SET complete = $checked WHERE id = $id";

    if ($result = $conn->query($query)) {
        echo "success";
    } else {
        echo "failure";
    }
?>