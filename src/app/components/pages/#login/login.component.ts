import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { LoginService } from './login.service';
import {
  LoginUser,
  SupportUserAccount,
} from '../../../@core/models/data-objects';
import { Router } from '@angular/router';
import { MessageService } from '../../modules/dashboard/customer-support/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  private supportUserAccount: SupportUserAccount;
  loginUser: LoginUser = new LoginUser();

  @ViewChild('username') usernameInput: ElementRef<HTMLInputElement>;
  @ViewChild('password') passwordInput: ElementRef<HTMLInputElement>;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.LabelVisability(this.usernameInput.nativeElement);
    this.LabelVisability(this.passwordInput.nativeElement);
  }

  LabelVisability(input: HTMLInputElement) {
    if (input.value !== '') {
      input.previousElementSibling.lastElementChild.classList.add('out');
    } else {
      input.previousElementSibling.lastElementChild.classList.remove('out');
    }
  }

  submit(e: Event) {
    localStorage.clear();
    this.loginService.loginUser(this.loginUser).subscribe((data) => {
      if (data != null && data.id > 0) {
        this.supportUserAccount = data;
        localStorage.setItem(
          'LoggedUser',
          JSON.stringify(this.supportUserAccount)
        );
        this.messageService.invokeSupportConnectionID(
          this.supportUserAccount.supportUserId
        );
        this.router.navigateByUrl('/dashboard');
      }
    });

    e.preventDefault();
  }
}
