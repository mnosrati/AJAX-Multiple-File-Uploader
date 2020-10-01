<?php

  if (!isset($_FILES['file']['error'])) {
    echo $_FILES['file']['error'];
    exit;
  }

  $target_dir = "";
  $temp_name=basename($_FILES["file"]["tmp_name"]);
  $target_file = $target_dir . basename($_FILES["file"]["name"]);
  echo "ok";

?>
