import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  today: any;
  task: any = { datetime: Date.now() };
  tasksList: any = [];

  firebaseDBRef: any = firebase.database().ref('/todo');

  constructor(public loadingCtrl: LoadingController) {
    this.today = new Date().toISOString();
  }

  ionViewDidLoad() {
    this.getAllTask();
  }

  getAllTask() {
    this.firebaseDBRef.on('value', tasksnap => {
      let tmp = [];
      tasksnap.forEach(taskData => {
        tmp.push({ key: taskData.key, ...taskData.val() })
      });
      this.tasksList = tmp;
      console.log(this.tasksList);
    })
  }

  addTask() {
    this.task.createdAt = new Date();
    this.task.isCompleted = false;
    this.firebaseDBRef.push(this.task);
  }

  updateTask(key) {
    this.firebaseDBRef.child(key).update({ isCompleted: true });
  }

  deleteTask(key) {
    this.firebaseDBRef.child(key).remove()
  }


}
