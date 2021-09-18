<?php
	$inData = getRequestInfo();

	$Login= $inData["Login"];
  $Password = $inData["Password"];
  $ID = $inData["ID"];
	$passH = $inData["PasswordHint"];

	$conn = new mysqli("localhost", "TheTester", "WeLoveCOP4331", "SmallProject");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("UPDATE Users SET Login= ?, Password = ?, PasswordHint = ? WHERE ID = ?");
		$stmt->bind_param("sssi", $Login, $Password, $passH, $ID);
		$result= $stmt->execute();

		if(!$result)
		{
			return returnWithError("Cannot locate this account. Please contact Support");
		}

		return returnWithConfirm("Success");

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

	function returnWithConfirm($err)
	{
		$retValue = '{"Status":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>
