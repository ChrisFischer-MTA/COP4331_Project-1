<?php

  $inputData = getRequestInfo();

  $FirstName = "";
  $LastName = "";
  $DOB = "";
  $Street1 = "";
  $Street2 = "";
  $City = "";
  $State = "";
  $ZipCode = "";
  $Relationship = "";
  $PhoneNumber = "";
  $Notes = "";
  $id = $inputData["ID"];

  $conn = new mysqli("localhost", "TheTester", "WeLoveCOP4331", "SmallProject");

  if( $conn->connect_error )
  {
    failWithReason( $conn->connect_error );
  }
  else
  {
    $records = mysqli_query($conn, "SELECT * FROM Contact WHERE id = $id");
    $row = mysqli_fetch_assoc($records);

    $conn->close();

    if($row)
    {
      return returnWithInfo($row['FirstName'], $row['LastName'],$row['DOB'],
                     $row['Street1'],$row['Street2'],$row['City'],
                     $row['State'],$row['ZipCode'],$row['Relationship'],
                     $row['PhoneNumber'],$row['Notes']);
    }

		else
    {
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
		$retValue = '{"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $firstName, $lastName, $DOB, $Street1, $Street2,
      $City, $State, $ZipCode, $Relationship, $PhoneNumber, $Notes)
	{
    $retValue =
    '{"firstName":"' . $firstName
      . '","lastName":"' . $lastName
      . '","Street1":"' . $Street1
      . '","Street2":"' . $Street2
      . '","City":"' . $City
      . '","State":"' . $State
      . '","ZipCode":"' . $ZipCode
      . '","Relationship":"' . $Relationship
      . '","PhoneNumber":"' . $PhoneNumber
      . '","Notes":"' . $Notes
      . '""}';


		sendResultInfoAsJson( $retValue );
	}
?>
