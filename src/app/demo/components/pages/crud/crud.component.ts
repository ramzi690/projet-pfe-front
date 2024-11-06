import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechnicienService } from 'src/app/demo/service/technicien.service';
import { Techniciens } from 'src/app/demo/api/techniciens';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClientService } from 'src/app/demo/service/client.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-techniciens',
  templateUrl: './crud.component.html',
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class CrudComponent implements OnInit {
  @Output() clickaddedit : EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() clickclose : EventEmitter<boolean> = new EventEmitter<boolean>()

  displayaddeditmodel: boolean = false;
  selectedtechnicien:any =null;
  numTechniciens:number=0;
  Model="ajouter"
  technicienform:FormGroup;
  places: any[] = [];
  specialites: any[] = [];
  constructor(private fb :FormBuilder ,private TechnicienService:TechnicienService , private confirmationService: ConfirmationService , private messageservice:MessageService) { 
    this.technicienform = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]], // Validator for email format
      tel: ["",  [Validators.required, Validators.pattern(/^\d{8}$/)]],
      cin: ["", [Validators.required, Validators.pattern(/^\d{8}$/)]], // Validator for 8 digits
      place: ["", Validators.required],
      specialite: ["", Validators.required],
    })
  }
techniciens : any;
  ngOnInit(): void {
    this.showtechniciens();
   
  }
  showtechniciens(){
     this.techniciens= this.TechnicienService.listtechniciens().subscribe(technicien=>{
      this.techniciens=technicien;
      this.numTechniciens = this.techniciens.length;
      console.log(this.numTechniciens)
      sessionStorage.setItem('numTechniciens', this.numTechniciens.toString())


      
      

     })
  }
  showAddModel(){
    this.Model='ajouter';

    this.displayaddeditmodel=true;
    this.selectedtechnicien = null;
    this.places = [
      { label: 'Sfax1', value: 'sfax1' },
      { label: 'Sfax2', value: 'sfax2' },
      { label: 'Sousse', value: 'sousse' },
      { label: 'Tunis', value: 'tunis' }
  ];
  this.specialites = [
    { label: 'specialite1', value: 'specialite1' },
    { label: 'specialite2', value: 'specialite2' },
    { label: 'specialite3', value: 'specialite3' },
    { label: 'specialite4', value: 'specialite4' }
];

  }
  hideAddModel(isclosed : boolean){
    this.displayaddeditmodel=!isclosed;
  }
  closeModel(){
    this.technicienform.reset();
    
      this.displayaddeditmodel = false;
  
  }
  saveupdatetechnicien(newdata : any){
   /*if(newdata===this.selectedtechnicien.id){
    const technicienid = this.techniciens.getbyid((data: { id: any; })=>data.id===newdata.id);
   this.techniciens[technicienid]=newdata
  }else{
    this.techniciens.unshift(newdata);
   }*/
  }
  showeditModel(technicien : Techniciens){
    this.displayaddeditmodel=true;
    this.selectedtechnicien = technicien;
    this.Model='modifier';
    this.technicienform.patchValue(this.selectedtechnicien)
    this.places = [
      { label: 'Sfax1', value: 'sfax1' },
      { label: 'Sfax2', value: 'sfax2' },
      { label: 'Sousse', value: 'sousse' },
      { label: 'Tunis', value: 'tunis' }
  ];
  this.specialites = [
    { label: 'specialite1', value: 'specialite1' },
    { label: 'specialite2', value: 'specialite2' },
    { label: 'specialite3', value: 'specialite3' },
    { label: 'specialite4', value: 'specialite4' }
];
  }
  addedittechnicien() {
    this.TechnicienService.addedittech(this.technicienform.value , this.selectedtechnicien).subscribe(
      (response: any) => {
        // Check if the response contains a boolean success property
        const isSuccess: boolean = response && response.success === true;
        this.clickaddedit.emit(isSuccess);
        //window.location.reload();
        this.closeModel()
       
        this.Model==='ajouter' ? 'technicien ajouter ':'technicien modifier'
        
        this.messageservice.add({severity:'success',summary:'success', detail:'Technicien ajouté avec succès'})
      },
      error=>{
        this.messageservice.add({severity:'error',summary:'Error', detail:error})
        console.log('erreur')
      }
      
    );
  }
  deletetech(technicien : Techniciens){
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce technicien?',
      accept: () => {
          this.TechnicienService.deletetech(technicien.id).subscribe(
            response=>{
              this.showtechniciens();
              this.messageservice.add({severity:'success',summary:'success', detail:'Technicien supprimer avec succès'})
            },
            error=>{
              this.messageservice.add({severity:'error',summary:'Error', detail:error})

            }

          )
      }
  });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(data, fileName + new Date().getTime() + '.xlsx');
  }
  downloadExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.prepareTableData());
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'list techniciens');
  }
  downloadPDF(): void {
    
}

  
  prepareTableData(): any[] {
    const data: any[] = [];
  
    // Iterate over the techniciens array and extract relevant data
    this.techniciens.forEach((technicien: any) => {
      console.log('Techniciens Data:', this.techniciens);
      const rowData: any = {
        'ID':technicien.id,
        'Name': technicien.name,
        'Email': technicien.email,
        'Tel': technicien.tel,
        'CIN': technicien.cin,
        'Place': technicien.place,
        'Specialite': technicien.specialite
        // Add more fields as needed
      };
      data.push(rowData);
    });
  
    return data;
  }
  pdflistclient() {
    this.TechnicienService.pdflisttechnicienss().subscribe((response: Blob) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      
      // Create a link and programmatically click it to trigger the download
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = 'techniciens_list.pdf';  // Set your desired file name here
      link.click();
  
      console.log('PDF downloaded');
    }, error => {
      console.error(error);
    });
  }




}
