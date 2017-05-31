$(function() {
    function remplirTaches(tasks)
    {
      $('#NomduQuizz').empty();
      $('#NomduQuizz').text(tasks.title)
      $('#Question').empty();
      $('#Question')
      .append($('<table id="Table">'));
      var res=tasks.questions.split(",");
      console.log(res);
      $.each(res,function(index,value){
        console.log("Toto");
        $('#Table')
        .append($('<tr>')
        .append($('<td>')
        .text(value+" "))
        .append($('<td>')
        .append($('<input type="text" name="Reponse">'))));
      });
      $('#VerifQuizz').on("click",tasks,verifieQuizz);
    }
    function AfficheQuizzEnQuestion(){
      var id=getUrlParameter("id");
      var adresse = "http://localhost:3000/quizz/"+id;
      console.log(adresse);
      fetch(adresse)
      .then(response =>
      {
        if (response.ok)
        {
          return response.json();
        }
        else
          throw new Error("Problème avec votre Quizz, il n'a pas été trouvé");
      })
      .then(response => {
        remplirTaches(response);
      });
    }
    function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}
    AfficheQuizzEnQuestion();
  function verifieQuizz(event){
    alert("ok");
    var repQ =[];
    var Compteur=0;
    $('input').each(function(){
      repQ.append(this.value);
    });
    $('#NomduQuizz').empty();
    $('#NomduQuizz').text("Réponse au quizz "+tasks.title)
    $('#Question').empty();
    $('#Question')
    .append($('<table id="Table">'));
    var res=tasks.questions.split(",");
    var rep=tasks.reponses.split(",");
    var i=0;
    $.each(res,function(index,value){
      $('#Table')
      .append($('<tr>')
      .append($('<td>')
      .text("La réponse à la question "+value+" est"+rep[i])+" et vous avez mis"+repQ[i]))
      if(rep[i]==repQ[i])
        Compteur+=1;
  });
  $('#Question').text("Vous avez donc un score de "+Compteur+" sur ce Quizz")
  }
});
