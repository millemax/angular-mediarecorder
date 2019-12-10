import { Component, ViewChild } from '@angular/core';

declare var MediaRecorder: any;




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   
 mediaRecorder:any;
 url:any;
 
  
  @ViewChild('video',{static:false}) video;
  @ViewChild('video2',{static:false}) video2;

  title = 'clouddelivery';
  
  constructor(){}


grabar(){
    navigator.mediaDevices.getUserMedia({audio:true,video:true})
          .then(this.record.bind(this))
          .catch(error=> console.log("error al obtener la camara"));
  }
  
record(stream){
     let chunks=[];
    
    console.log("captando el stream");
    let video: HTMLVideoElement = this.video.nativeElement;
    let video2: HTMLVideoElement = this.video2.nativeElement;
    video.srcObject=stream;

    //les dara un error mediarecorder esto lo soluciona solo ejecutenlo
    // npm install -D @types/dom-mediacapture-record
     this.mediaRecorder= new MediaRecorder(stream,{
      mimeType: 'video/webm;codecs=h264'
    })

    //inicia con el proceso de grabacion
    this.mediaRecorder.start();

  //producir una archivo final
    this.mediaRecorder.ondataavailable=function(e){

        chunks.push(e.data)
    }

  //cuando finaliza la grabacion guarda el archivo en un tipo blob  que esta guardado en el chunks
    this.mediaRecorder.onstop=function(){

      
      let blob= new Blob(chunks,{type:"video/webm"});
      chunks=[];  

      // convirtiendo en una url  el video 
      this.url=window.URL.createObjectURL(blob);
      video2.src= this.url;
      console.log("grabacion finalizada");


    }

   // setTimeout(()=>this.mediaRecorder.stop(),5000);


  }

  parar(){
    let video: HTMLVideoElement = this.video.nativeElement;
    video.srcObject=null;
    this.mediaRecorder.stop();
    console.log("finalizar grabacion")
  }

  desechar(){
    let video2: HTMLVideoElement = this.video2.nativeElement;
    video2.src=null;
    console.log("Desechado")
    
  }


}
