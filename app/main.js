//Init new camera instance on the player node
const camera = new Camera(document.getElementById("player"));

//Main app logic
const _init = () => {
  //Swith on camera in viewfinder
  $("#viewfinder").on("show.bs.modal", () => {
    camera.switch_on();
  });
  //Switch off camera in viewfinder
  $("#viewfinder").on("hide.bs.modal", () => {
    camera.switch_off();
  });

  //Take photo
  $("#shutter").on("click", () => {
    let photo = camera.take_photo();
    //Show photo preview in camera button
    $("#camera")
      .css("background-image", `url(${photo})`)
      .addClass("withphoto");
  });

  //Submit message
  $("#send").on("click", () => {
    //Get caption text
    let caption = $("#caption").val();

    //Check message is ok
    if (!camera.photo || !caption) {
      //Show notification and return
      toastr.warning("Photo & Caption Required.", "Incomplete Message");
      return;
    }

    console.log("Adding Message");
    console.log(caption);
    //Reset caption field on success
    $("#caption").val("");
    $("#camera")
      .css("background-image", "")
      .removeClass("withphoto");
    camera.photo = null;
  });
};
