<?php
    include("init.php");

    $query = "select * from checklist_items;";

    $result =  $conn->query($query);
    $output = array();
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $output[] = $row;
        }
    } else {
        echo "0 results";
    }

    echo json_encode($output);
    $conn->close();
?>