$(function(){
  $("#tabs").tabs();
  
  var arr_questions = [], arr_answers = [], arr_comments = [], arr_marks = [], 
  arr_li = [], i, num = 1, tab, sel;
  var arr = ($("p.num").html()).split(',');
  //alert('n = '+arr[0]+', id = '+arr[1]);
  for (i=1;i<arr[0]+1;i++) { 
      arr_li.push('li'+i);
  }

  $('#tabs ul li a').click(function() {
      var color = 'white';
      if (arr_marks[num-1] == 'green') color='green';
      if (arr_marks[num-1] == 'red') color='red';
      if (arr_marks[num-1] == 'yellow') color='yellow';
      $("a#ui-id-"+num).css("background",color);
  	  tab = $(this).html();
      arr_comments[num-1] = $("div#tabs div#tabs-"+num+" textarea").val();
      //alert(arr_comments);
  		num = parseInt(tab);
      if (arr_marks[num-1] == 'green') $("#mark_green-"+num).prop("checked",true);
      if (arr_marks[num-1] == 'red') $("#mark_red-"+num).prop("checked",true);
      if (arr_marks[num-1] == 'yellow') $("#mark_yellow-"+num).prop("checked",true);

    $.ajax({
      type: 'POST',
      url: 'http://192.168.56.101:3000/app/controllers/interviews_controller.rb',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ interview_id: arr[1], question_id: num-1,
                            comment: arr_comments[num-2], mark: arr_marks[num-2] }),
      success: function(json) { alert(json); },
      error: function(jqXHR, textStatus, errorThrown){
                // Функция при ошибочном запросе
                alert('Ajax request failed', jqXHR, textStatus, errorThrown);
            }
    });

  });

  $("input[name='mark']").click(function() {
    var id_radio = $(this).attr("id");
    var color_radio = id_radio.charAt(5);
    if (color_radio=='g') arr_marks[parseInt(id_radio.slice(11))-1]='green';
    if (color_radio=='y') arr_marks[parseInt(id_radio.slice(12))-1]='yellow';
    if (color_radio=='r') arr_marks[parseInt(id_radio.slice(9))-1]='red';
    //alert(arr_marks);
  });
  
});