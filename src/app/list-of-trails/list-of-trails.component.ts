import { Component, OnInit, Input } from '@angular/core';
import { Trail } from '../models/trail.model';
import { TrailService } from '../trail.service';
import { Router } from '@angular/router';
import { FirebaseListObservable} from 'angularfire2/database';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-list-of-trails',
  templateUrl: './list-of-trails.component.html',
  styleUrls: ['./list-of-trails.component.css'],
  providers: [TrailService, AuthenticationService]
})
export class ListOfTrailsComponent implements OnInit {

  @Input() childParams: Object;
  trails: Trail[] = [];


  private isLoggedIn: boolean;

  constructor(private trailService: TrailService, private router: Router, public authService: AuthenticationService) {
    this.authService.user.subscribe(auth => {
      if (auth !== null) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }


  ngOnInit() {
    this.trailService.getTrails().subscribe( result => {
      for( let trail of result){
        this.trails.push(new Trail(trail));
      }
    });

  }

  goToDetailPage(singleTrail) {
    this.router.navigate(['trails', singleTrail.$key]);
  }

  leaveReport(singleTrail) {
    if (this.isLoggedIn === true) {
      this.router.navigate(['report', singleTrail.$key]);
    } else {
      alert("You must be logged in to leave a report.");
      this.router.navigate(['auth']);
    }
  }


}
