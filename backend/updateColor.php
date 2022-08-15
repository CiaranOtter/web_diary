<?php

    include("init.php");

    $color = $_REQUEST['color'];
    $id = $_REQUEST['id'];

    $query = "UPDATE checklist_items SET background_color = '$color' where id = $id";

    if ($result = $conn->query($query)){
        echo "success";
    } else {
        echo "failure";
    }
?>