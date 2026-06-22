<?php

namespace models\SQLQueries;

class DBConnectionModel {

    private $server;
    private $username;
    private $password;
    private $database;
    private $connection;

    /**
     * Constructor
     */
    public function __construct() {
        //$this->server = 'DESKTOP-TVVAI8R\SQLEXPRESS01';
		$this->server 	= 'JOSERZS\SQLEXPRESS';
        $this->username = 'sga';
        $this->password = '123456';
        $this->database = 'DbSga';
    }

    /**
     * Crea la conexion con SQLServer
     * 
     * @return $this
     */
    public function createConnection() {

        $connectionOptions = [
            "Database" => $this->database,
            "CharacterSet" => "UTF-8",
            "Uid" => $this->username,
            "PWD" => $this->password
        ];

        $this->connection = sqlsrv_connect($this->server, $connectionOptions);

        if (!$this->connection) {
            die(print_r(sqlsrv_errors(), true));
        }

        return $this;
    }

    /**
     * 
     * Para hacer queries
     * 
     * @return DBConnection
     */
    public function getConnection() {
        return $this->connection;
    }
}
