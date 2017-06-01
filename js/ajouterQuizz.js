$( "#ajouterQuestRes" ).click(function() {
  $("#QuestRes")
  .append($("<div>")
  .append($("<div class='col-md-5'>")
  .append($("<input type='text' style='margin-top:1%;' class='form-control'>").attr("placeholder","Question ?")))
  .append($("<div class='col-md-5'>")
  .append($("<input type='text' style='margin-top:1%;' class='form-control'>").attr("placeholder","Answer")))
  .append($("<div class='col-md-2' style='padding-top:0.4%;'>")
  .append($("<button type='button' class='btn btn-danger'>").on("click",supprimerQuestion)
  .append($("<span class='glyphicon glyphicon-remove'>")))));

  console.log("QuestRes added");
});

function Quizz(title, questions,reponses){
    this.title = title;
    this.questions = questions;
    this.reponses = reponses;
    this.uri = "";
}

function supprimerQuestion(event) {
  console.log("supprimerQuestion");
  console.log(event.target);
  console.log($(event.target).parent().parent());
  $(event.target).parent().parent() .remove();
}

$("#first").on("click",supprimerQuestion);


$( "#AddQuest" ).click(function() {
    let titre = $("#Title").val();


    let questions = "";
    let reponses = "";
    var indi = 0;
    let res = true;
    $("#QuestRes > div > div > input").each(function()
    {
      if (this.id=="Question")
      {
        if (this.length-2 == indi)
          questions+=this.value;
        else
          questions+=this.value+",";
      }
      else
      {
        if (this.length-1 == indi)
          reponses+=this.value;
        else
          reponses+=this.value+",";
      }

      if (this.value=="" || this.value == " ")
      {
        $(this).parent().attr("class","col-md-5 form-group has-error");

        res = false;
      }
      console.log("iok");

      indi++;
    });

    if (!res)
    {
      $("#alert_div").append($("<div id='alert' class='alert alert-danger' role='alert'>").text("Vous n'avez pas rempli tous les champs"));

      setTimeout(function(){$("#alert").remove()}, 5000);
      if (titre== "")
      {
        $("#title_form").attr("class", "form-group has-error");
      }
    }
    else
    {
      questions.slice(-1);
      reponses.slice(-1);
      let quizz = new Quizz(
          titre,
          questions,
          reponses
          );
      console.log(JSON.stringify(quizz));
      let url = "http://localhost:3000/quizz";
      let init = {
        headers :{
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
        method : "POST",
        body : JSON.stringify(quizz)
      };
      fetch(url, init)
      .then(response =>
      {
        console.log("Save Ok");
        console.log(response)
        return response.json();
      })
      .then(response =>
      {
        console.log(response);
        console.log(response.id);
        let url_2 = "http://localhost:3000/quizz/"+response.id;
        let init_2 = {
          headers :{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          },
          method : "PATCH",
          body : JSON.stringify({"uri":url_2})
        };
        fetch(url_2, init_2)
        .then(response =>
        {
          console.log("Save Ok");
          $("#alert_div").append($("<div id='alert' class='alert alert-success' role='alert'>").text("Questionnaire ajouté !"));
          $("#title_form").attr("class", "form-group");
          setTimeout(function(){$("#alert").remove()}, 5000);
        })
      });
    }





});
