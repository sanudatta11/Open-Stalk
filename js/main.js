var overall=[0,0,0];  //[OPEN,CLOSED,MERGED]
var toMonth = new Date();
toMonth = toMonth.getMonth();
function checkPR() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      var count = myObj.total_count <= 4 ? myObj.total_count : "4";
      var progressWidth = count / 4 * 100;
      if (myObj.total_count == 0) {
        document.getElementById(
          "result"
        ).innerHTML = ` <br> <br> <h5 style="margin-top=-25px;" class="text-center">Oops..!! It looks like you haven't made any Pull Request till now</h5><br><h5 class="space text-center">Want to contribute to Open Source? Find projects with your interest here: <a href="https://github.com/search?q=label:hacktoberfest+state:open+type:issue">Open Source Projects</h5>`;
      } else {
        document.getElementById("result").innerHTML =
          `<div class="container"><div class="row"><div class="col-md-12 text-center"><img class="img-responsive" src=` +
          myObj.items[0].user.avatar_url +
          `width=130 height=130 style="border-radius:500px; margin: 0 auto;"></div>
                <div class="col-md-12 text-center"><h4>username: <strong><a href=` +
          myObj.items[0].user.html_url +
          `>` +
          myObj.items[0].user.login +
          `</a></strong></h4></div></div></div>

                 `;
        for (var i = 0; i < myObj.items.length; i++) {
          var stateCheck;

          //url of origin repo
          if (wordInURL(myObj.items[i].html_url, "issues") == false) {
            var full_url = myObj.items[i].html_url;
            var final_url = full_url.substring(0, full_url.length - 7);

            //title of origin repo
            var shorted_title = full_url.substring(18, full_url.length - 7);

            //uppercasing the first letter of repo title
            var uppercaseFirstLetter = myObj.items[i].title
              .charAt(0)
              .toUpperCase();
            var stringWithoutFirstLetter = myObj.items[i].title.slice(1);
            var pr_title = uppercaseFirstLetter + stringWithoutFirstLetter;

            myObj.items[i].state == "closed"
              ? (stateCheck = "CLOSED")
              : (stateCheck = "OPEN");
            document.getElementById("result").innerHTML +=
              `
                      <div class="row justify-content-center">
                        <div class="pr-card ` +
              stateCheck +
              ` col-sm-10 col-lg-8" `+
              `id="`+myObj.items[i].id+`">
                          <div class="row justify-content-center">
                             <div class="col-sm-2 col-xs-1">
                                <img class="pr-image img-responsive" src="img/git` +
              stateCheck +
              `.png">
                             </div>
                             <div class="col-sm-10 col-xs-11 pr-state">
                                <h5 class="pr-title"><a target="_blank" href="` +
              myObj.items[i].html_url +
              `">` +
              pr_title +
              `</a></h5>
                                <p class="repo-origin">to <b><a target="_blank" href="` +
              final_url +
              `">` +
              shorted_title +
              `</a></b></p>
                                <button>` +
              stateCheck +
              `</button>
                             </div>
                          </div>
                        </div>
                      </div>
                    `;
          }
        }
      }
    }
    checkUnMerge();
  };
  window.text = $("#login").val();
  var url =
    "https://api.github.com/search/issues?q=-type:pr+is:public+author:" +
    window.text +
    "&per_page=300";
  console.log(url);

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
function checkUnMerge()
{
  let cm = new XMLHttpRequest()
  cm.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      let rt = JSON.parse(this.responseText);
      rt.items.forEach(element => {
        let dv = document.getElementById(element.id);
        if(dv!=null)
        {
          dv.classList.remove("CLOSED");
          dv.classList.add("MERGED");
          dv.lastElementChild.lastElementChild.lastElementChild.innerText = "MERGED";
        }
      });
      overall=[document.getElementsByClassName("OPEN").length,document.getElementsByClassName("CLOSED").length,document.getElementsByClassName("MERGED").length]
      drawPie(overall);
    }
  };

  cm.open("GET", "https://api.github.com/search/issues?q=-type:pr+is:public+is:merged+author:" +
  window.text +
  "&per_page=300", true)
  cm.send();
}
function wordInURL(url, word) {
  return new RegExp("\\b" + word + "\\b", "i").test(url);
}

function drawPie(counts){
  var ctxP = document.getElementById("pieChart").getContext('2d');
  var myPieChart = new Chart(ctxP, {
  type: 'pie',
  data: {
  labels: ["OPEN", "CLOSED", "MERGED"],
  datasets: [{
  data: counts,
  backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
  hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
  }]
  },
  options: {
  responsive: true
  }
  });
}
