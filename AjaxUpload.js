var files;
var fId;
var progressCont = [];
var previousContContents = '';
var fileStatus = [];

async function AjaxUpload(formId, fileId, uploadProgress){
  files=[];
  progressCont = [];
  previousContContents = document.getElementById(uploadProgress).innerHTML;

  files = document.getElementById(fileId).files;
  fId=fileId;

  if(files.length<1)
  {
    return;
  }

  //disable all the inputs on the form
  var forms = document.getElementById(formId);
  var input = forms.querySelectorAll("button,input,textarea");
  for (var y = 0; y < input.length; y++) {
    input[y].disabled = 'disabled';
  }


  for (var i=0; i<files.length; i++){
    progressCont[i]=0;
    fileStatus[i] = '';

    var frm = document.getElementById(formId);
    var data = new FormData(frm);
    data.delete('file');
    data.append('file', files[i]);

    uploadData(data, i , formId, uploadProgress)
  }

}





async function uploadData(dataForm, index, formId, uploadProgress)
{

  var request = new XMLHttpRequest();

  request.open('post', document.getElementById(formId).getAttribute("action"));
  request.upload.addEventListener('progress', function(e) {

    var percent_complete = (e.loaded / e.total)*100;
    percent_complete = percent_complete | 0; // change to int

    progressCont[index]=percent_complete;

    progressString='';
    for(i=0;i<progressCont.length;i++)
    {
      if (progressCont[i]>99){
        color='#3498DB';
        progressString +=
         "<div>" +
          "<div style='width:100px;display:inline-block;padding:0;border-radius:3px;margin:0;border:1px solid #ccc;'>" +
            "<div style='background:"+color+";display:inline-block;border-radius:3px;height:5px;width:" + progressCont[i] +"px;'>" + "</div>"+
          "</div>" +
        "</div>" +
        " " + "<div style=display:inline-block; id=fileStatus"+i+">"+ fileStatus[i] + "</div>" + files[i].name + "<br><br>";
      }
      else {
        color='#58D68D';
        progressString +=
         "<div>" +
          "<div style='width:100px;display:inline-block;padding:0;border-radius:3px;margin:0;border:1px solid #ccc;'>" +
            "<div style='background:"+color+";display:inline-block;border-radius:3px;height:5px;width:" + progressCont[i] +"px;'>" + "</div>"+
          "</div>" +
        "</div>" +
        " " + files[i].name + "<br><br>";
      }

      if(i===progressCont.length-1)
      {
        progressString += previousContContents;
      }
    }

    document.getElementById(uploadProgress).innerHTML = progressString;
  });

  request.addEventListener('load', function(e) {
    console.log(request.status);
    console.log(request.response);
    if (request.response ==='ok')
    {
      fileStatus[index]='<font style=color:green>&#10004; </font>';
    }
    else
    {
      fileStatus[index] = '<font style=color:red>&#128473; </font>' + request.response;
    }

    document.getElementById('fileStatus'+index).innerHTML = fileStatus[index];



    //Enable inputs if all files are uploaded
    var check=1;
    for (i=0;i<files.length;i++)
    {
      if (progressCont[i]<100)
      {
        check=0;
        break;
      }
    }
    if (check===1){
      //Enable all the inputs on the form
      var forms = document.getElementById(formId);
      var input = forms.querySelectorAll("button,input,textarea");
      for (var y = 0; y < input.length; y++) {
        input[y].disabled = '';
      }
      document.getElementById(fId).value='';

    }




  });
  request.send(dataForm);

}




function truncate(n, len) {
    var ext = n.substring(n.lastIndexOf(".") + 1, n.length).toLowerCase();
    var filename = n.replace('.' + ext,'');
    if(filename.length <= len) {
        return n;
    }
    filename = filename.substr(0, len) + (n.length > len ? '...' : '');
    return filename + '.' + ext;
};
