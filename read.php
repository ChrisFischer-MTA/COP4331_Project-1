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

  $conn = new mysqli("localhost", "TheTester", "WeLoveCOP4331", "SmallProject");

  if( $conn->connect_error )
  {
    failWithReason( $conn->connect_error );
  }
  else
  {
    $stmt = $conn->prepare("SELECT * FROM Contact where ID =?");
    $stmt->bind_param("i", $inData["ID"]);
		$stmt->execute();
    $result = $stmt->get_result();

    $stmt->close();
		$conn->close();

		if( $row = $result->fetch_assoc() )
		{
			return returnWithInfo($row['FirstName'], $row['LastName'],$row['DOB'],
                     $row['Street1'],$row['Street2'],$row['City'],
                     $row['State'],$row['ZipCode'],$row['Relationship'],
                     $row['PhoneNumber'],$row['Notes']);
		}
		else
		{
			return FailwithReason("Contact info not found!");
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
      . '"}';


		sendResultInfoAsJson( $retValue );
	}
?>
