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
                    echo "Connected successfully<br>";

                    // Create a record
                    
                    // TODO: Altered SQL query to pull back new record id
                    //   Return this to the user
                    $query = "INSERT INTO $tbl (`category`) VALUES"
                        . "('" . $category ."'); SELECT MAX(cat_id) FROM $tbl;";        // TODO: It's giving a syntax error. Maybe because of chaining commands?   
                    $return = mysqli_query($conn, $query) or die (mysqli_error($conn));     // Maybe the wrong max id syntax?
                    $row= mysqli_fetch_array($return);
                    
                    // TODO: return json value of new id - see loadCategories.php model
                    echo "<h2>" . $category . " was added successfully.</h2><br>";
                    
                    echo json_encode(array(
                        "sent" => true,
                        "msg" => $category
                    )); 
            } else {

            // tell the user about error
            echo json_encode(["sent" => false, "message" => "Something went wrong"]);
            }
        ?>
