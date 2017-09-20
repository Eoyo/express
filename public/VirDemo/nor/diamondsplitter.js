Vir({
    //diama
    "1; .onep": {
        ".diamond": {
            ".sphere": {
                "2* .wrap": {
                    ".cube": {
                        "4* .face": ""
                    }
                }
            }
        }
    } && null

    //Suds
    , "2; .onep": {
        [`link [
            href='https://fonts.googleapis.com/css?family=Sacramento' 
            rel='stylesheet' 
            type='text/css']`
        ]: ""
        , h1: "Suds liumiao"
        , ".suds > 50* .sud": ""
    } && null

    //
    // , "3; .onep": {
    , "form .form": {
        "check; h2": "CheckBoxes"
        , "check; ": [1, 2].map(v => (
            {
                ".inputGroup": {
                    [`input #option${v} [name = 'option${v}' type='checkbox']`]: ""
                    , [`label [for = 'option${v}']`]: "Option One"
                }
            }
        ))
        , "radio; h2": "Radio Buttons"
        , "radio; ": [1, 2].map(v => (
            {
                ".inputGroup": {
                    [`input #radio${v} [name = 'radio' type='radio']`]: ""
                    , [`label [for = 'radio${v}']`]: "good"
                }
            }
        ))
    }
    // }
})

/*
<form class="form">
  
  <h2>Checkboxes</h2>
  <div class="inputGroup">
    <input id="option1" name="option1" type="checkbox"/>
    <label for="option1">Option One</label>
  </div>
  
  <div class="inputGroup">
    <input id="option2" name="option2" type="checkbox"/>
    <label for="option2">Option Two</label>
  </div>
  
  <h2>Radio Buttons</h2>
  <div class="inputGroup">
    <input id="radio1" name="radio" type="radio"/>
    <label for="radio1">Yes</label>
  </div>
  <div class="inputGroup">
    <input id="radio2" name="radio" type="radio"/>
    <label for="radio2">No</label>
  </div>
</form>


link(
  href='https://fonts.googleapis.com/css?family=Sacramento' 
  rel='stylesheet' 
  type='text/css'
)

h1 Suds

- var x = 0

.suds
  while x < 50
    .sud
    -x++
 */
