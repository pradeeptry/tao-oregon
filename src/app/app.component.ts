import { Component, Input} from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AuthenticationService ]
})
export class AppComponent {
  user;
  private isLoggedIn: boolean;


constructor(public authService: AuthenticationService) {
  this.authService.user.subscribe(theUser => {
    this.user = theUser
    if (theUser == null) {
      this.isLoggedIn = false;
      console.log("if " + this.isLoggedIn);
    } else {
      this.isLoggedIn = true;
      console.log("else " + this.isLoggedIn);
    }
  });
}

  signOut() {
    this.authService.logout();
  }
}
