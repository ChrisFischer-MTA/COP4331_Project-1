<?php

  $inputData = getRequestInfo();
  $id = $inputData["ID"];

  $conn = new mysqli("localhost", "TheTester", "WeLoveCOP4331", "SmallProject");

  if( $conn->connect_error )
  {
    failWithReason( $conn->connect_error );
  }
  else
  {
    $records = mysqli_query($conn, "SELECT * FROM Users");

    if($data = mysqli_fetch_array($records))
    {
      $del = mysqli_query($conn, "DELETE from Users Where id = '$id'");

      $conn->close();

      return returnwithInfo();
    }

		else
    {
      $conn->close();
      return failWithReason("Account not found!");
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

	function failWithReason( $err )
	{
		$retValue = '{""error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo()
	{
    $retValue = '{"Account deleted! Thank you for using our services!"}';
		sendResultInfoAsJson( $retValue );
	}
?>
