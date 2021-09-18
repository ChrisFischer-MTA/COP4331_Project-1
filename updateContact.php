<?php
	$inData = getRequestInfo();

	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$DOB = $inData["DOB"];
	$Street1 = $inData["Street1"];
	$Street2 = $inData["Street2"];
	$City = $inData["City"];
	$State = $inData["State"];
	$ZipCode = $inData["ZipCode"];
	$Relationship = $inData["Relationship"];
	$PhoneNumber = $inData["PhoneNumber"];
	$Notes = $inData["Notes"];
	$ID = $inData["ID"];



	$conn = new mysqli("localhost", "TheTester", "WeLoveCOP4331", "SmallProject");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("UPDATE Contact SET FirstName = ?,LastName = ?,DOB = ?,Street1 = ?,Street2 = ?,City =? ,State = ?,ZipCode = ?,Relationship = ?,PhoneNumber = ?,Notes = ? WHERE ID = ?");
		$stmt->bind_param("ssissssisssi", $FirstName, $LastName,$DOB,$Street1,$Street2,$City,$State,$ZipCode,$Relationship,$PhoneNumber,$Notes,$ID);
    if (!$result= $stmt->execute()) {
      returnWithError("Server error: " . $stmt->error);
      return;
    }
    else {
      returnWithConfirm("Success");
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

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithConfirm($err)
	{
		$retValue = '{"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>
