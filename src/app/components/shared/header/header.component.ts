import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) { }
  public isUserLogged : boolean = false;

  ngOnInit(): void {
    this.userService.getLoggedStatus().subscribe(status=>{
      return this.isUserLogged = status;
    });
  }

  logout(){
    this.userService.logout();
  }

}
