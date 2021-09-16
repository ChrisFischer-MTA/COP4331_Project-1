<?php

  $inputData = getRequestInfo();

  $username = "";

  $conn = new mysqli("localhost", "TheTester", "WeLoveCOP4331", "SmallProject");

  if( $conn->connect_error )
  {
    failWithReason( $conn->connect_error );
  }
  else
  {
    $stmt = $conn->prepare("SELECT passwordHint FROM Users where login =?");
    $stmt->bind_param("s", $inData["passwordhint"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if($row = $result->fetch_assoc())
		{
			returnWithInfo( $row['passwordhint']);
		}
		else
		{
			return FailwithReason("User name not found");
		}

		$stmt->close();
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

	function failWithReason( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>
