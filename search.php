<?php
  mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
  $inputData = getRequestInfo();
  $substring = $inputData["sub"];

  $conn = new mysqli("localhost", "TheTester", "WeLoveCOP4331", "SmallProject");

  if( $conn->connect_error )
  {
    failWithReason( $conn->connect_error );
  }
  else
  {
    $result = mysqli_query($conn, "SELECT FirstName, LastName, ID FROM Contact WHERE FirstName LIKE '%$substring%' OR LastName LIKE '%$substring%'");
    $found = False;


    while($row = $result->fetch_array())
    {
      returnWithInfo( $row['FirstName'], $row['LastName'], $row['ID']);
      $found = True;
    }

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

	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '"},';
		sendResultInfoAsJson( $retValue );
	}
?>
