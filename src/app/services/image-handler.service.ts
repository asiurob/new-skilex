import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageHandlerService {

  constructor() { }

  handler( file: any,  inSize?: number, inWidth?: number, inHeight?: number ): Promise<any> {
    if ( !file ) {
      return new Promise( (res: any, rej: any) => rej( 'No se recibió la imágen' ) );
    }

    const imageType = /image.*/;
    if ( !file.type.match( imageType) ) {
      return new Promise( (res: any, rej: any) => rej( 'El archivo recibido no es una imagen' ) );
    }

    if ( inSize ) {
      const KBIn   = Math.ceil( inSize );
      const KBFile = Math.ceil( file.size / 1024 );
      if ( KBIn < KBFile ) {
        return new Promise( (res: any, rej: any) => rej( `Peso de fichero excedido. Permitido ${ KBIn }KB, enviado ${ KBFile }KB.` ) );
      }
    }

    const reader: any = new FileReader();
    const img: any    = new Image();

    reader.readAsDataURL( file );

    const imgPromise = new Promise( (resolve: any) => {
      img.onload = () => {
          resolve( { width: img.width, height: img.height } );
      };
    });

    const onloadPromise = new Promise( (resolve: any) => {
      reader.onload = () => {
        if ( inHeight && inWidth ) {

          img.src = reader.result;
          imgPromise.then( (res: any) => {
            if ( res.width > inWidth || res.height > inHeight ) {
              resolve( `Archivo sobredimensionado. Actual: ${ res.width }x${res.height}. Permitido: ${inWidth}x${inHeight}` );
            } else {
              resolve(reader.result);
            }
          });

        } else {
          resolve(reader.result);
        }
      };
    });

    return onloadPromise;
  }


}
