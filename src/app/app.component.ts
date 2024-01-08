import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { User } from './models/user.model';
import { FilesService } from './services/files.service';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = '';
  showImage = true;
  imgParet =
    'https://images.unsplash.com/photo-1682686581220-689c34afb6ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  token = '';

  handleEscuchaSon(nombre: string) {
    console.log(nombre);
  }

  handleDeleteImage() {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.profile().subscribe();
    }

    this.authService.user$.subscribe((data) => {
      this.profile = data;
    });
  }

  creteUser() {
    this.usersService
      .create({
        name: 'kenyi',
        email: 'kenyi@kenyi.com',
        password: '12345',
        role: 'customer',
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  login() {
    this.authService.login('admin@mail.com', 'admin123').subscribe(() => {
      // console.log(response.access_token);
      // this.token = response.access_token;
      this.router.navigate(['/profile']);
    });
  }

  profile: User | null = null;

  getProfile() {
    this.authService.profile().subscribe((profile) => {
      console.log(profile, 't🇴🇲 ');
      this.profile = profile;
    });
  }

  handleDowloadPdf() {
    this.filesService
      .getFile(
        'my.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  imgRta = '';

  onUpload(e: Event) {
    const element = e.target as HTMLInputElement;

    const file = element.files?.item(0);

    if (file) {
      this.filesService.uploadFile(file).subscribe((response) => {
        this.imgRta = response.location;
      });
    }
  }

  handleLogOut() {
    this.authService.handleLogOut();
    this.profile = null;
    this.router.navigate(['/home']);
  }
}
