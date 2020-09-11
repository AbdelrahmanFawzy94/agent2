import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../@core/services/auth/auth.service';
import { SupportUserAccount } from '../../../@core/models/data-objects';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class SupportDashboardComponent
  implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('container') container: ElementRef<HTMLDivElement>;
  @ViewChild('menu') menu: ElementRef<any>;

  closedNav = true;
  openUserMenu = false;
  scrolled = false;
  currentPage = '';
  loggedUser: SupportUserAccount = new SupportUserAccount();
  // sub menu in side menu
  sidenavLinks: HTMLElement[];

  constructor(
    private router: Router,
    private pageTitle: Title,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
  }

  ngAfterViewInit() {
    this.subMenuInit();
    this.fixedNavTop();
  }

  ngAfterViewChecked() {
    // this.closeSidenavMenus();
    this.getCurrentPage();
  }

  // end of life cycle hooks

  toggleNav() {
    this.closedNav = !this.closedNav;
    if (this.closedNav === true) {
      this.openUserMenu = false;
      this.closeSidenavMenus();
    }
    this.scrollToTop();
  }

  openNav() {
    this.closedNav = false;
    this.scrollToTop();
  }

  toggleUserMenu() {
    this.openUserMenu = !this.openUserMenu;
  }

  toggleNotification(e: Event) {
    const element = e.target as HTMLElement;
    const menu = element.nextElementSibling.nextElementSibling;
    menu.classList.toggle('active');
  }

  closeNotification(e: Event) {
    console.log(e);
  }

  closeSidenavMenus() {
    if (this.closedNav === true) {
      this.sidenavLinks.forEach((link) => {
        if (link.classList.contains('active')) {
          link.classList.remove('active');
        }
      });
    }
  }

  navigateToDashboard() {
    this.router.navigateByUrl('dashboard');
  }

  getCurrentPage() {
    const url = this.router.url as string;
    const urlArray = url.split('/');
    const indexOfPath = urlArray.length - 1;
    this.currentPage = urlArray[indexOfPath];
    if (this.currentPage.includes('-')) {
      this.currentPage = this.currentPage.replace('-', ' ');
    }
    this.pageTitle.setTitle(this.currentPage);
  }

  subMenuInit() {
    this.sidenavLinks = Array.from(this.menu.nativeElement.children);

    this.sidenavLinks.forEach((li) => {
      li.onclick = () => {
        this.sidenavLinks.forEach((item) => item.classList.remove('active'));
        li.classList.toggle('active');
      };
      // console.log(li);
      // console.log(li.children[li.children.length - 1]);
    });
  }

  fixedNavTop() {
    this.container.nativeElement.onscroll = () => {
      if (this.container.nativeElement.scrollTop === 0) {
        this.scrolled = false;
      } else {
        this.scrolled = true;
      }
    };
  }

  scrollToTop() {
    this.container.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
