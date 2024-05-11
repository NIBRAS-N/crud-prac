import { Component,ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})


export class AppComponent {
  @ViewChild('hello') model:ElementRef<HTMLInputElement> | undefined  

  studentObj:Student = new Student();

  studentList:Student[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const localInf = localStorage.getItem("crud");
    if(localInf != null){
      this.studentList = JSON.parse(localInf);
    }
  }

  openModel(){
    if(this.model != null)this.model.nativeElement.style.display="block";
  }
  closeModel(){
    this.studentObj = new Student();
    if(this.model != null)this.model.nativeElement.style.display="none";
    this.ngOnInit();
  }
  
  saveStudent(){
    debugger;
    const localData = localStorage.getItem("crud");
    if(localData != null && localData != "undefined"){
      const oldData = JSON.parse(localData!)
      this.studentObj.id = oldData.length + 1;
      oldData.push(this.studentObj);
      localStorage.setItem("crud",JSON.stringify(oldData));
    }else{
      const newData = this.studentObj;
      this.studentObj.id = 1;
      const newArr = [];
      newArr.push(newData);
      localStorage.setItem("crud",JSON.stringify(newArr));
    }
    this.closeModel();
    this.ngOnInit();
  }

  onDelete(item: Student) {
    const isDelet = confirm("Are you sure want to Delete");
    if(isDelet) {
      
      const currentRecord =  this.studentList.findIndex(m=> m.id === item.id);
      this.studentList.splice(currentRecord,1);
      let i=1;
      this.studentList.forEach((item)=>item.id=i++);
      localStorage.setItem('crud', JSON.stringify(this.studentList));
    }
  }
  onEdit(item: Student) {
    this.studentObj =  item;
    this.openModel();
  }

  updateStud() {
    // const currentRecord:any =  this.studentList.find(m=> m.id === this.studentObj.id);
    // if(currentRecord != undefined) {
    //   currentRecord.name = this.studentObj.name;
    //   currentRecord.address =  this.studentObj.address;
    //   currentRecord.mobileNo =  this.studentObj.mobileNo;
    // };
    // this.studentList[this.studentObj.id-1]=currentRecord;
    // console.log(this.studentObj.id);
    localStorage.setItem('crud', JSON.stringify(this.studentList));
    this.closeModel()
  }
}
export class Student{
  id: number=0;
  name: string = "";
  mobileNo: string="";
  email: string="";
  city: string = "";
  state: string = "";
  pincode: string = "";
  address: string = "";
  constructor(){}
}