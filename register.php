<?php
	$inData = getRequestInfo();

	$firstname = $inData["firstname"];
	$lastname = $inData["lastname"];
  $password = $inData["password"];
  $login = $inData["login"];#Why is there a login in register.php?

	$conn = new mysqli("localhost", "TheTester", "WeLoveCOP4331", "SmallProject");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT into Users ('FirstName','LastName','Login','Password') VALUES(?,?,?,?)");
		$stmt->bind_param("ssss", $firstname, $lastname,$login,$password);
		$stmt->execute();
		$stmt->close();
		$conn->close();



		if(!$insert)
		{
			return returnWithError("This Account cannot be made at this time");
		}
		else
		{
			return returnWithNews();
		}
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
		sendResultInfoAsJson("Account created");
	}
?>
