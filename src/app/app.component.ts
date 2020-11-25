import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { WebUploaderComponent, File, FileStatus } from 'ngx-webuploader';
 
// 注意：声明$有效
declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  onReady(uploader: WebUploaderComponent) {
      let $list = $('#thelist'),
          state = 'pending',
          $btn = $('#ctlBtn');

      // 注意：这里必须使用 uploader.Instance 来表示 WebUpload真实的实例对象。
      // 后续所有操作同官网完全一样，可以参数官网
      uploader.Instance
          // 当有文件添加进来的时候
          .on('fileQueued', (file: File) => {
              console.log('我这里是可以输出的')
              $list.append( '<div id="' + file.id + '" class="item">' +
                  '<h4 class="info">' + file.name + '</h4>' +
                  '<p class="state">等待上传...</p>' +
              '</div>' );
          })
          // 文件上传过程中创建进度条实时显示。
          .on('uploadProgress', (file: File, percentage: number) => {
              let $li = $( '#'+file.id ),
                  $percent = $li.find('.progress .progress-bar');

              // 避免重复创建
              if ( !$percent.length ) {
                  $percent = $('<div class="progress progress-striped active">' +
                  '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                  '</div>' +
                  '</div>').appendTo( $li ).find('.progress-bar');
              }

              $li.find('p.state').text('上传中');

              $percent.css( 'width', percentage * 100 + '%' );
          })
          .on('uploadSuccess', (file: File) => {
              $( '#'+file.id ).find('p.state').text('已上传');
          })
          .on('uploadError', (file: File) => {
              $( '#'+file.id ).find('p.state').text('上传出错');
          })
          .on('uploadComplete', (file: File) => {
              $( '#'+file.id ).find('.progress').hide();
          })
          .on('all', (type: string) => {
              if ( type === 'startUpload' ) {
                  state = 'uploading';
              } else if ( type === 'stopUpload' ) {
                  state = 'paused';
              } else if ( type === 'uploadFinished' ) {
                  state = 'done';
              }

              if ( state === 'uploading' ) {
                  $btn.text('暂停上传');
              } else {
                  $btn.text('开始上传');
              }
          })
      ;

      $btn.on( 'click', () => {
          if ( state === 'uploading' ) {
              uploader.Instance.stop();
          } else {
              uploader.Instance.upload();
          }
      });
  }

  onDestroy() {
      console.log('onDestroy');
  }
}
