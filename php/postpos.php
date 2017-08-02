<?php
  $conn = mysql_connect('sql112.byethost8.com', 'b8_20450428', 'Supleget2092');
  if (!$conn) {
      die('Could not connect: ' . mysql_error());
  }
  echo 'Connected successfully';
  echo $_POST['lat'];
  echo $_POST['lng'];
  $db_selected = mysql_select_db('b8_20450428_karika', $conn);

  echo $db_selected;

  $sql = "INSERT INTO karika (lat, lng) VALUES (" . $_POST['lat'] . ", " . $_POST['lng'] . ")";

  if (mysql_query($sql) === TRUE) {
      echo "New record created successfully";
  } else {
      echo "Error: " . $sql . "<br>" . mysql_error();
  }

  mysql_close($conn);
?>
