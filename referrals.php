<?php
$fp = fopen('test.txt','a+');
$debug = false ;

session_start();

$conn=@pg_connect("host=127.0.0.1 user=postgres dbname=postgres password=xxxxxx");

$data = json_decode(file_get_contents("php://input"));


if ($data->task == 'validate') {
  $debug = false;
  $myArray    = array();

  $sql  = "select row_to_json(t) ";
  $sql .= "from (";
  $sql .= "select * from nwc.members where ";
  $sql .= "onlineID='"   . $data->onlineID . "' and ";
  $sql .= "password = '" . $data->password . "'";
  $sql .= ") t";

  $result = pg_query($conn, $sql);
  $row_cnt = pg_num_rows($result);
  if ($row_cnt == 1) { 
    $member = json_decode(pg_fetch_row($result)[0]);

    $sql = "select count(*) from nwc.referrals where recipient='" . $member->id . "';";
    $result = pg_query($conn, $sql);
    $myArray['validated'] = 'success';
    $myArray['notifications'] = pg_fetch_row($result)[0];

    $myArray['member'] = $member;

    echo json_encode($myArray);
    $_SESSION["currentuser"] = $data->onlineID;
  } else {
    echo 'The onlineID or password you have entered is invalid.';
  }
}

else if ($data->task == 'getsessiondata') {
    $myArray = array();
    if(isset($_SESSION["currentuser"]))
    {
      $sql = "SELECT * FROM nwc.members where onlineID='" . $_SESSION["currentuser"] . "'";
      $result = pg_query($conn, $sql);
      if (!$result) {
        echo "Error: " . $sql . '<br>' ;
      } else {
        while ($row = pg_fetch_assoc($result)) {
          $myArray[] = $row;
        }
        if (sizeof($myArray) > 0) {
          $myArray['id'] = 'new';
        }
        echo json_encode($myArray);
      }
    } else {
      echo 'nosession';
    }    
}

