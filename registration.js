module.exports = function registration(){
   
    const regNum = (regNo)=>{
      if(regNo ==="CA" || regNo ==="CY" || regNo ==="CJ"){
        return true;
      }else{
          return false;
      }
      
     
    }
     
    return{
        regNum,
    }
}
     

   

    
    
