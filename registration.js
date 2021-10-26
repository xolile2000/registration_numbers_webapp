module.exports = function registration(pool) {

  const getTownId = async (strings) => {
    // let first = strings.charAt(0).toUpperCase() + strings.slice(2).toLowerCase()
    var sub = strings.substring(0, 2)
    var results = await pool.query("select id from towns where townstring = $1", [sub])

    return results.rows[0].id
  }

  // const addregNum = async (reg) => {

  //   await pool.query(`insert into regNumbers (reg, town_id) values ($1,$2)`, [reg, id]);
  // }

  const addregNum = async (regNo) => {
    // let first = regNo.charAt(0).toUpperCase() + regNo.slice(2).toLowerCase()
    // var sub = reg.substring(0, 2)
    var id = await getTownId(regNo)
    let regCheck = await pool.query("select reg from regnumbers where reg = $1", [regNo])

    if (regCheck.rowCount === 0) {
      await pool.query(`insert into regNumbers (reg, town_id) values ($1,$2)`, [regNo, id])
    }
  }

  const displayReg =  async()=>{
    
    let reg = await pool.query(`select reg from regnumbers`)
    // console.log(reg.rows[0].id)

    return reg.rows
  
  }
  const remove = async() => {
    let remove = await pool.query(`delete from regnumbers`);
    return remove.rows
  }
  
  const filterTown = async (townString)=>{
    var townId = await pool.query("select id from towns where townstring = $1", [townString])
    var IdForTown = townId.rows[0].id

   var displayTown = await pool.query(`select reg from regnumbers where town_id = $1`,[IdForTown])
    return displayTown.rows

     
  }


  return {
    addregNum,
    displayReg,
    remove,
    filterTown

  }
}







