export default function dropHandler(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    console.log(evt);
    // FileList object.
    var files = evt.target.files;
 
    if (files.length !== 1) {
        return;
    }
    var file = files[0];
 
    var fileReader = new FileReader();
 
    fileReader.onloadstart = function(progressEvent) {
        console.log('onloadstart');
        console.log('File name:' + file.name);
    }
 
    fileReader.onload = function(progressEvent) {
        console.log("onload!");
        var stringData = fileReader.result;
        
        console.log(" ---------------- File Content ----------------: ");
        console.log(stringData.split('\n'));
        const str = stringData.split('\n');
        console.log(str[0])
        const strMN = str[0].split(' ');
        console.log(strMN);
        const inputMN = strMN.map(x => parseInt(x));
        console.log(inputMN)
        let matrix = []
        for(let i=0;i<inputMN[0];i++){
            const inputLine = str[i+1].split(' ').map(x => parseInt(x))
            matrix.push(inputLine);
        }
        console.log(matrix);
    }
 
    fileReader.onloadend = function(progressEvent) {
        console.log("onloadend!");
        // FileReader.EMPTY, FileReader.LOADING, FileReader.DONE
        console.log("readyState = " + fileReader.readyState);
    }
 
    fileReader.onerror = function(progressEvent) {
        console.log("onerror!");
        console.log("Has Error!");
    }
 
    // Read file asynchronously.
    fileReader.readAsText(file, "UTF-8"); // fileReader.result -> String.
}