import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent {

    name: string = 'Chanakan'
    box = ['A',10,true]
    value = []
    user_id:number = 0
    addDialog : boolean = false
    edit: boolean = false
    Uid : number

    dStatus:boolean = false
    
    data = [
        {
            'id': 1,
            'name': 'Emil',
            'age': '16',
        },
        {
            'id': 2,
            'name': 'Tobias',
            'age': '14',
        },
    ]

    dataSourceUser:any = []

    ngOnInit() {
        this.CreateForm()
        console.log(this.box)
        this.calculate()

        this.getAll()
    }

    constructor(
        private ApiService: ApiService,
        private MessageService: MessageService,
        private ConfirmationService: ConfirmationService,
        private FormBuilder : FormBuilder,
    ){}

    calculate() {
        let P = 2500
        let sum = 7/100*P
        console.log(sum.toFixed(2))
        console.log(sum)
    }

    getAll() {
        this.ApiService.getUser().subscribe({
            next: (res) => {
                this.dataSourceUser = res
                console.log(`dataSourceUser`,this.dataSourceUser)
            },
            error: (err: Error) => {
                console.log(err)
                this.MessageService.clear()
                this.MessageService.add(
                    {
                        key: 'toas',
                        severity: 'error',
                        summary: 'เกิดข้อผิดพลาด',
                        detail: 'โปรดตรวจสอบการเชื่อมต่อเซิร์ฟเวอร์',
                    }
                )
            },
            complete: () => {},
        })
    }

    openAddDialog() {
        this.FormData.reset()
        this.addDialog = true
        this.edit = false
    }
    
    openEditDialog(item) {
        // this.FormData.reset()
        // this.addDialog = true
        // this.edit = false

        if(!this.dStatus) {
            this.addDialog = true
            this.edit = true
            this.getById(item)
        }
        
    }

    save(formValue) {
        console.log(formValue.value)
        let data = formValue.value
        this.ApiService.create(data).subscribe({
            next: (res) => {
                console.log(res)
                if (res['message'] == 'Code has been used') {
                    this.MessageService.add({
                        key: 'toas',
                        severity: 'warn',
                        summary: 'คำเตือน',
                        detail: 'ข้อมูลซ้ำ รหัสนี้อาจถูกใช้ไปแล้ว',
                        closable: false
                    })
                } else {
                    this.MessageService.add({
                        key: 'toas',
                        severity: 'success',
                        summary: 'สำเร็จ',
                        detail: 'การบันทึกข้อมูลเสร็จสมบูรณ์แล้ว',
                        closable: true
                    })
                    setTimeout(() => {
                        this.FormData.reset()
                        this.addDialog = false
                    }, 1000)
                }

            },
            error: (err: Error) => {
                console.log(err)
                this.MessageService.clear()
                this.MessageService.add({
                    key: 'toas',
                    severity: 'error',
                    summary: 'เกิดข้อผิดพลาด',
                    detail: 'โปรดตรวจสอบการเชื่อมต่อเซิร์ฟเวอร์',
                })
            },
            complete: () => {
                this.getAll()
            },
        })
    }

    getById(item) {
        
        console.log(item)
        let id = item.id

        this.ApiService.getUserById(id).subscribe({
            next: (res) => {
                console.log(res);
                let data = res['user'];

                let h = this.FormData.controls;
                this.Uid = data['id']
                console.log(this.Uid)
                h['id'].setValue(data['id']);
                h['fname'].setValue(data['fname']);
                h['lname'].setValue(data['lname']);
                h['username'].setValue(data['username']);
                h['password'].setValue(data['password']);
                h['email'].setValue(data['email']);
                h['avatar'].setValue(data['avatar']);
            },
            error: (err: Error) => {
                console.log(err);
                this.MessageService.clear();
                this.MessageService.add({
                    key: 'toas',
                    severity: 'error',
                    summary: 'เกิดข้อผิดพลาด',
                    detail: 'โปรดตรวจสอบการเชื่อมต่อเซิร์ฟเวอร์',
                });
            },
            complete: () => {
                // this.addDialog = true
                // this.edit = true
            },
        })
    }
        

    update(formValue) {
        console.log(formValue.value)
        let data = formValue.value
        this.ApiService.update(data).subscribe({
            next: (res) => {
                console.log(res)
                if (res['message'] == 'Code has been used') {
                    this.MessageService.add({
                        key: 'toas',
                        severity: 'warn',
                        summary: 'คำเตือน',
                        detail: 'ข้อมูลซ้ำ รหัสนี้อาจถูกใช้ไปแล้ว',
                        closable: false
                    })
                } else {
                    this.MessageService.add({
                        key: 'toas',
                        severity: 'success',
                        summary: 'สำเร็จ',
                        detail: 'การบันทึกข้อมูลเสร็จสมบูรณ์แล้ว',
                        closable: true
                    })
                    setTimeout(() => {
                        this.FormData.reset()
                        this.addDialog = false
                    }, 1000)
                }

            },
            error: (err: Error) => {
                console.log(err)
                this.MessageService.clear()
                this.MessageService.add({
                    key: 'toas',
                    severity: 'error',
                    summary: 'เกิดข้อผิดพลาด',
                    detail: 'โปรดตรวจสอบการเชื่อมต่อเซิร์ฟเวอร์',
                })
            },
            complete: () => {
                this.getAll()
            },
        })
    }

    deleteUser(item) {
        this.dStatus = true
        console.log(item)
        let Body ={
                body: {
                'id': item.id
            },
        }
        console.log(Body)
        // console.log(typeof x.id)
        this.ConfirmationService.confirm({
            header: 'ยืนยันการลบ',
            icon: 'pi pi-info-circle',
            message: `คุณต้องการลบผู้ใช้ `,
            accept: () => {
                this.ApiService.deleteUser(Body).subscribe({
                    next: (res) => {
                        console.log(res)
                        // if (res['status'] == 'ok') {
                        //     this.MessageService.add({ 
                        //         key: 'toas', 
                        //         severity: 'success', 
                        //         summary: 'สำเร็จ', 
                        //         detail: "การลบข้อมูลเสร็จสมบูรณ์แล้ว" 
                        //     });
                        // } 
                    },
                    error: (err: Error) => {
                        console.log(err)
                        // this.MessageService.clear()
                        // this.MessageService.add({
                        //     key: 'toas',
                        //     severity: 'error',
                        //     summary: 'เกิดข้อผิดพลาด',
                        //     detail: 'โปรดตรวจสอบการเชื่อมต่อเซิร์ฟเวอร์',
                        // })
                    },
                    complete: () => {
                        this.dStatus = false
                        this.getAll()
                    },
                })
            }
        });
    }

    FormData : FormGroup
    get h() { 
        return this.FormData.controls;
    }

    CreateForm() {
        this.FormData = this.FormBuilder.group ({
            id: new FormControl(),
            fname: new FormControl(),
            lname: new FormControl(),
            username: new FormControl(),
            password: new FormControl(),
            email: new FormControl(),
            avatar: new FormControl(),
        })
    }
}
