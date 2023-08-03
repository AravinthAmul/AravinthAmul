import { Component, OnInit } from '@angular/core';
import { UserModule } from '../models/user/user.module';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formdata = { name: "", email: "", password: "" };
  submit = false;
  errormessage = "";
  loading = false;
  constructor(private auth: AuthService) {

  }
  ngOnInit(): void {
    //Use for not redirect to login page
    this.auth.canauthenticate();

  }
  onSubmit(value:any) {
    console.log("value",value);
    console.log(this.formdata);

    this.loading = true;
    const formvalues={...value};
    console.log(formvalues);
    //Call the register
    
    const userdetails:UserModule={
      Email: this.formdata.email,
      // IsActive: this.formdata.IsActive,
      UserName: this.formdata.name,
      Password: this.formdata.password
    };
    this.auth.register(userdetails).subscribe({
        next: data => {
          //store Stoken
          this.auth.storeToken(data.idToken);
          this.auth.canauthenticate();
         console.log('Registered idtoken is' + data.userdetails);
           //console.log (userdetails);

        },
        error: data => {
          if (data.error.error.message == "INVALID_EMAIL") {
            this.errormessage = "Invalid Email!";
          }
          else if (data.error.error.message == "EMAIL_EXISTS") {
            this.errormessage = "Already Email Exists!";
          }
          else {
            this.errormessage = "Unknown error occured When Creating a New Account";
          }
        }

      }).add(() => {
        this.loading = false;
        console.log('Register Completed!');
      })
  }

}
