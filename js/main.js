function checkPR() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);

            if (myObj.total_count == 0) {
                document.getElementById("result").innerHTML =
                    ` <br> <br> <h5 style="margin-top=-25px;" class="text-center">Oops..!! It looks like you haven't made any Pull Request in Hacktoberfest 2017</h5><br><h5 class="space text-center">Want to contribute to Open Source? Find projects with your interest here: <a href="https://github.com/search?q=label:hacktoberfest+state:open+type:issue">Hacktoberfest 2017 Projects</h5>`
            } else {

                document.getElementById("result").innerHTML = `<span class="text-center"><img class="img-responsive" src=` + myObj.items[0].user.avatar_url + `width=130 height=130 style="border-radius:500px; margin: 0 auto;"></span>
                 <h4 class="text-center"><strong><a href=` + myObj.items[0].user.html_url + `>` +
                    myObj.items[0].user.login + `</a></h4>
                 `
                for (var i = 0; i < myObj.items.length; i++) {
                    var stateCheck;
                    myObj.items[i].state == "closed" ? stateCheck = "MERGED" : stateCheck = "PR";

                    document.getElementById("result").innerHTML += `
                  <div class="row justify-content-center">
                     <div class="pr-card ` + stateCheck + ` col-sm-10 col-lg-8">
                        <div class="row justify-content-center">
                           <div class="col-sm-10 col-xs-11">
                              <p class="pr-title"><a href="` + myObj.items[i].html_url + `">` + myObj.items[i].title + `</a></p><br>
                              <button class="btn btn-success pr-state">` + myObj.items[i].state + `</button>
                           </div>
                           <div class="col-sm-2 col-xs-1">
                              <img class="pr-image img-responsive" src="img/git` + stateCheck + `.png">
                           </div>
                        </div>
                     </div>
                  </div> 
               `

                }
            }
        }
    }
    var text = $('#login').val();
    var url = 'https://api.github.com/search/issues?q=-label:invalid+created:2017-09-30T00:00:00-12:00..2017-10-31T23:59:59-12:00+type:pr+is:public+author:' + text + '&per_page=4'
    //console.log(url)

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};