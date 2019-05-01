<?php
        header("Access-Control-Allow-Origin: *");
        $rest_json = file_get_contents("php://input");
        $_POST = json_decode($rest_json, true);

        //if (empty($_POST['amount']) && empty($_POST['date'])) die();

        if ($_POST)
            {
            // set response code - 200 OK
            http_response_code(200);

                    if ($_POST["dateStart"]) {
                        $dateStart = $_POST["dateStart"];
                    }
                    if ($_POST["dateEnd"]) {
                        $dateEnd = $_POST["dateEnd"];
                    }
                    if ($_POST["amountMin"]) {
                        $amountMin = $_POST["amountMin"];
                    }
                    if ($_POST["amountMax"]) {
                        $amountMax = $_POST["amountMax"];
                    }
                    if ($_POST["cat_id"]) {
                        $cat_id = $_POST["cat_id"];
                    }           
                
                    $servername = "208.117.38.17";
                    $username = "terimotj_root";
                    $password = "G00fo123!";
                    $dbname = "terimotj_BudgetApp";
                    $tbl = "Transactions";
                    $tbl2 = "Categories";

                    // Create connection to the database
                    $conn = new mysqli($servername, $username, $password, $dbname);

                    // Check connection
                    if ($conn->connect_error) {
                        die("Connection failed: " . $conn->connect_error);
                    } 
                    
                    // Select statement to bring back sorted transactions
                    $query = "SELECT amount, date, $tbl2.category" 
                        . " FROM $tbl, $tbl2"
                        . " WHERE $tbl.cat_id = $tbl2.cat_id";
                    
                    if ($_POST["dateStart"] && $_POST["dateEnd"]) {
                        $query += " AND date > $dateStart AND date < $dateEnd";
                    }
                    if ($_POST["amountMin"] && $_POST["amountMax"]) {
                        $query += " AND amount > $amountMin AND amoung < $amountMax";
                    }
                    if ($_POST["cat_id"]) {
                        $query += " AND $tbl.cat_id = $cat_id";
                    }
                    $query += ";";
                        
                    $success = $conn->query($query);   
                    $resultArray = []; 
                    if ($success->num_rows > 0) {
                        while($row = $success->fetch_array()) {
                            array_push($resultArray, ["amount" => $row["amount"], "date" => $row["date"], "category" => $row["category"]]);
                        }

                        echo json_encode([ "results" => $resultArray ]); 
                
                    } else {
                        echo json_encode([ "results" => [] ]);
                    }
                }
        ?>
