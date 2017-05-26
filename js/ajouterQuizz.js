$( "#ajouterQuestRes" ).click(function() {
  $("#QuestRes")
  .append($("<div class='col-md-6'>")
  .append($("<input type='text' style='margin-top:1%;' class='form-control'>").attr("placeholder","Question ?")))
  .append($("<div class='col-md-6'>")
  .append($("<input type='text' style='margin-top:1%;' class='form-control'>").attr("placeholder","Answer")));

  console.log("QuestRes added");
});

function Quizz(title, questions,reponses){
    this.title = title;
    this.questions = questions;
    this.reponses = reponses;
}


$( "#AddQuest" ).click(function() {
    let titre = $("#Title").value;
    let questions = "";
    let reponses = "";
    $("#QuestRes > div > input").each(function()
    {
      if (this.id=="Question")
        questions+=this.value+",";
      else
        reponses+=this.value+",";
    });

    questions.slice(0,-1);
    reponses.slice(0,-1);
    var quizz = new Quizz(
        titre,
        questions,
        reponses
        );
    console.log(JSON.stringify(quizz));
    let url = "http://localhost:3000/quizz";
    let init = {
      headers :{
        Accept : 'application/json',
        contentType: 'application/json'
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
