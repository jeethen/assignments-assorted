export class httpHelper{

    static httpCall(method: string, url:string, data:any, callback:(result:any)=>any) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open(method, url, true);
        if (callback) xhr.onload = function() { callback(JSON.parse(this['responseText'])); };
        if (data != null) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
        else xhr.send();
    }
}