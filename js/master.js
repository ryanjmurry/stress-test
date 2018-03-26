//business logic
function Test(warnings, symptoms, coping) {
  this.warnings = warnings;
  this.symptoms = symptoms;
  this.coping = coping;
};

Test.prototype.Results = function () {
  var stressTotal = this.warnings + this.symptoms;
  var copingSkills = this.coping;

  if (stressTotal <= 6) {
    return "no stress"
  } else if (stressTotal >= 6 && copingSkills <= 5) {
    return "stress"
  } else if (stressTotal >= 6 && copingSkills >= 5) {
    return "coping"
  }
};

//UI logic
$(document).ready(function() {
  $("form#warning-signs").submit(function() {
    event.preventDefault();
    $("#warning-signs").hide();
    $("#symptoms").show();
    var warningSigns = $("input:checkbox[name=warning-signs]:checked").length;
    $("form#symptoms").submit(function () {
      event.preventDefault();
      $("#symptoms").hide();
      $("#coping").show();
      var symptoms = $("input:checkbox[name=symptoms]:checked").length;
      $("form#coping").submit(function() {
        event.preventDefault();
        $("#coping").hide();
        var copingMethods = $("input:checkbox[name=coping]:checked").length;
        var stressTest = new Test (warningSigns, symptoms, copingMethods);
        var results = stressTest.Results();
        if (results === "no stress") {
          $("#no-stress-results").show();
        } else if (results === "stress") {
          $("#stress-results").show();
        } else if (results === "coping") {
          $("#coping-results").show();
        }
        $("#reset").show();
        $("#reset").click(function() {
          location.reload();
        });
      });
    });
  });
});
