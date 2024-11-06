import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/demo/service/client.service';
import { Client } from 'src/app/demo/api/client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TechnicienService } from 'src/app/services/technicien.service';
import { Techniciens } from 'src/app/demo/api/techniciens';
import * as jsPDF from 'jspdf';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

interface ExpandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-clients',
  templateUrl: './tabledemo.component.html',
  providers: [MessageService],
  styleUrls: ['./styles.css']
})
export class TableDemoComponent implements OnInit {
  clients: Client[] = [];
  articles: any;
  loading: boolean = false;
  expandedRows: ExpandedRows = {};
  displaymodel: boolean = false;
  selectedclient: any = null;
  numcommandes: number = 0;
  clientform: FormGroup;
  art:any
date:any
  constructor(
    private fb: FormBuilder,
    private messageservice: MessageService,
    private clientservice: ClientService,
    private TechnicienService: TechnicienService
  ) {
    this.clientform = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      place: ["", Validators.required],
      date_pref: ["", Validators.required],
      commande_id: ["", Validators.required],
      tech: ["", Validators.required],
    });
  }

  techform = this.fb.group({
    email: ["", Validators.required],
    tel: ["", Validators.required],
  });

  selectedtechid: any = null;
  message: string = 'Affectation client';
  message2: string = 'Affectation technicien';
  techniciens: Techniciens[] = [];

  ngOnInit(): void {
    this.showClients();
  }

  showClients(): void {
    this.clientservice.listclients().subscribe(clients => {
      this.clients = clients;
      this.numcommandes = this.clients.length;
      sessionStorage.setItem('nCommande', this.numcommandes.toString());
      console.log(this.numcommandes);
    });
  }

  closeModel(): void {
    this.displaymodel = false;
  }

  showModel(client: Client): void {
    console.log('***', client);
    this.art=client.commandes[0].commandearticle[0].article_id
    this.date=client.commandes[0].date
    this.displaymodel = true;
    this.selectedclient = client;
    this.clientform.patchValue(this.selectedclient);
    const techControl = this.clientform.get('tech');
    if (techControl) {
      techControl.valueChanges.subscribe((value) => {
        this.selectedtechid = value;
        this.techform.controls['email'].setValue(this.selectedtechid.email);
        this.techform.controls['tel'].setValue(this.selectedtechid.tel);
      });
    }
    this.showtechniciens();
    this.selectedtechid = this.clientform.get('tech');
    if (this.selectedtechid) {
      this.techform.patchValue(this.selectedtechid);
    }
  }

  hideModel(isclosed: boolean): void {
    this.displaymodel = !isclosed;
  }

  ngOnChanges(): void {
    if (this.selectedclient) {
      this.clientform.patchValue(this.selectedclient);
    }
  }
  addaffectation() {
    
      let obj = {
        article_id: this.art,
        commande_id: this.clientform.value.commande_id,
        client_id: this.selectedclient.id,
        technicien_id: this.selectedtechid.id
      };
      this.clientservice.addaffectation(obj).subscribe()

  }
  
  affecter(): void {
    let obj = {
      subject: this.message2,
      date: this.date,
      clientid:this.selectedclient.id,
      clientName: this.selectedclient.name,
      clientAddress: this.selectedclient.place,
      technicianName: this.selectedtechid.name,
      technicianPosition: this.selectedtechid.place,
      technicianContact: this.selectedtechid.tel
    };
    this.clientservice.emailclient(this.selectedclient.email, obj).subscribe(() => {
      console.log('Email envoyé au client :', this.selectedclient.email);
      this.messageservice.add({ severity: 'success', summary: 'Succès', detail: 'Technicien assigné avec succès !' });
      this.displaymodel = false;
    });

    this.addaffectation()
  }

  pdflistclient(): void {
    this.clientservice.pdflistclients().subscribe((response: Blob) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      
      // Créer un lien et cliquer dessus programmatically pour déclencher le téléchargement
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = 'liste_clients.pdf';  // Définissez le nom de fichier souhaité ici
      link.click();

      console.log('PDF téléchargé');
    }, error => {
      console.error(error);
    });
  }

  affecter2(): void {
    let obj = {
      subject: this.message,
      date: this.date,
      clientid:this.selectedclient.id,
      clientName: this.selectedclient.name,
      clientAddress: this.selectedclient.place,
    };
    this.clientservice.emailtechnicien(this.selectedtechid.email, obj).subscribe(() => {
      console.log('Email envoyé au technicien :', this.selectedtechid.email);
    });
  }

  showtechniciens(): void {
    this.TechnicienService.listtechniciens().subscribe(technicien => {
      this.techniciens = technicien;
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
    this.saveAsExcelFile(excelBuffer, 'liste_commandes');
  }

  prepareTableData(): any[] {
    const datatable = this.clients.map(client => ({
      id: client.id,
      name: client.name,
      email: client.email,
      place: client.place,
      date_pref: client.date_pref,
      commande_id: client.commande_id
    }));
    return datatable;
  }
}
