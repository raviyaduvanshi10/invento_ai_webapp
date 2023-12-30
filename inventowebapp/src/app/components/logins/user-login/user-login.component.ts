import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PasswordresetformComponent } from '../../forms/passwordresetform/passwordresetform.component';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
    form: FormGroup;
    hide = true;
    userAccessRoles;
    clients: Observable<any>;
    // clientId;
    selected = 'loginadmin';
    isLoading = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.isLoading = true;
        let Form = JSON.stringify(this.form.value);
        console.log(this.selected, Form);

        this.loginService.login(this.selected, Form).subscribe(data => {
            var status = JSON.parse(JSON.stringify(data)).status;
            console.log("Check Again ::=" + status);
            if (status == 200) {
                localStorage.setItem("credential", JSON.stringify(data));
                this.gotoDashboard();
                this.isLoading = false;
            }
            else {
                alert("Please enter valid credentials.");
                this.isLoading = false;
            }
        },
            error => console.log(error));
    }
    gotoDashboard() {
        // this.loginService.roles = this.userAccessRoles;
        // console.log(this.loginService.roles);
        this.router.navigate(['/default/Dashboard']);
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }

    openLoginForm() {
        this.dialog.open(PasswordresetformComponent, { width: '500px', height: '500px' });
        console.log("Opened form")
    }

    // fetchClients(loginType) {
    //     console.log(loginType);
    //     this.clientId = document.getElementById("clientBlockId");
    //     if (loginType == "webusers") {
    //         this.clientId.style.display = "block";
    //         this.loginService.getClientList().subscribe(data => {
    //             this.clients = data;
    //             console.log(this.clients);
    //         },
    //             err => console.log(err)
    //         );
    //     }
    //     else {
    //         this.clientId.style.display = "none";
    //     }
    // }

}