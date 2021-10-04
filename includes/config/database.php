
<?php 

function conectarDB (): mysqli{
 
   $db= new mysqli('127.0.0.1','root','root','optica');
   
    if(!$db){
        echo "Error no se puede conectar";
        exit;  //para evitar mostrar informacion importante
    }
    return $db;
 }