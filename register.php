<?php
	mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
  $inData = getRequestInfo();

  $firstname = $inData["firstname"];
  $lastname = $inData["lastname"];
  $password = $inData["password"];
  $login = $inData["login"];#Why is there a login in register.php?
  $passwordHint = "";

  $conn = new mysqli("localhost", "TheTester", "WeLoveCOP4331", "SmallProject");
  if ($conn->connect_error)
  {
    returnWithError( $conn->connect_error );
  }
  else
  {
    $records = mysqli_query($conn, "SELECT * FROM Users WHERE login = '$login'");
    $row = mysqli_fetch_assoc($records);

    if($row)
		{
			return returnWithError("Login already exists! Try Forgot Password");
		}
    $stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password,PasswordHint) VALUES(?,?,?,?,?)");
    $stmt->bind_param("sssss", $firstname, $lastname,$login,$password,$passwordHint);
    $stmt->execute();
    $records = mysqli_query($conn, "SELECT * FROM Users WHERE Login = '$login'");
    $row = mysqli_fetch_assoc($records);

    if($row)
		{
			returnWithNews($row['ID']);
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

  function returnWithNews($id)
  {
    sendResultInfoAsJson('{"ID":'. $id .',"error":""}');
  }
?>
