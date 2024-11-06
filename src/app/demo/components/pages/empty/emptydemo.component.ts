import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TechnicienService } from 'src/app/services/technicien.service';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
    templateUrl: './emptydemo.component.html',
    providers: [
        ConfirmationService, // Make sure to include only the necessary services
        MessageService
      ],
      styleUrls: ['./technicienform.component.css']

})
export class EmptyDemoComponent  {
  technicienform: FormGroup;
  files: any;
  technicianId!: string;


  constructor(private fb: FormBuilder, private technicienservice: TechnicienService, private messageservice: MessageService) { 
    this.technicianId = localStorage.getItem('id')!;
    this.technicienform = this.fb.group({
      start: ["", Validators.required],
      end: ["", [Validators.required, this.endDateAfterOrEqualValidator('start')]],
      photo: ["", Validators.required],
      review: ["", Validators.required],
      plan: ["", Validators.required],
      client_id: ["", Validators.required],
      technicien_id: [this.technicianId, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  uploadImage(event: any){
    this.files = event.target.files[0];
    console.log(this.files);
  }
  endDateAfterOrEqualValidator(controlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Vérifiez si this.tacheform est initialisé
      if (!this.technicienform) {
        return null;
      }
  
      // Utilisez la méthode get de FormGroup pour accéder aux valeurs du formulaire de manière sécurisée
      const startDateControl = this.technicienform.get(controlName);
      const endDate = control.value;
  
      // Vérifiez si le contrôle de début existe et s'il a une valeur
      if (startDateControl && startDateControl.value) {
        const startDate = startDateControl.value;
  
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
  
        if (endDateObj < startDateObj) {
          return { 'endDateAfterOrEqual': true };
        }
      }
  
      return null;
    };
  }
  
  onSubmit(){
    // Get the start and end date values
    const startDate = this.technicienform.value.start;
    const endDate = this.technicienform.value.end;
    const planDate = this.technicienform.value.plan;

    // Format start and end dates in yyyy/MM/dd format
    const formattedStartDate = startDate ? this.formatDate(startDate) : '';
    const formattedEndDate = endDate ? this.formatDate(endDate) : '';
    const formattedplanDate = planDate ? this.formatDate(planDate) : '';

    // Prepare other form data
    const formData = new FormData();
    formData.append('start', formattedStartDate);
    formData.append('end', formattedEndDate);
    formData.append('photo', this.files);
    formData.append('review', this.technicienform.value.review);
    formData.append('client_id', this.technicienform.value.client_id);
    formData.append('technicien_id', this.technicienform.value.technicien_id);
   
    if (formattedplanDate) {
      formData.append('plan', formattedplanDate);
  }else{
    formData.append('plan', "0");
  }
    // Submit the form data
    this.technicienservice.addtechform(formData).subscribe(
        (response: any) => {
            this.messageservice.add({severity:'success', summary:'Success', detail:'Technicien form ajouté avec succès', life: 3000});
            console.log(this.technicienform.value);
            console.log(formData)
        },
        error => {
            this.messageservice.add({severity:'error', summary:'Error', detail:error, life: 3000});
            console.log(this.technicienform.value);
                        console.log(formData)

        }
    );


this.technicienform.reset();

}

// Helper function to format date in yyyy/MM/dd format
private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 because JavaScript months are zero-based
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}



  
}
