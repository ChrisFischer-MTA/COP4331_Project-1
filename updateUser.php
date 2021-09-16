<?php
	$inData = getRequestInfo();

	$Login= $inData["Login"];
  $Password = $inData["Password"];
  $ID = $inData["ID"];
	# User wouldn't even know their own ID. ID is a reference to Contact database anyway
	# User might want to change their address, phone number, password hint



	$conn = new mysqli("localhost", "TheTester", "WeLoveCOP4331", "SmallProject");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("UPDATE Users SET Login= ?, Password = ? WHERE ID = ?");
		$stmt->bind_param("ssi", $Login, $Password, $ID);
		$result= $stmt->execute();

	print 'Success! record updated';

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

?>
