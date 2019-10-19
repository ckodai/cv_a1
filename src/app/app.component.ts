import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var cv: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ngpog';
  Canvas: HTMLCanvasElement;
  Video: HTMLVideoElement;
  srcMatFrame: any;
  dstMatFrame: any;
  cap: any
  FPS = 30;

  constructor(){

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.Canvas = <HTMLCanvasElement> document.getElementById("CanvasRenderer");
    this.Video = <HTMLVideoElement> document.getElementById("VideoInput");

    this.srcMatFrame = new cv.Mat(this.Video.height, this.Video.width, cv.CV_8UC4);
    this.dstMatFrame = new cv.Mat(this.Video.height, this.Video.width, cv.CV_8UC4);
    this.cap = new cv.VideoCapture(this.Video);

    //Read the first frame
    this.cap.read(this.srcMatFrame);

    cv.imshow('CanvasRenderer', this.srcMatFrame);

    //setTimeout(this.process_frame, 0);
  }

  process_frame() {
    try {
      let begin = Date.now();
      cv.imshow('CanvasRenderer', this.srcMatFrame);
      this.cap.read(this.srcMatFrame);

      let delay = 1000/this.FPS - (Date.now() - begin);
      setTimeout(this.process_frame, delay);
    } catch(error) {
      console.log(error);
    }
  }
}
