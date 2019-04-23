<?php
        header("Access-Control-Allow-Origin: *");
        $rest_json = file_get_contents("php://input");
        $_POST = json_decode($rest_json, true);

        if (empty($_POST['fname']) && empty($_POST['lname'])) die();

        if ($_POST)
            {
            // set response code - 200 OK
            http_response_code(200);
                    $firstName = $_POST["fname"];
                    $lastName = $_POST["lname"];
                    $phoneNum = $_POST["phoneNum"];
                
                    $servername = "208.117.38.17";
                    $username = "terimotj_root";
                    $password = "G00fo123!";
                    $dbname = "terimotj_Friends";
                    $tbl = "friends";

                    // Create connection to the database
                    $conn = new mysqli($servername, $username, $password, $dbname);

                    // Check connection
                    if ($conn->connect_error) {
                        die("Connection failed: " . $conn->connect_error);
                    } 
                    echo "Connected successfully<br>";

                    //Create a record
                    $query = "INSERT INTO $tbl (`FirstName`, `LastName`, `PhoneNum`) VALUES"
                            . "('" . $firstName ."', '$lastName', '$phoneNum')";           
                    $return = mysqli_query($conn, $query) or die (mysqli_error($conn));
                    $row= mysqli_fetch_array($return);
                    echo "<h2>" . $firstName . " " . $lastName . " was added successfully.</h2><br>";  
                    
                    echo json_encode(array(
                        "sent" => true,
                        "msg" => $return
                    )); 
            } else {

            // tell the user about error
            echo json_encode(["sent" => false, "message" => "Something went wrong"]);
            }
        ?>
