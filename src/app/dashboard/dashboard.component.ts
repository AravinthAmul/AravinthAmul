import { Component,OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(private auth:AuthService){}
  user={localId:"SomeId",displayname:"SomeName"}


  ngOnInit(): void {
    this.auth.canacess();
    if (this.auth.isAuthenticed())
    {
      //call user details services
      this.auth.details().subscribe({
        next:data=>{
          this.user.localId=data.users[0].localId;
          this.user.displayname=data.users[0].displayname;
        }
      })
    }
  }
}
