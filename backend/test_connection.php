<?php
include_once 'config/Database.php';

$database = new Database();
$db = $database->getConnection();

if($db) {
    echo "Подключение к базе данных успешно установлено";
} else {
    echo "Ошибка подключения к базе данных";
} 