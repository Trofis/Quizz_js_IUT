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
          $("#liste_button").empty();
          var url = document.domain;
          for(var i=0;i<tasks.length;i++){
              console.log(tasks[i]);
              $('#quizz_list')
              .append($('<li class="list-group-item">')
              .append($('<a href='+url+"Quizz.html/"+tasks[i]["id"]+'>')
                  .text(tasks[i].title)
                  ).on("click", tasks[i], goTo)
              );

              $("#liste_button")
              .append($("<div class='btn-group ul_btn' role='group'>")
              .append($("<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModal'>")
              .text("modifier").on("click",tasks[i],modifier))
              .append($("<button type='button' class='btn btn-danger'>")
              .text("supprimer").on("click",tasks[i],supprimer)));

              // $("#liste_button")
              // .append($("<div class='list'>")
              // .append($("<button type='button' id='modifier' class='list-group-item'>")
              // .text("modifier")).on("click",tasks[i],modifier));
          }
        }

    function goTo(event)
    {
      $("#currenttask").empty();
      // formTask();
      // fillFormTask(event.data);
    }
    //
    // <div class="col-md-6">
    //   <input type="text" class="form-control" placeholder="Question" aria-describedby="basic-addon1">
    // </div>
    // <div class="col-md-6">
    //   <input type="text" class="form-control" placeholder="Réponse" aria-describedby="basic-addon1">
    //
    // </div>

    function modifier(event)
    {
      $("#title_modal").text(event.data.title);
      $("#title_quest").attr("placeholder", event.data.title);
      $("#questions").empty();
      let data = event.data.description
      for(var k in data)
      {
        $("#questions")
        .append($("<div class='col-md-5' role='group'>")
        .append($("<input type='text' class='form-control' placeholder="+k+" aria-describedby='basic-addon1'>")
        ));

        $("#questions")
        .append($("<div class='col-md-5' role='group'>")
        .append($("<input type='text' class='form-control' placeholder="+data[k]+" aria-describedby='basic-addon1'>")
        ));
        $("#questions")
        .append($("<div class='col-md-2' role='group'>")
        .append($("<button type='button' class='btn btn-default' aria-label='Left Align'>").append("<span class='glyphicon glyphicon-remove' aria-hidden='true'>").on("click",data[k],data,supprimerQuestion)
        ));
      }

      $("#SaveChanges").on("click", event.data, SaveChanges)
    }

    function SaveChanges() {
      alert("Save Changes");
    }

    function supprimerQuestion() {
      console.log("supprimerQuestion");
    }

    function supprimer(event)
    {
      console.log("event : ");
      let url = "http://localhost:3000/quizz/"+event.data.id;
      let init ={
        headers : {
          Accept : 'application/json',
          contentType: "application/json"
        },
        method : "DELETE"
      }
      fetch(url, init)
      .then(response =>
      {
        console.log("DELETE Success");
      })
      .catch(err => {console.warn(err)});

      refreshTaskList();
      refreshTaskList();
    }


    refreshTaskList();

});
