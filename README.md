# AJAX-Multiple-File-Uploader
Simple pure AJAX file uploader with progress bar, capable of uploading multiple files.


# How to use this code?
1. Simply add 'AjaxUpload.js' to your page:
```html
<script src=AjaxUpload.js></script>
```

2. Create a form containing at least a file input and a button and pass the IDs to the 'AjaxUpload()' functions, along with the ID of a DIV to show the results:
```html
<form id="FormId" action="upload.php" method="post" enctype="multipart/form-data">
  <input name="file" type="file" id="FileId" multiple>
  <button type="button" onclick="AjaxUpload('FormId', 'FileId', 'uploadProgress');"/>Upload</button>
</form>
<div id=uploadProgress></div>
```

3. At the back-end, 
