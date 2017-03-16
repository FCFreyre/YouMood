// youtube api key AIzaSyCzWYFUTwpc5KSRTzmsugcyvIxR2NuvB6w
videoOptions = []

$(document).ready(function(){               //once doc has loaded

  $('.moodButton').click(function(event) {
    event.preventDefault()

    $('#results').html('')           //resets result field on new search
    videoOptions = []
    var input = $(this).val()       //input = query value

    switch (input) {
      case "happy":
        input = "the temptations"
        break;
      case "calm":
        input = "ChillHop"
        break;
      case "sad":
        var yesOrNo = window.confirm("Click OK if you'd like to wallow in your misery, and Cancel if you want to turn that frown upside down!")
        if(yesOrNo === true) {
          input = "depressing"
        }else{
          input = "cute+cats"
        }
        break;
      case "angry":
        var yesOrNo = window.confirm("Click OK if you'd like to feel the rage, and Cancel if you need to cool off a bit")
        if(yesOrNo === true) {
          input = "slayer"
        }else{
          input = "ChillHop"
        }
        break;
      default:                   //goofy uses prompt of goofy, so it's default
        break;
    }
    console.log(input)
    youtube(input)                      //call youtube with user input
  })

  $('.searchForm').submit(function(event) { // when submit is clicked
    event.preventDefault()
    $('#results').html('')           //resets result field on new search
    videoOptions = []
    var input = $('#query').val()       //input = query value
    youtube(input)                      //call youtube with user input
  })



//get request to youtube for search results
var youtube = function(input) {
  var url = "https://www.googleapis.com/youtube/v3/search?part=snippet,id&q="+input+"&type=video&key=AIzaSyCzWYFUTwpc5KSRTzmsugcyvIxR2NuvB6w"

  //lists first five videos of search, then appends random one of the five
  //to the results id
  $.get(url, function (data){
    for (var i = 0; i < data.items.length; i++) {
      videoOptions[i] = data.items[i].id.videoId
    }
    var randomNumber = Math.floor(Math.random() * 5) + 1
    var randoVidId = videoOptions[randomNumber]

    $('#results').append("<iframe width='640' height='480' src='https://www.youtube.com/embed/"+randoVidId+"'></iframe>")
  })
}

})
