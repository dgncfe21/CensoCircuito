$(document).ready(function() {
        const config = {
            apiKey: "AIzaSyBFZAqY0gFxpcFGF84qDq1sVCc_dCp1fP8",
            authDomain: "uni04215.firebaseapp.com",
            databaseURL: "https://uni04215.firebaseio.com",
            projectId: "uni04215",
            storageBucket: "uni04215.appspot.com",
            messagingSenderId: "499644356831",
            appId: "1:499644356831:web:58e8b8ae763065e89cb16a",
            measurementId: "G-519V17KC22"

    };    
    firebase.initializeApp(config); //inicializamos firebase
    
    var filaEliminada; //para capturara la fila eliminada
    var filaEditada; //para capturara la fila editada o actualizada

    //creamos constantes para los iconos editar y borrar    
    const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
    const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';

    var db = firebase.database();
    var coleccionOBI43015 = db.ref().child("OBI43015");
         
    var dataSet = [];//array para guardar los valores de los campos inputs del form
    var table = $('#tablaOBI43015').DataTable({
                pageLength : 5,
                lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
                data: dataSet,
                columnDefs: [
                    {
                        targets: [0], 
                        visible: false, //ocultamos la columna de ID que es la [0]                        
                    },
                    {
                        targets: -1,        
                        defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>"+iconoEditar+"</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>"+iconoBorrar+"</button></div></div>"
                    }
                ]	   
            });

    coleccionOBI43015.on("child_added", datos => {        
        dataSet = [datos.key, datos.child("medidor").val(), datos.child("ilicito").val(), datos.child("mt").val(),datos.child("anom_slect").val(),datos.child("anom_clect").val(),datos.child("comentarios").val(),datos.child("fecha_hora").val(),datos.child("latitud").val(),datos.child("longitud").val()];
        table.rows.add([dataSet]).draw();
    });
    coleccionOBI43015.on('child_changed', datos => {           
        dataSet = [datos.key, datos.child("medidor").val(), datos.child("ilicito").val(), datos.child("mt").val(),datos.child("anom_slect").val(),datos.child("anom_clect").val(),datos.child("comentarios").val(),datos.child("fecha_hora").val(),datos.child("latitud").val(),datos.child("longitud").val()];
        table.row(filaEditada).data(dataSet).draw();
    });
    coleccionOBI43015.on("child_removed", function() {
        table.row(filaEliminada.parents('tr')).remove().draw();                     
    });
          
    $('form').submit(function(e){                         
        e.preventDefault();
        let id = $.trim($('#id').val());        
        let medidor = $.trim($('#medidor').val());
        let ilicito = $.trim($('#ilicito').val());         
        let mt = $.trim($('#mt').val());
        let anom_slect = $.trim($('#anom_slect').val());
        let anom_clect = $.trim($('#anom_clect').val());  
        let comentarios = $.trim($('#comentarios').val());
        let fecha_hora = $.trim($('#fecha_hora').val());
        let latitud = $.trim($('#latitud').val());  
        let longitud = $.trim($('#longitud').val());                               
        let idFirebase = id;        
        if (idFirebase == ''){                      
            idFirebase = coleccionOBI43015.push().key;
        };                
        data = {medidor:medidor, ilicito:ilicito, mt:mt, anom_slect:anom_slect, anom_clect:anom_clect, comentarios:comentarios, fecha_hora:fecha_hora, latitud:latitud, longitud:longitud};             
        actualizacionData = {};
        actualizacionData[`/${idFirebase}`] = data;
        coleccionOBI43015.update(actualizacionData);
        id = '';        
        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('hide');
    });

    //Botones
    $('#btnNuevo').click(function() {
        $('#id').val('');
        $('#medidor').val('');
        $('#ilicito').val('');
        $('#mt').val('');
        $('#anom_slect').val('');        
        $('#anom_clect').val('');
        $('#comentarios').val(''); 
        $('#fecha_hora').val('');        
        $('#latitud').val('');
        $('#longitud').val('');      
        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('show');
    });        

    $("#tablaOBI43015").on("click", ".btnEditar", function() {    
        filaEditada = table.row($(this).parents('tr'));           
        let fila = $('#tablaOBI43015').dataTable().fnGetData($(this).closest('tr'));               
        let id = fila[0];
        console.log(id);
		let medidor = $(this).closest('tr').find('td:eq(0)').text(); 
        let ilicito = $(this).closest('tr').find('td:eq(1)').text();        
        let mt = parseInt($(this).closest('tr').find('td:eq(2)').text());       
        let anom_slect = parseInt($(this).closest('tr').find('td:eq(3)').text());
        let anom_clect = parseInt($(this).closest('tr').find('td:eq(4)').text()); 
        let comentarios = parseInt($(this).closest('tr').find('td:eq(5)').text()); 
        let fecha_hora = parseInt($(this).closest('tr').find('td:eq(6)').text());
        let latitud = parseInt($(this).closest('tr').find('td:eq(7)').text()); 
        let longitud = parseInt($(this).closest('tr').find('td:eq(8)').text());   
        $('#id').val(id);        
        $('#medidor').val(medidor);
        $('#ilicito').val(ilicito);                
        $('#mt').val(mt);   
        $('#anom_slect').val(anom_slect);
        $('#anom_clect').val(anom_clect); 
        $('#comentarios').val(comentarios);
        $('#fecha_hora').val(fecha_hora);  
        $('#latitud').val(latitud);
        $('#longitud').val(longitud);                 
        $('#modalAltaEdicion').modal('show');
	});  
  
    $("#tablaOBI43015").on("click", ".btnBorrar", function() {   
        filaEliminada = $(this);
        Swal.fire({
        title: '¿Está seguro de eliminar el producto?',
        text: "¡Está operación no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Borrar'
        }).then((result) => {
        if (result.value) {
            let fila = $('#tablaOBI43015').dataTable().fnGetData($(this).closest('tr'));            
            let id = fila[0];            
            db.ref(`OBI43015/${id}`).remove()
            Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.','success')
        }
        })        
	});  

});