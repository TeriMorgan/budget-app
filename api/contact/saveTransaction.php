<?php
        header("Access-Control-Allow-Origin: *");
        $rest_json = file_get_contents("php://input");
        $_POST = json_decode($rest_json, true);

        if (empty($_POST['amount']) && empty($_POST['date'])) die();

        if ($_POST)
            {
            // set response code - 200 OK
            http_response_code(200);
                    $amount = $_POST["amount"];
                    $date = $_POST["date"];
                    if ($_POST["cat_id"]) {
                        $cat_id = $_POST["cat_id"];
                    }           
                
                    $servername = "208.117.38.17";
                    $username = "terimotj_root";
                    $password = "G00fo123!";
                    $dbname = "terimotj_BudgetApp";
                    $tbl = "Transactions";

                    // Create connection to the database
                    $conn = new mysqli($servername, $username, $password, $dbname);

                    // Check connection
                    if ($conn->connect_error) {
                        die("Connection failed: " . $conn->connect_error);
                    } 
                    

                    // Create a transaction record in database  
                    if ($_POST["cat_id"]) {
                        $query = "INSERT INTO $tbl (`amount`, `date`,`cat_id`) VALUES"
                        . "(" . $amount .", '". $date ."', " . $cat_id . ");";
                    } else {
                        $query = "INSERT INTO $tbl (`amount`, `date`) VALUES"
                        . "(" . $amount .", '". $date ."');";
                    }             
                    $return = mysqli_query($conn, $query) or die (mysqli_error($conn));
                    $row= mysqli_fetch_array($return);
                    
            } else {

                // tell the user about error
                echo json_encode(["sent" => false, "message" => "Something went wrong"]);
            }
        ?>
