export const setSessionVars = (sessVar) => {
  for(let variable of Object.entries(sessVar)){
    sessionStorage.setItem(variable[0], variable[1])
  }
}

export const remSessionVars = (sessVar) => {
  for(let variable of sessVar){
    sessionStorage.removeItem(variable)
  }
}