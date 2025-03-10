<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/Database.php';
include_once '../../models/Movie.php';

$database = new Database();
$db = $database->getConnection();

$movie = new Movie($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Получение списка фильмов
        $result = $movie->read();
        $num = $result->rowCount();

        if($num > 0) {
            $movies_arr = array();

            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $movie_item = array(
                    "id" => $id,
                    "title" => $title,
                    "description" => $description,
                    "duration" => $duration,
                    "genre" => json_decode($genres),
                    "releaseDate" => $release_date,
                    "endDate" => $end_date,
                    "poster" => $poster,
                    "trailer" => $trailer,
                    "rating" => $rating,
                    "director" => $director,
                    "actors" => json_decode($actors)
                );

                array_push($movies_arr, $movie_item);
            }

            http_response_code(200);
            echo json_encode($movies_arr);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Фильмы не найдены."));
        }
        break;

    // Добавим остальные методы позже
}