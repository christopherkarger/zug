<?php

$url="https://fahrplan.oebb.at/bin/stboard.exe/dn?L=vs_scotty.vs_liveticker&evaId=" . $_GET['evaId'] . "&dirInput=" . $_GET['dirInput'] . "&boardType=dep&additionalTime=0&maxJourneys=20&outputMode=tickerDataOnly&start=yes&selectDate=today";
$contents = file_get_contents($url);
$train=json_decode($contents);

echo $contents;


?>
