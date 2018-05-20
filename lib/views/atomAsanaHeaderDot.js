(function(){function atomAsanaHeaderDot(it
/*``*/) {
var out='<div class="atom-asana">     <div class="flex-container block"> <h2 class="inline-block project-label">Project</h2> <select class="project-selector input-select input-lg inline-block"> ';var arr1=it.projects;if(arr1){var project,i1=-1,l1=arr1.length-1;while(i1<l1){project=arr1[i1+=1];out+=' <option value="'+(project.id)+'">'+(project.name)+'</option> ';} } out+=' </select> </div> <div id="task-container"> <ol class="list-group"> ';var arr2=it.tasks;if(arr2){var task,i2=-1,l2=arr2.length-1;while(i2<l2){task=arr2[i2+=1];out+=' <li class="task-list"> <label class="input-label task"> <input class="input-checkbox"                             type="checkbox" value="'+(task.id)+'"                             ';if(!!task.completed_at){out+='checked';}out+=' /> <span>'+(task.name)+'</span> </label> </li> ';} } out+=' </ol> </div></div>';return out;
}var itself=atomAsanaHeaderDot, _encodeHTML=(function (doNotSkipEncoded) {
		var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
			matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
		return function(code) {
			return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
		};
	}());if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {window.render=window.render||{};window.render['atomAsanaHeaderDot']=itself;}}());