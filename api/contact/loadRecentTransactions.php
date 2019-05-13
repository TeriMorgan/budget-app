<?php
    header("Access-Control-Allow-Origin: *");

                
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
                   
                    // Loading ten most recent transactions                    
                    $query = "SELECT $tbl.amount, $tbl.date, $tbl2.category" 
                        . " FROM $tbl"
                        . " LEFT JOIN $tbl2 on $tbl2.cat_id = $tbl.cat_id"
                        . " ORDER BY date DESC"
                        . " LIMIT 10;";

                    $success = $conn->query($query);   
                    $resultArray = [];         
                    if ($success->num_rows > 0) {
                        while($row = $success->fetch_array()) {
                            if($row["category"] === null) {
                                array_push($resultArray, ["amount" => $row["amount"], "date" => $row["date"], "category" => "Uncategorized"]);
                            } else {
                                array_push($resultArray, ["amount" => $row["amount"], "date" => $row["date"], "category" => $row["category"]]);
                            }
                        }

                        echo json_encode([ "initialResults" => $resultArray ]); 
                
                    } else {
                        echo json_encode([ "initialResults" => [] ]);
                    }
        ?>
