<?php
    header("Access-Control-Allow-Origin: *");
    //$rest_json = file_get_contents("php://input");
    //$_POST = json_decode($rest_json, true);

    //if (empty($_POST['userInput'])) die();

    //if ($_POST)
        //{
        // set response code - 200 OK
        http_response_code(200);
                    //$category = $_POST["userInput"];
                
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
                            array_push($resultArray, ["id" => $row["cat_id"], "name" => $row["category"]]);
                        }

                        echo json_encode([ "categories" => $resultArray ]); 
                
                    } else {
                        echo json_encode([ "categories" => [] ]);
                    }
        ?>
