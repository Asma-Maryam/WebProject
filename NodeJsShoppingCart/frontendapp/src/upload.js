
import $ from 'jquery';

  function CheckFile()
  {
      alert("");
      $("#fileUpload").bind('change', function () {         
          //this.files[0].size gets the size of your file.           
      $("#picname").html(this.files[0].name);
      });
  }

  function ShowImagePreview(imageUploader, previewImage) {
      if (imageUploader.files && imageUploader.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
              $(previewImage).attr('src', e.target.result);
          }
          reader.readAsDataURL(imageUploader.files[0]);
      }
  }

