import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WebUploaderModule, WebUploaderConfig, Options, OptionsPick, OptionsThumb } from 'ngx-webuploader';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebUploaderModule.forRoot(<WebUploaderConfig>{
      options: <Options>{
          swf: './assets/webuploader-0.1.5/Uploader.swf',
          server: '/fileupload'
      },
      path: './assets/webuploader-0.1.5/',
      dependentLib: './assets/zepto.min.js',
      // hook 接收的是一个Promise对象，有且只有一个 WebUpload 参数。
      hook(webUploader: any): Promise<any> {
          return new Promise<any>(resolve => {
              webUploader.Uploader.register({
                  'add-file': 'addFiles'
              }, {
                  addFiles: (files: File[]) => {
                      console.log('from hook', files)
                  }
              });
          });
      }
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
