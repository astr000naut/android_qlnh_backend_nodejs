const {HoadonMon} = require('../models/models')
module.exports = (io, socket) => {
    const dish_list = (dish_list) => {
        console.log("SOCKET IO RECEIVED DATA")
        console.log(dish_list)
        io.emit('dish_list_bep', dish_list)
    }

    const dish_state_change = async (id, status) => {
        let hoadonmon = await HoadonMon.findOne({where: {
            id: id
        }});
        if (status == 1) {
            hoadonmon.trangthai = "Đang làm"
        } else {
            hoadonmon.trangthai = "Đã xong"
        }
        await hoadonmon.save()
        console.log("BRO")
        console.log(status)
        console.log(hoadonmon.HoadonId)
        io.emit('st_c_pv', hoadonmon.HoadonId)
        
    }

    const dish_update_pv = (type, id, soluong, ghichu) => {
        console.log("DISH UPDATE SOCKET RECEIVED")
        console.log(type)
        console.log(id)
        console.log(soluong)
        console.log(ghichu)
        io.emit('dish_update_bep', type, id, soluong, ghichu)
        console.log("EMITTED")
    }

    socket.on('dish_list_pv', dish_list)
    socket.on('dish_state_change', dish_state_change)
    socket.on('dish_update_pv', dish_update_pv)
}