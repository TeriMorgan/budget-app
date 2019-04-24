<?php
        header('Access-Control-Allow-Origin: *');
        
        $rest_json = file_get_contents("php://input");
        $_POST = json_decode($rest_json, true);

        if (empty($_POST['userInput'])) die();

        if ($_POST)
            {
            // set response code - 200 OK
            http_response_code(200);
                    $category = $_POST["userInput"];
                
                    $servername = "208.117.38.17";
                    $username = "terimotj_root";
                    $password = "G00fo123!";
                    $dbname = "terimotj_BudgetApp";
                    $tbl = "Categories";

                    // Create connection to the database
                    $conn = new mysqli($servername, $username, $password, $dbname);

                    // Check connection
                    if ($conn->connect_error) {
                        die("Connection failed: " . $conn->connect_error);
                    } 

                    // Create a record
                    
                    // TODO: Altered SQL query to pull back new record id
                    //   Return this to the user
                    $query = "INSERT INTO $tbl (`category`) VALUES"
                        . "('" . $category ."');";          
                    $return = mysqli_query($conn, $query) or die (mysqli_error($conn));     
                    $row= mysqli_fetch_array($return);

                    // TODO: return json value of new id - see loadCategories.php model          
                    $query = "SELECT MAX(cat_id) as newId FROM $tbl;";
                    $success = $conn->query($query);   
                    if ($success->num_rows > 0) {
                        while($row = $success->fetch_array()) {
                            echo json_encode([ "id" => $row[newId] ]);
                        }
                    } else {
                        echo json_encode([ "newId" => "" ]);
                    }
            } else {

            // tell the user about error
            echo json_encode(["sent" => false, "message" => "Something went wrong"]);
            }
        ?>
