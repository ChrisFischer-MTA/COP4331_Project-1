<?php
	$inData = getRequestInfo();

	$FirstName = $inData['FirstName'];
	$LastName = $inData['LastName'];
	$DOB = 0;
	$Street1 = "";
	$Street2 = "";
	$City = "";
	$State = "";
	$ZipCode = 0;
	$Relationship = "";
	$PhoneNumber = "";
	$Notes = "";
	
	$conn = new mysqli("localhost", "TheTester", "WeLoveCOP4331", "SmallProject");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$records = mysqli_query($conn, "SELECT * FROM Contact WHERE FirstName = '$FirstName' AND LastName = '$LastName'");
    $row = mysqli_fetch_assoc($records);

    if($row)
		{
			return returnWithError("Contact already exists");
		}

		$stmt = $conn->prepare("INSERT into Contact (FirstName,LastName,DOB,Street1,Street2,City,State,ZipCode,Relationship,PhoneNumber,Notes) VALUES(?,?,?,?,?,?,?,?,?,?,?)");
		$stmt->bind_param("ssissssisss", $FirstName, $LastName,
																		$inData['DOB'],$inData['Street1'],$inData['Street2'],
																		$inData['City'],$inData['State'],$inData['ZipCode'],
																		$inData['Relationship'],$inData['PhoneNumber'],$inData['Notes']);
		$stmt->execute();

		$records = mysqli_query($conn, "SELECT * FROM Contact WHERE FirstName = '$FirstName' AND LastName = '$LastName'");
    $row = mysqli_fetch_assoc($records);

    if($row)
		{
			returnWithID($row['ID']);
		}

		else
		{
			returnWithError("Failure");
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

	function returnWithError( $err)
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue);
	}

	function returnWithID( $in)
	{
		sendResultInfoAsJson($in);
	}

?>
