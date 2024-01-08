import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  AfterContentInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent
  implements OnInit, OnChanges, AfterContentInit, OnDestroy
{
  counter = 0;
  conunterSub: number | undefined;
  constructor() {
    console.log('Constructor', 'image:', this.img);
  }

  img: string = '';
  alt: string = '';

  @Input() set changeImage(newImag: string) {
    this.img = newImag;
    console.log('change just image');
  }
  @Input() set changeAlt(newAlt: string) {
    this.alt = newAlt;
  }

  @Output() imgLoaded = new EventEmitter<string>();

  imageDefault = '../../../assets/image/default.jpg';

  ngOnInit(): void {
    //async --once time
    console.log('on init', 'image', this.img);

    // this.conunterSub = window.setInterval(() => {
    //   this.counter += 1;
    //   console.log('run counter');
    // }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //changes all time
    console.log('onchange', 'image', this.img);

    console.log('changes', changes);
  }

  ngAfterContentInit(): void {
    //after rendering
    //handle songs
    console.log('after init', 'image', this.img);
  }

  ngOnDestroy(): void {
    //Caundo se elemina el componente
    //Limpieza
    // window.clearInterval(this.conunterSub);
    console.log('on destriy');
  }

  handleErrorImage() {
    this.img = this.imageDefault;
  }

  handleLoad() {
    console.log('Image loaded');

    this.imgLoaded.emit('kenyi');
  }
}
