<!DOCTYPE html>
<html>
<head>
<script src="http://code.jquery.com/jquery.min.js"></script>
<link href="http://getbootstrap.com/dist/css/bootstrap.css" rel="stylesheet" type="text/css" />
<script src="http://getbootstrap.com/dist/js/bootstrap.js"></script>
  
<script>
$(function() {
      $('button#submit').click(function(){
        //alert($('#input').val());
        ExecuteThisPost();
      });
        
      
function ExecuteThisPost()
            {
              var parameterList = [];
              var parameterDTO = {};
              var result;
              var data = null;
                      
              parameterDTO.ExecuteThis = "extractThis";
              parameterList.push(parameterDTO);
          
              parameterList = JSON.stringify(parameterList);
              
              
              
              $.ajax({
                  'type': 'PUT',
                  'global': false,
                  'async': false,
                  'url': '/executeThis',
                  'data': $('#input').val(),
                  'success': function(data) {
                      result = data;
                      alert(result);
                    console.log('SUCCESS : '+result);
                  },
                  'error': function(result) {
                      alert('Failed\n--------' + result);
                      console.log(result.msg);
                  }
              });
            }  

    
});
  </script>  
 
<meta charset=utf-8 />
<title>JS Bin</title>
</head>
<body>
  <div class="container">
    <div class="row">
        <div class="col-md-12">
            <legend>Test the API</legend>
            <label>Insert JSON</label>
            <div>
                <textarea id="input" class="span"></textarea>
            </div>
            <p>
                <button id="submit" class="btn btn-default">Submit</button>
            </p>
        </div>
    </div>
</div>
</body>
</html>