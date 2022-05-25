/*
add note
update note
delete note
get notes
*/

const noteModel = require('../models/note.model')
module.exports.addNote = async(req, res) => {
    const { title, desc } = req.body
    console.log(req.user);
    await noteModel.insertMany({ title, desc, userId : req.user._id })
    res.status(201).json({ message: 'success' })
}
module.exports.getNotes = async(req, res) => {
        // const userId = req.header('userId')
        let page = req.query.page
        if (page == undefined || page <= 0) {
            page = 1
        }
        let PAGE_LIMIT = 5
        let Skip = (page - 1) * PAGE_LIMIT;
        //1-->    0-1  *5=-5
        let data = await noteModel.find().skip(Skip).limit(PAGE_LIMIT)
        res.status(200).json({ page, data })
    }
    //get
module.exports.updateNote = async(req, res) => {
    const { noteId, title, desc } = req.body
    await noteModel.updateOne({ _id: noteId }, { title, desc })
    res.json({ message: 'updated' })
}
module.exports.deleteNote = async(req, res) => {
    const { noteId } = req.body
    await noteModel.deleteOne({ noteId })
    res.json({ message: 'deleted' })

}

//status codes