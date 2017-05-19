

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
      let data = event.data;
      $("#title_modal").text(event.data.title);
      $("#title_quest").attr("placeholder", event.data.title);
      $("#questions").empty();
      let datas = event.data.description
      for(var k in datas)
      {
        $("#questions")
        .append($("<div class='col-md-5' role='group'>")
        .append($("<input type='text' class='form-control'  aria-describedby='basic-addon1'>").attr("placeholder", k)
        ));

        $("#questions")
        .append($("<div class='col-md-5' role='group'>")
        .append($("<input type='text' class='form-control' placeholder="+datas[k]+" aria-describedby='basic-addon1'>")
        ));
        $("#questions")
        .append($("<div class='col-md-2' role='group'>")
        .append($("<button type='button' class='btn btn-default' aria-label='Left Align'>").append("<span class='glyphicon glyphicon-remove' aria-hidden='true'>").on("click",datas[k],data,supprimerQuestion)
        ));
      }

      $("#questions").append($("<div id='plus' class='col-md-12' role='group'>").append($("<button type='button' class='btn btn-default' aria-label='Left Align'>").append("<span class='glyphicon glyphicon-plus' aria-hidden='true'>").on("click",ajouterQuestion))
    );

      $("#SaveChanges").on("click",data, SaveChanges)
    }

    function ajouterQuestion()
    {
      $("#plus").remove();
      $("#questions")
      .append($("<div class='col-md-5' role='group'>")
      .append($("<input type='text' class='form-control question'  aria-describedby='basic-addon1'>")
      ));

      $("#questions")
      .append($("<div class='col-md-5' role='group'>")
      .append($("<input type='text' class='form-control reponse' aria-describedby='basic-addon1'>")
      ));
      $("#questions")
      .append($("<div class='col-md-2' role='group'>")
      .append($("<button type='button' class='btn btn-default' aria-label='Left Align'>").append("<span class='glyphicon glyphicon-remove' aria-hidden='true'>").on("click",supprimerQuestion)


      ));

      $("#questions").append($("<div id='plus' class='col-md-12' role='group'>").append($("<button type='button' class='btn btn-default' aria-label='Left Align'>").append("<span class='glyphicon glyphicon-plus' aria-hidden='true'>").on("click",ajouterQuestion)));

    }

    function Task(title, description, uri){
        this.title = title;
        this.description = description;
        this.uri = uri;
        console.log(this.uri);
    }

    function SaveChanges(event) {
      let dico = {};
      let dicoKey;
      let data = event.data;
      $("#questions").children("input").each(function()
      {
        console.log(this);
        if (this.value.attr("class") == "form-control question")
        {
          if (this.value.text() == "" || typeof this.value.text() === 'undefined')
            dicoKey = this.value.attr("placeholder");
          else
            dicoKey = this.value.text();
        }
        else
        {
          console.log("text");
          console.log(this.value.text());
          if (this.value.text() == "" || typeof this.value.text() === 'undefined')
            dico[dicoKey] = this.value.attr("placeholder");
          else
            dico[dicoKey] = this.value.text();
        }
      });
      var formdata = new FormData();
      //console.log("dico");
      //console.log(dico);
      var task = new Task(
        data.title,
        dico,
        data.uri
      );
      formdata.append("json", JSON.stringify(task));
      let url = task.uri;
      let init =
      {
        headers : {
          Accept : 'application/json',
          contentType: "application/json"
        },
        method : "PUT",
        body : formdata
      };
      fetch(url, init)
      .then(response =>
      {
        console.log("Update Success");
      })
      .catch(err => {console.warn(err)});
      refreshTaskList();
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
