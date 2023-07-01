<?php

require_once("core/conectar.php");

class UserModels{

    protected $con;

    public function __construct()
    {
        $this->con = new Conectar();
    }

    public function findAll()
    {
        $con = $this->con->con();//conexion a la base de datos

        $stm = $con->prepare("SELECT * FROM user");//preparando el sql

        if(!$stm->execute())//validando si se ejecuta
        {
            throw new Exception("error de consulta"); //generando un error
        }else{

            return $stm->fetchAll(PDO::FETCH_OBJ); //retornando datos
        }
    }

    public function save($usuario)
    {
        $con = $this->con->con();

        $sql = "INSERT INTO user(username, email , password) values(:username , :email , :password)";
        $stm = $con->prepare($sql);
        $stm->bindParam(':username' , $usuario->username);
        $stm->bindParam(':password' , md5($usuario->password));
        $stm->bindParam(':email' , $usuario->email);

        if(!$stm->execute())
        {
            throw new Exception("Error al insertar datos");
        }
        
   
}
public function update($user){

    $con =  $this->con->con();
    $sql = "UPDATE user Set username = :username,
    password = :password ,email= :email WHERE id = :id";
    $stm =  $con->prepare($sql);
    $stm->bindParam(":id",$user->id);
    $stm->bindParam(":username",$user->username);
    $stm->bindParam(":password",$user->password);
    $stm->bindParam(":email",$user->email);
    if(!$stm->execute()){
        throw new Exception("Error al actualizar");
    }

}


public function delete($id){
    $con =  $this->con->con();
    $sql = "DELETE FROM user WHERE id= :id";
    $stm =  $con->prepare($sql);
    $stm->bindParam(":id",$id);
    if(!$stm->execute()){
        throw new Exception("Error al actualizar");
    }
}
}
?>