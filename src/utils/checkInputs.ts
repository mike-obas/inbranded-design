
const isEmpty = (string: string): Boolean => {
    if (!string.trim()) return true;
    else return false;
  };
  
  //checkUserCredentials
  interface inputs {
    password: string;
    email: string;
  }

  interface errorStatus {
    checkErrors: inputs;
    valid: boolean;
  }

  export function checkUserCredentials(data: inputs): errorStatus {
    let checkErrors: inputs | any = {};
    if (isEmpty(data.email)) {
      checkErrors.email = "Must not be empty";
    }
    if (isEmpty(data.password)) {
      checkErrors.password = "Must not be empty";
    }
    return {
      checkErrors,
      valid: Object.keys(checkErrors).length === 0 ? true : false,
    };
  }

  interface designInputs {
    title: string;
    image: string;
  }

  interface designErrorStatus {
    checkErrors: designInputs;
    valid: boolean;
  }

  export function checkDesignCredentials(data: designInputs): designErrorStatus {
    let checkErrors: designInputs | any = {};
    if (isEmpty(data.title)) {
      checkErrors.title = "Must not be empty";
    }
    if (isEmpty(data.image)) {
      checkErrors.image = "Kindly click on the save button to save your design";
    }
    return {
      checkErrors,
      valid: Object.keys(checkErrors).length === 0 ? true : false,
    };
    
  }
  