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

function Quizz(title, questions,reponses, uri){
    this.title = title;
    this.questions = questions;
    this.reponses = reponses;
    this.uri = uri;
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
    $("#QuestRes > div > div > input").each(function()
    {
      if (this.id=="Question")
        questions+=this.value+",";
      else
        reponses+=this.value+",";
    });

    questions.slice(-1);
    reponses.slice(-1);
    let quizz = new Quizz(
        titre,
        questions,
        reponses,
        uri
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
    })
    .catch(err => {console.warn(err)});

});
