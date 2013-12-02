blacklist = ['associate Professor', 'professor associado',
			 'Bolsa de Pós-Doutoramento',
			 'Bolsa de Cientista Convidado',
			 'Bolsa de Pós Doutoramento',
			 'BPD',
			 'Associated Professor',
			 'Associate Professor',
			 'Professor',
			 'Professor Catedrático',
			 'Bolsa de Iniciação Científica',
			 'Post-doctoral',
			 'Licenciado',
			 'Pos Doc'];


function find_replace(s, sub){
	// sub = '<b>Position</b>:'
	result = null;
	if(s.indexOf(sub) != -1)
		result = s.replace(sub, '');
	return result;
}


$('.DIVresultadoPesquisa').each(function(){

	$this = $(this);
	linhas_html = $this.html().split('<br>');

	for(d in linhas_html){
	 	

		var positionType = null;
		var linha = $.trim(linhas_html[d]);


		r = find_replace(linha, '<b>Position</b>:')
		positionType = (r == null) ? positionType: r;

		r = find_replace(linha, '<b>Cargo/posição/bolsa</b>:')
		positionType = (r == null) ? positionType: r;

		// rep_str = '<b>Position</b>:'
		// if(linha.indexOf(rep_str) != -1)
		// 	positionType = linha.replace(rep_str, '');
		
		// if(linha.indexOf('<b>Cargo/posição/bolsa</b>:') != -1)
		// 	positionType = linha.replace('<b>Cargo/posição/bolsa</b>:', '');
		
		
		if(positionType != null){
			
			wanted = true;
			positionType = positionType.toLowerCase()
			
			for(b in blacklist){
				var blacklist_string = blacklist[b].toLowerCase();
				
				if(positionType.indexOf(blacklist_string) != -1){
					wanted = false;
					break;
				} 
			}

			$this.css({'background': 'rgba(35, 241, 141, 0.2)'})
			if(wanted == false)	// bolsas que nao interessam
				$this.css({'background': 'rgba(255, 0, 0, 0.2)'})
		}			
	}

	if(wanted==true && $this.html().indexOf('Aveiro') != -1)
		$this.css({'border': '3px solid rgba(0, 128, 64, 1)'})
	
})




