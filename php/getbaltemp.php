<?php
include('php/simple_html_dom.php');

$html = file_get_html('http://balcsi.net/balaton-vizhomerseklet');

// #content > div:nth-child(2) > div:nth-child(2) > div > div > div.vc_message_box.vc_message_box-solid-icon.vc_message_box-rounded.vc_color-turquoise > p:nth-child(4) > em:nth-child(3)
foreach($html->find('#content') as $e)
    echo $e->plaintext . '<br>';
?>
