<?php
    header("Access-Control-Allow-Origin: *");

                
                    $servername = "208.117.38.17";
                    $username = "terimotj_root";
                    $password = "G00fo123!";
                    $dbname = "terimotj_BudgetApp";
                    $tbl = "Categories";

                    // $servername = "localhost";
                    // $username = "divvy_app";
                    // $password = "2345";
                    // $dbname = "divvy_app";
                    // $tbl = "Categories";

                    // Create connection to the database
                    $conn = new mysqli($servername, $username, $password, $dbname);

                    // Check connection
                    if ($conn->connect_error) {
                        die("Connection failed: " . $conn->connect_error);
                    } 

                    // Loading records                    
                    $query = "SELECT cat_id, category FROM $tbl;";
                    $success = $conn->query($query);   
                    $resultArray = [];         
                    if ($success->num_rows > 0) {
                
                        while($row = $success->fetch_array()) {
                            array_push($resultArray, ["value" => $row["cat_id"], "label" => $row["category"]]); //TODO: remove when done troubleshooting
                        }

                        echo json_encode([ "categories" => $resultArray ]); 
                
                    } else {
                        echo json_encode([ "categories" => [] ]);
                    }
        ?>
