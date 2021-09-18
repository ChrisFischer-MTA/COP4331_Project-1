<?php
  mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
  $inputData = getRequestInfo();

  $Login = "";

  $conn = new mysqli("localhost", "TheTester", "WeLoveCOP4331", "SmallProject");

  if( $conn->connect_error )
  {
    failWithReason( $conn->connect_error );
  }
  else
  {
    $stmt = $conn->prepare("SELECT PasswordHint FROM Users WHERE Login =?");
    $stmt->bind_param("s", $inputData["login"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if($row = $result->fetch_assoc())
		{
			return returnWithInfo( $row['PasswordHint']);
		}

		else
		{
			return FailwithReason("Username not found");
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
		$retValue = '{"error":' . $err . ',"error":""}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $PasswordHint )
	{
		$retValue = '{"Hint":"' . $PasswordHint . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>
