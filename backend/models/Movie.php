<?php
class Movie {
    private $conn;
    private $table_name = "movies";

    public $id;
    public $title;
    public $description;
    public $duration;
    public $release_date;
    public $end_date;
    public $poster;
    public $trailer;
    public $rating;
    public $director;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT 
                    m.*, 
                    GROUP_CONCAT(DISTINCT mg.genre) as genres,
                    GROUP_CONCAT(DISTINCT ma.actor) as actors
                FROM 
                    " . $this->table_name . " m
                    LEFT JOIN movie_genres mg ON m.id = mg.movie_id
                    LEFT JOIN movie_actors ma ON m.id = ma.movie_id
                GROUP BY 
                    m.id
                ORDER BY 
                    m.created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
} 