else if ($data->task == 'getTemperature') {
    $myArray = array();
    if(isset($_SESSION["currentuser"]))
    {
      $sql = "SELECT * FROM nwc.temperature";
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

else if ($data->task == 'getMemberInfo') {
    $myArray = array();
    if(isset($_SESSION["currentuser"]))
    {
      $sql = "SELECT * FROM nwc.members where onlineID != '" . $_SESSION["currentuser"] . "'";
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

else if ($data->task == 'getReferrals') {
    $debug = false ;
    $myArray = array();
    if(true)
    {
      $sql  = "SELECT c1.name_first || ' ' || c1.name_last AS ReferralFrom, ";
      $sql .= "r.description as Description, ";
      $sql .= "to_char(datesent, 'MM/DD/YYYY')" .  'as "DateSent", ';
      $sql .= "r.id as id, ";
      $sql .= "r.contact_name_first || ' ' || r.contact_name_last as referralTo, ";
      $sql .= "r.contact_occupation as occupation, ";
      $sql .= "r.contact_phone as phone, ";
      $sql .= "r.contact_email as email, ";
      $sql .= "r.location as location, ";
      $sql .= "r.type as type, ";
      $sql .= "t.description as temperature, ";
      // $sql .= "to_char(r.dateclosed, 'YYYY-MM-DD')" .  'as closeReferralDate, ';
      $sql .= "r.dateclosed as closeReferralDate, ";
      $sql .= "r.markread as markread, ";      
      $sql .= "r.delivery as delivery, ";      
      $sql .= "r.dollarestimate as dollarestimate "; 
      $sql .= "FROM ";
      $sql .= "nwc.referrals AS r ";
      $sql .= "JOIN ";
      $sql .= "nwc.members AS c1 ON r.originator  = c1.id ";
      $sql .= "JOIN ";
      $sql .= "nwc.members AS c2 ON r.recipient = c2.id ";
      $sql .= "JOIN ";
      $sql .= "nwc.temperature AS t ON r.temperature = t.id ";
      $sql .= "WHERE ";
      $sql .= "r.recipient = $data->id " ;
      $sql .= "AND r.datesent between '$data->dateStart' and '$data->dateStop' ";      
      $sql .= "ORDER BY ";
      $sql .= "r.datesent";

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

else if ($data->task == 'register') {
    $pword_type = 0 ;
    $member_type = 0 ;
    $sql = "select count(*) from nwc.members where email='" . $data->userInfo->email . "' or onlineid = '" . $data->userInfo->onlineID . "'";
    $result = pg_query($conn, $sql);
    $row_cnt = pg_fetch_row($result);

    if ($row_cnt[0] >= 1) {
        echo 'onlineID or email already exists';
    } else {
        $sql  = "insert into nwc.members (";
        $sql .= "name_first, ";
        $sql .= "name_last, ";
        $sql .= "name_business, ";
        if (!is_null($data->userInfo->occupation)){
          $sql .= "occupation, ";
        }
        $sql .= "email, ";
        $sql .= "phone_main, ";
        if (!is_null($data->userInfo->phone_secondary)){
          $sql .= "phone_secondary, ";
        }
        if (!is_null($data->userInfo->comments)){
          $sql .= "comments, ";
        }
        $sql .= "password,";
        $sql .= "pword_type,";
        $sql .= "member_type) values ('";

        $sql .= $data->userInfo->name_first        . "', '";
        $sql .= $data->userInfo->name_last         . "', '";
        $sql .= $data->userInfo->name_business     . "', '";
        if (!is_null($data->userInfo->occupation)){
          $sql .= $data->userInfo->occupation      . "', '";
        }
        $sql .= $data->userInfo->email             . "', '";
        $sql .= $data->userInfo->phone_main        . "', '";
        if (!is_null($data->userInfo->phone_secondary)){
          $sql .= $data->userInfo->phone_secondary . "', '";
        }
        if (!is_null($data->userInfo->comments)){
          $sql .= $data->userInfo->comments        . "', '";
        }
        $sql .= $data->userInfo->password          . "', '";
        $sql .= $pword_type                        . "', '";
        $sql .= $member_type                       . "'); ";

        $result = pg_query($conn, $sql);
        if (!$result) {
          echo "Error: " . $sql . "<br>" ;
        } else {
          echo 'success';
        }            
    }
}

else if ($data->task == 'logout') {    
    unset($_SESSION['currentuser']);
    if(!isset($_SESSION['currentuser'])){
        echo 'success';
    } else {
        echo 'failed to destroy session';
    }
}

else if ($data->task == 'insertNewReferral') {
  $debug = false ;

  $sql  = 'insert into nwc.referrals (' ;
  $sql .= "originator, ";
  $sql .= "recipient, ";
  $sql .= "description, ";
  $sql .= "location, ";
  $sql .= "contact_name_first, ";
  $sql .= "contact_name_last, ";
  $sql .= "contact_occupation, ";
  $sql .= "contact_phone, ";
  $sql .= "contact_email, ";
  $sql .= "type, ";
  $sql .= "temperature, ";
  $sql .= "delivery, ";
  $sql .= "markread) ";
  $sql .= "values ('";
  $sql .= $data->referral->originator                . "', '"; 
  $sql .= $data->referral->recipient->id             . "', '";
  $sql .= $data->referral->description               . "', '"; 
  $sql .= $data->referral->location                  . "', '"; 
  $sql .= $data->referral->contactNameFirst          . "', '"; 
  $sql .= $data->referral->contactNameLast           . "', '"; 
  $sql .= $data->referral->occupation                . "', '"; 
  $sql .= $data->referral->phone                     . "', '"; 
  $sql .= $data->referral->email                     . "', '"; 
  $sql .= $data->referral->type->description         . "', '"; 
  $sql .= $data->referral->temperature->description  . "', '"; 
  $sql .= $data->referral->delivery                  . "', '"; 
  $sql .= 'new'                                      . "') ;";

  // $result = pg_query($conn, $sql);
  if (!$result) {
    echo "Error: " . $sql . "<br>" ;
  } else {
    echo 'success';
  }            

}

else if ($data->task == 'updateuser') {
// use !is_null() to avoid inserting null strings into nwc.members for non-required fields
    if(isset($_SESSION["currentuser"]))
    {
        $sql = "select count(*) from nwc.members where email !='" . $data->email . "' and onlineid = '" . $data->username . "'";

        $result = pg_query($conn, $sql);
        $row_cnt = pg_fetch_row($result);

        if ($row_cnt[0] == 1) { 
          echo ('usernameexists');
        } else {
          $sql  = "update nwc.members set ";
          $sql .= "name_first = '"      . $data->userInfo->name_first      . "', ";
          $sql .= "name_last = '"       . $data->userInfo->name_last       . "', ";
          $sql .= "name_business = '"   . $data->userInfo->name_business   . "', ";
          if (!is_null($data->userInfo->occupation)){
            $sql .= "occupation = '"      . $data->userInfo->occupation      . "', ";
          }
          $sql .= "email = '"           . $data->userInfo->email           . "', ";
          $sql .= "phone_main = '"      . $data->userInfo->phone_main      . "', ";
          if (!is_null($data->userInfo->phone_secondary)){
            $sql .= "phone_secondary = '" . $data->userInfo->phone_secondary . "', ";
          }
          if (!is_null($data->userInfo->comments)){
            $sql .= "comments = '"        . $data->userInfo->comments        . "', ";
          }
          $sql .= "password = '"        . $data->userInfo->password        . "'  ";
          $sql .= "where id ='"         . $data->userInfo->id              . "'; ";
          $result = pg_query($conn, $sql);
          if (!$result) {
            echo "Error: " . $sql . "<br>" ;
          } else {
            echo 'success';
          }            
        }
    } else {
        echo 'nosession';
    }
}

else if ($data->task == 'updateReferral') {
// don't do an update without values 
  $debug = false;
  $processUpdate = false;

  $sql  = "update nwc.referrals ";
  $sql .= "set ";

  if (!is_null($data->referral->dateclosed)){
      $processUpdate = true;
      $sql .= "dateclosed='" . $data->referral->closereferraldate . "' " ;
  }

  if (!is_null($data->referral->dollarestimate)){
      $processUpdate = true;
      if (!is_null($data->referral->dateclosed)){
          $sql .= ", ";
      }
      $sql .= "dollarestimate='" . $data->referral->dollarestimate . "' ";
  }   

  if (!is_null($data->referral->markread)){
      $processUpdate = true;
      if (!is_null($data->referral->dateclosed) || !is_null($data->referral->dollarestimate) ){
          $sql .= ", ";
      }
      $sql .= "markread='" . $data->referral->markread . "' ";
  }   


  $sql .= "where id = '" . $data->referral->id . "';";

  if ($processUpdate){
    $result = pg_query($conn, $sql);  
    if (!$result) {
      echo "Error: " . $sql . "<br>" ;
    }        
  }
  echo 'success';
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
  $debug = false ;
}

?>