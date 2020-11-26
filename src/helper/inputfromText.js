export default  function dropHandler(evt) {
    var inputData = [];
    var inputMN = []
    console.log(typeof inputData)
    evt.stopPropagation();
    evt.preventDefault();
    // FileList object.
    var files = evt.target.files;
 
    if (files.length !== 1) {
        return;
    }
    var file = files[0];
 
    var fileReader = new FileReader();
 
    fileReader.onloadstart =  function(progressEvent) {
        // console.log('onloadstart');
        // console.log('File name:' + file.name);
    }
 
    fileReader.onload =  function(progressEvent) {
        // console.log("onload!");
        var stringData = fileReader.result;
        
        // console.log(" ---------------- File Content ----------------: ");
        // console.log(stringData.split('\n'));
        let str = stringData.split('\n');
        // console.log(str[0])
        inputMN = inputMN + str[0].split(' ').map(x=> parseInt(x));
        for(let i=0;i<inputMN[0];i++){
            let inputLine = str[i+1].split(' ').map(x => parseInt(x))
            inputData.push(inputLine);
        }
        console.log(inputData[0],'1234')
    }

    fileReader.onloadend =  function(progressEvent) {
        // console.log("onloadend!");
        // FileReader.EMPTY, FileReader.LOADING, FileReader.DONE
        // console.log("readyState = " + fileReader.readyState);
    }
 
    fileReader.onerror =  function(progressEvent) {
        // console.log("onerror!");
        // console.log("Has Error!");
    }
 
    console.log(inputData.length)
    fileReader.readAsText(file, "UTF-8"); // fileReader.result -> String.
    return inputData;
}