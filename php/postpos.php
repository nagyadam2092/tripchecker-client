<?php
  include_once('config/config.php');
  $conn = mysql_connect($config['host'], $config['dbuser'], $config['dbpass']);
  if (!$conn) {
      die('Could not connect: ' . mysql_error());
  }
  echo 'Connected successfully';
  echo $_POST['lat'];
  echo $_POST['lng'];
  echo $_POST['device'];
  $db_selected = mysql_select_db('b8_20450428_karika', $conn);

  echo $db_selected;

  $sql = "INSERT INTO karika (lat, lng, device) VALUES (" . $_POST['lat'] . ", " . $_POST['lng'] . ", '" . $_POST['device'] . "')";
  echo "<br/>" . $sql . "<br />";

  if (mysql_query($sql) === TRUE) {
      echo "New record created successfully";
  } else {
      echo "Error: " . $sql . "<br>" . mysql_error();
  }

  mysql_close($conn);
?>
