

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
      .append($("<button type='button' class='btn btn-default' aria-label='Left Align'>").append($("<span class='glyphicon glyphicon-remove' aria-hidden='true'>")).on("click",supprimerQuestion)
      ));

      $("#questions").append($("<div id='plus' class='col-md-12' role='group'>").append($("<button type='button' class='btn btn-default' aria-label='Left Align'>").append("<span class='glyphicon glyphicon-plus' aria-hidden='true'>").on("click",ajouterQuestion)));

    }

    function Task(title, description, uri, id){
        this.title = title;
        this.description = description;
        this.uri = uri;
        this.id = id;
    }

    function SaveChanges(event) {
      let dico = {};
      let dicoKey;
      let data = event.data;
      let i = 0;
      $("#questions > div > input").each(function()
      {

        if (i%2 == 0)
        {
          if (this.value == "" || typeof this.value === 'undefined' || this.value == "undefined")
            dicoKey = this.placeholder;
          else
            dicoKey = this.value;
        }
        else
        {
          if (this.value == "" || typeof this.value === 'undefined' || this.value == "undefined")
            dico[dicoKey] = this.placeholder;
          else
            dico[dicoKey] = this.value;
        }
        i++;
      });
      var formdata = new FormData();
      //console.log("dico");

      formdata.append( "json" , JSON.stringify({title : data.title, description : dico, uri : data.uri, id : data.uri})  );
      let url = data.uri;
      let init =
      {
        method : "PUT",
        body : formdata
      };
      fetch(url, init)
      .then(response =>
      {
        console.log("Update Success");
      })
      .catch(err => {console.warn(err)});

      setTimeout(refreshTaskList, 100);
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
