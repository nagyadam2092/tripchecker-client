<?php
  include_once('config/config.php');
  $conn = mysql_connect($config['host'], $config['dbuser'], $config['dbpass']);
  header('Content-Type: application/json');
  if (!$conn) {
      die('Could not connect: ' . mysql_error());
  }
  echo $_POST['lat'];
  echo $_POST['lng'];
  $db_selected = mysql_select_db('b8_20450428_karika', $conn);


  $sql = "SELECT lat, lng FROM karika ORDER BY id DESC LIMIT 10";

  $result = mysql_query($sql);

  if ($result) {
    $rows = array();
    while ($row = mysql_fetch_assoc($result)) {
      $rows[] = $row;
    }
    print json_encode($rows);
  } else {
      echo "Error: " . $sql . "<br>" . mysql_error();
  }

  mysql_close($conn);
?>
