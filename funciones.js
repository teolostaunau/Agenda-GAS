const HOJA = SpreadsheetApp.openById('1LL-UJWkYhNqV7LHdjtxQEvA1wAheTMISRWMiuI_Shec').getActiveSheet();
const CARPETA = DriveApp.getFolderById('182S3C9oR-gPFJ2Q-OlyOQvlkx8JGTypy');
const CABECERA_URL_IMAGEN_DRIVE = 'https://drive.google.com/uc?id=';

function doGet()
{
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda Google Apps Script');
}

function doPost(datos)
{
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda Google Apps Script');    
}

function obtenerDatosHTML(nombre)
{
    return HtmlService.createHtmlOutputFromFile(nombre).getContent();
}

function obtenerDatos()
{
   return HOJA.getDataRange().getValues();
}

function insertarContacto(contacto, imagen)
{
    if(imagen)
    {
        let blob = Utilities.newBlob(imagen.datos, imagen.tipo, imagen.nombre);
        let archivo = CARPETA.createFile(blob);

        contacto.imagen = CABECERA_URL_IMAGEN_DRIVE + archivo.getId();
    }
    HOJA.appendRow([contacto.dni,contacto.nombre,contacto.correo,contacto.telefono,contacto.boleto,contacto.imagen]);
}

function borrarContacto(numFila)
{
    HOJA.deleteRow(numFila);
}

function modificarContacto(numFila,datos)
{
    let celdas = HOJA.getRange(`A${numFila}:E${numFila}`);
    celdas.setValues([[datos.dni,datos.nombre,datos.correo,datos.telefono,datos.boleto]]);
}

function importarContactos()
{
    let url = 'https://randomuser.me/api/?results=5&inc=id,name,email,phone,picture';
    let respuesta = UrlFetchApp.fetch(url).getContentText();
    let datos =JSON.parse(respuesta);
    datos.results.forEach(insertarContactoJSON);
}

function insertarContactoJSON(contacto)
{
    HOJA.appendRow([contacto.id.value,contacto.name.first +' '+contacto.name.last,contacto.email,contacto.phone,'BOLETO GENERAL',contacto.picture.large]);
}

