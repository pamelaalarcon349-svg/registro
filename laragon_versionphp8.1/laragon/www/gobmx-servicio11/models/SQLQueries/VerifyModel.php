<?php

namespace models\SQLQueries;


include 'DBConnectionModel.php';


use models\SQLQueries\DBConnectionModel;



class VerifyModel {


    /**
     * Construct
     */
    public function __construct() {
    }

    /**
     * 
     * @return $this
     */
  
        function VerifyData(string $name, string $last_name, string $email, string $curp, string $second_last_name, 
                            string $id_general, string $gender, string $birth_date, string $birth_place, string $mobile_number, string $register_date,
                            string $nationality, string $admission_period, string $academic_area, string $degree, string $country) {

        try {           

            //agregar validaciones de BD
            /*
            1.- duplicidad de correo electrónico 
            2.- curp para nacionales
            3.- usuario no duplicado y longitud 
            */

           $resultEmailVerification = $this-> verifyEmail( $email );
           
            //validar formato de correo


           if ( $resultEmailVerification['status'] ) 
           {   
                $status = true;
               // $data = $resultEmailVerification['data']['count'];

                $data = [
                        'count' => $resultEmailVerification['data']['count'],
                        'id'    =>  $email,
                        'email'    =>  $email
                        ];
                
           } 
           else 
           { 
                $status = false;
                $data = "Error ";
                return compact('status', 'data');
            }

            return compact('status', 'data');

        } catch (Exception $e) {

            $status = false;
            $data = 'Error';

            return compact('status', 'data');
        }
    }


    function verifyEmail(string $email = null) {

        try {

            $dbc = new DBConnectionModel();
            $dbc->createConnection();
            $conn = $dbc->getConnection();

             $tsql = "SELECT COUNT(*) AS count FROM sga_persona WHERE correo_electronico = '$email'";

            //select query
            $selectReview = sqlsrv_query($conn, $tsql);
            if ($selectReview == FALSE) {
                $status = false;
                $data = ['errors'=>sqlsrv_errors()];
                die(print_r(compact('status', 'data')));
            }

            $count = null;
            while ($row = sqlsrv_fetch_array($selectReview, SQLSRV_FETCH_ASSOC)) {
                $count = ($row['count']);
            }
            sqlsrv_free_stmt($selectReview);
            sqlsrv_close($conn);

            // Obtenemos el status de la inserción y el data_id
            $status = true;
            $data = ['count' => $count];
      
            return compact('status', 'data');

        } catch (Exception $e) {

            $status = false;
            $data = 'Error';

            return compact('status', 'data');
        }
    }
    
}