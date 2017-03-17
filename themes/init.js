(function(){
	$(function(){
		setTimeout(function(){
			hljs.configure({tabReplace: '    '}); 
			hljs.initHighlightingOnLoad();
			$('pre code').each(function(i, block) {
			    hljs.highlightBlock(block);
			 });
		},200);
	});
})();
