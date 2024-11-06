import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TechnicienService } from 'src/app/demo/service/technicien.service';
import { Techniciens } from 'src/app/demo/api/techniciens';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Tache } from 'src/app/demo/api/tache';
@Component({
    templateUrl: './listdemo.component.html',
    providers: [
        ConfirmationService,
        MessageService
      ],
      styleUrls: ['./style.css']
})
export class ListDemoComponent implements OnInit {
    @Output() clickaddedit : EventEmitter<boolean> = new EventEmitter<boolean>()
    @Output() clickclose : EventEmitter<boolean> = new EventEmitter<boolean>()
    taches:Tache[]=[]
    Model="ajouter"
    displaymodel:boolean=false
    displayaddeditmodel: boolean = false;
    selectedtechnicien:any =null;
    numTechniciens:number=0;
   tacheform:FormGroup;
   rendezvous:FormGroup;
    verif: any[] = [];
 



    constructor(private fb :FormBuilder ,private TechnicienService:TechnicienService , private confirmationService: ConfirmationService , private messageservice:MessageService) { 
         this.tacheform = this.fb.group({
        client_id:["",Validators.required],
        start:["",Validators.required],
        end: ["", [Validators.required, this.endDateAfterOrEqualValidator('start')]],
        verif:["",Validators.required],
        technicien_id:[localStorage.getItem('id'),Validators.required],

        
       
      })
      this.rendezvous = this.fb.group({
        client_id:[this.tacheform.value.client_id,Validators.required],
        plan:["",Validators.required],
        raison:["",Validators.required],
        technicien_id:[localStorage.getItem('id'),Validators.required],

        
       
      })
    }
    ngOnInit() {
      setTimeout(() => {
        this.showtaches();
      }, 500);



      
    }
    endDateAfterOrEqualValidator(controlName: string): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        // Vérifiez si this.tacheform est initialisé
        if (!this.tacheform) {
          return null;
        }
    
        // Utilisez la méthode get de FormGroup pour accéder aux valeurs du formulaire de manière sécurisée
        const startDateControl = this.tacheform.get(controlName);
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
    showAddModel(){
        this.displayaddeditmodel=true;
        this.selectedtechnicien = null;
        this.verif = [
          { label: 'verifier', value: 'yes' },
          { label: 'non verifier', value: 'no' },
        
      ];
    
      }
      hideAddModel(isclosed : boolean){
        this.displayaddeditmodel=!isclosed;
      }
      closeModel(){
        this.tacheform.reset();
        this.rendezvous.reset();
          this.displayaddeditmodel = false;
      this.displaymodel=false;
      }

      showeditModel(tache : Tache){
        this.displayaddeditmodel=true;
        this.selectedtechnicien = tache;
        this.Model='modifier';
        this.tacheform.patchValue(this.selectedtechnicien)
        this.verif = [
            { label: 'verifier', value: 'yes' },
            { label: 'non verifier', value: 'no' },
          
        ];
    
      }
      showModel(tache : Tache){
        this.displaymodel=true;
        this.selectedtechnicien = tache;
        this.Model='rendez-vous';
        this.rendezvous.patchValue(this.selectedtechnicien)

        }
      addrendezvous() {
        setTimeout(() => {
          this.rendezvous.value.plan=this.formatDate(this.rendezvous.value.plan)
          console.log(this.rendezvous.value.plan)
        this.TechnicienService.addrendezvous(this.rendezvous.value).subscribe(
          (response: any) => {
            // Check if the response contains a boolean success property
            const isSuccess: boolean = response && response.success === true;
            this.clickaddedit.emit(isSuccess);

            //window.location.reload();
            this.closeModel()
            this.messageservice.add({severity:'success',summary:'success', detail:'tache ajouté avec succès'})
            console.log(this.rendezvous.value)
          },
          error=>{
            this.messageservice.add({severity:'error',summary:'Error', detail:error.error
            })
            console.log(this.rendezvous.value)

            console.log('erreur')
          }

          
          
        );
      }, 1000);
      }
      addedittechnicien() {
        setTimeout(() => {
        this.TechnicienService.addedittache(this.tacheform.value , this.selectedtechnicien).subscribe(
          (response: any) => {
            // Check if the response contains a boolean success property
            const isSuccess: boolean = response && response.success === true;
            this.clickaddedit.emit(isSuccess);

            //window.location.reload();
            this.closeModel()
           
            this.Model==='ajouter' ? 'technicien ajouter ':'technicien modifier'
            
            this.messageservice.add({severity:'success',summary:'success', detail:'tache ajouté avec succès'})
            console.log(this.tacheform.value)
          },
          error=>{
            this.messageservice.add({severity:'error',summary:'Error', detail:error})
            console.log(this.tacheform.value)

            console.log('erreur')
          }

          
          
        );
      }, 1000);
      }
      deletetech(tache : Tache){
        this.confirmationService.confirm({
          message: 'Êtes-vous sûr de vouloir supprimer ce tàche?',
          accept: () => {
              this.TechnicienService.deletetache(tache.id).subscribe(
                response=>{
                  this.showtaches();
                  this.messageservice.add({severity:'success',summary:'success', detail:'tache supprimer avec succès'})
                },
                error=>{
                  this.messageservice.add({severity:'error',summary:'Error', detail:error})
    
                }
    
              )
          }
      });
      }

      showtaches() {
        this.TechnicienService.gettaches(localStorage.getItem('id')).subscribe(tache => {
            this.taches = tache.map((item: Tache) => {
                // Convert start and end dates to yyyy-mm-dd format
                if (item.start) {
                    item.start = this.formatDate(item.start);
                }
                if (item.end) {
                    item.end = this.formatDate(item.end);
                }
                return item;
            });
        });
    }

  
    
    formatDate(dateString: string): string {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = this.padZero(date.getMonth() + 1); // Months are zero-based
        const day = this.padZero(date.getDate());
        return `${year}-${month}-${day}`;
    }
    
    padZero(num: number): string {
        return num < 10 ? `0${num}` : `${num}`;
    }
    
    verified(verificationStatus: string): boolean {
        // If the verification status is "yes", return true; otherwise, return false
        return verificationStatus === 'yes';
    }
    calculateStatus(start: string | null, end: string | null): string {
      if (start && end) {
          return 'completed';
      } else if (start && !end) {
          return 'en cours';
      } else {
          return 'non commencé';
      }
  }
  
  

}