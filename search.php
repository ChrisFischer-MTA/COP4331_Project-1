<?php
  mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
  $inputData = getRequestInfo();
  $substring = $inputData["sub"];
  $namesArray = [];

  $conn = new mysqli("localhost", "TheTester", "WeLoveCOP4331", "SmallProject");

  if( $conn->connect_error )
  {
    failWithReason( $conn->connect_error );
  }
  else
  {
    $result = mysqli_query($conn, "SELECT FirstName, LastName, ID FROM Contact WHERE FirstName LIKE '%$substring%' OR LastName LIKE '%$substring%'");
    $found = False;

    # Declare three arrays.
    $arrayVwV = array();
    $arrayVwV['FirstName'] = array();
    $arrayVwV['LastName'] = array();
    $arrayVwV['ID'] = array();

    # Current number of members of the array.
    $currNum = 0;

    while($row = $result->fetch_array())
    {
      $currNum = array_push($arrayVwV['FirstName'], $row['FirstName']);
      array_push($arrayVwV['LastName'], $row['LastName']);
      array_push($arrayVwV['ID'], $row['ID']);
      $found = True;

    }
    $arrayVwV['OhSoMuchID'] = $currNum;

    returnWithInfo($arrayVwV);

    if(!$found)
    {
             return FailwithReason("User name not found");
    }


        $conn->close();
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

    function returnWithInfo($arrayVwV)
    {
        $retValue = json_encode($arrayVwV);
        sendResultInfoAsJson( $retValue );
    }
?>
