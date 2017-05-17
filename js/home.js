$(function() {

    $("#button").click(refreshTaskList);

    function refreshTaskList(){
        $("#quizz_list").empty();
        let url = "http://localhost:3000/quizz";
        fetch(url)
        .then(response =>
        {
          if (response.ok)
          {
            console.log("nice !");
            return response.json();
          }
          else
            throw new Error('Pb ajax :'+response.status);
        })
        .then(response => {
          remplirTaches(response);
        });
        }

        function remplirTaches(tasks)
        {
          $('#quizz_list').empty();
          var url = window.location.href;
          for(var i=0;i<tasks.length;i++){
              console.log(tasks[i]);
              $('#quizz_list')
              .append($('<li class="list-group-item">')
              .append($('<a href='+url+tasks[i]["id"]+'>')
                  .text(tasks[i].title)
                  ).on("click", tasks[i], goTo)
              );
          }
        }

    function goTo(event){
        $("#currenttask").empty();
        // formTask();
        // fillFormTask(event.data);
        }


    refreshTaskList();

});
