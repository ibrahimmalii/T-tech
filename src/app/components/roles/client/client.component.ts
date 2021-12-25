import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  
  getUserName(): String{
    return this.userService.getUserName()
  }

}
