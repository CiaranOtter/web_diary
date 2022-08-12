<?php
    include("init.php");

    $name = $_REQUEST['name'];
    $due_date = $_REQUEST["due_date"];

    echo $name. "\n";
    echo $due_date;

    $query = "INSERT INTO checklist_items (name, created_date, complete, due_date) VALUES ('$name', CURDATE(), FALSE, STR_TO_DATE('$due_date', '%Y/%m/%d'))";

    if ($result = $conn->query($query)) {
        echo "success";
    } else {
        echo "failure";
    }
?>