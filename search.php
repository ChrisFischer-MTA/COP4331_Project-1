<?php
  mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
  $inputData = getRequestInfo();
  $substring = $inputData["sub"];
  $userID = $inputData["UserID"];

  $conn = new mysqli("localhost", "TheTester", "WeLoveCOP4331", "SmallProject");

  if( $conn->connect_error )
  {
    failWithReason( $conn->connect_error );
  }
  else
  {
    $result = mysqli_query($conn, "SELECT FirstName, LastName, ID FROM Contact
      WHERE (FirstName LIKE '%$substring%' AND UserID = $userID)
      OR (LastName LIKE '%$substring%' AND UserID = $userID)");
    $found = False;

    # Declare three arrays.
    $arrV = array();
    $arrV['FirstName'] = array();
    $arrV['LastName'] = array();
    $arrV['ID'] = array();

    # Current number of members of the array.
    $currNum = 0;

    while($row = $result->fetch_array())
    {
      $currNum = array_push($arrV['FirstName'], $row['FirstName']);
      array_push($arrV['LastName'], $row['LastName']);
      array_push($arrV['ID'], $row['ID']);
      $found = True;

    }
    $arrV['numIds'] = $currNum;
    $conn->close();

    if($found)
    {
      return returnWithInfo($arrV);
    }

    else
    {
      return FailwithReason("User name not found");
    }

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

    function FailWithReason( $err )
    {
        $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }

    function returnWithInfo($arrV)
    {
        $retValue = json_encode($arrV);
        sendResultInfoAsJson( $retValue );
    }
?>
