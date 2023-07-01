import { Component, ElementRef,Renderer2,ViewChild } from '@angular/core';
import { UserService } from './user.service';
import {FormBuilder , Validators} from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {
  
@ViewChild("exampleModal") myButton:ElementRef | undefined;

 

  public listUser:any[] = [];
  
  

  public form = this.fb.group({
    id:"",
    username: '',
    password: '',
    email: '',
    titulo:''
  })
  public constructor(private userService:UserService, private fb:FormBuilder,private renderer: Renderer2){}

  getListUser()
  {
    this.userService.userFindAll().subscribe((resp:any) =>{
      
      this.listUser = resp.response;
    })
  }

  save()
  {
    if(this.form.get("id")?.value){
      console.log("actualizando")
      this.form.get("titulo")?.setValue("userUpdate");
      this.userService.userUpdate(this.form.value).subscribe(()=>{
        console.log("Ya actualizo");
        this.getListUser()
        this.cerrar()
      })
    }else{
      this.form.get("titulo")?.setValue("usercrear");

    this.userService.userSave(this.form.value).subscribe(() => {
        this.getListUser();
        this.form.reset();
    })
    this.cerrar()
    }
  }


  editar(item:any){
   this.form.reset({...item},{emitEvent:false,onlySelf:true})
   this.openModal()
  }

  openModal()
  {
    this.renderer.addClass(this.myButton?.nativeElement , "show");
    this.renderer.addClass(this.myButton?.nativeElement , "mostrar");
  }

  cerrar()
  {
    this.renderer.removeClass(this.myButton?.nativeElement , "show")
    this.renderer.removeClass(this.myButton?.nativeElement , "mostrar")
    this.form.reset()
  }

  delete(item:any){
    this.userService.userDelete(item.id).subscribe(()=>{
      this.getListUser()
    })
  }
}



