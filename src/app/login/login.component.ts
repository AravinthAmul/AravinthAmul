import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formdata ={email:"",password:""};
  submit =false;
  errormessage="";
  loading=false;
    constructor(private auth:AuthService){
  
    }
    ngOnInit():void{
       //Use for not redirect to register page
      this.auth.canauthenticate();

    }
    onSubmit(){
      console.log(this.formdata);
      this.loading=true;
      
//Call the register
this.auth. 
login(this.formdata.email,this.formdata.password)
.subscribe({
  next:data=>{
    //store Stoken
    this.auth.storeToken(data.idToken);
    this.auth.canauthenticate();
    console.log('Loggeed User idtoken is'+data.idToken);
  },
  error:data=>{
    if(data.error.error.message=="INVALID_PASSWORD" || data.error.error.message=="INVALID_EMAIL" )
    {
      this.errormessage="Invalid Credenticals!";
    }
  
    else {
      this.errormessage="Unknown error occured When Logging a New Account";
    }
  }
}) .add(()=>{
  this.loading=false;
  console.log('Login Completed!');
})
    }      
}
