<script src=AjaxUpload.js></script>





<form id="FormId" action="upload.php" method="post" enctype="multipart/form-data">
  <input name="file" type="file" id="FileId" multiple>
  <button type="button" onclick="AjaxUpload('FormId', 'FileId', 'uploadProgress');"/>Upload</button>
</form>
<div id=uploadProgress></div>
