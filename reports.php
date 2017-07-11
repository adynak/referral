<?php
$fp = fopen('test.txt','a+');
$debug = false ;

$conn=@pg_connect("host=127.0.0.1 user=postgres dbname=postgres password=xxxxxx!");

$data = json_decode(file_get_contents("php://input"));


if ($data->task == 'getActiveMembers') {
    $myArray = array();
    if(true)
    {

      $sql  = "SELECT ";
      $sql .= "    name_first || ' ' || name_last AS Member, ";
      $sql .= "    name_business AS Company, ";
      $sql .= "    email AS Email, ";
      $sql .= "    comments AS Description, ";
      $sql .= "    TO_CHAR(member_since, 'Mon DD, YYYY') AS Joined ";
      $sql .= 'FROM ';
      $sql .= '    nwc.members ';
      $sql .= 'WHERE ';
      $sql .= '    active = true ';
  
      $result = pg_query($conn, $sql);
      if (!$result) {
        echo "Error: " . $sql . '<br>' ;
      } else {
        while ($row = pg_fetch_assoc($result)) {
          $myArray[] = $row;
        }
        echo json_encode($myArray);
      }
    } else {
      echo 'nosession';
    }    
}

else if ($data->task == 'getReferralsPassed') {
    $myArray = array();
    if(true)
    {

    $sql  = "SELECT ";
    $sql .= "a.id AS ID, ";
    $sql .= "to_char(a.datesent, 'Mon DD, YYYY') AS ReferralDate, ";
    $sql .= "b.name_first || ' ' || b.name_last AS From, ";
    $sql .= "c.name_first || ' ' || c.name_last AS To, ";
    $sql .= "a.description AS Description, ";
    $sql .= "d.description AS Temperature ";
    $sql .= "FROM ";
    $sql .= "nwc.referrals a ";
    $sql .= "JOIN nwc.members b on a.originator = b.id ";
    $sql .= "JOIN nwc.members c on a.recipient = c.id ";
    $sql .= "JOIN nwc.temperature d ON a.temperature = d.id ";
    $sql .= "WHERE a.datesent between '$data->dateStart' and '$data->dateStop' ";
    $sql .= "ORDER BY a.datesent ASC ";
  
      $result = pg_query($conn, $sql);
      if (!$result) {
        echo "Error: " . $sql . '<br>' ;
      } else {
        while ($row = pg_fetch_assoc($result)) {
          $myArray[] = $row;
        }
        echo json_encode($myArray);
      }
    } else {
      echo 'nosession';
    }    
}

else if ($data->task == 'getClosedBusiness') {
    $myArray = array();
    if(true)
    {

    $sql  = "SELECT ";
    $sql .= "a.id AS ID, ";
    $sql .= "to_char(a.datesent, 'Mon DD, YYYY') AS Referred, ";
    $sql .= "b.name_first || ' ' || b.name_last AS From, ";
    $sql .= "c.name_first || ' ' || c.name_last AS To, ";
    $sql .= "a.description AS Description, ";
    $sql .= "to_char(a.dateclosed, 'Mon DD, YYYY') AS closed, ";
    $sql .= "a.dollarestimate AS value ";
    $sql .= "FROM ";
    $sql .= "nwc.referrals a ";
    $sql .= "JOIN nwc.members b on a.originator = b.id ";
    $sql .= "JOIN nwc.members c on a.recipient = c.id ";
    $sql .= "WHERE ";
    $sql .= "a.dateclosed IS NOT NULL ";
    $sql .= "ORDER BY a.datesent ASC ";
  
      $result = pg_query($conn, $sql);
      if (!$result) {
        echo "Error: " . $sql . '<br>' ;
      } else {
        while ($row = pg_fetch_assoc($result)) {
          $myArray[] = $row;
        }
        echo json_encode($myArray);
      }
    } else {
      echo 'nosession';
    }    
}

if ($debug) {
  fwrite($fp , 'task = ' . print_r($data->task,1));
  fwrite($fp , "\n");
  fwrite($fp , print_r($data,1));
  fwrite($fp , "\n");
  fwrite($fp , 'sql = ' . $sql);
  fwrite($fp , "\n");
  fwrite($fp , 'session = ' . $_SESSION["currentuser"]);
  fwrite($fp , "\n");
  if (sizeof($myArray) > 0) {
    fwrite($fp , json_encode($myArray));
    fwrite($fp , "\n");
  }
}

?>