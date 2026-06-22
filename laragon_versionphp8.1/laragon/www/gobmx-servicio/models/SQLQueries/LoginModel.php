<?php

namespace models\SQLQueries;

include 'DBConnectionModel.php';

use models\SQLQueries\DBConnectionModel;

class LoginModel {


    /**
     * Construct
     */
    public function __construct() {
    }


    function login(string $username, string $password) {
        try {

            $dbc = new DBConnectionModel();
            $dbc->createConnection();
            $conn = $dbc->getConnection();

            $tsql = "SELECT id,username FROM dbo.users WHERE username='".$username."' AND password='".$password."'";
            //Insert query
            $insertReview = sqlsrv_query($conn, $tsql);
            if ($insertReview == FALSE) {
                $status = false;
                $data = ['errors' => sqlsrv_errors()];
                die(print_r(compact('status', 'data')));
            }

            $id = null;
            while ($row = sqlsrv_fetch_array($insertReview, SQLSRV_FETCH_ASSOC)) {
                $id = ($row);
            }
            sqlsrv_free_stmt($insertReview);
            sqlsrv_close($conn);

            $status = true;
            $data = ['id' => $id];

            return compact('status', 'data');
        } catch (Exception $e) {

            $status = false;
            $data = 'Error';

            return compact('status', 'data');
        }
    }
}
