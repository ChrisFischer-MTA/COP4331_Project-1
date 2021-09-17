<?php
  $inData = getRequestInfo();                                                                                   
                                                                                                                
  $firstname = $inData["firstname"];                                                                            
  $lastname = $inData["lastname"];                                                                              
  $password = $inData["password"];
  $login = $inData["login"];#Why is there a login in register.php?
  $passwordHint = "";

  $conn = new mysqli("localhost", "TheTester", "WeLoveCOP4331", "SmallProject");
  if ($conn->connect_error)
  {
    returnWithError( $conn->connect_error );
  }
  else
  {
    $stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password,PasswordHint) VALUES(?,?,?,?,?)");
    if (!$stmt->bind_param("sssss", $firstname, $lastname,$login,$password,$passwordHint)) {
      returnWithError( "Server Error: unable to bind SQL param. " . $stmt->error);
      return;
    }
    if (!$stmt->execute()) { 
      returnWithError( "Server Error: unable to execute SQL command. " . $stmt->error);
      return;
    }
    $stmt->close();
    $conn->close();

    return returnWithNews(); 
  }

  function getRequestInfo()
  {
          return json_decode(file_get_contents('php://input'), true);
  }

  function sendResultInfoAsJson( $obj )
  {
          header('Content-type: application/json');
          echo $obj;
  }

  function returnWithError( $err )
  {
          $retValue = '{"error":"' . $err . '"}';
          sendResultInfoAsJson( $retValue );
  }

  function returnWithNews()
  {
          sendResultInfoAsJson('{"error":""}');
  }
?>
