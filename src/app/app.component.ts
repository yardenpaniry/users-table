import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../app/services/users/users.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'userslibrary';

  closeResult: string | undefined;
  allUsers: any = [];
  Users: any = [];
  editForm!: FormGroup;
  deleteIndex: any;
  // Users!: [{
  //   city: string;
  //   country: string;
  //   firstname: string;
  //   lastname: string;
  //   email:string;
  //   street: string;
  //   UUID: string;
  //   thumbnail: string;

  // }];

  constructor(private service: UsersService, private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.users();
    this.editForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      city: [''],
      country: [''],
      street: [''],
      index: [''],
      thumbnail: [''],
    });
  }

  users(): void {
    this.service
      .users()
      .subscribe((response: any) => {
        this.allUsers = response.results;

        let index = 0;
        this.allUsers.forEach((user: any) => {

          this.Users.push({
            firstname: user.name.first,
            lastname: user.name.last,
            email: user.email,
            city: user.location.city,
            country: user.location.country,
            street: user.location.street.name,
            UUID: user.login.uuid,
            thumbnail: user.picture.thumbnail,
            index: index

          });
          index++;
        }

        );


        console.log(this.Users);

      });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    this.Users.push(f.value);
    this.Users[this.Users.length-1].index= this.Users.length-1;
    console.log(this.Users[this.Users.length-1]);
    this.modalService.dismissAll(); //dismiss the modal
  }

  openEdit(targetModal: any, user: any) {
    console.log(user);
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      city: user.city,
      street: user.street,
      country: user.country,
      index: user.index
    });



  }


  // edit form
  onSave() {
    console.log(this.editForm.value.index);
   
    const index = this.Users.findIndex((obj:any) => {
      return obj.index === this.editForm.value.index;
    });

    this.Users[index].firstname = this.editForm.value.firstname;
    this.Users[index].lastname = this.editForm.value.lastname;
    this.Users[index].email = this.editForm.value.email;
    this.Users[index].city = this.editForm.value.city;
    this.Users[index].country = this.editForm.value.country;
    this.Users[index].street = this.editForm.value.street;

    this.modalService.dismissAll();
  }

  openDelete(targetModal: any, user: any) {
    this.deleteIndex = user.index;
    console.log(this.deleteIndex);
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }


  onDelete() {
    const index = this.Users.findIndex((obj:any) => {
      return obj.index === this.deleteIndex;
    });

    this.Users.splice(index , 1)
    this.modalService.dismissAll();



  }

}

