import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private http:HttpClient) { }

  userFindAll()
  {
    return this.http.get('http://localhost:8080/index.php?titulo=userFindAll');
  }

  userSave(data:any)
  {
    return this.http.post('http://localhost:8080/index.php' , data);
  }
  userUpdate(user:any){
    return this.http.patch('http://localhost:8080/index.php',user )
  }

  userDelete(id:any){
    return this.http.delete(`http://localhost:8080/index.php?titulo=eliminarUser&id=${id}`)
  }
}
