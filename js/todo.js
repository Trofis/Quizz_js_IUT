$(function() {

    $("#button").click(refreshTaskList);

    function refreshTaskList(){
        $("#currenttask").empty();
        let url = "http://localhost:3000/tasks";
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
          $('#taches').empty();
          $('#taches').append($('<ul>'));
          for(var i=0;i<tasks.length;i++){
              console.log(tasks[i]);
              $('#taches ul')
              .append($('<li>')
              .append($('<a>')
                  .text(tasks[i].title)
                  ).on("click", tasks[i], details)
              );
          }
        }

    function details(event){
        $("#currenttask").empty();
        formTask();
        fillFormTask(event.data);
        }

    // Objet Task en JS
    function Task(title, description, done, uri){
        this.title = title;
        this.description = description;
        this.done = done;
        this.uri = uri;
        console.log(this.uri);
    }


    $("#tools #add").on("click", formTask);
    $('#tools #del').on('click', delTask);

    function formTask(isnew){
        $("#currenttask").empty();
        $("#currenttask")
            .append($('<span>Titre<input type="text" id="titre"><br></span>'))
            .append($('<span>Description<input type="text" id="descr"><br></span>'))
            .append($('<span>Done<input type="checkbox" id="done"><br></span>'))
            .append($('<span><input type="hidden" id="turi"><br></span>'))
            .append(isnew?$('<span><input type="button" value="Save Task"><br></span>').on("click", saveNewTask)
                         :$('<span><input type="button" value="Modify Task"><br></span>').on("click", saveModifiedTask)
                );
        }

    function fillFormTask(t){
        $("#currenttask #titre").val(t.title);
        $("#currenttask #descr").val(t.description);
         t.uri=(t.uri == undefined)?"http://localhost:3000/tasks/"+t.id:t.uri;
         $("#currenttask #turi").val(t.uri);
        t.done?$("#currenttask #done").prop('checked', true):
        $("#currenttask #done").prop('checked', false);
    }

    function saveNewTask(){
        var task = new Task(
            $("#currenttask #titre").val(),
            $("#currenttask #descr").val(),
            $("#currenttask #done").is(':checked')
            );
        console.log(JSON.stringify(task));
        let url = "http://localhost:3000/tasks";
        let init = {
          headers :{
            Accept : 'application/json',
            contentType: 'application/json'
          },
          method : "POST",
          body : JSON.stringify(task)
        };
        fetch(url, init)
        .then(response =>
        {
          console.log("Save Ok");
        })
        .catch(err => {console.warn(err)});

        refreshTaskList();
    }

    function saveModifiedTask(){
        var task = new Task(
            $("#currenttask #titre").val(),
            $("#currenttask #descr").val(),
            $("#currenttask #done").is(':checked'),
            $("#currenttask #turi").val()
            );
        console.log("PUT");
        console.log(task.uri);
        console.log(JSON.stringify(task));
        var data = new FormData();
        data.append( "json", JSON.stringify(task));
        let url = task.uri;
        let init =
        {
          headers : {
            Accept : 'application/json',
            contentType: "application/json"
          },
          method : "PUT",
          body : data
        };
        fetch(url, init)
        .then(response =>
        {
          console.log("Update Success");
        })
        .catch(err => {console.warn(err)});
        refreshTaskList();
    }

    function delTask(){
        if ($("#currenttask #turi").val()){
        let url = $("#currenttask #turi").val();
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
    }
  }

});
