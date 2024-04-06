

$('#btnAdd').click(()=>{
    if($('#task').val()){
        let data = {title:$('#task').val()}
        axios.post('/add-task',data)
        .then(res=>{
            console.log(res.data)
            if(res.status == 201){
                $('#task').val('')
            }
            location.href='/'
        })
    }
    else{
        alert('Завдання не введено')
    }
})

function getTasks (){
    axios.get('http://localhost:3000/tasks')
    .then(res=>{
        console.log(res.data)
        for(let el of res.data){
            $('.contentContainer').prepend(`<div class='todoItem'>

            <h5>${el.title}</h5>

            <button class='deleteBtn' id='${el._id}'><i class="fa-solid fa-trash-can"></i></button>

            </div>`)
        }
        $('.deleteBtn').click(function(e){
            let id = e.target.id
            console.log(id)
            axios.delete(`/task/${id}`)
            .then(res=>{
                location.href='/'
            })
        })
    })
}
getTasks()


