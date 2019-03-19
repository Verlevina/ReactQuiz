export function createControl (config, validation) {
  return {
    ...config,
    validation,
    valid:!validation,
    touched:false,
    value:''
  }
}

export function validate (value, validation = null) {

  if (!validation) {
    return true;
  }
  let isValid = true;
  if (validation.required) {
    isValid = value.trim() !== '' && isValid;
  }
  return isValid;
}

export function validateForm (controls) {
  let isFormValid = true;
  for(let control in controls){
    if(controls.hasOwnProperty(control)){
      isFormValid = controls[control].valid && isFormValid;
      console.log(control + '-------' +isFormValid)
    }
  }
 return isFormValid;
}